<template>
  <el-dialog :title="isLogin ? '登录' : '注册'"
    :visible.sync="loginVisible"
    width="300px"
    custom-class="login-dialog"
    >
    <div class="login" v-if="isLogin">
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名或邮箱" autofocus></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn">登录</el-button>
      </el-form>
      <p class="other">
        已有账号？<span class="link" @click="isLogin = false">登录</span>
        <span class="link forget">忘记密码</span>
      </p>
    </div>
    <div class="register" v-else>
      <el-form>
        <el-form-item>
          <el-input placeholder="用户名" autofocus></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="邮箱" type="email" v-model="registerInfo.mail"></el-input>
        </el-form-item>
        <el-form-item style="position:relative">
          <el-input placeholder="验证码"></el-input>
          <button class="send-code-btn link" type="button" @click="getCode">获取验证码</button>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn">注册</el-button>
      </el-form>
      <p class="other link" @click="isLogin = true">已有账号？登录</p>
    </div>
    
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      loginVisible: true,
      isLogin: false,
      loginInfo: {

      },
      registerInfo: {
        mail: ''
      }
    }
  },
  methods: {
    getCode () {
      // 获取验证码
      this.$json.post('/web/mail/send', {
        mail: this.registerInfo.mail
      }).then(() => {

      })
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
  .send-code-btn {
    border: none;
    position: absolute;
    outline: none;
    font-size: 15px;
    height: 80%;
    right: 1px;
    top: 5px;
    background-color: #fff;
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


