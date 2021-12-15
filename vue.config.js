// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';

// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
 
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
 
// 本地环境是否需要使用cdn
const devNeedCdn = true
 
// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        vue: 'Vue',
        vuex: 'Vuex',
        "element-plus": "ElementPlus",
        'vue-router': 'VueRouter',
        axios: 'axios',
    },
    // cdn的css链接
    css: [
        'https://unpkg.com/element-plus@1.2.0-beta.1/dist/index.css',,
        'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css'
    ],
    // cdn的js链接
    js: [
        'https://cdn.bootcdn.net/ajax/libs/vue/3.2.0-beta.7/vue.runtime.global.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.prod.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-plus/1.0.2-beta.65/index.full.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.10/vue-router.global.min.js',
        'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
    ]
}
 
module.exports = {
    lintOnSave: false,
    publicPath: '/',
    productionSourceMap: false,
    chainWebpack: config => {
        // ============注入cdn start============
        config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || devNeedCdn) args[0].cdn = cdn
            return args
        })
        // ============注入cdn start============
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals
 
        // 生产环境相关配置
        if (isProduction) {
            //gzip压缩
            const productionGzipExtensions = ['html', 'js', 'css']
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path][base].gz',
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$'
                    ),
                    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false // 删除原文件
                })
            )
 
            // 代码压缩
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        //生产环境自动删除console
                        compress: {
                            drop_debugger: true,
                            drop_console: true,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            )
        }
 
        // 公共代码抽离
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor',
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 100
                    },
                    common: {
                        chunks: 'all',
                        test: /[\\/]src[\\/]js[\\/]/,
                        name: 'common',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    styles: {
                        name: 'styles',
                        test: /\.(sa|sc|c)ss$/,
                        chunks: 'all',
                        enforce: true
                    },
                    runtimeChunk: {
                        name: 'manifest'
                    }
                }
            }
        }
    }
}