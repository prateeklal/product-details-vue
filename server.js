require('dotenv').config();

const express = require('express');
const axios = require('axios');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const path = require('path');
const fs = require('fs');

let app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    stats: {
      colors: true
    },
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    filename: webpackConfig.output.filename,
  }));
}

if (process.env.NODE_ENV === 'production') {
  app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
app.get('/', function (req, res) {
  res.send(template);
});

app.get('/products', async(req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let getResponse = await axios.get("https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json");
  res.json(getResponse.data)
  next();
});

app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require('opn')(`http://localhost:${process.env.PORT}`);
  }
});