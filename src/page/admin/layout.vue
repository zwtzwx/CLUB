<template>
  <div class="layout">
    <el-container class="container">
    <el-header class="layout-header" height="65px">
      <my-header></my-header>
    </el-header>
    <el-container>
      <el-aside width="200px" class="layout-side">
        <el-menu
        :default-active="defaultIndex"
        background-color="#0088CC"
        text-color="#fff"
        active-text-color="#333"
        @select="onNav">
          <el-menu-item index="1">板块管理</el-menu-item>
          <el-menu-item index="2">用户管理</el-menu-item>
          <el-menu-item index="3">话题管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
import { Container, Header, Main, Aside, Menu, MenuItem } from 'element-ui'
import MyHeader from '../common/header'
export default {
  data () {
    return {
      // defaultIndex: '1'
    }
  },
  components: {
    [Container.name]: Container,
    [Header.name]: Header,
    [Main.name]: Main,
    [Aside.name]: Aside,
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    MyHeader
  },
  methods: {
    onNav (index, indexPath) {
      let name = 'sectionconfig'
      switch(index) {
        case '2':
          name = 'userconfig'
          break
        case '3':
          name = 'topicconfig'
          break
        default:
          name = 'sectionconfig'
      }
      this.$router.push({ name })
    }
  },
  computed: {
    defaultIndex () {
      let path = this.$route.path.split('/')[2]
      let index
      switch(path) {
        case 'section':
          index = '1'
          break
        case 'user':
          index = '2'
          break
        case 'topic':
          index = '3'
          break
        default:
          index = '1'
          break
      }
      return index
    }
  }
}
</script>
<style lang="scss">
.layout {
  width: 100%;
  height: 100%;
  .container {
    height: 100%;
  }
  .layout-header {
    padding: 0;
  }
  .layout-side {
    background-color: #0088CC;
    text-align: center;
  }
  .el-menu {
    border-right: none;
  }
  .layout-main {
    background-color: #fff;
    padding: 40px 40px 0 40px;
  }
}
</style>
