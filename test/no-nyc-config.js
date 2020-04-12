'use strict'
process.env.NYC_CONFIG = ''

const {ProcessDB, ProcessInfo} = require('../')

const path = require('path')
const t = require('tap')
const fs = require('fs')
const rimraf = require('rimraf').sync

t.throws(() => new ProcessDB(),
  new TypeError('must provide directory argument when outside of NYC'))

t.equal(new ProcessInfo().directory, undefined)

t.test('spawnArgs from outside nyc', t => {
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
  t.end()
})
