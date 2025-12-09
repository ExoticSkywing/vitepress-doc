2. 强制全量重建并观察构建日志
# 清理所有缓存

```bash
docker-compose down --volumes --rmi all
docker system prune -af
```

# 带详细日志重建


```bash
docker-compose build --no-cache --progress=plain
docker-compose up
```

