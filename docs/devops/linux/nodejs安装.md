```bash
# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash
# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
# should print `v20.14.0`
node -v 

# verifies the right NPM version is in the environment
# should print `10.7.0`
npm -v 
```

## 运行

1. 安装依赖

npm install 

2. 使 nodejs 项目保持后台运行

```bash
# 全局安装pm2
npm install pm2 -g
npm install pnpm -g

# 使用 pm2 启动应用  
pm2 start npm --name "parcel" -- start

# 查看运行状态
pm2 status

# 重启应用
pm2 restart parcel

pm2 stop %id

pm2 delete %id
```

## 2025最新方式

解决方案
1. 升级 Node.js 到最新 LTS 版本（推荐 v20.x）
方法一：使用 Node Version Manager (nvm)（推荐）

bash
# 1. 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. 重新加载终端配置
source ~/.bashrc  # 或退出终端后重新打开

# 3. 安装 Node.js v20
nvm install 20

# 4. 验证版本
node -v  # 应输出 v20.x.x
npm -v   # 应输出 10.x.x


2. 升级 npm 到最新版本
bash
# 如果已通过 nvm 安装了 Node.js v20，npm 会自动升级到兼容版本
npm install -g npm@latest

# 验证
npm -v  # 应输出 10.x.x 或更高