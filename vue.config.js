// const path = require('path');

module.exports = {
  publicPath: './',
  productionSourceMap: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/_includes.scss";`
      }
    }
  },

  configureWebpack: {
    // module: {
    //   rules: [{
    //     test: /\.data\.js$/,
    //     exclude: [
    //       path.resolve(__dirname, 'src/data')
    //     ]
    //   }]
    // }
  }
}