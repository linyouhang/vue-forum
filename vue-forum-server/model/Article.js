let mongoose = require('mongoose')

let Schema = mongoose.Schema

let articleSchema = new Schema({
  title: {
    type : String,
    require: true
  },
  created_time: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  auther: {
    type: Object,
    required: true
  },
  stars: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array
  }
})

module.exports = mongoose.model('Article', articleSchema)