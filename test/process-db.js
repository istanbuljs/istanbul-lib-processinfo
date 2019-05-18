const t = require('tap')
const {ProcessDB} = require('../')
const uuidRe = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/
const NYC = require('nyc')
const rimraf = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const directory = path.resolve(__dirname, 'fixtures/.nyc_output/processinfo')
const indexFile = path.resolve(directory, 'index.json')

t.test('basic creation', t => {
  const pdb = new ProcessDB(directory)
  pdb.directory = 'foo'
  t.equal(pdb.directory, directory, 'directory is read-only')
  t.equal(pdb.label, 'nyc')
  t.end()
})

t.test('writing and reading index', t => {
  const pdb = new ProcessDB(directory)
  rimraf(indexFile)
  t.throws(() => fs.readFileSync(indexFile))

  // put a borked json in there just for funsies
  const bad = path.resolve(directory, 'gleepglorp.json')
  fs.writeFileSync(bad, 'this is not json, it is bad')
  t.teardown(() => rimraf(bad))

  // this should never happen, but we are resilient against it anyway
  const dupe = path.resolve(directory, 'duplicate.json')
  const src = path.resolve(directory, '62c33964-203a-4e6a-b1ff-8a046eeb8912.json')
  fs.writeFileSync(dupe, fs.readFileSync(src))
  t.teardown(() => rimraf(dupe))

  t.matchSnapshot(pdb.readIndex())
  t.end()
})

t.test('duplicate externalId throws', t => {
  const dupe = path.resolve(directory, 'duplicate.json')
  const src = path.resolve(directory, '625ef291-93c0-40b2-a869-70587f7e8fac.json')
  fs.writeFileSync(dupe, fs.readFileSync(src))
  t.teardown(() => rimraf(dupe))
  const pdb = new ProcessDB(directory)
  t.throws(() => pdb.writeIndex())
  t.end()
})

t.test('readProcessInfos', t => {
  // put a borked json in there just for funsies
  const bad = path.resolve(directory, 'gleepglorp.json')
  fs.writeFileSync(bad, 'this is not json, it is bad')
  t.teardown(() => rimraf(bad))

  const pdb = new ProcessDB(directory)
  t.matchSnapshot(pdb.readProcessInfos())
  t.end()
})

t.test('buildProcessTree with invalid index', t => {
  const pdb = new ProcessDB(directory)
  t.teardown(() => pdb.writeIndex())

  const idx = pdb.readIndex()
  idx.processes.fleepflorp = { what: 'that mean' }
  const json = JSON.stringify(idx)
  fs.writeFileSync(path.resolve(directory, 'index.json'), json)

  t.throws(() => pdb.buildProcessTree(), {
    message: 'Invalid entry in processinfo index: fleepflorp'
  })
  t.end()
})

t.test('render process tree', t => {
  const nyc = new NYC({
    tempDir: __dirname + '/fixtures/.nyc_output',
    cwd: path.resolve(__dirname + '/..'),
  })

  const pdb = new ProcessDB(directory)

  t.matchSnapshot(pdb.renderTree(nyc), 'render the tree')
  t.matchSnapshot(pdb.getCoverageMap(), 'coverage map after render')
  t.matchSnapshot(pdb.label, 'label after render')
  t.end()
})

t.test('spawn', t => {
  const tempDir = __dirname + '/fixtures/.nyc_output'
  const esc = process.platform === 'win32'
    ? path.resolve('escape.cmd')
    : path.resolve('escape.sh')
  t.teardown(() => rimraf(esc))
  const node = process.execPath
  const escapePath = `${path.dirname(node)}:${process.env.PATH}`
  const nyc = require.resolve('nyc/bin/nyc.js')

  const script = process.platform === 'win32'
    ? `
@SETLOCAL\r
@SET PATH=${escapePath};%PATH%\r
@SET NYC_CONFIG=\r
@SET NYC_CWD=\r
@SET NYC_ROOT_ID=\r
@SET NYC_INSTRUMENTER=\r
@SET NYC_CONFIG_OVERRIDE=\r
@SET NYC_PROCESS_ID=\r
${node} ${nyc} --show-process-tree --cache=false --clean=false --temp-dir=${tempDir} %*\r
` : `#!/bin/bash
export PATH=${escapePath}
export NYC_CONFIG=
export NYC_CWD=
export NYC_ROOT_ID=
export NYC_INSTRUMENTER=
export NYC_CONFIG_OVERRIDE=
export NYC_PROCESS_ID=
${node} ${nyc} --show-process-tree --cache=false --clean=false --temp-dir=${tempDir} "$@"
`
  fs.writeFileSync(esc, script)
  const ok = path.resolve('ok.js')
  t.teardown(() => rimraf(ok))
  fs.writeFileSync(ok, `
if (process.argv[2] !== 'child') {
  console.log('TAP version 13')
  console.log('ok 1 - child {')
  require('child_process').spawn(process.execPath, [__filename, 'child'], {
    stdio: 'inherit'
  }).on('close', () => console.log('}\\n1..1'))
} else {
  console.log('    1..1')
  console.log('    ok')
}
`)

  fs.chmodSync(esc, 0o755)
  const pdb = new ProcessDB(directory)

  return new Promise(res => {
    const c = pdb.spawn('named test', esc, [node, ok], {
      stdio: ['ignore', 'ignore', 'inherit']
    })
    c.on('close', (code, signal) => {
      t.equal(code, 0)
      t.equal(signal, null)
      res()
    })
  }).then(() => {
    // got the named test in there
    t.match(pdb.writeIndex(), { externalIds: { 'named test': Object } })
    // expunges
    pdb.spawnSync('named test', esc, [node, ok], {
      stdio: ['ignore', 'ignore', 'inherit']
    })
    t.match(pdb.writeIndex(), { externalIds: { 'named test': Object } })
    pdb.expunge('named test')
    t.notMatch(pdb.writeIndex(), { externalIds: { 'named test': Object } })

    // with the auto-index-rewriting
    return new Promise(res => {
      const c = pdb.spawn('named test', esc, [node, ok], {
        regenerateIndex: true,
        stdio: ['ignore', 'ignore', 'inherit']
      })
      c.on('close', (code, signal) => {
        t.equal(code, 0)
        t.equal(signal, null)
        res()
      })
    })
  }).then(() => {
    // got the named test in there
    t.match(pdb.readIndex(), { externalIds: { 'named test': Object } })
    // expunges
    pdb.spawnSync('named test', esc, [node, ok], {
      regenerateIndex: true
    })
    t.match(pdb.readIndex(), { externalIds: { 'named test': Object } })
    pdb.expunge('named test')
    t.notMatch(pdb.writeIndex(), { externalIds: { 'named test': Object } })
  })
})

t.test('spawn args parsing', t => {
  const _spawnArgs = Symbol.for('spawnArgs')
  const sa = ProcessDB.prototype[_spawnArgs]
  t.match(sa('name', 'file', {some:'options'}), ['name', 'file', [], {some:'options'}])
  t.match(sa('name', 'file'), ['name', 'file', [], {}])
  t.end()
})
