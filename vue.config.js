/* eslint-env node */
const path = require("path");

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        var scssLoaderIndex = options.loaders.scss.findIndex(function(e) {
          return e.loader === "sass-loader";
        });
        options.loaders.scss[scssLoaderIndex].options.includePaths = [
          path.resolve(__dirname, "node_modules")
        ];
        return options;
      });
  }
};
