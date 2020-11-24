<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="最新" name="first">
        <div v-for="item in articleList" :key="item._id" class="item" @click="toArticle(item._id)">
          <p class="left">{{ item.title }}</p>
          <address class="right">作者:{{ item.auther }} 发表于:{{ item.created_time }}</address>
          <el-divider></el-divider>
        </div>
      </el-tab-pane>
      <el-tab-pane label="最热" name="second">最热</el-tab-pane>
      <el-tab-pane label="周榜" name="third">周榜</el-tab-pane>
      <el-tab-pane label="月榜" name="fourth">月榜</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'MainContent',
  data() {
    return {
      activeName: 'first',
      articleList: [
        {
          _id: '1231',
          title: '测试',
          auther: 'admin',
          created_time: '2020-11-22 11:30'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        const { data:res } = await this.axios.get('getList')
        if(res.err_code === 0){
          this.articleList = res.articles
        }
        else if(res.err_code === 1){
          this.$message.error('找不到文章')
        }
      } catch (error) {
        this.$message.warning('文章列表错误')
      }
    },
    toArticle(id) {
      this.$router.push('/article/'+ id)
    }
  }
}
</script>

<style scoped>
.el-card{
  width: 72%;
  float: left;
}
.item{
  height: 2rem;
  cursor: pointer;
}
.item :hover{
  color: #409EFF;
}
.left{
  float: left;
}
.right{
  float: right;
  font-size: .6rem;

}
</style>