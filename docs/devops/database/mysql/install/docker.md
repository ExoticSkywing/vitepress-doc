# MySQL Docker 安装

使用 Docker 快速部署 MySQL。

## 拉取镜像

```bash
docker pull mysql:8.0
```

## 运行容器

```bash
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=yourpassword \
  mysql:8.0
```

## 进入容器

```bash
docker exec -it mysql mysql -uroot -p
```

