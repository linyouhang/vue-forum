<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
    <el-form-item label="邮箱" prop="email" required>
      <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname" required>
      <el-input v-model="ruleForm.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" required>
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required>
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'From',
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        email: '',
        nickname: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min:3, max:5, message: '长度在3到5个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('register', this.ruleForm)
          .then(response=> {
            const { data: res } = response
            if(res.err_code === 1){
              this.$message({
              showClose: true,
              message: '邮箱已存在',
              type: 'error'
              });
            }else if(res.err_code === 2){
              this.$message({
              showClose: true,
              message: '昵称已存在',
              type: 'error'
              });
            }else{
              this.$message({
              showClose: true,
              message: '恭喜你，注册成功',
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