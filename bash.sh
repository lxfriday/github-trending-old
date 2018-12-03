cd /Users/lxfriday/works/github-trending
npm start
git add ./src/history.md
git commit -m '[update] history'
git push
rm /Users/lxfriday/lxfriday.github.io/source/_posts/githubtrending.md
cp ./dist/history-trending.md /Users/lxfriday/lxfriday.github.io/source/_posts/githubtrending.md
cd /Users/lxfriday/lxfriday.github.io/
npm run submit
git add ./source/_posts/githubtrending.md
git commit -m '[update] github trending daily'
git push
