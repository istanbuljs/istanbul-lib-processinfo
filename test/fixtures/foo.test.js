console.log(process.env.NYC_CONFIG)
require('./foo.js')
// require('child_process').spawn(process.execPath, [require.resolve('./foo.js')], {
//   stdio: 'inherit'
// })

const {ProcessDB} = require('../istanbul-lib-processinfo')
const pdb = new ProcessDB()
pdb.spawn('named foo', process.execPath, ['foo.js'], {
  stdio: 'inherit'
})
