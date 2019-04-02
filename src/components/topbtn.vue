<template>
  <!-- 回退到顶部标志 -->
  <div class="to-top" v-show="isBottom" @click="toTop">
    <i class="el-icon-arrow-up"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBottom: false
    }
  },
  created () {
    this.toTopListen();
  },
  methods: {
    toTopListen () {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 200) {
          this.isBottom = true;
        }else {
          this.isBottom = false;
        }
      });
    },
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.to-top {
  width: 50px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: fixed;
  right: 30px;
  bottom: 50px;
  text-align: center;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}
</style>

