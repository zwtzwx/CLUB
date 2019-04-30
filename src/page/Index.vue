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
import MyHeader from './common/header';
import MyLeft from './common/left';
import MyRight from './common/right';
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
</style>

