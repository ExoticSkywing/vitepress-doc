以下是当前服务器设置流程和配置状态
标注❌的是没做的，或即将要做的，或者是需要各舰员自己操作

---

### 防止系统更新
```bash
# 安装版本锁定插件
sudo yum install yum-plugin-versionlock -y

# 锁定centos-release包（当前版本需为7.6）
sudo yum versionlock add centos-release
```
若不锁定，直接就把系统干到7.9了，花了12小时来排错，谁踏马的给我把系统升级到了7.9…………

### 手动指定稳定镜像源
替换为阿里云或腾讯云镜像：

```bash
# 备份原有仓库配置
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak

# 使用阿里云镜像源（CentOS 7）
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 或使用腾讯云镜像源
sudo curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.cloud.tencent.com/repo/centos7_base.repo


# 生成新缓存
sudo yum makecache
```

### 经过多次踩坑验证，首先单独安装git
git 高频使用的工具，又因为系统版本特殊，只提供低版本git，但很多时候，不兼容，所以想方设法安装了最新版git
```bash
sudo yum -y install https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm

# 在 yum.conf 中追加排除规则（防止后续更新）
echo "exclude=centos-release* kernel*" | sudo tee -a /etc/yum.conf

# 安装 Git
sudo yum -y install git
```

### **一、系统初始化准备**差
```bash
# 1. 更新系统（root执行）
sudo yum update -y

# 2. 安装基础管理工具
sudo yum install -y epel-release vim wget tree net-tools
```

---

### **二、创建团队账户与协作组**
```bash
# 1. 创建共享用户组
sudo groupadd space-team

# 2. 为每个成员创建独立账户（替换username为实际名称）
sudo useradd -m -G space-team lty  # 你的账户
sudo useradd -m -G space-team dr❌
sudo useradd -m -G space-team liusq❌
sudo useradd -m -G space-team yinjr❌

# 3. 为所有用户设置初始密码（手动执行后输入密码）
sudo passwd lty
sudo passwd dair❌
# ...其他用户同理
```

---

### **三、配置高效SSH访问**❌
```bash
# 1. 禁用root远程登录（root执行）
sudo sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# 2. 强制密钥登录（可选但推荐）
sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# 3. 应用配置
sudo systemctl restart sshd

# 4. 客户端生成密钥对（每个成员在自己电脑执行）
ssh-keygen -t ed25519  # 生成后把.pub文件发给服务器管理员

# 5. 服务器导入公钥（管理员为每个用户操作）
sudo mkdir /home/alice/.ssh
sudo chmod 700 /home/alice/.ssh
sudo vim /home/alice/.ssh/authorized_keys  # 粘贴公钥内容
sudo chown -R alice:dev-team /home/alice/.ssh
```

---

### **配置精细化权限控制（可自行添加）**
```bash
# 1. 创建sudo策略文件（root执行）
sudo visudo -f /etc/sudoers.d/space-team

Cmnd_Alias DANGEROUS_CMDS = \
    /bin/rm -rf /, /bin/rm -rf /*, \
    /usr/bin/dd if=* of=/dev/*, \
    /usr/bin/passwd root, \
    /usr/sbin/visudo, \
    /bin/su, /usr/bin/su

%space-team ALL=(ALL) ALL, !DANGEROUS_CMDS

Defaults:%space-team authenticate

```

### **五、创建协作工作区**
```bash
# 1. 创建共享项目目录（root执行）
sudo mkdir /opt/space-projects
sudo chown :space-team /opt/space-projects
sudo chmod 2775 /opt/space-projects  # 自动继承组权限

# 2. 设置个人工作区（每个用户各自首次登录时执行）
mkdir -p ~/workspace/{code,data,temp}❌

# code 用于存放项目代码的地方，推荐分为docker项目和docker之外的项目
# data 个人知识库，笔记等等
# temp 临时测试目录
```

---

### **六、环境优化配置（可自行添加）**
```bash
# 1. 为所有用户配置统一别名（root执行全局配置）
sudo tee /etc/profile.d/team_aliases.sh <<'EOF'
alias ll='ls -alhF --color=auto'
alias code='cd ~/workspace/code'
alias logs='tail -f /var/log/*.log'
EOF

# 2. 立即生效配置（每个用户执行）
source /etc/profile
```

---

### **八、最终验证流程**
1. **成员登录测试**  
   ```bash
   ssh alice@服务器IP  # 检查密钥登录和密码登录是否符合预期
   ```

2. **权限验证**  
   ```bash
   sudo -l  # 查看已授权的sudo命令
   sudo systemctl restart docker  # 测试免密操作
   ```

3. **协作目录测试**
   ```bash
   touch /opt/space-projects/test_file  # 检查组成员是否能协同编辑
   # 可 cd 进入查看
   ```
---

### 最后添加代理❌
我已在舰桥(root)配置好代理，可正常国际互联，各舰员需要各自额外加下自己的代理
永久配置（写入Shell配置文件）
```bash
# 编辑用户配置文件（如 ~/.bashrc 或 ~/.zshrc）
echo 'export http_proxy="http://127.0.0.1:7890"' >> ~/.bashrc
echo 'export https_proxy="http://127.0.0.1:7890"' >> ~/.bashrc

# 使配置生效
source ~/.bashrc

# 验证
wget google.com
```

通过这套配置，我们将获得：
- **独立账户**：每人有专属工作空间
- **协作区**：`/opt/space-projects` 支持多人协同编辑
- **安全访问**：SSH密钥 + 受限sudo权限
- **统一环境**：标准化工具链和别名
- **扩展能力**：Docker等开发工具开箱即用

后续只需专注项目开发，系统管理成本降至最低！

### centos系统 快速安装php8.1报错

1. 从源码编译安装（确保版本 ≥1.0.18）
安装编译依赖：

```bash
sudo yum install gcc make wget
```
下载并编译 libsodium：

```bash
wget https://download.libsodium.org/libsodium/releases/libsodium-1.0.18.tar.gz
tar -xzf libsodium-1.0.18.tar.gz
cd libsodium-1.0.18
./configure
make && sudo make install
```
验证安装结果：

```bash
ls /usr/local/lib | grep libsodium
```
应看到 libsodium.so.23。

2. 添加库路径到系统链接器
CentOS 默认不会识别 /usr/local/lib，需手动配置：

```bash
# 创建配置文件
echo '/usr/local/lib' | sudo tee /etc/ld.so.conf.d/libsodium.conf

# 刷新动态链接器缓存
sudo ldconfig
```

3. 验证库是否被识别
```bash
ldconfig -p | grep libsodium
```
输出应包含 libsodium.so.23，类似：

```
libsodium.so.23 (libc6,x86-64) => /usr/local/lib/libsodium.so.23
```
4. 重启 php-fpm 服务
```bash
sudo systemctl restart php-fpm
```

### ypay php8.1报错
1. 需要按照fileinfo扩展
2. 安装缺失so库
/www/server/php/81/etc/php.ini
文件末尾增添
```
extension=swoole_loader_81_nts.so
extension = /www/server/php/81/lib/php/extensions/no-debug-non-zts-20210902/fileinfo.so
```
下载swoole_loader_81_nts.so上传至
```
/www/server/php/81/lib/php/extensions/no-debug-non-zts-20210902
```
重启php


---

### **最终结果确认**
根据你的操作记录，问题已解决。尽管存在 `no version information available` 的警告，但程序已能正确加载 `libcrypto.so.10`。以下是完整的解决流程总结：

---

### **问题定位**
程序 `/www/wwwroot/cert.1yo.cc/public/assets/addons/ksqsign` 运行时提示缺少 `libcrypto.so.10`，原因是：
1. 系统默认 OpenSSL 版本为 3.2.2，程序依赖旧版 OpenSSL 1.0.x。
2. 手动安装的 OpenSSL 1.0.2u 库未正确生成 `libcrypto.so.10` 符号链接或 SONAME 不匹配。

---

### **解决步骤**
#### **1. 安装 OpenSSL 1.0.2u**
手动编译并安装到 `/opt/openssl1.0`：
```bash
cd openssl-1.0.2u
./config --prefix=/opt/openssl1.0 --openssldir=/opt/openssl1.0/ssl
make && sudo make install
```

#### **2. 修正 SONAME 不匹配**
检查库文件的 SONAME：
```bash
readelf -d /opt/openssl1.0/lib/libcrypto.so.1.0.0 | grep SONAME
```
若输出为 `libcrypto.so.1.0.0`，需修改为 `libcrypto.so.10`：
```bash
sudo patchelf --set-soname libcrypto.so.10 /opt/openssl1.0/lib/libcrypto.so.1.0.0
```

#### **3. 创建符号链接**
```bash
sudo ln -sf /opt/openssl1.0/lib/libcrypto.so.1.0.0 /opt/openssl1.0/lib/libcrypto.so.10
```

#### **4. 更新动态链接器**
```bash
echo '/opt/openssl1.0/lib' | sudo tee /etc/ld.so.conf.d/openssl-1.0.conf
sudo ldconfig
```

#### **5. 验证动态库加载**
```bash
ldconfig -p | grep libcrypto.so.10
```
输出应为：
```
libcrypto.so.10 (libc6,x86-64) => /opt/openssl1.0/lib/libcrypto.so.10
```

#### **6. 强制程序使用自定义库**
修改程序的运行时库搜索路径：
```bash
sudo patchelf --set-rpath /opt/openssl1.0/lib /www/wwwroot/cert.1yo.cc/public/assets/addons/ksqsign
```

#### **7. 验证依赖关系**
```bash
ldd /www/wwwroot/cert.1yo.cc/public/assets/addons/ksqsign | grep libcrypto
```
输出应为：
```
libcrypto.so.10 => /opt/openssl1.0/lib/libcrypto.so.10 (0x00007f07cae00000)
```

---

### **关键结果说明**
1. **警告 `no version information available`**  
   此警告表示库文件未包含版本信息（如 `OPENSSL_1.0.0`），但不影响程序运行。若需消除警告，需重新编译 OpenSSL 时指定版本脚本（`-Wl,--version-script`），但非必需。

2. **`strace` 无输出**  
   程序运行时未报错，说明库已正确加载，无需进一步调试。

---

### **最终结论**
通过上述步骤，程序已成功加载 OpenSSL 1.0.2u 的 `libcrypto.so.10`，问题解决。可记录以下要点：

1. **核心步骤**  
   - 修正 SONAME 与符号链接  
   - 配置动态链接器路径  
   - 设置程序 `rpath`

2. **验证命令**  
   ```bash
   ldd /path/to/program | grep libcrypto      # 检查依赖库路径
   readelf -d /path/to/library | grep SONAME # 查看库的 SONAME
   ```

3. **工具依赖**  
   - `patchelf`：修改 SONAME 和 `rpath`  
   - `ldconfig`：管理动态链接器缓存  

--- 

将此流程整理至笔记即可，后续遇到类似动态库问题可参考此思路。