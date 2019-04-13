process.env.NYC_CONFIG = JSON.stringify({
  tempDir: process.cwd()
})

const {ProcessDB} = require('../')

const t = require('tap')
const path = require('path')

t.equal(new ProcessDB().dir, path.resolve('processinfo'))
