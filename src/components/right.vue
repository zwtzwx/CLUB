<template>
  <div class="right">
    <div class="section auth-section">
      <div  v-if="!authID">
        <div class="title">一个分享和求知的社区</div>
        <div class="select">您可以<a href="#">登录</a>或<a href="#">注册</a></div>
      </div>
      <div v-else>
        <p class="title">个人信息</p>
        <div class="user">
          <div><span class="headpic"></span><span class="user-name"></span></div>
          <div>积分：</div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="top">最热标签</div>
      <div class="tag-list">
        <el-tag class="tag-item">人工智能</el-tag>
        <el-tag class="tag-item">Python</el-tag>
        <el-tag class="tag-item">Golang</el-tag>
        <el-tag class="tag-item">算法</el-tag>
        <el-tag class="tag-item">问答</el-tag>
        <el-tag class="tag-item">前端</el-tag>
      </div>
    </div>
    <div class="section">
       <div class="top">积分排行榜</div>
       <div class="top-item" v-for="item in 10" :key="item">
         <span class="integral">21360</span>
         <span class="name">leapon</span>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        id: '',  // 用户 ID,
        name: '',  // 用户名
        pic: '',  // 用户头像
        integray: 0,  // 用户积分
        descirpt: ''  // 用户个性签名
      }
    }
  },
  mounted() {
    // 如果用户已登录，获取用于信息
    if (localStorage.getItem('SUID')) {
      console.log(true)
      this.getUserInfo();
    }
  },
  methods: {
    // 根据用户 ID 获取用户信息
    getUserInfo () {
      this.$form.get('/user/user-info', {
        params: {
          id: localStorage.getItem('SUID')
        }
      }).then((res) => {
        if (ret) {
          this.userInfo.id = res.data;
        }
      })
    }
  },
  computed: {
    authID () {
      return this.$store.state.user.id || '';
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../sass/_variable.scss';
.right {
  width: 270px;
  float: left;
  box-sizing: border-box;
  margin-left: 20px;
  .section {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
  }
  .title {
    line-height: 30px;
    margin-bottom: 20px;
  }
  .top {
    line-height: 40px;
    border-bottom: $border;
    margin-bottom: 10px;
  }
  .select {
    font-size: 15px;
    a {
      color: $gray;
      text-decoration: none;
      padding: 0 5px;
    }
  }
  .tag-item {
    margin: 5px 5px;
    cursor: pointer;
  }
  .top-item {
    line-height: 28px;
    font-size: 14px;
    color: $gray;
  }
  .integral {
    margin-right: 8px;
  }
  // .el-form-item {
  //   margin-bottom: 10px;
  // }
  // .register-btn {
  //   width: 100%;
  // }
  // .to-login {
  //   margin-top: 10px;
  //   font-size: 15px;
  // }
  // .login-link {
  //   color: $main-color;
  // }
}

</style>
