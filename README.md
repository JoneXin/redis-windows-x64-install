
## redis windows x64 自动安装脚本

## 使用步骤

1, 配置安装信息：/package/install_config.json

```json
{
    "taget_path": "D:/hzleaper_auto_install/redis",
    "log_file": "D:/hzleaper_auto_install/redis/redis_server.log"
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
logfile "D:/hzleaper_auto_install/redis/redis_server.log" // 日志输出位置
```

### 目录

```text
redis-windows-x64-install
 ├─ pakcage
 │ ├─ redis
 │ ├─ test
 │ │ └─ func.js
 │ ├─ index.js // 入口
 │ ├─ install_config.json // 配置安装信息文件
 │ ├─ package.json
 │ └─ redis.windows_template.conf
 └─ install.js

```
