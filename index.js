'use strict'
const uuid = require('uuid/v4')
const archy = require('archy')
const libCoverage = require('istanbul-lib-coverage')
const {basename, dirname, resolve} = require('path')
const fs = require('fs')
const {spawn, sync: spawnSync} = require('cross-spawn')
const rimraf = require('rimraf').sync
const mkdirp = require('make-dir').sync

const _nodes = Symbol('nodes')
const _label = Symbol('label')
const _coverageMap = Symbol('coverageMap')
const _processInfoDirectory = Symbol('processInfo.directory')
// shared symbol for testing
const _spawnArgs = Symbol.for('spawnArgs')

// the enumerable fields
const defaults = () => ({
  parent: null,
  pid: process.pid,
  argv: process.argv,
  execArgv: process.execArgv,
  cwd: process.cwd(),
  time: Date.now(),
  ppid: process.ppid,
  coverageFilename: null,
  externalId: '',
  [_nodes]: [],
  [_label]: null,
  [_coverageMap]: null
})

class ProcessInfo {
  constructor (fields = {}) {
    Object.assign(this, defaults(), fields)

    if (!this.uuid) {
      this.uuid = uuid()
    }
  }

  get nodes () {
    return this[_nodes]
  }

  set nodes (n) {
    this[_nodes] = n
  }

  set directory (d) {
    this[_processInfoDirectory] = resolve(d)
  }

  get directory () {
    return this[_processInfoDirectory]
  }

  save () {
    const f = resolve(this.directory, this.uuid + '.json')
    fs.writeFileSync(f, JSON.stringify(this), 'utf-8')
  }

  getCoverageMap (nyc) {
    if (this[_coverageMap]) {
      return this[_coverageMap]
    }

    const childMaps = this.nodes.map(child => child.getCoverageMap(nyc))

    this[_coverageMap] = mapMerger(nyc, [this.coverageFilename], childMaps)

    return this[_coverageMap]
  }

  get label () {
    if (this[_label]) {
      return this[_label]
    }

    const covInfo = this[_coverageMap]
      ? '\n  ' + this[_coverageMap].getCoverageSummary().lines.pct + ' % Lines'
      : ''

    return this[_label] = this.argv.join(' ') + covInfo
  }
}

const mapMerger = (nyc, filenames, maps) => {
  const map = libCoverage.createCoverageMap({})
  nyc.eachReport(filenames, report => map.merge(report))
  maps.forEach(otherMap => map.merge(otherMap))
  return map
}

// Operations on the processinfo database as a whole,
// and the root of the tree rendering operation.
class ProcessDB {
  constructor (directory) {
    if (!directory) {
      const nycConfig = process.env.NYC_CONFIG;
      if (nycConfig) {
        directory = resolve(JSON.parse(nycConfig).tempDir, 'processinfo')
      }

      if (!directory) {
        throw new TypeError('must provide directory argument when outside of NYC')
      }
    }

    mkdirp(directory)
    Object.defineProperty(this, 'directory', { get: () => directory, enumerable: true })
    this.nodes = []
    this[_label] = null
    this[_coverageMap] = null
  }

  get label () {
    if (this[_label]) {
      return this[_label]
    }

    const covInfo = this[_coverageMap]
      ? '\n  ' + this[_coverageMap].getCoverageSummary().lines.pct + ' % Lines'
      : ''

    return this[_label] = 'nyc' + covInfo
  }

  getCoverageMap (nyc) {
    if (this[_coverageMap]) {
      return this[_coverageMap]
    }

    const childMaps = this.nodes.map(child => child.getCoverageMap(nyc))
    this[_coverageMap] = mapMerger(nyc, [], childMaps)
    return this[_coverageMap]
  }

  renderTree (nyc) {
    this.buildProcessTree()
    this.getCoverageMap(nyc)

    return archy(this)
  }

  buildProcessTree () {
    const infos = this.readProcessInfos(this.directory)
    const index = this.readIndex()
    for (const id in index.processes) {
      const node = infos[id]
      if (!node) {
        throw new Error(`Invalid entry in processinfo index: ${id}`)
      }
      const idx = index.processes[id]
      node.nodes = idx.children.map(id => infos[id])
        .sort((a, b) => a.time - b.time)
      if (!node.parent) {
        this.nodes.push(node)
      }
    }
  }

  readProcessInfos () {
    return fs.readdirSync(this.directory).filter(f => f !== 'index.json').map(f => {
      let data
      try {
        data = JSON.parse(fs.readFileSync(resolve(this.directory, f), 'utf-8'))
      } catch (e) { // handle corrupt JSON output.
        return null
      }
      data.nodes = []
      data = new ProcessInfo(data)
      const file = basename(f, '.json')
      return { file, data }
    }).filter(Boolean).reduce((infos, {file, data}) => {
      infos[file] = data
      return infos
    }, {})
  }

  writeIndex () {
    const {directory} = this
    const pidToUid = new Map()
    const infoByUid = new Map()
    const eidToUid = new Map()
    const infos = fs.readdirSync(directory).filter(f => f !== 'index.json').map(f => {
      try {
        const info = JSON.parse(fs.readFileSync(resolve(directory, f), 'utf-8'))
        info.children = []
        pidToUid.set(info.uuid, info.pid)
        pidToUid.set(info.pid, info.uuid)
        infoByUid.set(info.uuid, info)
        if (info.externalId) {
          eidToUid.set(info.externalId, info.uuid)
        }
        return info
      } catch (er) {
        return null
      }
    }).filter(Boolean)

    // create all the parent-child links
    infos.forEach(info => {
      if (info.parent) {
        const parentInfo = infoByUid.get(info.parent)
        if (parentInfo && !parentInfo.children.includes(info.uuid)) {
          parentInfo.children.push(info.uuid)
        }
      }
    })

    // figure out which files were touched by each process.
    const files = infos.reduce((files, info) => {
      info.files.forEach(f => {
        files[f] = files[f] || []
        if (!files[f].includes(info.uuid)) {
          files[f].push(info.uuid)
        }
      })
      return files
    }, {})

    // build the actual index!
    const index = infos.reduce((index, info) => {
      index.processes[info.uuid] = {
        parent: info.parent
      }
      if (info.externalId) {
        if (index.externalIds[info.externalId]) {
          throw new Error(
            `External ID ${info.externalId} used by multiple processes`)
        }
        index.processes[info.uuid].externalId = info.externalId
        index.externalIds[info.externalId] = {
          root: info.uuid,
          children: info.children
        }
      }
      index.processes[info.uuid].children = Array.from(info.children)
      return index
    }, { processes: {}, files: files, externalIds: {} })

    // flatten the descendant sets of all the externalId procs
    Object.values(index.externalIds).forEach(({children}) => {
      // push the next generation onto the list so we accumulate them all
      for (let i = 0; i < children.length; i++) {
        const nextGen = index.processes[children[i]].children
        if (nextGen && nextGen.length) {
          children.push(...nextGen.filter(uuid => !children.includes(uuid)))
        }
      }
    })

    const indexFile = resolve(directory, 'index.json')
    fs.writeFileSync(indexFile, JSON.stringify(index))

    return index
  }

  readIndex () {
    try {
      return JSON.parse(fs.readFileSync(resolve(this.directory, 'index.json'), 'utf-8'))
    } catch (e) {
      return this.writeIndex()
    }
  }

  // delete all coverage and processinfo for a given process
  // Warning!  Doing this makes the index out of date, so make sure
  // to update it when you're done!
  // Not multi-process safe, because it cannot be done atomically.
  expunge (id) {
    const index = this.readIndex()
    const entry = index.externalIds[id]
    if (!entry) {
      return
    }
    rimraf(`${dirname(this.directory)}/${entry.root}.json`)
    rimraf(`${this.directory}/${entry.root}.json`)
    entry.children.forEach(c => {
      rimraf(`${dirname(this.directory)}/${c}.json`)
      rimraf(`${this.directory}/${c}.json`)
    })
  }

  [_spawnArgs] (name, file, args, options) {
    if (!Array.isArray(args)) {
      options = args
      args = []
    }
    if (!options) {
      options = {}
    }

    if (!process.env.NYC_CONFIG) {
      const nyc = options.nyc || 'nyc'
      const nycArgs = options.nycArgs || []
      args = [...nycArgs, file, ...args]
      file = nyc
    }

    options.env = {
      ...(options.env || process.env),
      NYC_PROCESSINFO_EXTERNAL_ID: name
    }

    return [name, file, args, options]
  }

  // spawn an externally named process
  spawn (...spawnArgs) {
    const [name, file, args, options] = this[_spawnArgs](...spawnArgs)
    this.expunge(name)
    const proc = spawn(file, args, options)

    if (options.regenerateIndex) {
      proc.on('close', () => this.writeIndex())
    }

    return proc
  }

  spawnSync (...spawnArgs) {
    const [name, file, args, options] = this[_spawnArgs](...spawnArgs)
    this.expunge(name)
    const proc = spawnSync(file, args, options)

    if (options.regenerateIndex) {
      this.writeIndex()
    }

    return proc
  }
}

exports.ProcessDB = ProcessDB
exports.ProcessInfo = ProcessInfo
