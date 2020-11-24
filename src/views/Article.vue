<template>
  <div >
    <AppHeader></AppHeader>
    <div class="contanier">
      <div class="content">
        <el-card >
          <markdown-it-vue-light class="md-body" :content="article.content" />
          <div class="stars"><span>点赞</span>{{ article.stars }}</div>
        </el-card>
        <el-divider></el-divider>
        <div class="oldComment">
          <div v-for="item in article.comments" :key="item._id" class="item">
            <address>{{ timestampToTime(item.created_time) }}</address>
            <p>{{ item.auther }}:</p>
            <p>{{ item.content }}</p>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="comment">
          <span>评论</span>
          <el-input 
          :rows="2"
          placeholder="请输入内容"
          type="textarea"
          v-model="comment">
          </el-input>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div> 
      </div>
      
      <el-card :body-style="{ padding: '0px' }" class="auther">
        <el-avatar> user </el-avatar>
        <div style="padding: 14px;">
          <span>{{ article.auther }}</span>
          <div class="bottom">
            <time class="time">{{ article.created_time }}</time>
            <el-divider></el-divider>
            <el-button type="text" class="button">关注</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import AppHeader from '../components/AppHeader'

export default {
  components: {
    MarkdownItVueLight,
    AppHeader,
  },
  data() {
    return {
      article: {
        content: '',
        auther: '',
        created_time: '',
        stars: 0,
        comments: [{
          _id: 1231,
          auther: 'admin',
          created_time: '2020-20-20',
          content: 'very good!!'
         }]
      },
      comment: ''
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      try {
        const { data:res } = await this.axios.get('getArticle', {
          params: {
            id: this.$route.params.id
          }
        })
        if(res.err_code === 0){
          this.article = res.article
        }
        else if(res.err_code === 1){
          this.$message.error('找不到文章')
        }
      } catch (error) {
        this.$message.warning('文章列表错误')
      }
    },
    async submitForm() {
      try {
        const {data: res} =  await this.axios.post('addComment', { content: this.comment , id: this.$route.params.id})
        if(res.err_code === 0){
          this.$message.success(res.message)
          location.reload()
        }
        
      } catch (error) {
        console.log(error)
      }
    },
    timestampToTime(timestamp) {
 
        const  date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
  }
}
</script>

<style scoped>
.contanier{
  width: 70rem;
  margin: 0 auto;
}
.content{
  width: 72%;
  float: left;
}
.md-body{
  text-align: left;
}
.auther{
  float:right;
  width: 25%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bottom{
  padding-top: 1rem;
  text-align: center;
}
.button{
  margin-left: 5rem;
}
.stars{
  text-align: left;
  margin-top: 2rem;
  cursor: pointer;
}
.oldComment{
  margin-top: 1rem;
}
.item{
text-align: left;
color: #666;
}
.comment{
  text-align: left;
}
.comment .el-button{
  margin-top: 1rem;
}
</style>