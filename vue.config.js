const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionSourceMap: !isProduction,
  publicPath: "./",
  configureWebpack: config => {
    config.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };

    if (process.env.VUE_APP_MODE === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }

    if (isProduction) {
      config.plugins.push(
        // eslint-disable-next-line
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new webpack.optimize.MinChunkSizePlugin({
          minChunkSize: 10000 // Minimum number of characters
        })
      );
      // 开启 Gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      );
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"));

    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionWebpackPlugin({
          test: /\.(js|css|less|sass)$/,
          threshold: 10240,
          deleteOriginalAssets: false
        })
      );
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */
          // "primary-color": "#1890FF",
          // "link-color": "#1890FF",
          // "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8082,
    https: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      "/api": {
        target: "",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/": ""
        }
      }
    }
  },
  lintOnSave: true
};
