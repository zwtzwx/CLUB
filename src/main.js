import Vue from 'vue';
import axios from './lib/axios';
import VueRouter from 'vue-router';
import MavonEditor from 'mavon-editor'
import router from './router';
import App from './App.vue';
import store from './store';
import baseURL from './lib/axios/base_url';
import {
  Form, FormItem, Input, Button, Tag, Pagination,
  Icon, Dialog, Message
} from 'element-ui';

Vue.use(VueRouter);
Vue.use(axios);
Vue.use(MavonEditor);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Dialog);

Vue.prototype.$message = Message;
Vue.prototype.$baseURL = baseURL;
// 初始化 TOKEN
store.commit('initToken');
// 初始化个人信息
store.dispatch('getUser');

// 2019-04-19T06:16:51.000Z
Vue.filter('formateDate', function (value) {
  if (!value) return ''
  return value.split('T').join(' ').split('.')[0]
})
new Vue({
  router,
  store,
  template: '<app />',
  components: {
    App
  }
}).$mount('#app')

