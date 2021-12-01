/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/process-db.js TAP readProcessInfos > must match snapshot 1`] = `
Object {
  "0f4e28ea-5b03-4677-8c0d-263e81b42f7e": ProcessInfo {
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/foo.test.js",
    ],
    "coverageFilename": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e.json",
    "cwd": "test/fixtures",
    "execArgv": Array [],
    "externalId": "root process",
    "files": Array [
      "test/fixtures/foo.js",
    ],
    "parent": null,
    "pid": 60876,
    "ppid": 60875,
    "time": 1555110275928,
    "uuid": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
  },
  "300fc62b-eaf2-4505-981b-39567e807f94": ProcessInfo {
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/bar.js",
    ],
    "coverageFilename": "300fc62b-eaf2-4505-981b-39567e807f94.json",
    "cwd": "test/fixtures",
    "execArgv": Array [],
    "externalId": "",
    "files": Array [
      "test/fixtures/bar.js",
    ],
    "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    "pid": 60877,
    "ppid": 60876,
    "time": 1555110276283,
    "uuid": "300fc62b-eaf2-4505-981b-39567e807f94",
  },
  "625ef291-93c0-40b2-a869-70587f7e8fac": ProcessInfo {
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/foo.js",
    ],
    "coverageFilename": "625ef291-93c0-40b2-a869-70587f7e8fac.json",
    "cwd": "test/fixtures",
    "execArgv": Array [],
    "externalId": "named foo",
    "files": Array [
      "test/fixtures/foo.js",
    ],
    "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    "pid": 60878,
    "ppid": 60876,
    "time": 1555110276382,
    "uuid": "625ef291-93c0-40b2-a869-70587f7e8fac",
  },
  "62c33964-203a-4e6a-b1ff-8a046eeb8912": ProcessInfo {
    "argv": Array [
      "/usr/local/bin/node",
      "test/fixtures/bar.js",
    ],
    "coverageFilename": "62c33964-203a-4e6a-b1ff-8a046eeb8912.json",
    "cwd": "test/fixtures",
    "execArgv": Array [],
    "externalId": "",
    "files": Array [
      "test/fixtures/bar.js",
    ],
    "parent": "625ef291-93c0-40b2-a869-70587f7e8fac",
    "pid": 60879,
    "ppid": 60878,
    "time": 1555110276750,
    "uuid": "62c33964-203a-4e6a-b1ff-8a046eeb8912",
  },
}
`

exports[`test/process-db.js TAP render process tree > coverage map after render 1`] = `
CoverageMap {
  "data": Null Object {
    "test/fixtures/bar.js": FileCoverage {
      "data": Object {
        "_coverageSchema": "43e27e138ebf9cfc5966b082cf9a028302ed4184",
        "b": Object {
          "0": Array [
            2,
            0,
          ],
        },
        "branchMap": Object {
          "0": Object {
            "line": 1,
            "loc": Object {
              "end": Object {
                "column": 1,
                "line": 5,
              },
              "start": Object {
                "column": 0,
                "line": 1,
              },
            },
            "locations": Array [
              Object {
                "end": Object {
                  "column": 1,
                  "line": 5,
                },
                "start": Object {
                  "column": 0,
                  "line": 1,
                },
              },
              Object {
                "end": Object {
                  "column": 1,
                  "line": 5,
                },
                "start": Object {
                  "column": 0,
                  "line": 1,
                },
              },
            ],
            "type": "if",
          },
        },
        "contentHash": "7951eed4c89fa9c43d3583a66380b2c01bc6484cb7d88c25b32378ee5fd021e0",
        "f": Object {},
        "fnMap": Object {},
        "hash": "08207f2d4d7fc4645a4a76ff07632e061da28a55",
        "path": "test/fixtures/bar.js",
        "s": Object {
          "0": 2,
          "1": 2,
          "2": 0,
        },
        "statementMap": Object {
          "0": Object {
            "end": Object {
              "column": 1,
              "line": 5,
            },
            "start": Object {
              "column": 0,
              "line": 1,
            },
          },
          "1": Object {
            "end": Object {
              "column": 32,
              "line": 2,
            },
            "start": Object {
              "column": 2,
              "line": 2,
            },
          },
          "2": Object {
            "end": Object {
              "column": 38,
              "line": 4,
            },
            "start": Object {
              "column": 2,
              "line": 4,
            },
          },
        },
      },
    },
    "test/fixtures/foo.js": FileCoverage {
      "data": Object {
        "_coverageSchema": "43e27e138ebf9cfc5966b082cf9a028302ed4184",
        "b": Object {
          "0": Array [
            2,
            0,
          ],
        },
        "branchMap": Object {
          "0": Object {
            "line": 1,
            "loc": Object {
              "end": Object {
                "column": 1,
                "line": 11,
              },
              "start": Object {
                "column": 0,
                "line": 1,
              },
            },
            "locations": Array [
              Object {
                "end": Object {
                  "column": 1,
                  "line": 11,
                },
                "start": Object {
                  "column": 0,
                  "line": 1,
                },
              },
              Object {
                "end": Object {
                  "column": 1,
                  "line": 11,
                },
                "start": Object {
                  "column": 0,
                  "line": 1,
                },
              },
            ],
            "type": "if",
          },
        },
        "contentHash": "28f728352972e76f26e4de0e59bf96c0134868d6fff542168fe24690b0bb034b",
        "f": Object {},
        "fnMap": Object {},
        "hash": "db8b7aa31bb6299efc0f6dbe709b0adc75d2e0d5",
        "path": "test/fixtures/foo.js",
        "s": Object {
          "0": 2,
          "1": 2,
          "2": 2,
          "3": 0,
        },
        "statementMap": Object {
          "0": Object {
            "end": Object {
              "column": 1,
              "line": 11,
            },
            "start": Object {
              "column": 0,
              "line": 1,
            },
          },
          "1": Object {
            "end": Object {
              "column": 31,
              "line": 2,
            },
            "start": Object {
              "column": 2,
              "line": 2,
            },
          },
          "2": Object {
            "end": Object {
              "column": 4,
              "line": 5,
            },
            "start": Object {
              "column": 2,
              "line": 3,
            },
          },
          "3": Object {
            "end": Object {
              "column": 4,
              "line": 10,
            },
            "start": Object {
              "column": 2,
              "line": 7,
            },
          },
        },
      },
    },
  },
}
`

exports[`test/process-db.js TAP render process tree > label after render 1`] = `
nyc
  71.42 % Lines
`

exports[`test/process-db.js TAP render process tree > render the tree 1`] = `
nyc
│   71.42 % Lines
└─┬ /usr/local/bin/node test/fixtures/foo.test.js
  │   71.42 % Lines
  ├── /usr/local/bin/node test/fixtures/bar.js
  │     66.66 % Lines
  └─┬ /usr/local/bin/node test/fixtures/foo.js
    │   71.42 % Lines
    └── /usr/local/bin/node test/fixtures/bar.js
          66.66 % Lines

`

exports[`test/process-db.js TAP writing and reading index > must match snapshot 1`] = `
Object {
  "externalIds": Object {
    "named foo": Object {
      "children": Array [
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
      "root": "625ef291-93c0-40b2-a869-70587f7e8fac",
    },
    "root process": Object {
      "children": Array [
        "300fc62b-eaf2-4505-981b-39567e807f94",
        "625ef291-93c0-40b2-a869-70587f7e8fac",
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
      "root": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    },
  },
  "files": Object {
    "test/fixtures/bar.js": Array [
      "300fc62b-eaf2-4505-981b-39567e807f94",
      "62c33964-203a-4e6a-b1ff-8a046eeb8912",
    ],
    "test/fixtures/foo.js": Array [
      "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
      "625ef291-93c0-40b2-a869-70587f7e8fac",
    ],
  },
  "processes": Object {
    "0f4e28ea-5b03-4677-8c0d-263e81b42f7e": Object {
      "children": Array [
        "300fc62b-eaf2-4505-981b-39567e807f94",
        "625ef291-93c0-40b2-a869-70587f7e8fac",
      ],
      "externalId": "root process",
      "parent": null,
    },
    "300fc62b-eaf2-4505-981b-39567e807f94": Object {
      "children": Array [],
      "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    },
    "625ef291-93c0-40b2-a869-70587f7e8fac": Object {
      "children": Array [
        "62c33964-203a-4e6a-b1ff-8a046eeb8912",
      ],
      "externalId": "named foo",
      "parent": "0f4e28ea-5b03-4677-8c0d-263e81b42f7e",
    },
    "62c33964-203a-4e6a-b1ff-8a046eeb8912": Object {
      "children": Array [],
      "parent": "625ef291-93c0-40b2-a869-70587f7e8fac",
    },
  },
}
`
