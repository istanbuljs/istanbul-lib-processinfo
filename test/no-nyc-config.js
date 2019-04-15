process.env.NYC_CONFIG = ''

const {ProcessDB, ProcessInfo} = require('../')

const path = require('path')
const t = require('tap')
const fs = require('fs')
const rimraf = require('rimraf').sync

t.throws(() => new ProcessDB(),
  new TypeError('must provide dir argument when outside of NYC'))

t.equal(new ProcessInfo().processInfoDirectory,
  path.resolve('.nyc_output', 'processinfo'))

t.test('spawnArgs from outside nyc', async t => {
  const _spawnArgs = Symbol.for('spawnArgs')
  const dir = path.resolve(__dirname, 'fixtures/.nyc_output/processinfo')
  const pdb = new ProcessDB(dir)
  t.matchSnapshot(pdb[_spawnArgs]('has an nyc', 'node', ['ok.js'], {
    nyc: '/path/to/nyc',
    nycArgs: ['--clean=false'],
    env: { x: 'y' },
  }))
  t.matchSnapshot(pdb[_spawnArgs]('has no nyc', 'node', ['ok.js'], {
    env: { x: 'y' },
  }))
})
