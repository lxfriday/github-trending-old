cd /Users/lxfriday/works/github-trending
npm start
rm /Users/lxfriday/lxfriday.github.io/source/_posts/githubtrending.md
cp ./dist/history-trending.md /Users/lxfriday/lxfriday.github.io/source/_posts/githubtrending.md
cd /Users/lxfriday/lxfriday.github.io/
npm run submit
# git commit -m '当天更新'
# git push