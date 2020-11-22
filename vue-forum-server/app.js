let express = require('express')
let session = require('express-session')
const router = require('./router')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
var cors = require('cors')

mongoose.connect('mongodb://47.114.33.138:27017/forum',{ useUnifiedTopology: true, useNewUrlParser: true })
let app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.listen('3000',console.log('3000 is running...'))