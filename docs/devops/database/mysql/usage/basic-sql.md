# MySQL 基础 SQL

MySQL 基础 SQL 语句。

## 创建数据库

```sql
CREATE DATABASE mydb;
USE mydb;
```

## 创建表

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(100)
);
```

## 增删改查

```sql
INSERT INTO users (name, email) VALUES ('张三', 'zhangsan@example.com');
SELECT * FROM users;
UPDATE users SET name='李四' WHERE id=1;
DELETE FROM users WHERE id=1;
```

