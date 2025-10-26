# Git 敏感信息处理完全指南 🔐

## 📋 目录

- [应急处理流程](#应急处理流程)
- [场景一：刚刚提交（最新提交）](#场景一刚刚提交最新提交)
- [场景二：历史提交](#场景二历史提交)
- [场景三：已经推送到远程](#场景三已经推送到远程)
- [场景四：彻底清除文件历史](#场景四彻底清除文件历史)
- [预防措施](#预防措施)
- [最佳实践](#最佳实践)

---

## 🚨 应急处理流程

### 发现敏感信息泄露后的黄金法则

```
1. 停止推送 → 2. 评估影响范围 → 3. 撤销提交 → 4. 更换凭证 → 5. 检查并预防
```

### 立即执行的 3 件事

1. **立即更换所有泄露的凭证**（API Key、密码、Token 等）
2. **评估泄露时间窗口**（从提交到发现的时间）
3. **通知相关人员**（如果是团队项目）

---

## 场景一：刚刚提交（最新提交）

### 情况：还没有 push，或者刚 push 不久

#### 方法 1️⃣：修改最后一次提交（推荐）

```bash
# 1. 删除敏感文件（从暂存区移除，保留本地）
git rm --cached path/to/sensitive/file

# 2. 更新 .gitignore
echo "path/to/sensitive/file" >> .gitignore
git add .gitignore

# 3. 修正提交
git commit --amend --no-edit

# 4. 如果已经推送，强制推送覆盖
git push origin branch-name --force
```

**示例：**
```bash
# 移除 .env 文件
git rm --cached docker/.env

# 更新 .gitignore
cat >> .gitignore << EOF
# Environment files
.env
docker/.env
**/.env
EOF

git add .gitignore
git commit --amend --no-edit
git push origin master --force
```

#### 方法 2️⃣：回退提交

```bash
# 软回退（保留修改）
git reset --soft HEAD^

# 或者硬回退（丢弃修改）
git reset --hard HEAD^

# 重新添加正确的文件
git add .
git commit -m "feat: your commit message"
git push origin branch-name --force
```

---

## 场景二：历史提交

### 情况：敏感信息在几次提交之前

#### 方法 1️⃣：交互式变基（Rebase）

```bash
# 1. 查找包含敏感信息的提交
git log --all --full-history -- "path/to/file"

# 2. 交互式变基到该提交之前
git rebase -i <commit-hash>^

# 3. 在编辑器中，将对应行的 'pick' 改为 'edit'
# 4. 保存退出后，Git 会停在该提交

# 5. 移除敏感文件
git rm --cached path/to/sensitive/file
git add .gitignore
git commit --amend --no-edit

# 6. 继续变基
git rebase --continue

# 7. 强制推送
git push origin branch-name --force
```

**完整示例：**
```bash
# 假设敏感文件在 3 次提交前
git log --oneline -5
# abc123 (HEAD) Latest commit
# def456 Middle commit
# ghi789 Commit with sensitive data  ← 目标
# jkl012 Old commit

# 变基到目标提交的父提交
git rebase -i jkl012

# 在编辑器中：
# edit ghi789 Commit with sensitive data
# pick def456 Middle commit
# pick abc123 Latest commit

# Git 停在 ghi789，移除敏感文件
git rm --cached config/secrets.yaml
git commit --amend --no-edit
git rebase --continue

# 推送
git push origin master --force
```

---

## 场景三：已经推送到远程

### 情况：多人已经拉取了包含敏感信息的版本

#### 步骤 1：本地处理

使用上面的方法（amend 或 rebase）清理本地历史

#### 步骤 2：通知团队

```bash
# 发送通知给团队成员
# Subject: [URGENT] Git History Rewritten - Force Pull Required

团队成员请执行：
git fetch origin
git reset --hard origin/branch-name

⚠️ 警告：此操作会丢失本地未推送的修改
建议先备份：git stash 或创建新分支
```

#### 步骤 3：强制推送

```bash
# ⚠️ 危险操作：会改写远程历史
git push origin branch-name --force-with-lease

# 或者（更暴力）
git push origin branch-name --force
```

**`--force` vs `--force-with-lease` 的区别：**

```bash
# --force-with-lease（推荐）
# 如果远程有其他人的提交，会拒绝推送
git push --force-with-lease

# --force（危险）
# 无论如何都会覆盖，可能丢失其他人的工作
git push --force
```

---

## 场景四：彻底清除文件历史

### 情况：文件在多个提交中出现，需要完全清除

#### 方法 1️⃣：git filter-branch（传统方法）

```bash
# 从所有历史中删除文件
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive/file" \
  --prune-empty --tag-name-filter cat -- --all

# 清理引用
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 强制推送所有分支和标签
git push origin --force --all
git push origin --force --tags
```

#### 方法 2️⃣：BFG Repo-Cleaner（推荐，更快）

```bash
# 1. 安装 BFG（需要 Java）
# macOS
brew install bfg

# Linux
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
alias bfg='java -jar bfg-1.14.0.jar'

# 2. 备份仓库
git clone --mirror git@github.com:username/repo.git

# 3. 删除文件
bfg --delete-files sensitive-file.txt repo.git
# 或删除包含特定文本的文件
bfg --replace-text passwords.txt repo.git

# 4. 清理
cd repo.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. 推送
git push
```

#### 方法 3️⃣：git filter-repo（最现代的方法）

```bash
# 1. 安装
pip3 install git-filter-repo

# 2. 删除文件
git filter-repo --path path/to/sensitive/file --invert-paths

# 3. 重新添加远程仓库（filter-repo 会删除远程）
git remote add origin git@github.com:username/repo.git

# 4. 强制推送
git push origin --force --all
git push origin --force --tags
```

---

## 🛡️ 预防措施

### 1. 正确配置 .gitignore

**全局 .gitignore（针对用户）：**
```bash
# 设置全局 gitignore
git config --global core.excludesfile ~/.gitignore_global

# 创建全局忽略规则
cat > ~/.gitignore_global << EOF
# OS files
.DS_Store
Thumbs.db
*.swp
*.swo

# IDE
.idea/
.vscode/
*.sublime-*

# Environment
.env
.env.local
.env.*.local
EOF
```

**项目 .gitignore（标准模板）：**
```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.env
**/.env

# Credentials
secrets.yaml
secrets.json
credentials.json
service-account.json
*-key.json
*.pem
*.key
*.cert

# Config files that may contain secrets
config/local.yaml
config/production.yaml

# Output and cache
output/
*.log
__pycache__/
node_modules/

# OS
.DS_Store
Thumbs.db
```

### 2. 使用环境变量和密钥管理

```bash
# ❌ 错误：直接在代码中硬编码
API_KEY = "sk-abc123xyz789"

# ✅ 正确：使用环境变量
API_KEY = os.getenv("API_KEY")

# ✅ 更好：使用密钥管理服务
# - AWS Secrets Manager
# - HashiCorp Vault
# - Azure Key Vault
# - Google Secret Manager
```

### 3. 配置 Git Hooks（预提交检查）

**pre-commit hook 示例：**
```bash
#!/bin/bash
# .git/hooks/pre-commit

# 检查敏感关键词
if git diff --cached | grep -i -E "(password|api_key|secret|token|private_key)" > /dev/null; then
    echo "❌ 检测到敏感信息！"
    echo "请检查以下内容："
    git diff --cached | grep -i -E "(password|api_key|secret|token|private_key)"
    exit 1
fi

echo "✅ 预提交检查通过"
```

**使用 pre-commit 框架：**
```bash
# 安装
pip install pre-commit

# 创建配置文件 .pre-commit-config.yaml
cat > .pre-commit-config.yaml << EOF
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: check-added-large-files
      - id: detect-private-key
      - id: check-yaml
      - id: check-json
  
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
EOF

# 安装 hooks
pre-commit install

# 运行检查
pre-commit run --all-files
```

### 4. 使用模板文件

```bash
# 不要提交实际的配置，提交模板
git add config.example.yaml
git add .env.example

# .env.example
cat > .env.example << EOF
# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Email Configuration
EMAIL_PASSWORD=your_email_password_here
EOF
```

### 5. GitHub Secret Scanning

**启用 Secret Scanning（GitHub Pro/Enterprise）：**
- Settings → Security → Code security and analysis
- Enable "Secret scanning"
- Enable "Push protection"

---

## 📝 最佳实践

### ✅ DO（应该做的）

1. **提交前检查**
   ```bash
   # 查看即将提交的内容
   git diff --cached
   
   # 逐个添加文件而不是 git add .
   git add file1.py file2.py
   ```

2. **使用 .gitignore 模板**
   ```bash
   # 使用 gitignore.io
   curl -L https://www.gitignore.io/api/python,node,go > .gitignore
   ```

3. **敏感信息分离**
   ```
   project/
   ├── config/
   │   ├── config.yaml          # 通用配置
   │   ├── config.example.yaml  # 示例（提交）
   │   └── config.local.yaml    # 本地配置（不提交）
   ```

4. **定期审计**
   ```bash
   # 搜索可能的敏感信息
   git log -p | grep -i "password\|secret\|key\|token"
   ```

5. **文档说明**
   ```markdown
   # README.md
   
   ## 🔐 环境配置
   
   1. 复制环境变量模板
      ```bash
      cp .env.example .env
      ```
   
   2. 编辑 .env 文件，填入你的凭证
   
   ⚠️ 注意：不要提交 .env 文件到 Git
   ```

### ❌ DON'T（不应该做的）

1. **不要使用 `git add .`**
   ```bash
   # ❌ 危险：可能添加敏感文件
   git add .
   
   # ✅ 安全：明确指定文件
   git add src/ tests/ README.md
   ```

2. **不要在代码中硬编码凭证**
   ```python
   # ❌ 错误
   password = "MySecret123"
   
   # ✅ 正确
   password = os.environ.get("DB_PASSWORD")
   ```

3. **不要提交后才添加 .gitignore**
   ```bash
   # ❌ 错误顺序
   git add .
   git commit -m "Initial commit"
   echo ".env" >> .gitignore  # 太晚了！
   
   # ✅ 正确顺序
   echo ".env" >> .gitignore
   git add .gitignore
   git commit -m "Add gitignore"
   git add other-files
   ```

4. **不要在公共仓库放敏感项目**
   - 使用私有仓库
   - 或者完全分离凭证管理

---

## 🔧 实用脚本

### 快速检查脚本

```bash
#!/bin/bash
# check-secrets.sh

echo "🔍 检查敏感信息..."

# 检查常见敏感文件
SENSITIVE_FILES=(
    ".env"
    "*.pem"
    "*.key"
    "*secret*"
    "*password*"
    "credentials.json"
)

for pattern in "${SENSITIVE_FILES[@]}"; do
    if git ls-files | grep -i "$pattern"; then
        echo "❌ 发现敏感文件: $pattern"
        exit 1
    fi
done

# 检查代码中的敏感关键词
SENSITIVE_PATTERNS=(
    "password\s*=\s*['\"][^'\"]+['\"]"
    "api[_-]?key\s*=\s*['\"][^'\"]+['\"]"
    "secret\s*=\s*['\"][^'\"]+['\"]"
    "token\s*=\s*['\"][^'\"]+['\"]"
)

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
    if git grep -i -E "$pattern" -- '*.py' '*.js' '*.go'; then
        echo "⚠️  发现可疑代码: $pattern"
    fi
done

echo "✅ 检查完成"
```

### 紧急清理脚本

```bash
#!/bin/bash
# emergency-cleanup.sh

set -e

FILE_TO_REMOVE=$1

if [ -z "$FILE_TO_REMOVE" ]; then
    echo "用法: $0 <file-to-remove>"
    exit 1
fi

echo "🚨 紧急清理: $FILE_TO_REMOVE"

# 1. 从最新提交移除
git rm --cached "$FILE_TO_REMOVE"

# 2. 更新 .gitignore
if ! grep -q "$FILE_TO_REMOVE" .gitignore; then
    echo "$FILE_TO_REMOVE" >> .gitignore
    git add .gitignore
fi

# 3. 修正提交
git commit --amend --no-edit

# 4. 询问是否强制推送
read -p "是否强制推送到远程？(yes/no): " confirm
if [ "$confirm" = "yes" ]; then
    BRANCH=$(git branch --show-current)
    git push origin "$BRANCH" --force-with-lease
    echo "✅ 已强制推送"
else
    echo "⚠️  请手动推送: git push origin $(git branch --show-current) --force"
fi

echo "🎉 清理完成！别忘了更换泄露的凭证！"
```

---

## 📚 相关资源

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [git-filter-repo](https://github.com/newren/git-filter-repo)
- [gitignore.io](https://www.gitignore.io/)
- [pre-commit framework](https://pre-commit.com/)

---

## 🆘 应急联系

**如果泄露了重要凭证：**

1. **立即更换凭证**
2. **检查访问日志**（查看是否被滥用）
3. **启用双因素认证**
4. **通知安全团队**（如果是企业项目）
5. **考虑使用密钥轮换策略**

---

**最后提醒：** 🔐

> Prevention is better than cure.
> 
> 预防永远好过修复。配置好 .gitignore 和 pre-commit hooks，
> 养成提交前检查的习惯，避免敏感信息泄露。


