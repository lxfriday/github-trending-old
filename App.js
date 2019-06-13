
/**
 * 获取 github trending 的每天的内容
 * @time 2018/12/02
 * @author lxfriday
 */

 const request = require('request');
 const cheerio = require('cheerio');

const todayUrl = 'https://github.com/trending';
const weekUrl = 'https://github.com/trending?since=weekly';
const monthUrl = 'https://github.com/trending?since=monthly';


// 本周的 trending
function getPageData(url) {
  return new Promise((resolve, reject) =>{
    request.get(url, function (err, res, body) {
      if (!err) {
        try {
          const $ = cheerio.load(body);
          const list = [];
          $('.Box-row').each(function (ind, el) {
            const itemInfo = {};
            itemInfo.url = `https://github.com${$(this).children('h1').children('a').attr('href')}`; // repo
            itemInfo.repo = $(this).children('h1').text().trim(); // repo
            itemInfo.desc = $(this).children('p').text().trim(); // desc
            $(this).children('div.f6').children().each(function (ind2, el2) {
              if (ind2 === 0) {
                if ($(this)[0].name === 'span') {
                  // 使用的语言
                  itemInfo.language = $(this).text().trim();
                } else if ($(this)[0].name === 'a') {
                  itemInfo.stars = $(this).text().trim();
                }
              }
              if (ind2 === 1) {
                if ($(this)[0].name === 'a') {
                  if(itemInfo.stars) {
                    itemInfo.forks = $(this).text().trim();
                  } else {
                    itemInfo.stars = $(this).text().trim();
                  }
                }
              }
            });
            list.push(itemInfo);
          });
          resolve(list);
        } catch(e) {
          reject(e);
        }
      } else {
        reject('error-getpagedata!');
      }
    });
  });
}

// trending today
function todayTrending() {
  return getPageData(todayUrl);
}

// trending this week
function weekTrending() {
  return getPageData(weekUrl);
}

// trending this month
function monthTrending() {
  return getPageData(monthUrl);
}

module.exports = {
  todayTrending,
  weekTrending,
  monthTrending,
};
