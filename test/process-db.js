const t = require('tap')
const {ProcessDB} = require('../')
const uuidRe = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/
const NYC = require('nyc')
const rimraf = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const dir = path.resolve(__dirname, 'fixtures/.nyc_output/processinfo')
const indexFile = path.resolve(dir, 'index.json')

t.test('basic creation', t => {
  const pdb = new ProcessDB(dir)
  pdb.dir = 'foo'
  t.equal(pdb.dir, dir, 'dir is read-only')
  t.equal(pdb.label, 'nyc')
  t.end()
})

t.test('writing and reading index', t => {
  const pdb = new ProcessDB(dir)
  rimraf(indexFile)
  t.throws(() => fs.readFileSync(indexFile))

  // put a borked json in there just for funsies
  const bad = path.resolve(dir, 'gleepglorp.json')
  fs.writeFileSync(bad, 'this is not json, it is bad')
  t.teardown(() => rimraf(bad))

  // this should never happen, but we are resilient against it anyway
  const dupe = path.resolve(dir, 'duplicate.json')
  const src = path.resolve(dir, '62c33964-203a-4e6a-b1ff-8a046eeb8912.json')
  fs.writeFileSync(dupe, fs.readFileSync(src))
  t.teardown(() => rimraf(dupe))

  t.matchSnapshot(pdb.readIndex())
  t.end()
})

t.test('duplicate externalId throws', t => {
  const dupe = path.resolve(dir, 'duplicate.json')
  const src = path.resolve(dir, '625ef291-93c0-40b2-a869-70587f7e8fac.json')
  fs.writeFileSync(dupe, fs.readFileSync(src))
  t.teardown(() => rimraf(dupe))
  const pdb = new ProcessDB(dir)
  t.throws(() => pdb.writeIndex())
  t.end()
})

t.test('readProcessInfos', t => {
  // put a borked json in there just for funsies
  const bad = path.resolve(dir, 'gleepglorp.json')
  fs.writeFileSync(bad, 'this is not json, it is bad')
  t.teardown(() => rimraf(bad))

  const pdb = new ProcessDB(dir)
  t.matchSnapshot(pdb.readProcessInfos())
  t.end()
})

t.test('buildProcessTree with invalid index', t => {
  const pdb = new ProcessDB(dir)
  t.teardown(() => pdb.writeIndex())

  const idx = pdb.readIndex()
  idx.processes.fleepflorp = { what: 'that mean' }
  const json = JSON.stringify(idx)
  fs.writeFileSync(path.resolve(dir, 'index.json'), json)

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

  const pdb = new ProcessDB(dir)

  t.matchSnapshot(pdb.renderTree(nyc), 'render the tree')
  t.matchSnapshot(pdb.getCoverageMap(), 'coverage map after render')
  t.matchSnapshot(pdb.label, 'label after render')
  t.end()
})

t.test('spawn', async t => {
  const tempDir = __dirname + '/fixtures/.nyc_output'
  const esc = path.resolve('escape.sh')
  t.teardown(() => rimraf(esc))
  fs.writeFileSync(esc, `#!/bin/bash
nyc --show-process-tree --clean=false --temp-dir=${tempDir} "$@"
`)
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

  const node = process.execPath

  const pdb = new ProcessDB(dir)

  await new Promise(res => {
    const c = pdb.spawn('named test', '/bin/bash', [esc, node, ok])
    c.on('close', (code, signal) => {
      t.equal(code, 0)
      t.equal(signal, null)
      res()
    })
  })

  // got the named test in there
  t.match(pdb.writeIndex(), { externalIds: { 'named test': Object } })
  // expunges
  pdb.spawnSync('named test', '/bin/bash', [esc, node, ok])
  t.match(pdb.writeIndex(), { externalIds: { 'named test': Object } })
  pdb.expunge('named test')
  t.notMatch(pdb.writeIndex(), { externalIds: { 'named test': Object } })

  // with the auto-index-rewriting
  await new Promise(res => {
    const c = pdb.spawn('named test', '/bin/bash', [esc, node, ok], {
      regenerateIndex: true
    })
    c.on('close', (code, signal) => {
      t.equal(code, 0)
      t.equal(signal, null)
      res()
    })
  })

  // got the named test in there
  t.match(pdb.readIndex(), { externalIds: { 'named test': Object } })
  // expunges
  pdb.spawnSync('named test', '/bin/bash', [esc, node, ok], {
    regenerateIndex: true
  })
  t.match(pdb.readIndex(), { externalIds: { 'named test': Object } })
  pdb.expunge('named test')
  t.notMatch(pdb.writeIndex(), { externalIds: { 'named test': Object } })
})

t.test('spawn args parsing', t => {
  const _spawnArgs = Symbol.for('spawnArgs')
  const sa = ProcessDB.prototype[_spawnArgs]
  t.match(sa('name', 'file', {some:'options'}), ['name', 'file', [], {some:'options'}])
  t.match(sa('name', 'file'), ['name', 'file', [], {}])
  t.end()
})
