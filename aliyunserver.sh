# 获取内容，写入文件
cd /home/uftp/github-trending
/usr/local/bin/npm start
# 将形成的今日 hitory 添加到版本控制系统
git add ./src/history.md
git commit -m '[update] history'
git push
# 删除 blog 中的 githubtrending.md 原始文件
rm /home/uftp/lxfriday.github.io/source/_posts/githubtrending.md
# 复制新文件到 source/_posts 目录
cp ./dist/history-trending.md /home/uftp/lxfriday.github.io/source/_posts/githubtrending.md
cd /home/uftp/lxfriday.github.io/
# 把内容发布
/usr/local/bin/npm run submit
# 将新生成的文件添加到 dev 分支
git add ./source/_posts/githubtrending.md
git commit -m '[update] github trending daily'
git push
