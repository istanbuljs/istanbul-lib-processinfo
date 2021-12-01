/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/process-info.js TAP basic creation > must match snapshot 1`] = `
ProcessInfo {
  "argv": Array [
    "a",
    "b",
    "c",
  ],
  "coverageFilename": null,
  "cwd": "/some/cwd",
  "execArgv": Array [
    1,
    2,
    3,
  ],
  "externalId": "florp",
  "foo": "bar",
  "parent": null,
  "pid": 420,
  "ppid": 69,
  "time": 1234,
  "uuid": "a universally unique identifier",
}
`

exports[`test/process-info.js TAP nyc stuff > must match snapshot 1`] = `
CoverageMap {
  "data": Null Object {
    "test/fixtures/bar.js": FileCoverage {
      "data": Object {
        "_coverageSchema": "43e27e138ebf9cfc5966b082cf9a028302ed4184",
        "b": Object {
          "0": Array [
            1,
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
          "0": 1,
          "1": 1,
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
            1,
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
          "0": 1,
          "1": 1,
          "2": 1,
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

exports[`test/process-info.js TAP nyc stuff > must match snapshot 2`] = `
/usr/local/bin/node test/fixtures/foo.js
  71.42 % Lines
`
