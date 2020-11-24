<template>
  <div>
    <AppHeader></AppHeader>
    <el-form :model="articleForm" label-position="left" status-icon :rules="rules" ref="articleForm">
      <el-form-item label="标题" prop="title" required >
        <el-input v-model="articleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" required>
        <el-input 
        v-model="articleForm.content" 
        type="textarea"
        :rows="40"
        placeholder="请输入内容,支持markdown语法"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('articleForm')">发表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'

export default {
  components: {
    AppHeader
  },
  created() {
    this.getUser()
  },
  data() {
    return {
      articleForm: {
        title: '',
        auther: '',
        content: ''
      },

      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [ 
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min:20, message: '最少20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUser() {
      try {
          const { data:res } = await this.axios.get('getuser')
          if(res.err_code === 0){
            this.articleForm.auther = res.user.nickname
          }
      } catch (error) {
        this.$message.warning('未登入')
      } 
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.articleForm)
          this.axios.post('addArticle', this.articleForm)
          .then(response=> {
            const { data: res } = response
            if(res.err_code === 0){
              this.$message({
                showClose: true,
                message: '恭喜你，修改成功',
                type: 'success'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
  width: 70rem;
}
.el-button{
  float: left;
}
</style>