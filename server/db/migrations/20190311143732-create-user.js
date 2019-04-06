'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        field: 'user_id',   // id 映射到数据表中的 user_id 字段
        primaryKey: true,   // 定义主键
        autoIncrement: true  // 定义自增字段
      },
      name: {
        type: Sequelize.STRING,
        field: 'user_name',
        // unique: true   // 定义唯一性约束
      },
      password: {
        type: Sequelize.STRING,
        field: 'user_password'
      },
      email: {
        type: Sequelize.STRING,
        field: 'user_email'
      },
      code: {       
        type: Sequelize.INTEGER,
        field: 'user_code'
      },
      integray: {
        type: Sequelize.INTEGER,
        field: 'user_integral',
        defaultValue: 0  // 定义默认值
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      }
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};