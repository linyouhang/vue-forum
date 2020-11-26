// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const Home = () => import('../views/Home.vue')
// import Register from '../views/Register.vue'
const Register = () => import('../views/Register.vue')
// import User from '../views/User.vue'
const User = () => import('../views/User.vue')
// import Post from '../views/Post.vue'
const Post = () => import('../views/Post.vue')
// import Article from '../views/Article.vue'
const Article = () => import('../views/Article.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },
  {
    path: '/post',
    name: 'Post',
    component: Post
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach( (to, from, next) => {
  const token = sessionStorage.getItem('token')
  if( to.name !== 'User' && to.name !== 'Post') next()
  else if(to.name === 'User' && token) next()
  else if(to.name === 'Post' && token) next()
  else next('/')
} )

export default router
