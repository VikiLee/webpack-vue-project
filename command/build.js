
const { prompt } = require('inquirer')
const exec = require('child_process').exec
const chalk = require('chalk')
const ora = require('ora')

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
  const spinner = ora(`Building ${module}...`)
  
  spinner.start()

  var child = exec(`node ./build/build.js ${module}`)
  child.stdout.on('data', (data) => {
    console.log('stdout: ' + data)
  })

  child.stderr.on('data', function(err) {
    console.log(chalk.red(`\n building ${module} error`))
    console.log(chalk.red(err))
    process.exit()
  })

  child.on('close', function(code) {
    spinner.stop()
    console.log(chalk.green('\n √ Build completed!'))    
  })
})