<template>
  <header>
    <ul class="operate-list">
      <li><a>首页</a></li>
      <li @click="register(0)"><a>注册</a></li>
      <li @click="register(1)"><a>登录</a></li>
    </ul>
  </header>
</template>
<script>
import editLogin from '../lib/proxy/login.js';
export default {
  methods: {
    register (type = 0) {
      editLogin(type);
    }
  }
}
</script>
<style lang="scss">
@import "../sass/_variable.scss";
// @import "../sass/comment.scss";
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
      cursor: pointer;
      a {
        color: $gray;
      }
    }
  }
}

</style>
