<template>
  <div class="input-search">
    <el-input :placeholder="placeholder" v-model="searchContent" @keyup.native.enter="goSearch">
      <el-button slot="append" icon="el-icon-search" size="small" @click="goSearch"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    goSearch () {
      // if (!this.searchContent) return
      this.$emit('search', this.searchContent)
    }
  }
}
</script>
<style lang="scss">
.input-search {
  width: 200px;
  float: right;
}
</style>
