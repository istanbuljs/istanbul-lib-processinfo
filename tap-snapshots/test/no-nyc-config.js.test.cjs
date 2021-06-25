/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/no-nyc-config.js TAP spawnArgs from outside nyc > must match snapshot 1`] = `
Array [
  "has an nyc",
  "/path/to/nyc",
  Array [
    "--clean=false",
    "node",
    "ok.js",
  ],
  Object {
    "env": Object {
      "NYC_PROCESSINFO_EXTERNAL_ID": "has an nyc",
      "x": "y",
    },
    "nyc": "/path/to/nyc",
    "nycArgs": Array [
      "--clean=false",
    ],
  },
]
`

exports[`test/no-nyc-config.js TAP spawnArgs from outside nyc > must match snapshot 2`] = `
Array [
  "has no nyc",
  "nyc",
  Array [
    "node",
    "ok.js",
  ],
  Object {
    "env": Object {
      "NYC_PROCESSINFO_EXTERNAL_ID": "has no nyc",
      "x": "y",
    },
  },
]
`
