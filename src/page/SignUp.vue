<template>
    <div>
      <my-header></my-header>
      <div class="main-box signup">
        <div class="content">
          <h3>用户注册</h3>
          <p class="mail">邮箱：{{ urlParames ? urlParames.email: '' }}</p>
          <el-form class="signup-form" :model="registerInfo" ref="signupForm" :rules="rule">
            <el-form-item prop="username" :rules="{ required: true, message: '用户名不能为空', trigger: 'blur' }">
              <el-input placeholder="用户名" v-model="registerInfo.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '长度至少6位字符', trigger: 'blur'}]">
              <el-input placeholder="至少6位字符" type="password" v-model="registerInfo.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirm">
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
import getKey from '../lib/key';
export default {
  data () {
    let checkPasswd = (rule, value, callback) => {
      if (value !== this.registerInfo.password) {
        callback(new Error('两次输入密码不一致！'));
      }else {
        callback();
      }
    };
    return {
      registerInfo: {
        username: '',
        password: '',
        confirm: ''
      },
      rule : {
        confirm: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPasswd, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (!this.urlParames.code || !this.urlParames.email || Object.keys(this.urlParames).length != 2) {
      // 不是合法进入注册页面跳转到首页
      this.$router.replace({ path: '/' });
    }
  },
  methods: {
    signUp () {
      this.$refs['signupForm'].validate((valid) => {
        if (valid) {
          delete this.registerInfo.confirm;
          // 使用公钥加密密码
          const encryKey = getKey(this.registerInfo.password);
          this.$json.post('/user/signup', {
            userInfo: {
              ...this.urlParames,
              name: this.registerInfo.username,
              password: encryKey
            }
          }).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            // 注册成功，跳转到首页
            this.$router.replace({ path: '/' });
          })
        }
      });
    }
  },
  components: {
    MyHeader
  },
  computed: {
    urlParames () {
      return qs.parse(window.location.href.split('?')[1]);
    }
  }
}
</script>
<style lang="scss">
.signup {
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
  .content {
    width: 50%;
    margin: 20px auto;
  }
  .mail {
    color: #0371df;
    line-height: 30px;
  }
}
</style>
