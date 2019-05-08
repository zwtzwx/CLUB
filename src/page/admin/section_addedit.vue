<template>
  <div class="admin-section-add">
    <el-form label-width="80px" class="section-form">
      <el-form-item label="版块名：">
        <el-input v-model="sectionName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" class="submit-btn" @click="onSection">{{ btnName }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sectionName: ''
    }
  },
  created () {
    if (this.$route.name === 'sectionedit') {
      this.getSection()
    }
  },
  methods: {
    // 获取板块信息
    getSection () {
      this.$form.get(`admin/section/${this.$route.query.id}`).then(res => {
        if (res.ret) {
          this.sectionName = res.data.name
        }
      })
    },
    // 添加、修改板块
    onSection () {
      if (!this.sectionName) return this.$message.info('请输入板块名!')
      let [method, url] = this.btnName === '添加' ? ['post', 'admin/section'] : ['put', `admin/section/${this.$route.query.id}`]
      this.$json[method](url, {
        name: this.sectionName
      }).then(res => {
        if (res.ret) {
          this.$notify.success({
            title: '操作成功',
            message: res.msg
          })
        }
        this.$router.go(-1)
      })
    }
  },
  computed: {
    btnName () {
      if (this.$route.name === 'sectionadd') {
        return '添加'
      }else {
        return '修改'
      }
    }
  }
}
</script>
<style lang="scss">
.admin-section-add {
  .section-form {
    width: 400px;
    margin: 30px auto;
  }
  .submit-btn {
    min-width: 100px;
  }
}
</style>
