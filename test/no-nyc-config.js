process.env.NYC_CONFIG = ''

const {ProcessDB, ProcessInfo} = require('../')

const path = require('path')
const t = require('tap')

t.throws(() => new ProcessDB(),
  new TypeError('must provide dir argument when outside of NYC'))

t.equal(new ProcessInfo().processInfoDirectory,
  path.resolve('.nyc_output', 'processinfo'))
