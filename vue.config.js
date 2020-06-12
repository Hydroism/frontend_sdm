const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const date = require("dayjs")().format("YYYY_M_D");

const productionGzipExtensions = ["html", "js", "css", "svg"];

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  assetsDir: "static",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components")
        }
      }
    });

    //复制static到dist
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [{
          from: path.resolve(__dirname, "./static"),
          to: "static"
        }]
      })
    )
  },

  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    extract:true,
    requireModuleExtension: true,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      },
    },
  },

  // webpack-dev-server 相关配置
  devServer: {
    port: 3001,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   '/api': {
    //     target: `http://localhost:3001`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '/api': '/mock'
    //     }
    //   }
    // },
    before: require('./mock/mock-server.js')
  },

  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/plugins/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/plugins/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    //打包缓存
    config
      .plugin('ScriptExtHtmlWebpackPlugin')
      .after('html')
      .use('script-ext-html-webpack-plugin', [{
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      }])
      .end()

    //分包
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial",
        },
        elementUI: {
          name: "chunk-elementUI",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
        },
        fortawesome: {
          name: "chunk-fortawesome",
          priority: 20,
          test: /[\\/]node_modules[\\/]_?@fortawesome(.*)/,
        },
        commons: {
          name: "chunk-commons",
          test: resolve("src/components"),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    });
    config.optimization.runtimeChunk('single')

    //gzip压缩
    config.plugin("compression").use(CompressionWebpackPlugin, [
      {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 8192,
        minRatio: 0.8,
      },
    ])
      .end();

    //打包压缩文件
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.plugin("fileManager").use(FileManagerPlugin, [
        {
          onEnd: {
            delete: ["./dist/video", "./dist/data"],
            archive: [
              {
                source: "./dist",
                destination: `./dist/production_sdm_${ date }.7z`,
              },
            ],
          },
        },
      ])
        .end();
    });

    //包分析
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    });

  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
