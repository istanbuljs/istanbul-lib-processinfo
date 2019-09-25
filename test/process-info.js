const t = require('tap')
const {ProcessInfo} = require('../')
const uuidRe = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/
const NYC = require('nyc')
const rimraf = require('rimraf').sync
const fs = require('fs')
const path = require('path')

t.test('basic creation', t => {
  const pi = new ProcessInfo({
    foo: 'bar',
    directory: '/some/path',
    time: 1234,
    cwd: '/some/cwd',
    pid: 420,
    ppid: 69,
    externalId: 'florp',
    execArgv: [1,2,3],
    argv: ['a','b','c'],
    uuid: 'a universally unique identifier',
    nodes: [4,2,0],
  })
  t.matchSnapshot(pi)
  t.same(pi.nodes, [4, 2, 0])
  t.equal(pi.directory, path.resolve('/some/path'))
  t.equal(pi.label, 'a b c')
  t.equal(pi.label, 'a b c', 'second time to cover memoization')
  t.match(new ProcessInfo().uuid, uuidRe)
  t.end()
})

t.test('saveSync', t => {
  const file = __dirname + '/fixtures/.nyc_output/processinfo/blerg.json'
  t.teardown(() => rimraf(file))

  const pi = new ProcessInfo({
    directory: __dirname + '/fixtures/.nyc_output/processinfo',
    uuid: 'blerg',
  })

  pi.saveSync()

  t.match(pi, JSON.parse(fs.readFileSync(file, 'utf8')))
  t.end()
})

t.test('save', async t => {
  const file = __dirname + '/fixtures/.nyc_output/processinfo/blerg.json'
  t.teardown(() => rimraf(file))

  const pi = new ProcessInfo({
    directory: __dirname + '/fixtures/.nyc_output/processinfo',
    uuid: 'blerg',
  })

  await pi.save()

  t.match(pi, JSON.parse(fs.readFileSync(file, 'utf8')))
})

t.test('nyc stuff', async t => {
  const nyc = new NYC({
    tempDir: __dirname + '/fixtures/.nyc_output',
    cwd: path.resolve(__dirname + '/..'),
  })

  const uuid = '625ef291-93c0-40b2-a869-70587f7e8fac'
  const cuuid = '62c33964-203a-4e6a-b1ff-8a046eeb8912'
  const file = `${__dirname}/fixtures/.nyc_output/processinfo/${uuid}.json`
  const child = `${__dirname}/fixtures/.nyc_output/processinfo/${cuuid}.json`
  const pi = new ProcessInfo(Object.assign(
    JSON.parse(fs.readFileSync(file, 'utf8')),
    {nodes: [
      new ProcessInfo(JSON.parse(fs.readFileSync(child, 'utf8')))
    ]}))
  const cm = await pi.getCoverageMap(nyc)
  t.matchSnapshot(cm)
  const cm2 = await pi.getCoverageMap(nyc)
  t.match(cm2, cm)

  t.matchSnapshot(pi.label)
})
