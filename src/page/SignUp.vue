<template>
    <div>
      <my-header></my-header>
      <div class="main-box signup">
        <div class="content">
          <h3>用户注册</h3>
          <el-form class="signup-form" :model="registerInfo" ref="signupForm">
            <el-form-item prop="username" :rules="{ require: true, message: '用户名不能为空' }">
              <el-input placeholder="用户名" v-model="registerInfo.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="{ require: true, message: '密码不能为空' }">
              <el-input placeholder="密码" type="password" v-model="registerInfo.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirm" :rules="{ require: true, message: '请输入确认密码' }">
              <el-input placeholder="确认密码" type="password" v-model="registerInfo.confirm"></el-input>
            </el-form-item>
            <el-button type="primary" @click="signUp">立即注册</el-button>
          </el-form>
        </div>
      </div>
    </div>
</template>
<script>
import MyHeader from '../components/header';
import qs from 'qs';
export default {
  data () {
    return {
      registerInfo: {
        username: '',
        password: '',
        confirm: ''
      }
    }
  },
  methods: {
    signUp () {
      let params = qs.parse(window.location.href.split('?')[1]);
      this.$refs['signupForm'].validate((valid) => {
        if (!valid) return false;
      });
      if (this.registerInfo.password != this.registerInfo.confirm) {
        this.$message({
          message: '两次输入的密码不一致',
          type: 'error'
        });
      }
      delete this.registerInfo.confirm;
      this.$json.post('/web/signup', {
        userInfo: {
          ...params,
          ...this.registerInfo
        }
      })

    }
  },
  components: {
    MyHeader
  }
}
</script>
<style lang="scss">
@import '../sass/comment.scss';
.signup {
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
  .content {
    width: 50%;
    margin: 20px auto;
  }
}
</style>
