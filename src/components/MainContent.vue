<template>
  <el-card class="box-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新" name="first">最新</el-tab-pane>
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
      activeName: 'first'
    }
  }
}
</script>

<style scoped>
.el-card{
  width: 72%;
  float: left;
}
</style>