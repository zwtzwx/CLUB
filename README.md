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
## 数据库

### 数据库初始化

#### 采用 seqlique-CLI 进行数据库数据的初始化，方便后期调用和测试

数据库期望全部采用软删除

目前数据为：帖子、帖子评论、帖子分类

迁移数据库，由于不熟练，手动复制的迁移文件，并且时间属性由于没找到正确的时间格式，设置为空。
`node_modules/.bin/sequelize db:migrate`

取消所有数据库迁移
`node_modules/.bin/sequelize db:migrate:undo:all`

生成数据种子，暂时是逐个生成，还需继续看文档
`node_modules/.bin/sequelize db:seed:all`

#### 目前期望通过 sequelize 的 model 验证来解决大部分数据验证问题，目前找到的数据验证包文档都不够友好

## 接口

文档采用 apidoc，命令为
`npm install apidoc -g`

 `apidoc -i server/controller/ -o public/apidoc/`

文档链接：`/public/apidoc`
``` shell
# 启动服务器
npm run start

# 打包
npm run dev

```
