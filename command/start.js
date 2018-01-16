const exec = require('child_process').exec
const { prompt } = require('inquirer')
const chalk = require('chalk')

const question = [
  {
    type: 'input',
    name: 'module',
    message: 'Module name:',
    validate (val) {
      if (val === '') {
        return 'Module name is required!'
      } 
      return true
    }

  }
]

module.exports = prompt(question).then(({module}) => {
  let cmdStr = `node ./build/dev-server.js ${module}`
  var child = exec(cmdStr)
  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data)
  })
  child.stderr.on('data', function(err) {
    console.log(err)
    process.exit()
  })
  // exec(cmdStr, (err, std, stderr) => {
  //   if(err) {
  //     console.log(err)
  //     process.exit()
  //   }
  //   console.log(std)
  // })
})
