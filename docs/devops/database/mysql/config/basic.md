# MySQL 基础配置

MySQL 基础配置文件说明。

## 配置文件位置

- Linux: `/etc/my.cnf`
- Windows: `C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`

## 常用配置

```ini
[mysqld]
port=3306
max_connections=200
character-set-server=utf8mb4
```

