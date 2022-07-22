module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: { //配置跨域
      '/api': {
        target: 'http://127.0.0.1:8080/ANNE_NEW', //填写请求的目标地址
        ws: true,
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': 'http://127.0.0.1:8080/ANNE_NEW' //请求的时候使用这个api就可以
        }
      }
    }
  }
}
