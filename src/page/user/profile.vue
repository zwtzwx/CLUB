<template>
  <div class="main-box profile">
    <div class="left">
      <div class="user-info">
        
      </div>
    </div>
    <my-right></my-right>
  </div>
</template>
<script>
import MyRight from '@/components/right.vue';
export default {
  components: {
    MyRight
  }
}
</script>
<style lang="scss" scoped>
.profile {
  .left {
    background-color: #fff;
    float: left;
    width: calc(100% - 290px);
  }
}

</style>

