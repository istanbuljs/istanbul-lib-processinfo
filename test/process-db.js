'use strict'
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
  t.throws(() => {
    pdb.directory = 'foo'
  }, TypeError)
  t.equal(pdb.directory, directory, 'directory is read-only')
  t.equal(pdb.label, 'nyc')
  t.end()
})

t.test('writing and reading index', async t => {
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

  t.matchSnapshot(await pdb.readIndex())
})

t.test('duplicate externalId throws', async t => {
  const dupe = path.resolve(directory, 'duplicate.json')
  const src = path.resolve(directory, '625ef291-93c0-40b2-a869-70587f7e8fac.json')
  fs.writeFileSync(dupe, fs.readFileSync(src))
  t.teardown(() => rimraf(dupe))
  const pdb = new ProcessDB(directory)
  await t.rejects(pdb.writeIndex())
})

t.test('readProcessInfos', async t => {
  // put a borked json in there just for funsies
  const bad = path.resolve(directory, 'gleepglorp.json')
  fs.writeFileSync(bad, 'this is not json, it is bad')
  t.teardown(() => rimraf(bad))

  const pdb = new ProcessDB(directory)
  t.matchSnapshot(await pdb.readProcessInfos())
})

t.test('buildProcessTree with invalid index', async t => {
  const pdb = new ProcessDB(directory)
  t.teardown(() => pdb.writeIndex())

  const idx = await pdb.readIndex()
  idx.processes.fleepflorp = { what: 'that mean' }
  const json = JSON.stringify(idx)
  fs.writeFileSync(path.resolve(directory, 'index.json'), json)

  await t.rejects(pdb.buildProcessTree(), {
    message: 'Invalid entry in processinfo index: fleepflorp'
  })
})

t.test('render process tree', async t => {
  const nyc = new NYC({
    tempDir: __dirname + '/fixtures/.nyc_output',
    cwd: path.resolve(__dirname + '/..'),
  })

  const pdb = new ProcessDB(directory)

  t.matchSnapshot(await pdb.renderTree(nyc), 'render the tree')
  t.matchSnapshot(await pdb.getCoverageMap(), 'coverage map after render')
  t.matchSnapshot(pdb.label, 'label after render')
})

t.test('spawn', async t => {
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

  const c = await pdb.spawn('named test', esc, [node, ok], {
    stdio: ['ignore', 'ignore', 'inherit']
  })

  await new Promise(resolve => {
    c.on('close', (code, signal) => {
      t.equal(code, 0)
      t.equal(signal, null)
      resolve()
    })
  })

  // got the named test in there
  t.match(await pdb.writeIndex(), { externalIds: { 'named test': Object } })

  await pdb.expunge('named test')
  t.notMatch(await pdb.writeIndex(), { externalIds: { 'named test': Object } })
})

t.test('spawn args parsing', t => {
  const _spawnArgs = Symbol.for('spawnArgs')
  const sa = ProcessDB.prototype[_spawnArgs]
  t.match(sa('name', 'file', {some:'options'}), ['name', 'file', [], {some:'options'}])
  t.match(sa('name', 'file'), ['name', 'file', [], {}])
  t.end()
})
