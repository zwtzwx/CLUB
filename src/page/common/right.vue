<template>
  <div class="right main-right">
    <!-- 未登录时显示登录注册、登陆后显示用户信息 -->
    <div class="section auth-section">
      <div  v-if="!authID">
        <div class="title">一个分享和求知的社区</div>
        <div class="select">您可以<a href="#" @click="onSign(1)">登录</a>或<a href="#" @click="onSign(0)">注册</a></div>
      </div>
      <div v-else>
        <div class="title">个人信息</div>
        <div class="user">
          <div>
            <span class="headpic"><img :src="avatar" alt="avatar"></span>
            <span class="user-name">{{ userInfo.name }}</span>
          </div>
          <div style="line-height: 25px">积分：{{ userInfo.integral }}</div>
          <div style="font-style: italic">"{{ userInfo.descript }}"</div>
        </div>
      </div>
    </div>
    <!-- 发布帖子，只在登录的情况下显示 -->
    <div class="section" v-if="authID">
      <el-button type="primary" plain size="small" @click="topicAdd">发布话题</el-button>
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
       <div class="integral-item" v-for="(item, index) in integrayList" :key="index">
         <span class="integral">{{ item.integral }}</span>
         <span class="name">{{ item.name }}</span>
       </div>
    </div>
  </div>
</template>
<script>
import EditLogin from '@/lib/proxy/login';
// import { userInfo } from 'os'
import { avatarURL } from '@/lib/axios/base_url.js'
 export default {
  data() {
    return {
      userInfo: {
        // id: '',  // 用户 ID,
        name: '',  // 用户名
        pic: '',  // 用户头像
        integral: 0,  // 用户积分
        descript: ''  // 用户个性签名
      },
      integrayList: []  // 积分排行数组
    }
  },
  mounted() {
    // 如果用户已登录，获取用于信息
    if (this.authID) {
      this.getUserInfo();
    }
    this.getIntegrayList();
  },
  methods: {
    // 根据用户 ID 获取用户信息
    getUserInfo () {
      this.$form.get('/user/user-info').then((res) => {
        if (res.ret) {
          this.userInfo.name = res.data.name;
          this.userInfo.integral = res.data.integral || 0;
          this.userInfo.pic = res.data.pic;
          this.userInfo.descript = res.data.descript || '这个人没留下个性签名！';
        }
      })
    },
    // 获取积分排行榜
    getIntegrayList () {
      this.$form('client/integray').then((res) => {
        if (res.ret) {
          this.integrayList = res.data;
        }
      })
    },
    // 发布话题
    topicAdd () {
      this.$router.push({ name: 'topicadd', params: { id: this.authID } });
    },
    // 登录、注册
    onSign (type) {
      EditLogin(type);
    }
  },
  computed: {
    authID () {
      return localStorage.getItem('SUID') || '';
    },
    avatar () {
      if (this.userInfo.pic) {
        return `${avatarURL}/${this.userInfo.pic}`
      } else {
        return '../../asset/images/default-avatar.svg'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/sass/_variable.scss';
.right {
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
  .integral-item {
    line-height: 28px;
    font-size: 14px;
    color: $gray;
  }
  .integral {
    margin-right: 8px;
  }
  .headpic {
    display: table-cell;
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
  .user-name {
    display: table-cell;
    vertical-align: middle;
    padding-left: 20px;
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
