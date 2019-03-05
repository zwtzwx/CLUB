import Vue from './common';
import VueRouter from 'vue-router';
import router from './lib/router';

Vue.use(VueRouter);
new Vue({
  router,
  data: {
    isBottom: false
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
}).$mount('#app');

