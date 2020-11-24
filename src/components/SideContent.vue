<template>
<div class="container">
  <el-card class="introduce">
    <div slot="header" class="introduce-header">
      <img src="../assets/logo.png" alt=""><span>Vue技术论坛</span>
    </div>
    <div>这里是高品质的 Vue 开发者社区，致力于为 Vue 开发者提供一个分享创造、结识伙伴、协同互助的论坛。在这里你可以讨论和分享 Vue 相关知识，包括软件和 Vue 核心实现。</div>
     <el-button type="success" @click="toRegister" plain>加入社区</el-button>
     <el-button type="success" @click="toPost" plain>发帖</el-button>
  </el-card>
  <el-card class="sponsor">
    <div slot="header">
      <span>社区赞助商</span>
    </div> 
    <div >我木有</div>
  </el-card>
  <el-card class="link">
    <div slot="header">
      <span>友情链接</span>
    </div>
    <div style="padding-top:5px">
      <a  href="https://ruby-china.org" style="margin-top: 10px;display: block;">
        <img src="https://cdn.learnku.com/assets/images/friends/ruby-china.png" width="100%" style="width:150px; margin: 3px 0;">
      </a>
      <a  href="http://cnodejs.org/"  style="margin-top: 10px;display: block;">
        <img src="https://cdn.learnku.com/assets/images/friends/cnodejs.png"  width="100%" style="width:150px; margin: 3px 0;">
      </a>
      <a  href="https://testerhome.com" style="margin-top: 10px;display: block;">
        <img src="https://cdn.learnku.com/uploads/banners/lHLqvDd0TQZD7CKdmguG.png" width="100%" style="width:150px; margin: 3px 0;">
      </a>
      <a  href="https://www.easywechat.com/" style="margin-top: 10px;display: block;">
        <img src="https://cdn.learnku.com/uploads/banners/yN7mJNvKsNvfwYSZw2Yp.png" width="100%" style="width:150px; margin: 3px 0;">
      </a>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
 name: 'SideContent',
 methods: {
   toRegister() {
     this.$router.push('/register')
   },
   toPost() {
     this.$router.push('/post')
   }
 }
}
</script>

<style scoped>
img{
  width: 1.5rem;
}
.container{
  width: 25%;
  float: right;
  display: flex;
  flex-direction: column;
}
.introduce{
  color: rgb(144, 149, 152);
  font-size: .9rem;
  text-align: left;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
.introduce-header{
  text-align: center;
}
.sponsor{
  color: rgb(144, 149, 152);
  height: 14rem;
  margin-bottom: 2rem;
}
.link{
  color: rgb(144, 149, 152);
}
.el-button{
  width: 6rem;
  margin-left: 1rem;
  margin-top: 1rem;
}
</style>
