import Vue from './common';
import VueRouter from 'vue-router';
import router from './lib/router';
import store from './store';

Vue.use(VueRouter);

// 初始化 TOKEN
store.commit('initToken');
// 初始化个人信息
store.dispatch('getUser');

new Vue({
  router,
  store,
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

