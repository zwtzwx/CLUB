# CLUB
使用 `node` + `vue` + `express` 仿写 cnode 社区

## 数据库配置
#### 数据迁移
1. 初始化项目，生成文件夹
``` shell
node_modules/.bin/sequelize init
```
上述命令将会生成 `migrations、models、seeders` 文件夹和 `config` 配置文件

2. 创建数据库
如果数据库还不存在，可以使用以下命令创建数据库
``` shell
node_modules/.bin/sequelize db:create
```

## 启动服务
``` shell
# 启动服务器
npm run start

# 打包
npm run dev

```
