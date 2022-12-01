// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.tsx",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[id].[chunkhash].js'
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: true,
      favicon: "public/favicon.ico",
      manifest: "public/manifest.json",
    }),
    new Dotenv(),
    new CopyPlugin({
      patterns: [
        {from:"./public/robots.txt", to:"robots.txt"},
        {from:"./public/manifest.json", to:"manifest.json"},
        {from:"./public/favicon.ico", to:"favicon.ico"},
        {from:"./public/sw.js", to:"sw.js"}
      ]
    })
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
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webp)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."]
  }, optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }

};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(new BundleAnalyzerPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
