<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <main class="main-box">
      <!-- 左侧 -->
      <my-left></my-left>
      <!-- 右侧 -->
      <my-right></my-right>
    </main>
  </div>
</template>
<script>
import MyHeader from '../components/header';
import MyLeft from '../components/left';
import MyRight from '../components/right';

export default {
  components: {
    MyHeader,
    MyLeft,
    MyRight
  }
}
</script>
<style lang="scss">
@import '../sass/comment.scss';
main {
  overflow: hidden;
}
</style>

