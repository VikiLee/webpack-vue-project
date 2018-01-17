# vue_webpack with modules separated

> webpack-vue模块划分，分别运行和打包子模块而不影响其他模块（各个模块之间项目独立而不相互影响），且支持新建模块和删除模块功能(无需手动新建/删除模块)

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
modeuls #所有模块文件夹
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


