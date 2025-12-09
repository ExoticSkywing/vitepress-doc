### 步骤1：添加上游远程仓库

在你的本地仓库中，首先要确认已经添加了上游仓库的 URL。可以通过以下命令查看远程仓库配置：

```bash
git remote -v
```

如果没有看到上游仓库的 URL，你可以添加它。用以下命令添加上游（假设上游仓库的 URL 是 `https://github.com/原作者/上游仓库.git`）：

```bash
git remote add upstream https://github.com/原作者/上游仓库.git
```

### 步骤2：获取上游仓库的更改

使用以下命令从上游仓库获取最新的更改：

```bash
git fetch upstream master
```

### 步骤3：将你的提交变基到上游最新提交之上：
```bash
git rebase upstream/master
```
遇到冲突时，解决后执行：(没遇到则跳过该步骤)

```bash
git add .
git rebase --continue
```
### 强制推送到你的仓库（因历史被重写）：

```bash
git push origin master -f
```

### 总结

这些步骤将帮助你将 fork 的仓库更新为最新的上游版本。如果你还有其他具体问题或需要解决某个步骤，请告诉我！