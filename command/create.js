const download = require('download-git-repo')
const { prompt } = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')

var question = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'Please input module name:',
    validate(val) {
      if(val === ''){
        return 'Module name is required'
      }
      return true
    }
  }
]

module.exports = prompt(question).then(({moduleName}) => {

  //模块存在
  if (fs.existsSync(`./modules/src/${moduleName}`)) {
    console.log(chalk.red(`Module '${moduleName}' exists!`))
    process.exit()
  }

  const spinner = ora('Downloading template...')
  
  spinner.start()
  download(`VikiLee/module_template#master`, `./modules/src/${moduleName}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New module has been created successfully!'))
  })
})