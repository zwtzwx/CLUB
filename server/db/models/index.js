const Topic = require('./topic')
const Section = require('./section')
const User = require('./user')
const Comment = require('./comment')

let db = {};

db.Topic = Topic
db.Section = Section
db.User = User
db.Comment = Comment

module.exports = db