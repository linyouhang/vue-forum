<template>
  <div class="contanier">
    <RegisterForm v-show="!isLogin"></RegisterForm>
    <a @click="onClick" v-show="!isLogin">已有账号去登入</a>
    <LoginForm v-show="isLogin"></LoginForm>
    <a @click="onClick" v-show="isLogin">点我注册</a>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
  name: 'Register',
  components: {
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    onClick() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>

<style scoped>
a{
  cursor: pointer;
  color:#42b983;
}
.contanier{
  width: 25rem;
  margin: 20rem auto;
  /* text-align: center; */
}
</style>