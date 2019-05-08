<template>
    <div>
      <my-header></my-header>
      <div class="main-box forget-box">
        <div class="content">
          <h3>忘记密码</h3>
          <!-- <p class="mail">邮箱：{{ urlParames ? urlParames.email: '' }}</p> -->
          <el-form class="signup-form" label-width="100px" :model="forgetInfo" ref="forgetForm" :rules="rule">
            <el-form-item prop="password" label="新密码" :rules="[
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '长度至少6位字符', trigger: 'blur'}]">
              <el-input placeholder="至少6位字符" type="password" v-model="forgetInfo.password"></el-input>
            </el-form-item>
            <el-form-item prop="confirm" label="确认密码">
              <el-input type="password" v-model="forgetInfo.confirm"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onForget">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>
<script>
import MyHeader from './common/header';
import qs from 'qs';
import getKey from '../lib/key';
export default {
  data () {
    let checkPasswd = (rule, value, callback) => {
      if (value !== this.forgetInfo.password) {
        callback(new Error('两次输入密码不一致！'));
      }else {
        callback();
      }
    };
    return {
      forgetInfo: {
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
      // 不是合法页面跳转到首页
      this.$router.replace({ path: '/' });
    }
  },
  methods: {
    onForget () {
      this.$refs['forgetForm'].validate((valid) => {
        if (valid) {
          // 使用公钥加密密码
          const encryKey = getKey(this.forgetInfo.password);
          this.$json.post('/user/forget', {
            userInfo: {
              ...this.urlParames,
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
.forget-box {
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
  .content {
    width: 50%;
    margin: 20px auto;
  }
}
</style>
