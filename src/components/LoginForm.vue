<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
    <el-form-item label="邮箱" prop="email" required>
      <el-input v-model="loginForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('loginForm')">登入</el-button>
      <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
name: 'LoginFrom',
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
      loginForm: {
        password: '',
        email: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('login', this.loginForm)
          .then(response=> {
            const { data: res } = response
            if(res.err_code === 1){
              this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
              });
            }
            else{
              this.$message({
              showClose: true,
              message: '恭喜你，登入成功',
              type: 'success'
              });
              sessionStorage.setItem('token', res.token)
              this.$router.push('/')
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

<style scoped>

  .el-form-item{
    width: 20rem;
  }
</style>