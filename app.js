/* eslint-disable no-console */
const http = require('http');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const expressController = require('express-controller');
require('dotenv').config({ path: '.env' });
const path = require('path');
const configServer = require('./config/server');
const mongoose = require('./config/mongoose');
const response = require('./middleware/response');
const {
  connected, error, disconnected, termination, success,
} = require('./constant/chalkEvent');

console.log('\n');

const app = express();
const server = http.createServer(app);
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(response);

const setupServer = async () => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/', 'index.html'));
  });
  mongoose();
  const bindControllersAsync = () => new Promise((resolve, reject) => {
    const router = express.Router();
    app.use(router);
    expressController.setDirectory(`${__dirname}/controllers`).bind(router, (err) => {
      if (err) {
        error(err);
        reject(err);
      } else {
        if (process.env.NODE_ENV !== 'test') success('controllers bound successfully');
        resolve();
      }
    });
  });
  await bindControllersAsync();
};

setupServer();
const port = Number(process.env.PORT) || configServer.port;
server.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') connected(`server listening on port ${port}...`);
});
module.exports = server;
