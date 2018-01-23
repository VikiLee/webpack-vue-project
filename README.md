# vue_webpack with modules separated

> webpack-vue模块划分，分别运行和打包子模块而不影响其他模块（各个模块之间项目独立而不相互影响），且支持新建模块和删除模块功能(无需手动新建/删除模块)
以往项目当中，打包自己做的模块时会影响到他人的模块，如果打包时出现错误（冲突之类的）然后提交，一旦发布到线上就会造成严重后果。
1、集成vue+webpack，无需关注webpack的配置
2、解耦各个模块（功能），运行和打包相互独立
3、命令行实现新建模块，解放双手

## Build Setup

``` bash
#安装依赖
1. npm install
#新建模块，按提示输入模块名
2. npm run create
#运行模块，按提示输入模块名
3. npm run start
#打包模块，按提示输入模块名
4. npm run build
#删除模块，按提示输入要删除的模块名
5. rpm run rm
```

## 结构说明
````
modules #所有模块文件夹
└───   assets #所有模块共用的静态文件
│    │   css
│    │   img
│    │   js
└───   common #所有模块公用的js代码，比如util.js
└───   components #所有模块公用vue子模块，比如header.vue
└───src #所有模块的源码文件夹
│   └─── module_name #模块名
│   │     └─── assets #该模块特有的静态文件
│   │           │   css
│   │           │   img
│   │           │   js
│   │     └─── components #该模块特用vue子模块
│   │     └─── router #该模块特用vue路由设置
│   │     └─── util #该模块特用共有类js
│   │     │  App.vue #容器
│   │     │  index.html #模块模板文件
│   │     │  main.js #模块入口文件，文件名不要修改！！！
````
## 其他
1、import的时候@表示modules目录下，如import '@/assets/css/test.css'，表示导入modules/assets/css/test/css  
2、import的时候@src表示各个模块的根目录，如import '@src/assets/css/test.css'，表示导入modules/src/:module_name/assets/css/test.css  
3、生产环境下，build静态文件的设置在config/index下，这里可以设置静态文件生产路径和cdn路径  
```javascript
    assetsRoot: path.resolve(__dirname, '../static'), // 打包的静态文件地址，该地址打包到项目根目录下  
    assetsSubDirectory: 'xxx/xxx', //静态文件子路径  
    assetsPublicPath: 'xxx', // 如果有cdn，配置成cdn
```
4、webpack.prod.conf.js的CopyWebpackPlugin配置需要复制到的静态文件地址
```javascript
new CopyWebpackPlugin([
{
        from: path.resolve(__dirname, '../static'), // 需要复制到的地址，这里复制到根目录的static目录下
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
])
```
