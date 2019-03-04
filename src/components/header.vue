<template>
  <header>
    <ul class="operate-list">
      <li>首页</li>
      <li>注册</li>
      <li>登录</li>
    </ul>
  </header>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import "../sass/_variable.scss";
@import "../sass/comment.scss";
header{
  height: 60px;
  background-color: #fff;
  border-top: 2px solid $main-color;
  box-shadow: 0 2px 2px #ccc;
  .operate-list {
    list-style-type: none;
    float: right;
    line-height: 60px;
    margin: 0;
    margin-right: 50px;
    li {
      display: inline-block;
      padding: 0 10px;
    }
  }
}

</style>
