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
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}]">
              <el-input placeholder="请输入6~16位密码" type="password" v-model="registerInfo.password"></el-input>
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
import JSEncrypt from 'jsencrypt';
import qs from 'qs';
const publicKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDtI22xdRNAKZ356DaTHj+hhSlXwTfyHOcBWJmAnudWlm/eSX2w
ZO2dt63dhdPPGBdA7bxYaamVmmNHIvyTt0JINXpGreufVWrVtYAfnzyYoc82VbtI
AHUTI/AlLfzYYjn9W6nBDuvL1Sfqk71cGcgJEzurUE9w6XVFLzDqzHi1JQIDAQAB
AoGBANwmae23TNniSQD67b+C83vWDd2kSXYCEwuS318jJo2iN9Tb0U3zRQ2IumbP
mSXHrb7fdl12KrPyknw2JNpV5bcuP99b7en4NFhTVAsevnvYSQLehp81FD7ILDqE
BRcbglOEDWxXKIJkwfwlcJoWMezd9C7reoE9ZAxx1CpB4ajBAkEA+DOIRUP4qj+r
tgyKDKmSbcUmNnUrTi1trtw/9Cpf342GVgncK6x0ah9VU2xo2LpEhkpC9y+TUddI
hJNfv5Ik/QJBAPSW6LRi/dVLQe6i5JJOg2bn5GpU36DWXo6jkwZW4TonTmiPAMgh
RG2QnrZe1lx6n3LCPrPaAfaeqTAUGuihnUkCQQCPT6oCXJHrM6JhFnJrh0n+SdSb
oyHjHQX07kWbJRCAk0YazcysBwKc+ASbi8AqS7sfUyfBdF365nR/4Fxrz+W9AkEA
370EFa7QH8L+Bvu/Nw7XKNVLnvEQuCIg0T5UieIDmZzHHuJhhrDX1ZoLdSv/zwzk
uqdxkDgGv8CXZ8Gcc90S8QJAea15jizW5qx55vgBsCBei4bq9HyLg2LHCxVdBiEv
KCiZ0ou8Z321eTqVEasvwOhLwqRXb9E+qKKt5xBiZJKTVQ==
-----END RSA PRIVATE KEY-----`;
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
          // 将用户名和密码进行加密传输
          let encrypt = new JSEncrypt();
          
          
          // 设置公钥
          encrypt.setPublicKey(publicKey);
          let userInfo = `${this.registerInfo.username}@${this.registerInfo.password}`;
          // // 使用公钥加密
          const encryKey = encrypt.encrypt(userInfo);
          this.$json.post('/user/signup', {
            userInfo: {
              ...this.urlParames,
              key: encryKey
            }
          }).then((res) => {
            console.log(res.publicKey);
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
@import '../sass/comment.scss';
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
