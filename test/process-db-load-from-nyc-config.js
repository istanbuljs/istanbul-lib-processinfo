'use strict'
process.env.NYC_CONFIG = JSON.stringify({
  tempDir: process.cwd()
})

const {ProcessDB} = require('../')

const t = require('tap')
const path = require('path')

t.equal(new ProcessDB().directory, path.resolve('processinfo'))
