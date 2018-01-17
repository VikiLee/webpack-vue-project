const { prompt } = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')

var question = [
  {
    type: 'input',
    name: 'moduleName',
    message: 'Please input the module name:',
    validate(val) {
      if(val === ''){
        return 'Module name is required'
      }
      return true
    }
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: (moduleName) => {
      return 'Are you sure to remove module ' + moduleName
    }
  }
]

var deleteFolder = function(path) {
  var files = []
  if( fs.existsSync(path) ) {
      files = fs.readdirSync(path)
      files.forEach(function(file, index) {
          var curPath = path + "/" + file
          if(fs.statSync(curPath).isDirectory()) { // recurse
              deleteFolder(curPath)
          } else { // delete file
              fs.unlinkSync(curPath)
          }
      });
      fs.rmdirSync(path)
  }
}

module.exports = prompt(question).then(({ moduleName, confirm }) => {
  if(confirm) {
    const spinner = ora('removing template...')
    spinner.start()
    //模块存在
    if (fs.existsSync(`./modules/src/${moduleName}`)) {
      deleteFolder(`./modules/src/${moduleName}`)
      process.exit()
      spinner.stop()
      console.log(chalk.green('module has been removed successfully!'))
    }
  }
})