// import Vue from 'vue'
import { Button, Form, Card, Message, Backtop, Input, Tabs, TabPane, Divider, FormItem, Radio , DropdownItem , Avatar, Dropdown, DropdownMenu, Icon } from 'element-ui'
import './assets/style/base.css'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

axios.defaults.baseURL = 'http://47.114.33.138:3000/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(Button)
Vue.use(Form)
Vue.use(Card)
Vue.use(Backtop)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Divider)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Icon)
Vue.use(Radio)


Vue.prototype.$message = Message

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
