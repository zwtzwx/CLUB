<template>
  <div class="setting">
    <my-header></my-header>
    <div class="main-box">
      <!-- 设置个人信息 -->
      <div class="personal-set">
        <p class="title user-title">个人信息</p>
        <el-form label-width="80px" class="personal-form">
          <el-form-item label="头像:">
            <el-upload
              class="avatar-uploader"
              :action="`${clientApi}/user/avatar`"
              :show-file-list="false"
              :headers="header"
              name="avatar"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="userInfo.avatar" :src="`${avatarURL}/${userInfo.avatar}`" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="tips">图片大小不能超过<span style="color: red">1M</span></div>
          </el-form-item>
          <el-form-item label="用户名:">
            <el-input v-model="userInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:">
            <el-input v-model="userInfo.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="个性签名:">
            <el-input type="textarea" :autosize="{ minRows: 2 }" v-model="userInfo.descript"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="btnLoading" size="small" @click="onPersonalSet">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 更改密码 -->
      <section class="password-set">
        <p class="title">修改密码</p>
        <el-form label-width="80px" class="personal-form">
          <el-form-item label="当前密码:">
            <el-input type="password" v-model="password.old"></el-input>
          </el-form-item>
          <el-form-item label="新密码:">
            <el-input type="password" v-model="password.new"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="btnLoading" size="small" @click="onPassword">更改密码</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
import MyHeader from '@/page/common/header.vue'
import getKey from '@/lib/key'
import { Upload } from 'element-ui'
import { avatarURL, clientApi } from '@/lib/axios/base_url.js'
export default {
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        descript: ''
      },
      password: {
        old: '',
        new: ''
      },
      header: {
        Authorization: this.$store.state.token || localStorage.getItem('gen_id')
      },
      clientApi,
      avatarURL,
      btnLoading: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$form.get('/user/user-info').then(res => {
        if (res.ret) {
          this.userInfo.id = res.data.id
          this.userInfo.name = res.data.name
          this.userInfo.email = res.data.email
          this.userInfo.avatar = res.data.pic
          this.userInfo.descript = res.data.descript
        }
      })
    },
    // 头像上传前, 图片大小不能超过1M
    beforeAvatarUpload (file) {
      const isLt1M = file.size / 1024 / 1024 <= 1
      if (!isLt1M) this.$message.error('图片大小不能超过1M')
      return isLt1M
    },
    // 头像上传成功
    handleAvatarSuccess (res) {
      this.$message.success(res.msg)
      this.userInfo.avatar = res.data
    },
    // 修改个人信息
    onPersonalSet () {
      this.btnLoading = true
      this.$json.put('/user/user-info', {
        avatar: this.userInfo.avatar,
        id: this.userInfo.id,
        descript: this.userInfo.descript
      }).then(res => {
        if (res.ret) {
          this.$message.success(res.msg)
        }
      }).finally(() => {
        this.btnLoading = false
      })
    },
    // 修改密码
    onPassword () {
      this.btnLoading = true
      if(!this.password.old.trim() || !this.password.new.trim()) {
        this.$message.info('密码不能为空!!')
        return
      }
      // 将密码用公钥加密
      const oldPasswd = getKey(this.password.old)
      const newPasswd = getKey(this.password.new)
      this.$json.put(`/user/password`, {
        id: this.userInfo.id,
        old: oldPasswd,
        new: newPasswd
      }).then(res => {
        if (res.ret) {
          this.$message.success(res.msg)
        }
        // 退出登录
        this.$store.commit('saveToken', '')
        this.$store.commit('saveUserInfo', {})
        localStorage.removeItem('gen_id')
        localStorage.removeItem('SUID')
        this.$router.replace({ name: 'home' })
      }).finally(() => {
        this.btnLoading = false
      })
    }
  },
  components: {
    MyHeader,
    [Upload.name]: Upload
  }
}
</script>
<style lang="scss">
.setting {
  // .title {
  //   padding: 10px;
  //   background-color: #fafafa;
  //   font-size: 14px;
  //   color: #0366d6;
  // }
  .personal-set, .password-set {
    background-color: #fff;
    border-radius: 4px;
  }
  .password-set {
    margin-top: 30px;
  }
  .personal-form {
    width: 500px;
    margin: 20px auto;
    padding-bottom: 30px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
