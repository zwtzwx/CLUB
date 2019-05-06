<template>
  <header>
    <div class="main-box">
      <ul class="operate-list">
        <li><router-link to="/">首页</router-link></li>
        <li>
          <el-input
            v-model="title"
            size="small"
            placehoder="文章标题"
            @keyup.enter.native="articleSearch"
            suffix-icon="el-icon-search">
            <i slot="suffix" class="el-icon-seach" @click.native="articleSearch"></i>
          </el-input>
        </li>
        <template v-if="!userInfo.name">
          <li @click="register(0)">注册</li>
          <li @click="register(1)">登录</li>
        </template>
        <li v-else style="position:relative">
          <div class="dropdown">
            <div class="dropdown-link" @click="dropdown = !dropdown">
              <img src="../../asset/images/default-avatar.svg" class="headpic">
              <i class="el-icon-arrow-down" style="font-size: 20px;"></i>
            </div>
            <div v-show="dropdown" style="height: 177px">
              <ul class="dropdown-menu">
                <li>用户：{{ userInfo.name }}</li>
                <li class="dropdown-menu-item"><router-link :to="`/user/${userInfo.name}`"><i class="iconfont icon-user"></i>主页</router-link></li>
                <li class="dropdown-menu-item"><router-link :to="`/setting`"><i class="el-icon-setting"></i>设置</router-link></li>
                <li class="dropdown-menu-item" @click="signOut"><i class="iconfont icon-logout"></i>登出</li>
              </ul>
              <span class="arrow"></span>
              <span class="arrow arrow-white"></span>
            </div>
          </div>
        </li>
        
      </ul>
    </div>
  </header>
</template>
<script>
import editLogin from '@/lib/proxy/login.js';
import { mapState } from 'vuex';
export default {
  props: ['query'],
  data() {
    return {
      dropdown: false,
      title: this.query || ''
    }
  },
  methods: {
    register (type = 0) {
      editLogin(type);
    },
    // 登出
    signOut () {
      this.$store.commit('saveToken', '');
      this.$store.commit('saveUserInfo', {});
      localStorage.removeItem('gen_id');
      localStorage.removeItem('SUID');
      window.location.href = '/';
    },
    // 搜索文章（根据标题）
    articleSearch () {
      if (!this.title) return
      // 去搜索页
      if (this.$route.name === 'topicsearch') {
        this.$emit('search', this.title)
      } else {
        this.$router.push({ name: 'topicsearch', query: { query: this.title } })
      }
    }
  },
  computed: {
    headPic () {
      return this.$store.state.user['headpic'] || 'default-avatar.svg';
    },
    userInfo () {
      return this.$store.state.user
    }
  }
}
</script>
<style lang="scss">
@import '@/sass/_variable.scss';
header{
  height: 60px;
  background-color: #fff;
  border-top: 2px solid $main-color;
  box-shadow: 0 2px 2px #ccc;
  .main-box {
    width: $main-width;
    margin: 0 auto;
  }
  .operate-list {
    list-style-type: none;
    float: right;
    margin: 0;
    >li {
      line-height: 60px;
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
  .headpic {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: relative;
    top: 10px;
  }
  // 下拉列表
  .dropdown-menu {
    position: absolute;
    width: 100px;
    line-height: 20px;
    right: 0;
    top: 60px;
    width: 150px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid rgba(177,180,185,.45);
    box-shadow: 0 3px 12px rgba(27,31,35,.15);
    color: #333;
    li {
      box-sizing: border-box;
      padding: 10px;
      cursor: pointer;
    }
  }
  .dropdown-menu-item {
    i {
      font-size: 26px;
      position: relative;
      top: 3px;
      margin-right: 10px;
    }
    a {
      color: #333;
    }
    &:hover {
      background-color: $main-color;
      a {
        color: #fff;
      }
    }
  }
  .arrow {
    position: absolute;
    top: 50px;
    right: 37px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 11px solid #bbb;
  }
  .arrow-white {
    top: 52px;
    border-bottom-color: #fff;
  }
}

</style>
