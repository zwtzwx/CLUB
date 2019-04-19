const Topic = require('./topic');
const Section = require('./section');
const User = require('./user');

let db = {};

db.Topic = Topic;
db.Section = Section;
db.User = User;

module.exports = db;