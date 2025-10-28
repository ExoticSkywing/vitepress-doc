# MySQL 索引优化

MySQL 索引的创建和优化。

## 创建索引

```sql
CREATE INDEX idx_name ON users(name);
CREATE UNIQUE INDEX idx_email ON users(email);
```

## 复合索引

```sql
CREATE INDEX idx_name_email ON users(name, email);
```

## 查看索引

```sql
SHOW INDEX FROM users;
EXPLAIN SELECT * FROM users WHERE name='张三';
```

## 索引优化建议

- 为经常查询的字段创建索引
- 避免在小表上创建过多索引
- 定期分析和优化索引

