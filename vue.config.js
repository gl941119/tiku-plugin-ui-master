const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

const isH5 = process.env.PAGE === 'h5'
const postcssPlugins = [
  /* css自动补全前缀 */
  require('autoprefixer')
]

/* 自动进行px2rem */
isH5 && postcssPlugins.push(require('postcss-plugin-px2rem')({
  /* 排除node_module文件夹 */
  exclude: /(node_module)/,
  /* 设置最小要转换的像素值 */
  minPixelValue: 3
}))
const debug = process.env.NODE_ENV !== 'production'
module.exports = {
  pages: {
    h5: 'src/h5/main.js',
    web: 'src/web/main.js'
  },

  /* 部署应用包时的基本 URL */
  publicPath: process.env.BASE_URL,
  /* 关闭生产环境的 source map */
  productionSourceMap: false,
  configureWebpack: config => {
     if (debug) { // 开发环境配置 定位debug
       config.devtool = 'source-map'
     }
   },
  /* 开发服务器配置 */
  devServer: {
    /* 是否自动打开浏览器 */
    open: false,
    host: '0.0.0.0',
    port: '8081',
    disableHostCheck: false
  },
  css: {
    loaderOptions: {
      sass: {
        /* 全局注入变量 */
        data: `@import "_scss/var.scss";`
      },
      postcss: {
        plugins: postcssPlugins
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
      .set('_axios', resolve('src/libs/axios/modules'))
      .set('_scss', resolve('src/assets/scss'))
      .set('_images', resolve('src/assets/images'))
      .set('_img', resolve('src/assets/img'))
      .set('_views', resolve('src/views'))
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 30000 }))
      }
}
