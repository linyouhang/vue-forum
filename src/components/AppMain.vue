<template>
  <div class="container">
    <MainContent></MainContent>
    <SideContent></SideContent>
  </div>
</template>

<script>
import MainContent from './MainContent'
import SideContent from './SideContent'

export default {
  components: {
    MainContent,
    SideContent
  }
}
</script>

<style scoped>
.container{
  max-width: 70rem;
  margin: 0 auto;
}

</style>