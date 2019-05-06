const Topic = require('./topic')
const Section = require('./section')
const User = require('./user')
const Comment = require('./comment')
const Like = require('./like')

let db = {}

db.Topic = Topic
db.Section = Section
db.User = User
db.Comment = Comment
db.Like = Like

module.exports = db