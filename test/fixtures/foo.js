if (process.env.FOO !== 'bar') {
  console.log('true is truthy')
  require('child_process').spawn(process.execPath, [require.resolve('./bar.js')], {
    stdio: 'inherit'
  })
} else {
  require('child_process').spawn(process.execPath, ['bar.js'], {
    stdio: 'inherit',
    cwd: __dirname,
  })
}
