const mongoose = require('mongoose');
const consola = require('consola');
const chalk = require('chalk');

const { envVariableChecker } = require('../lib/utils');

const {
  connected, error, disconnected, termination,
} = require('../constant/chalkEvent');

const values = ['MONGODB_URL'];
envVariableChecker(values);
let timerId;
const dbURL = process.env.MONGODB_URL;
const connectMongoDb = (retry) => {
  if (retry) { consola.info(chalk.bold.yellow('Retrying on every 20 seconds...')); }
  mongoose.connect(dbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
const mongo = () => {
  connectMongoDb(false);
  mongoose.connection.on('connected', () => {
    if (process.env.NODE_ENV !== 'test') connected('Mongoose connected successfully');
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  });

  mongoose.connection.on('error', (err) => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    timerId = setInterval(() => { connectMongoDb(true); }, 1000 * 20);
    error(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    timerId = setInterval(() => { connectMongoDb(true); }, 1000 * 20);
    disconnected('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      termination('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });
};
module.exports = mongo;
