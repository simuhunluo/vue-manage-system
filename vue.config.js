
const port = process.env.port || process.env.npm_config_port || 8080 // dev port


module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            },
            '/': {
                target: `http://localhost:8502`,
                changeOrigin: true,
                pathRewrite: {
                }
            }
        }
    }
}