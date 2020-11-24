<template>
<div class="header-wrap">
  <div class="header">
    <div class="logo" @click="toHome"> <img src="../assets/logo.png" alt=""><span>Vue</span></div>
    <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-search"
    v-model="searchContent"
    >
    </el-input>
    <div v-if="isOn">
      <el-dropdown >
        <router-link :to="'user/'+user._id" class="link" >
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <div class="link-right">个人中心<i class="el-icon-arrow-down el-icon--right"></i></div>
        </router-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>{{ user.nickname }}</el-dropdown-item>
          <el-dropdown-item @click.native="toCenter">编辑资料</el-dropdown-item>
          <el-dropdown-item>{{ user.class }}</el-dropdown-item>
          <el-dropdown-item divided @click.native="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <router-link to="/register" class="link" v-else>登入,注册</router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: '',
      isOn: false,
      user: ''
    }
  },
  created() {
    this.getUser()
    const token = sessionStorage.getItem('token')
    if(token){
      this.isOn = true
    }
  },
  methods: {
    async getUser() {
      try {
          const { data:res } = await this.axios.get('getuser')
          if(res.err_code === 0){
            this.user = res.user
          }
      } catch (error) {
        this.$message.warning('未登入')
      } 
    },
    out() {
      sessionStorage.removeItem('token')
      window.location.href = '/'
    },
    toCenter() {
      this.$router.push('user/'+this.user._id)
    },
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header-wrap{
  width: 100%;
  height: 3rem;
  border-bottom: 1px solid #d3e0e9;
  box-shadow: 0 1px 2px 0 rgba(101,129,156,.08);
  margin-bottom: 2rem;
}
.header{
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
img{
  width: 1.5rem;
}
.avatar{
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.logo{
  color: #666;
  font-weight: bolder;
  height: 2rem;
  margin-top: .5rem;
  cursor: pointer;
}
.el-input{
  max-width: 20rem;
  height: 3rem;
  margin-top: .2rem;
}
.link{
  line-height: 3rem;
  position: relative;
}
.link-right{
  float:right;
}
</style>