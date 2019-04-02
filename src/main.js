import Vue from './common';
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import store from './store';

Vue.use(VueRouter);

// 初始化 TOKEN
store.commit('initToken');
// 初始化个人信息
store.dispatch('getUser');

new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})

