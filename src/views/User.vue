<template>
  <div>
    <AppHeader></AppHeader>
    <div class="container">
      <el-tabs tab-position="left">
      <el-tab-pane label="个人信息">
        <Information></Information>
      </el-tab-pane>
      <el-tab-pane label="修改头像">修改头像</el-tab-pane>
      <el-tab-pane label="修改密码">修改密码</el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import Information from '../components/user/Information'
export default {
  name: 'User',
  components: {
    AppHeader,
    Information
  }
}
</script>

<style scoped>
.container{
  max-width: 70rem;
  margin: 0 auto;
}
</style>