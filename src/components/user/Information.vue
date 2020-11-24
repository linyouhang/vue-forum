<template>
  <el-card>
    <div slot="header">
      <span>个人信息</span>
    </div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="ruleForm.email" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname" required>
        <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="ruleForm.gender" :label="-1">保密</el-radio>
        <el-radio v-model="ruleForm.gender" :label="1">男</el-radio>
        <el-radio v-model="ruleForm.gender" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.bio">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">应用修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'Information',
  created() {
    this.getUser()
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      let emailRE= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!value) {
        return callback(new Error('请输入邮箱'))
      }else if(!emailRE.test(value)) {
        return callback(new Error('请输入正确的邮箱'))
      }else{
        callback()
      }
    }
    return {
      ruleForm: {
        id: this.$route.params.id,
        nickname: '',
        email: '',
        gender: '',
        bio: ''
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min:3, max:5, message: '长度在3到5个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUser() {
      try {
          const { data:res } = await this.axios.get('getuser')
          if(res.err_code === 0){
            this.ruleForm.nickname = res.user.nickname
            this.ruleForm.email = res.user.email
            this.ruleForm.bio = res.user.bio
            this.ruleForm.gender = res.user.gender
          }
      } catch (error) {
        this.$message.warning('未登入')
      } 
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('update', this.ruleForm)
          .then(response=> {
            const { data: res } = response
            if(res.err_code === 2){
              this.$message({
              showClose: true,
              message: '昵称已存在',
              type: 'error'
              });
            }else{
              this.$message({
              showClose: true,
              message: '恭喜你，修改成功',
              type: 'success'
              });
            }
          })
          .catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style soped>
  .el-form-item{
    margin: 2rem auto;
    width: 40rem;
  }
</style>