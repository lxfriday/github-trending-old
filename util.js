/**
 * 定制控制台打印
 */
const chalk = require('chalk');

function logCorrect(info) {
  console.log(chalk.bgGreen('------------------------------------------'));
  console.log(chalk.green('✅ ✅ '+ info +' ✅ ✅'));
  console.log(chalk.bgGreen('------------------------------------------'));
}

function logError(err) {
  console.log(chalk.bgRed('------------------------------------------'));
  console.log(chalk.bgRed('❎ ❎ ERROR ❎ ❎'));
  console.log(err);
  console.log(chalk.bgRed('------------------------------------------'));
}

module.exports = {
  logCorrect,
  logError,
};
