/* eslint-disable no-console */

const express = require('express');
const http = require('http');
const path = require('path');
const CONFIG = require('dotenv').config().parsed;
const history = require('connect-history-api-fallback');

const app = express();
app
  .use(history())
  .use('/', express.static(path.resolve(__dirname, '../dist')));

http
  .createServer(app)
  .listen(CONFIG.APP_HTTP_PORT, () => console.log(`http app listening on port ${CONFIG.APP_HTTP_PORT}`));

/* eslint-enable no-console */
