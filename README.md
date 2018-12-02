# github trending

usage

```js
const trending = require('./App');

trending.monthTrending()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

## `promise` trending.todayTrending
今天的 trending

## `promise` trending.weekTrending
本周的 trendig

## `promise` trending.monthTrending
本月的 trending


data

```js
  {
    url: 'https://github.com/ianstormtaylor/slate', // repo 的地址
    repo: 'ianstormtaylor / slate', // repo 名字
    desc: 'A completely customizable framework for building rich text editors.', // repo 的描述
    language: 'JavaScript', // 使用的语言，有的 repo 没有语言，则是处理结果是空制符传
    stars: '12,173', // 总的 star 数量
    forks: '928', // fork 数量
    starsNewly: '2,720', // 今天、本周、本月新 star 的数量
    }, // ...
  ]
```

