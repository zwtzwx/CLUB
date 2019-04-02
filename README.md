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
3. 运行迁移
在创建完模型和迁移文件后，其实还没有在数据库中真正的创建表，这时候需要使用 `db:migrate` 创建
``` shell
node_modules/.bin/sequelize db:migrate
```

4. 撤销迁移
``` shell
# 恢复最近的迁移
node_modules/.bin/sequelize db:migrate:undo
# 撤销所有的迁移
db:migrate:undo:all
```
5. 创建种子文件
``` shell
 node_modules/.bin/sequelize seed:generate --name demo-user
```
## 启动服务
``` shell
# 启动服务器
npm run start

# 打包
npm run dev

```
