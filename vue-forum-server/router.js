const md5 = require('blueimp-md5')
const { json } = require('body-parser')
let express = require('express')
const session = require('express-session')
const User = require('./model/User')
// 1 创建一个路由容器
let router = express.Router()
// 2 把路由都挂载到路由容器中
router.post('/login', async function (req, res) {
  let body = req.body
  try {
    const user = await User.findOne({ email: body.email, password: md5(md5(body.password)) })
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱或者密码错误'
      })
    }
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  } catch (err) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})
router.post('/register', async function (req, res) {
  let body = req.body
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }

    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))
    // 创建用户，执行注册
    const user =  await new User(body).save()
    req.session.user = user
    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch (err) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})

module.exports = router