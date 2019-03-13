<template>
  <header>
    <div class="main-box">
      <ul class="operate-list">
        <li><router-link to="/">首页</router-link></li>
        <template v-if="!isLogin">
          <li @click="register(0)">注册</li>
          <li @click="register(1)">登录</li>
        </template>
        <template v-else>
          <li>
            <div>
              <img :src="`/public/images/${headPic}`">
              <i class="el-icon-caret-bottom"></i>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>
<script>
import editLogin from '../lib/proxy/login.js';
export default {
  methods: {
    register (type = 0) {
      editLogin(type);
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user['id'];
    },
    headPic () {
      return this.$store.state.user['headpic'] || 'default-avatar.svg';
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
  .main-box {
    width: $main-width;
    margin: 0 auto;
    overflow: hidden;
  }
  .operate-list {
    list-style-type: none;
    float: right;
    line-height: 60px;
    margin: 0;
    // margin-right: 50px;
    li {
      display: inline-block;
      padding: 0 10px;
      cursor: pointer;
      color: $gray;
      a {
        text-decoration: none;
        color: $gray;
      }
    }
  }
}

</style>
