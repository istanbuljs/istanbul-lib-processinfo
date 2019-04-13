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

  t.matchSnapshot(pdb.renderTree(nyc))
  t.end()
})
