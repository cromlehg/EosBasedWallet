const express = require('express');
const http = require('http');
const path = require('path');
const CONFIG = require('dotenv').config().parsed;

const app = express();
app.use('/', express.static(path.resolve(__dirname, '../build')));

http
  .createServer(app)
  .listen(CONFIG.APP_HTTP_PORT, () => console.log(`http app listening on port ${CONFIG.APP_HTTP_PORT}`));
