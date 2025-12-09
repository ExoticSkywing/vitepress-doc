1. ssh-keygen -t rsa -b 4096 -C "邮箱"
2. 重定向密钥存放位置~/.ssh/id_rsa_github.pub
3. 上传id_rsa_github.pub公钥
4. 新增配置文件`vim ~/.ssh/config`，随后保存
```yaml
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_github
  IdentitiesOnly yes
```
5. 更改权限'chmod 600 ~/.ssh/config'
6. 测试ssh -T git@github.com
7. 检查 Git 远程仓库地址
确保仓库的远程地址是 SSH 格式，而非 HTTPS：

```bash
git remote -v
```
正确格式应为：git@github.com:LMuniverse/ApexApple_AE1.git

如果显示 HTTPS 地址，需修改为 SSH：

```bash
git remote set-url origin git@github.com:LMuniverse/ApexApple_AE1.git
```