'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('topics', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }, 
      section_id: {              // 分类 ID
        type: Sequelize.INTEGER,   
        allowNull: false,
        references: {
            model: "sections",
            key: "id"
        }
      },
      user_id: {                  // 用户 ID
        type: Sequelize.INTEGER,   
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      title: {    // 帖子标题
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {   // 帖子内容
        type: Sequelize.TEXT
      },
      recommend: {   // 是否推荐
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      created: {   // 发表时间
        type: Sequelize.DATE,
        field: 'created_at'
      },
      comment: {           // 评论数
        field: 'comment_num',
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      scan: {        // 浏览数
          field: 'scan_num',
          type: Sequelize.INTEGER,
          defaultValue: 0
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('topics');
  }
};
