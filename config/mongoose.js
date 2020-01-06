const mongoose = require('mongoose');
const consola = require('consola');
const { envVariableChecker } = require('../lib/utils');

const {
  connected, error, disconnected, termination,
} = require('../constant/chalkEvent');

const values = ['MONGODB_URL'];
envVariableChecker(values);

const dbURL = process.env.MONGODB_URL;

const mongo = () => {
  mongoose.connect(dbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    if (process.env.NODE_ENV !== 'test') connected('Mongoose connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    error(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
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