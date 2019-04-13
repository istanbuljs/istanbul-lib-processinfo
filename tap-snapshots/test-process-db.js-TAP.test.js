/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/process-db.js TAP writing and reading index > undefined 1`] = `
Object {
  "processes": Object {
    "0f4e28ea-5b03-4677-8c0d-263e81b42f7e": Object {
      "parent": null,
      "externalId": "root process",
      "children": Array [
        "300fc62b-eaf2-4505-981b-39567e807f94",
        "625ef291-93c0-40b2-a869-70587f7e8fac",
      ],
    },
    "300fc62b-eaf2-4505-981b-39567e807f94": Object {
      "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
      "children": Array [],
    },
    "625ef291-93c0-40b2-a869-70587f7e8fac": Object {
      "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
      "externalId": "named foo",
      "children": Array [
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
    },
    "62c33964-203a-4e6a-b1ff-8a046eeb8912": Object {
      "parent": "625ef291-93c0-40b2-a869-70587f7e8fac",
      "children": Array [],
    },
  },
  "files": Object {
    "test/fixtures/foo.js": Array [
      "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
      "625ef291-93c0-40b2-a869-70587f7e8fac",
    ],
    "test/fixtures/bar.js": Array [
      "300fc62b-eaf2-4505-981b-39567e807f94",
      "62c33964-203a-4e6a-b1ff-8a046eeb8912",
    ],
  },
  "externalIds": Object {
    "root process": Object {
      "root": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
      "children": Array [
        "300fc62b-eaf2-4505-981b-39567e807f94",
        "625ef291-93c0-40b2-a869-70587f7e8fac",
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
    },
    "named foo": Object {
      "root": "625ef291-93c0-40b2-a869-70587f7e8fac",
      "children": Array [
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
    },
  },
}
`

exports[`test/process-db.js TAP readProcessInfos > undefined 1`] = `
Object {
  "0f4e28ea-5b03-4677-8c0d-263e81b42f7e": ProcessInfo {
    "uuid": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    "parent": null,
    "pid": 60876,
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/foo.test.js",
    ],
    "execArgv": Array [],
    "cwd": "test/fixtures",
    "time": 1555110275928,
    "ppid": 60875,
    "root": "de75ec1f-158d-4a45-bb19-525c293ce4bd",
    "coverageFilename": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e.json",
    "files": Array [
      "test/fixtures/foo.js",
    ],
    "externalId": "root process",
  },
  "300fc62b-eaf2-4505-981b-39567e807f94": ProcessInfo {
    "uuid": "300fc62b-eaf2-4505-981b-39567e807f94",
    "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    "pid": 60877,
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/bar.js",
    ],
    "execArgv": Array [],
    "cwd": "test/fixtures",
    "time": 1555110276283,
    "ppid": 60876,
    "root": "de75ec1f-158d-4a45-bb19-525c293ce4bd",
    "coverageFilename": "300fc62b-eaf2-4505-981b-39567e807f94.json",
    "files": Array [
      "test/fixtures/bar.js",
    ],
    "externalId": "",
  },
  "625ef291-93c0-40b2-a869-70587f7e8fac": ProcessInfo {
    "uuid": "625ef291-93c0-40b2-a869-70587f7e8fac",
    "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    "pid": 60878,
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/foo.js",
    ],
    "execArgv": Array [],
    "cwd": "test/fixtures",
    "time": 1555110276382,
    "ppid": 60876,
    "root": "de75ec1f-158d-4a45-bb19-525c293ce4bd",
    "coverageFilename": "625ef291-93c0-40b2-a869-70587f7e8fac.json",
    "externalId": "named foo",
    "files": Array [
      "test/fixtures/foo.js",
    ],
  },
  "62c33964-203a-4e6a-b1ff-8a046eeb8912": ProcessInfo {
    "uuid": "62c33964-203a-4e6a-b1ff-8a046eeb8912",
    "parent": "625ef291-93c0-40b2-a869-70587f7e8fac",
    "pid": 60879,
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/bar.js",
    ],
    "execArgv": Array [],
    "cwd": "test/fixtures",
    "time": 1555110276750,
    "ppid": 60878,
    "root": "de75ec1f-158d-4a45-bb19-525c293ce4bd",
    "coverageFilename": "62c33964-203a-4e6a-b1ff-8a046eeb8912.json",
    "files": Array [
      "test/fixtures/bar.js",
    ],
    "externalId": "",
  },
}
`

exports[`test/process-db.js TAP render process tree > undefined 1`] = `
nyc
└─┬ /usr/local/bin/node test/fixtures/foo.test.js
  │   71.43 % Lines
  ├── /usr/local/bin/node test/fixtures/bar.js
  │     66.67 % Lines
  └─┬ /usr/local/bin/node test/fixtures/foo.js
    │   71.43 % Lines
    └── /usr/local/bin/node test/fixtures/bar.js
          66.67 % Lines

`
