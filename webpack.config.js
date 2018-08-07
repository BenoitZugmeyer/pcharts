const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const { CheckerPlugin } = require("awesome-typescript-loader")

function localPath(p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : undefined,

  entry: {
    example: localPath("examples")
  },

  output: {
    path: localPath("docs"),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new HtmlPlugin({
      title: 'pcharts example'
    })
  ]
};
