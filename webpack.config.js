/* eslint-disable */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/Index.tsx"],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 200,
      maxSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  mode: "production",
  performance: { hints: false },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ],
  devtool: "source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
    modules: ["./src", "./node_modules"]
  },
  module: {
    rules: [
      // `js` and `jsx` files are parsed using `babel`
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // `ts` and `tsx` files are parsed using `ts-loader`
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js?$/,
        loader: "source-map-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  }
};
