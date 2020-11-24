const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
let express = require('express')
// const session = require('express-session')
const User = require('./model/User')
const Article = require('./model/Article')
// 1 创建一个路由容器
let router = express.Router()
// 2 把路由都挂载到路由容器中

const secret = 'linyouhang'
router.get('/getuser',async function(req, res){
  const token = req.headers.authorization
  try {
    const decoded = jwt.verify(token, secret)
    const user = await User.findOne({ _id: decoded.id })
    if(user){
      return res.status(200).json({
        err_code: 0,
        user: user
      })
    }
    res.status(200).json({
      err_code: 1,
      message: '找不到用户'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      message: error.message
    })
  }
})
router.get('/getList',async function(req, res){
  try {
    const articles = await Article.find()
    if(articles){
      return res.status(200).json({
        err_code: 0,
        articles
      })
    }
    res.status(200).json({
      err_code: 1,
      message: '找不到文章'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      message: error.message
    })
  }
})

router.get('/getArticle',async function(req, res){
  try {
    id = req.query.id
    const article = await Article.findById(id)
    if(article){
      return res.status(200).json({
        err_code: 0,
        article
      })
    }
    res.status(200).json({
      err_code: 1,
      message: '找不到文章'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      message: error.message
    })
  }
})

router.post('/update', async function(req, res) {
  const token = req.headers.authorization
  const body = req.body
  try {
    jwt.verify(token, secret)
    const oldUser = await User.findById(body.id)
    if(oldUser.nickname !== body.nickname){
      if(await User.findOne({ nickname: body.nickname })) {
        return res.status(200).json({
          err_code: 2,
          message: '昵称已存在'
        })
      }
    }
    await User.findByIdAndUpdate(body.id, body)
    res.status(200).json({
      err_code: 0,
      message: '更新成功'
    })
  }catch(err){
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})

router.post('/addComment', async function (req, res){
  const body = req.body
  const token = req.headers.authorization
  try {
    const { id } =  jwt.verify(token, secret)
    const { nickname: auther } = await User.findById(id)
    const { comments: newComments } = await Article.findById(body.id)
    newComments.push({ 
      auther,
      content: body.content,
      created_time: Date.now()
    })
    await Article.findByIdAndUpdate(body.id, { comments: newComments })
    res.status(200).json({
      err_code: 0,
      message: '发表成功'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      message: error.message
    })
  }
})

router.post('/addArticle', async function (req, res){
  let body = req.body
  const token = req.headers.authorization
  try {
    jwt.verify(token, secret)
    await new Article(body).save()
    res.status(200).json({
      err_code: 0,
      message: '发表成功'
    })
  } catch (error) {
    res.status(500).json({
      err_code: 500,
      message: error.message
    })
  }
})

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
    // req.session.user = user
    const token =jwt.sign({ id: user.id }, secret, { expiresIn: '6h' })
    // const decoded = jwt.verify(token, secret)
    res.status(200).json({
      err_code: 0,
      message: 'ok',
      token: token
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
    // req.session.user = user
    const token =jwt.sign({ id: user.id }, secret, { expiresIn: '6h' })
    res.status(200).json({
      err_code: 0,
      message: 'OK',
      token: token
    })
  } catch (err) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})

module.exports = router