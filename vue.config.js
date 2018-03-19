/* eslint-env node */
const merge = require("webpack-merge");

// module.exports = {
//   chainWebpack: config => {
//     config.module
//       .rule("vue")
//       .use("vue-loader")
//       .tap(options =>
//         merge(options, {
//           loaders: {
//             scss: [
//               {
//                 loader: "sass-loader",
//                 options: {
//                   indentedSyntax: true,
//                   sourceMap: false,
//                   importer: function(url) {
//                     if (url.indexOf("@material") === 0) {
//                       var filePath = url.split("#material")[1];
//                       var nodeModulePath = `./node_modules/@material/${filePath}`;
//                       return { file: require("path").resolve(nodeModulePath) };
//                     }
//                     return { file: url };
//                   }
//                 }
//               }
//             ]
//           }
//         })
//       )
//   }
// }
const ChainedMap = require("webpack-chain/src/ChainedMap");

module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          loaders: {
            theType: typeof options
          }
        });
      });
  }
};
