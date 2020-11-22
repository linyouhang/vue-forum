<template>
<div class="header-wrap">
  <div class="header">
    <div class="logo"> <img src="../assets/logo.png" alt=""><span>Vue</span></div>
    <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-search"
    v-model="searchContent"
    >
    </el-input>
    <el-dropdown v-if="user">
      <router-link to="/center" class="link" >个人中心<i class="el-icon-arrow-down el-icon--right"></i></router-link>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>XXX</el-dropdown-item>
        <el-dropdown-item>编辑资料</el-dropdown-item>
        <el-dropdown-item>用户权限</el-dropdown-item>
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link to="/register" class="link" v-else>登入,注册</router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: '',
    }
  },
  computed: {
    user (){
      return true
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
.logo{
  color: #666;
  font-weight: bolder;
  height: 2rem;
  margin-top: .5rem;
}
.el-input{
  max-width: 20rem;
}
.link{
  line-height: 3rem;
}
</style>