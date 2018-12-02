const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const trending = require('./App');

function start() {
  trending.todayTrending()
  .then(data => {
    if (!data.length) {
      throw new Error('Error: get page data error! 0 item!');
    }
    const todayTime = moment().format('YYYYMMDD');
    const mdTitle = `# ${todayTime}-github-trending\r\n`;
    const mdTotal = `__${data.length}__ repos\r\n\r\n`;
    const mdToday = `- ${todayTime}\r\n`;
    const mdContent =  data.map(function (v) {
      return `    - [${v.repo}](${v.url}) ${v.desc} __[⭐ ${v.stars}]__`;
    }).join('\r\n') + '\r\n';
    const mdStr = mdTitle + mdTotal + mdContent;
    fs.writeFileSync(`./today/${todayTime}-github-trending.md`, mdStr);

    const header = fs.readFileSync('./src/header.md');
    const history = fs.readFileSync('./src/history.md');

    // 更新 history
    fs.writeFileSync(`./src/history.md`, mdToday + mdContent + history);

    const dist = 
      header
      + '## ' + moment().format('YYYY') + '\r\n'
      + mdToday
      + mdContent
      + history;
    // 形成合成文件
    fs.writeFileSync(`./dist/history-trending.md`, dist);

    console.log(chalk.bgGreen('------------------------------------------'));
    console.log(chalk.green('✅✅  FINISHED  ✅✅'));
    console.log(chalk.bgGreen('------------------------------------------'));
  })
  .catch(err => {
    console.log(chalk.bgRed('------------------------------------------'));
    console.log(chalk.bgRed('❎❎ ERROR  ❎❎'));
    console.log(err);
    console.log(chalk.bgRed('------------------------------------------'));
  });
}

start();
