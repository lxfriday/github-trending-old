
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
          $('.repo-list').children('li').each(function (ind, el) {
            const itemInfo = {};
            console.log($(this).find('svg.octicon-star').next().text);
            $(el).children('div').each(function (ind2, el2) {
              if (ind2 === 0) {
                const target = $(this).find('a');
                itemInfo.url = `https://github.com${target.attr('href')}`;
                itemInfo.repo = target.text().trim();
              } else if (ind2 === 2) {
                itemInfo.desc = $(this).text().trim();
              } else if (ind2 === 3) {
                // 不包含 language
                if ($(this).children().length === 4) {
                  itemInfo.language = '';
                  $(this).children().each(function (ind3, el3) {
                    if (ind3 === 0) {
                      itemInfo.stars = $(this).text().trim();
                    } else if (ind3 === 1) {
                      itemInfo.forks = $(this).text().trim();
                    }
                    //  else if (ind3 === 3) {
                    //   console.log(itemInfo);
                    //   console.log($(this).text().trim());

                    //   itemInfo.starsToday = $(this).text().trim().match(/(\d+[,\d+]*)/)[1];
                    // }
                  });
                } else {
                  // length === 5 包含language
                  $(this).children().each(function (ind3, el3) {
                    if (ind3 === 0) {
                      itemInfo.language = $(this).text().trim();
                    } else if (ind3 === 1) {
                      itemInfo.stars = $(this).text().trim();
                    } else if (ind3 === 2) {
                      itemInfo.forks = $(this).text().trim();
                    } else if (ind3 === 4) {
                      itemInfo.starsNewly = $(this).text().trim().match(/(\d+[,\d+]*)/)[1]; // stars today or this week or month
                    }
                  });
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
