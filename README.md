
## redis windows x64 自动安装脚本

## 使用步骤

1, 配置安装位置：/package/install_config.json

```json
{
    "taget_path": "D:/hzleaper_auto_install/redis"
}
```

2, 执行脚本

```js
node install.js
```

### 配置说明

默认配置(<https://github.com/MicrosoftArchive/redis/releases>) 下的默认配置 + 以下配置

redis.windows.conf

```conf
requirepass root //密码 root
appendonly yes // 开启 AOF 持久化策略
appendfilename "appendonly.aof" //存储文件名（默认的）
appendfsync everysec // 每秒持久化到磁盘（默认的）
```

### 目录

```text
redis_install_package
 ├─ pakcage
 │ ├─ index.js // 入口
 │ ├─ install_config.json // 配置安装位置
 │ ├─ package.json
 │ └─ redis.zip // redis 压缩包
 └─ install.js

```
