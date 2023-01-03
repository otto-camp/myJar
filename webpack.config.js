// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/index.tsx",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].[contenthash:8].chunk.js'

  },
  performance: {
    hints: false,
    maxAssetSize: 300000,
    maxEntrypointSize: 300000
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: true
    }),
    new Dotenv(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./public/manifest.json", to: "manifest.json" },
        { from: "./public/favicon.ico", to: "favicon.ico" },
        { from: "./public/robots.txt", to: "robots.txt" },
        { from: "./public/sitemap.xml", to: "sitemap.xml" },
        { from: "./public/apple-touch-icon.png", to: "apple-touch-icon.png" },
        { from: "./public/android-chrome-192x192.png", to: "android-chrome-192x192.png" },
        { from: "./public/android-chrome-512x512.png", to: "android-chrome-512x512.png" },
        { from: "./public/sw.js", to: "sw.js" },
      ]
    }),
    new CleanWebpackPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /^\.\/(en-us)$/),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: ["/node_modules/"],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          }
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
        type: "asset",
      }, {
        test: /\.xml/,
        type: 'asset/resource',
        generator: {
          filename: 'sitemap.xml',
        },
      },
      {
        test: /\.txt/,
        type: 'asset/resource',
        generator: {
          filename: 'robots.txt',
        },
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
      parallel: true,
    })],
    splitChunks: {
      maxInitialRequests: Infinity,
      chunks: 'all',
      cacheGroups: {
        venders: false
      }
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    config.mode = "development";

  }
  return config;
};
