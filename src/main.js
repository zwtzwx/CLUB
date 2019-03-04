import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './lib/router';


Vue.use(VueRouter);

new Vue({
  router,
}).$mount('#app');