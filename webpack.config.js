module.exports = {
  context: __dirname + "/js",
  entry: {
  	javascript: "./app.js",
  	html: "../index.html"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"],
      },
  	  {
  	    test: /\.html$/,
  	    loader: "file?name=[name].[ext]",
  	  },
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname + "/dist",
  },
}