const Sequelize = require('sequelize');
const sequelize = require('../../tools/db');
const Topic = require('./topic');

const Section = sequelize.define('section', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'section_name',
        allowNull: false
    },
    created: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    }
})
// Section.hasMany(Topic, {foreignKey: 'section_id', sourceKey: 'id'});
// Section.sync({ force: false })
module.exports = Section;