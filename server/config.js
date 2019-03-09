var config = { 
    // 邮件配置
    email: {
        host: "",
        secure: true,
        port: 465,
        user: '18774671721@163.com',
        password: 'zwx384500364'
    },  
    // 数据库配置
    database: {
        database: 'test',
        username: 'test',
        password: '123456',
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: false,            // 是否启用别名
        timestamps: true,                  // 是否设置时间戳
        poolMax: 10,                       // 连接池
        poolMin: 0,
        poolAcquire: 30000,
        PoolIdle: 10000
    }
};

module.exports = config;