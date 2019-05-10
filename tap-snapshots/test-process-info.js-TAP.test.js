/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/process-info.js TAP basic creation > undefined 1`] = `
{
  "foo": "bar",
  "time": 1234,
  "cwd": "/some/cwd",
  "pid": 420,
  "ppid": 69,
  "externalId": "florp",
  "execArgv": [
    1,
    2,
    3
  ],
  "argv": [
    "a",
    "b",
    "c"
  ],
  "uuid": "a universally unique identifier",
  "parent": null,
  "coverageFilename": null
}
`

exports[`test/process-info.js TAP nyc stuff > undefined 1`] = `
{
  "test/fixtures/foo.js": {
    "path": "test/fixtures/foo.js",
    "statementMap": {
      "0": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 11,
          "column": 1
        }
      },
      "1": {
        "start": {
          "line": 2,
          "column": 2
        },
        "end": {
          "line": 2,
          "column": 31
        }
      },
      "2": {
        "start": {
          "line": 3,
          "column": 2
        },
        "end": {
          "line": 5,
          "column": 4
        }
      },
      "3": {
        "start": {
          "line": 7,
          "column": 2
        },
        "end": {
          "line": 10,
          "column": 4
        }
      }
    },
    "fnMap": {},
    "branchMap": {
      "0": {
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 1
          }
        },
        "type": "if",
        "locations": [
          {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 1
            }
          },
          {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 1
            }
          }
        ],
        "line": 1
      }
    },
    "s": {
      "0": 1,
      "1": 1,
      "2": 1,
      "3": 0
    },
    "f": {},
    "b": {
      "0": [
        1,
        0
      ]
    },
    "_coverageSchema": "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    "hash": "db8b7aa31bb6299efc0f6dbe709b0adc75d2e0d5",
    "contentHash": "28f728352972e76f26e4de0e59bf96c0134868d6fff542168fe24690b0bb034b"
  },
  "test/fixtures/bar.js": {
    "path": "test/fixtures/bar.js",
    "statementMap": {
      "0": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 5,
          "column": 1
        }
      },
      "1": {
        "start": {
          "line": 2,
          "column": 2
        },
        "end": {
          "line": 2,
          "column": 32
        }
      },
      "2": {
        "start": {
          "line": 4,
          "column": 2
        },
        "end": {
          "line": 4,
          "column": 38
        }
      }
    },
    "fnMap": {},
    "branchMap": {
      "0": {
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 1
          }
        },
        "type": "if",
        "locations": [
          {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 1
            }
          },
          {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 1
            }
          }
        ],
        "line": 1
      }
    },
    "s": {
      "0": 1,
      "1": 1,
      "2": 0
    },
    "f": {},
    "b": {
      "0": [
        1,
        0
      ]
    },
    "_coverageSchema": "43e27e138ebf9cfc5966b082cf9a028302ed4184",
    "hash": "08207f2d4d7fc4645a4a76ff07632e061da28a55",
    "contentHash": "7951eed4c89fa9c43d3583a66380b2c01bc6484cb7d88c25b32378ee5fd021e0"
  }
}
`

exports[`test/process-info.js TAP nyc stuff > undefined 2`] = `
/usr/local/bin/node test/fixtures/foo.js
  71.43 % Lines
`
