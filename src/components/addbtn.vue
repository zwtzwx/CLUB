<template>
  <div class="add-btn" @click="clickMethod">
    <span class="add">+</span>
    <el-button size="small">{{ text }}</el-button>
  </div>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
      clickMethod () {
        // if (!this.text) {
        //   this.$router.push(this.router)
        // } else {
        //   this.$emit('click')
        // }
        this.$emit('click')
      }
    }
  }
</script>
<style lang="scss">
@import '../sass/_variable.scss';
.add-btn {
  background: $white;
  margin: 1.5em 1em;
  border: 1px solid $hr;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  .add {
    border-right: 1px solid $hr;
    font-size: 17px;
    vertical-align: middle;
    padding: 0.1em 0.4em;
    color: $font-color;
  }
  .el-button {
    border-radius: 0;
    border: none;
    font-size: 12px;
    color: $font-color;
    vertical-align: middle;
  }
  &:hover {
    border: 1px solid $light-blue;
    .add {
      color: $light-blue;
      border-right: 1px solid $light-blue;
    }
    .el-button {
      color: $light-blue;
    }
  }
}
</style>
