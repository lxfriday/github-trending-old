/**
 * 主任务
 */
const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');
const trending = require('./App');
const util = require('./util');

const timeSource = moment();

try {
  var headerPart = fs.readFileSync('./src/header.md');
  var historyPart = fs.readFileSync('./src/history.md');
  var lastCorrectData = fs.readFileSync('./dist/history-trending.md');
} catch(e) {
  util.logError(e);
}


// 开始获取网页信息
function task() {
  trending.todayTrending()
  .then(data => {
    if (!data.length) {
      throw new Error('Error: get page data error! 0 item!');
    }
    const todayTime = timeSource.format('YYYYMMDD');
    const mdTitle = `# ${todayTime}-github-trending\r\n`;
    const mdTotal = `__${data.length}__ repos\r\n\r\n`;
    const mdToday = `### ${todayTime}\r\n`;
    const mdContent =  data.map(function (v) {
      return `- [${v.repo}](${v.url}) ${v.desc} __[⭐ ${v.stars}]__`;
    }).join('\r\n') + '\r\n\r\n';
    const mdStr = mdTitle + mdTotal + mdContent;

    const newHistory = mdToday + mdContent + historyPart;

    const dist = 
      headerPart
      + '## ' + timeSource.format('YYYY') + '\r\n'
      + mdToday
      + mdContent
      + historyPart;

    fs.writeFileSync(`./today/github-trending.md`, mdStr);

    console.log('\r');
    console.log(mdStr);
    console.log('\r');


    // 更新 history
    fs.writeFileSync(`./src/history.md`, newHistory);

    // 形成合成文件
    fs.writeFileSync(`./dist/history-trending.md`, dist);

    util.logCorrect('FINISHED');
  })
  .catch(e => {
    util.logError(e);
    // 防止文件混乱，将文件的内容恢复到最初始读取的状态
    fs.writeFileSync('./src/history.md', historyPart);
    fs.writeFileSync('./dist/history-trending.md', lastCorrectData);
    util.logCorrect('文件已恢复读取前的状态');
  });
}

/**
 * 检测当天是否已经进行过这个任务了
 * @param {*} ignore 是否重复任务检查
 */
function start(ignore = false) {
  fs.stat('./today/github-trending.md', function (err, fileInfo) {
    if (!err) {
      if (ignore) {
        task();
      } else {
        if (timeSource.format('YYYYMMDD') !== moment(fileInfo.atime).format('YYYYMMDD')) {
          task();
        } else  {
          console.log(chalk.bgRed('------------------------------------------'));
          console.log(chalk.bgRed('❎ ❎ ERROR  ❎ ❎'));
          console.log('Error: 今天已经进行过同步了');
          console.log(chalk.bgRed('------------------------------------------'));
        }
      }
    } else {
      util.logError(err);
    }
  });
}

start(true); // 不做文件最近更改时间检测
// start();
