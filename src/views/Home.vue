<template>
  <div class="home">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import AppMain from '../components/AppMain'

export default {
  name: 'Home',
  components: {
    AppHeader,
    AppMain
  }
}
</script>
<style scoped>
</style>
