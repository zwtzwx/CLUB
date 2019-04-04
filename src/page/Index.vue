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
    <!-- 底部 toTop 标识 -->
    <to-top></to-top>
  </div>
</template>
<script>
import MyHeader from '@/components/header';
import MyLeft from '@/components/left';
import MyRight from '@/components/right';
import ToTop from '@/components/topbtn'
export default {
  data() {
    return {
      isLogin: false
    }
  },
  components: {
    MyHeader,
    MyLeft,
    MyRight,
    ToTop
  },
  created () {
    // 初始化获取用户信息
    
  }
}
</script>
<style lang="scss">
main {
  overflow: hidden;
}
</style>

