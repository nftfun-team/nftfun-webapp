const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}


module.exports = {

    outputDir: 'dist',

    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: true,
    productionSourceMap: false,

    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('./src'))
            .set('pages',resolve('./src/pages'))
            .set('components',resolve('./src/components'))
            .set('utils',resolve('./src/utils'))
            .set('img',resolve('./src/assets/images'))
            .set('store',resolve('./src/store'))
            .set('config',resolve('./src/config'))
            .set('mixins',resolve('./src/mixins'))
            .set('interface',resolve('./src/interface'));

        config.externals = {
            'BMap': 'BMap',
            'AMap': 'AMap'
        }

        // config.module
        //     .rule('scss')
        //     .test(/\.scss$/)
        //     .oneOf('vue')
        //     .use('px2rem-loader')
        //     .loader('px2rem-loader')
        //     .before('postcss-loader') // this makes it work.
        //     .options({ remUnit: 75, remPrecision: 8 })
        //     .end()

        if (process.env.NODE_ENV !== "development"){
            config.optimization.splitChunks({
            chunks: 'initial',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 4,
            maxInitialRequests: 4,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                element: {
                    filename: '[name].[chunkhash].js',
                    test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                    priority: 0
                },
                echart: {
                    chunks: 'all',
                    name: 'echart.min',
                    test: /[\\/]node_modules[\\/]echart/,
                    enforce: true,
                    priority: 1
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: '[name].[chunkhash].js',
                    priority: 2
                }
            }
        })
        }
    },

    devServer: {
        port: 8085, // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
    },

    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 require('postcss-plugin-px2rem')({
    //                     rootValue : 37.5, // 换算的基数
    //                     propList  : ['*'],
    //                 }),
    //             ]
    //         },
    //         // less: {
    //         //     javascriptEnabled: true,
    //         // }
    //     }
    // }

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require("postcss-plugin-px2rem")({
                        rootValue: 64,
                        // unitPrecision: 5,
                        //propWhiteList: [],
                        // propBlackList: [],
                        // exclude: /(node_module)/,
                        // selectorBlackList: [],
                        // ignoreIdentifier: false,
                        // replace: true,
                        mediaQuery: false,
                        minPixelValue: 3
                    })
                ]
            }
        }
    }
}
