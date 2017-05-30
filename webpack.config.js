/*
 ./webpack.config.js
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve('../FormsModeDemo/bin/Debug'),
    filename: 'index_bundle.js',
    libraryTarget: "var",
    library: ["FormPlayer"],
  },
  externals: {
    validate: "validate"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},

      {
        test: /\.(jpe?g|gif|svg)$/i,
        loader: "file-loader?name=/public/icons/[name].[ext]",
        include: path.join(__dirname, 'assets'),
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      },

      {test: /\.s?css$/, loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'}

    ]
  },
  devtool: 'source-map',
  plugins: [HtmlWebpackPluginConfig]
}
