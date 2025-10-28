# MySQL 性能配置

MySQL 性能相关的配置优化。

## 缓冲池配置

```ini
innodb_buffer_pool_size=2G
innodb_log_file_size=512M
```

## 连接配置

```ini
max_connections=500
wait_timeout=28800
```

## 查询缓存

```ini
query_cache_type=1
query_cache_size=128M
```

