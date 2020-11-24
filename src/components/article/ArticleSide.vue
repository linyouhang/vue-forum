<template>
  <div class="contanier">
    <el-card :body-style="{ padding: '0px' }">
      <el-avatar> user </el-avatar>
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time"></time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.el-card{
  width: 20rem;
  height: 30rem;
}
</style>