## 问题场景

当已公开给出 pr 链接，且不易再更换链接，但又想更改已提交到仓库的历史记录信息时，可使用以下解决方案

## 解决方案

> 案例：
> 我们现在以修改历史最近第二个提交信息为例，向最近第二个提交追加签名`Signed-off-by: <username> xxxxxxxxx@h-partners.com`

### 步骤

#### 1. 获取最近的提交历史

首先，您需要确认最近的提交。运行以下命令以查看提交历史：

`git log --oneline`

这会输出类似如下的提交列表：
```
e1f2a9b (HEAD -> dev) 最近的提交信息
c84b5d3 最近第二笔提交的信息
d74b6f3 最近第三笔提交的信息
...
```

#### 2. 交互式变基

执行以下命令以开始变基过程（假设您希望修改最近的三个提交）：

`git rebase -i HEAD~3`

#### 3. 编辑变基提交消息

在打开的文本编辑器中，您会看到类似于以下内容：

```
pick <hash1> 第一提交信息
pick <hash2> 第二个提交信息 (要修改)
pick <hash3> 第三提交信息
```

将包含 `Signed-off-by` 的提交所对应的行 `pick` 更改为 `edit`：

```
pick <hash1> 第一提交信息
edit <hash2> 第二个提交信息  # 这行修改为 edit
pick <hash3> 第三提交信息
```

保存并退出编辑器。

#### 4. 修改提交

Git 将暂停此时在您指定的提交位置。您可以运行以下命令来修改提交并添加 `Signed-off-by` 信息：

```bash
git commit --amend -s
```

Git会打开一个编辑器，您可以在这里修改提交信息或保持不变。确保 `Signed-off-by: <username> xxxxxxxxx@h-partners.com` 被添加到提交信息中。保存并关闭编辑器。

#### 5. 继续变基

完成 `commit --amend` 后，请运行：

```bash
git rebase --continue
```

Git 会继续处理其他未编辑的提交。

### 6. 强制推送到远程仓库

由于您修改了历史提交，您需要强制推送：

```bash
git push origin <your_branch_name> --force-with-lease
```

`--force-with-lease` 比 `--force` 更安全，因为它避免了意外覆盖其他人最近的更改。

## 总结

- **使用交互式变基来编辑历史提交并添加 `Signed-off-by`。**