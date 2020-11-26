// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      // 排除一些包，不会打包进vendor中
      // 左侧为我们在业务中引入的包名， 右侧 为对应库提供给外部引用的名字
      "vue": "Vue",
      "vue-router": "VueRouter",
      "axios": "axios"
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/,// 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除源文件
            minRatio: 0.8 // 压缩比
          })
        ]
      }
    }
  }
}