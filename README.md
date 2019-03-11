# CLUB
使用 `node` + `vue` + `express` 仿写 cnode 社区

# 数据库

## 数据库初始化

### 采用 seqlique-CLI 进行数据库数据的初始化，方便后期调用和测试

目前数据为：帖子、帖子评论、帖子分类

迁移数据库，由于不熟练，手动复制的迁移文件，并且时间属性由于没找到正确的时间格式，设置为空。
`node_modules/.bin/sequelize db:migrate`
取消所有数据库迁移
`node_modules/.bin/sequelize db:migrate:undo:all`
生成数据种子，暂时是逐个生成，还需继续看文档
`node_modules/.bin/sequelize db:seed:all`