/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/no-nyc-config.js TAP spawnArgs from outside nyc > undefined 1`] = `
[
  "has an nyc",
  "/path/to/nyc",
  [
    "--clean=false",
    "node",
    "ok.js"
  ],
  {
    "nyc": "/path/to/nyc",
    "nycArgs": [
      "--clean=false"
    ],
    "env": {
      "x": "y",
      "NYC_PROCESSINFO_EXTERNAL_ID": "has an nyc"
    }
  }
]
`

exports[`test/no-nyc-config.js TAP spawnArgs from outside nyc > undefined 2`] = `
[
  "has no nyc",
  "nyc",
  [
    "node",
    "ok.js"
  ],
  {
    "env": {
      "x": "y",
      "NYC_PROCESSINFO_EXTERNAL_ID": "has no nyc"
    }
  }
]
`
