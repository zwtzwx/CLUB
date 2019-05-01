<template>
  <el-dialog :title="isLogin ? '登录' : '注册'"
    :visible.sync="loginVisible"
    width="300px"
    custom-class="login-dialog"
    @close="resetForm"
    >
    <div class="login" v-if="isLogin">
      <el-form>
        <el-form-item >
          <el-input placeholder="请输入用户名或邮箱" autofocus v-model="loginInfo.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password" v-model="loginInfo.password" @keyup.enter.native="signIn"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="signIn">登录</el-button>
      </el-form>
      <p class="other">
        已有账号？<span class="link" @click="isLogin = false">登录</span>
        <span class="link forget">忘记密码</span>
      </p>
    </div>
    <div class="register" v-else>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入邮箱" 
          type="email" v-model="registerMail" autofocus
          @input="checkMail" @keyup.enter.native="signUp"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" :disabled="correctMail" @click="signUp" :loading="btnLoading">注册</el-button>
      </el-form>
      <p class="other link" @click="isLogin = true">已有账号？登录</p>
    </div>
    
  </el-dialog>
</template>
<script>
import getKey from '../lib/key';
import { log } from 'util';
export default {
  data () {
    return {
      loginVisible: true,
      isLogin: false,
      loginInfo: {
        name: '',
        password: ''
      },
      registerMail: '',
      correctMail: true,
      btnLoading: false
    }
  },
  methods: {
    // 注册
    signUp () {
      // 获取验证码
      this.btnLoading = true;
      this.$json.post('/mail/send', {
        mail: this.registerMail
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: 'success',
        });
        this.btnLoading =false;
      }).finally(() => {
        this.btnLoading = true;
      })
    },
    // 登录
    signIn () {
      this.loginInfo.name = this.loginInfo.name.replace(/\s+/g, '');
      this.loginInfo.password = this.loginInfo.password.replace(/\s+/g, '');
      if (!this.loginInfo.name || !this.loginInfo.password) {
        return this.$message({
          message: '用户名和密码不能为空',
          type: 'error'
        });
      }
      // 将用户名(邮箱)密码加密
      const userKey = getKey(this.loginInfo.name, this.loginInfo.password);
      this.$json.post('/user/signin', {
        userKey
      }).then((res) => {
        
        if (res.ret) {
          // 获得后台传过来的 token 保存在本地
          this.$store.commit('saveToken', res.data.token);
          // 保存用户信息
          this.$store.commit('saveUserInfo', res.data.info);
          this.loginVisible = false;
          // 跳转到首页
          // this.$router.replace({name: 'home'});
          // window.location.href = '/';
          this.$router.go(0)
        }
      })
    },
    checkMail () {
      // 检查邮箱
      let mailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (mailReg.test(this.registerMail)) {
        this.correctMail = false;
      }
    },
    resetForm () {
      // 关闭之前重置表单
      this.correctMail = true;
      this.registerMail = '';
      this.loginInfo.name = this.loginInfo.password = '';
    }
  }
}
</script>
<style lang="scss">
.login-dialog {
  .btn {
    width: 100%;
  }
  input, button {
    border-radius: 0;
  }
  .other {
    text-align: center;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .link {
    color: #007fff;
    cursor: pointer;
  }
  .forget {
    float: right;
  }
}
</style>


