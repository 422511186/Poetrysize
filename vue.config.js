const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
})

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://124.221.92.73:8888/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/model': {
                target: 'http://124.222.182.217:8000/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/model': '/'
                }
            },
            '/imgUpload': {
                target: 'http://124.221.195.197:8000/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/imgUpload': '/'
                }
            },
        }
    }
}
