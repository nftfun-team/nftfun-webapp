const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}


module.exports = {
    outputDir: process.env.NODE_ENV === "ipfsview" ? 'ipfs_dist' : 'dist',
    publicPath: process.env.NODE_ENV === "ipfsview" ? '././' : '/',
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
        port: 8085, // ?????????
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //???????????????????????????
        proxy: {
            '/ws': {
                target: 'https://stream.binance.com:9443/ws',
            },
            // '/api/v3': {
            //     target: 'https://api.binance.com/api/v3',
            // },
            '/api': {
                target: 'https://api.binance.com',
                pathRewrite: {'^/api': '/api'}
            },
        },
    },

}
