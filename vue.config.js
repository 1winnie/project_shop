const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    productionSourceMap: false,
    transpileDependencies: true,
    lintOnSave: false,
    // 代理跨域
    devServer: {
        // assetPublicPath:'./',
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn'
            }
        }
    },
    // build:{
    //     // index: path.resolve(_dirname, '../dist/index.html'),
    //     // assetsRoot:path.resolve(_dirname,'../dist'),
    //     assetPublicPath:'./',
    // }
})
