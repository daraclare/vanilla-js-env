import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PRODUCTION = process.env.NODE_ENV === "production";

let entry = PRODUCTION
  ? {
      index: path.resolve(__dirname, "src/index")
    }
  : [
      "eventsource-polyfill", // necessary for hot reloading with IE
      "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
      path.resolve(__dirname, "src/index")
    ];

let devtool = PRODUCTION ? "source-map" : "cheap-module-eval-source-map";

let output = DEVELOPMENT
  ? {
      path: __dirname + "/dist", // Note: Physical files are only output by the production build task `npm run build`.
      publicPath: "/",
      filename: "scripts.js"
    }
  : {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
      filename: "[name].[chunkhash].js"
    };

let plugins = DEVELOPMENT
  ? [
      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: true,
        noInfo: true // set to false to see a list of every file being bundled.
      }),
      new webpack.HotModuleReplacementPlugin(), //for hot reloading
      new webpack.NoEmitOnErrorsPlugin()
    ]
  : [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(), // enable scope hoisting in webpack 3

      // for compatibility with old loaders, loaders can be switched to minimize mode via plugin
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        noInfo: false
      }),

      // Extract text from bundle into a file
      new ExtractTextPlugin({
        filename: "[name]-[contenthash].css",
        disable: false,
        allChunks: true
      }),

      // Create separately cached bundle of vendor libraries.
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      }),

      // Remove minifed error
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),

      // Simplifies creation of HTML files to serve webpack bundles
      new HtmlWebpackPlugin({
        template: "build/index-template.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true
      }),

      // Plugin to replace a standard webpack chunkhash with md5
      new WebpackMd5Hash(),

      // Minify JS and allow tree shaking
      new webpack.optimize.UglifyJsPlugin()
    ];

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
);

let cssLoaders = PRODUCTION
  ? ExtractTextPlugin.extract({
      use: ["css-loader", "sass-loader"]
    })
  : ["style-loader", "css-loader", "sass-loader"];

export default {
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    modules: [path.resolve(__dirname, "./src"), "node_modules"]
  },
  context: __dirname,
  devtool: devtool,
  entry: entry,
  target: "web",
  output: output,
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: cssLoaders,
        exclude: "/node_modules/"
      },
      {
        test: /\.jsx?$/, // loads both js and jsx files
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader"
      },
      {
        test: /\.(woff|woff2)$/,
        use: "url-loader?prefix=font/&limit=5000&name=[name]-[hash].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[name]-[hash].[ext]",
          "image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      }
    ]
  }
};
