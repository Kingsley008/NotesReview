Webpack配置过程
-- 
1. 初始化项目 `npm init`  生成package.json
2. 局部安装 `npm install webpack --save-dev`
3. 安装css-loader `npm install css-loader sytle-loader --save-dev`
4. 配置webpack.config.js: 
    * entry & output：
    ```jsx harmony
    
    module.exports = {
    entry: {
           // key：value 的方式申明入口文件
            main:'./src/script/main.js',
            login:'./src/script/login.js'
        },
    
        output: {
           // 打包后的路径    
            path: path.resolve('./dist'),
           // 打包后生成的文件名
            filename: 'js/[name].js'
    
        },
    }
    ```
5. 安装插件： `npm install html-webpack-plugin --save-dev`
6. 在webpack.config.js中配置插件：
    ```jsx harmony
    // 引入插件
    var htmlWebpackPlugin = require('html-webpack-plugin');
        
    module.exports = {
    // ...
    // 以数组的形式申明插件
    plugins:[
            // new 方式 进行插件配置项的配置
            new htmlWebpackPlugin({
                filename:"index.html",// 生成的文件名
                template:'index.html',//指定模版
                inject:'head', // 指定插入的位置 默认body后
                minify:{
                   removeComments:true, // 压缩注释
                    collapseWhitespace:true // 压缩空格
                },
                chunks:['main'], // 指定插入的模块
                excludeChunks:['login'] // 排除的js模块
            })]
    }       
  
    ```
7. 在webpack.config.js中配置loader:
    *  安装 babel-loader:  
    `npm install babel-loader babel-core babel-preset-env webpack --save-dev`
    *  配置loader
        * babel-loader  
            ```jsx harmony
                module.exports = {
                // ...
                module: {
                           // configuration regarding modules
                           rules: [
                             // rules for modules (configure loaders, parser options, etc.)
                                                     
                           {
                               test: /\.jsx?$/, // 匹配的文件
                               loader: 'babel-loader', 
                               // 在.babelrc 配置相关的参数 
                               exclude:path.resolve(__dirname, 'node_modules'), //  填写绝对路径
                               include:path.resolve(__dirname, 'src')  // 只解析 src 下的目录
                          }
                       ]
                    }
                }       
            ```
        * sass-loader + css-loader + style-loader
            ```
           {
               test: /\.scss/,
               use: [{loader: 'style-loader',}, {loader: 'css-loader',}, {loader: 'sass-loader',},{
                   loader: 'postcss-loader',
                   options: {
                       plugins: function () {
                           return [require('autoprefixer')({browsers: ["last 5 versions"]})];
                       }
                   }
               }],
    
               },
            ```
        * file-loader + image-webpack-loader
        ```
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use:[{loader:'file-loader', options: {
                    name: 'img/[name]-[hash:5].[ext]' // 设置文件的打包路径以及后缀名
                }},{loader: 'image-webpack-loader'}], // 图片文件压缩loader
            },
        ```