const chalk = require('chalk');
const consola = require('consola');

const error = (msg) => {
  consola.error(chalk.bold.red(msg));
};
exports.error = error;

const connected = (msg) => {
  consola.success(chalk.bold.cyan(msg));
};
exports.connected = connected;

const success = (msg) => {
  consola.success(chalk.bold.green(msg));
};
exports.success = success;

const disconnected = (msg) => {
  consola.info(chalk.bold.yellow(msg));
};
exports.disconnected = disconnected;

const termination = (msg) => {
  consola.error(chalk.bold.magenta(msg));
};
exports.termination = termination;
