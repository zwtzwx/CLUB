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
  Icon, Dialog, Message, Loading, Notification
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
Vue.use(Loading)

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$baseURL = baseURL;
// 初始化 TOKEN
store.commit('initToken');
// 初始化个人信息
store.dispatch('getUser');

// 2019-04-19T06:16:51.000Z(2019-04-19 06:16:51) 不是年月日格式的 
Vue.filter('formateTime', function (value) {
  if (!value) return ''
  return value.split('T').join(' ').split('.')[0]
})
// 2019-04-19T06:16:51.00Z 2019年4月19日
// Vue.filter('formateDate', function (value) {
//   if (!value) return ''
//   console.log(value, 111)
//   let dateList = value.split('T')[0].split('-')
//   if (dateList[1].indexOf('0') === 0) {
//       dateList[1] = dateList[1].slice(1)
//   }
//   if (dateList[2].indexOf('0') === 0) {
//       dateList[2] = dateList[2].slice(1)
//   }
//   dateList.splice(1, 0, '年')
//   dateList.splice(3, 0, '月')
//   dateList.push('日')
//   return dateList.join('')
// })
new Vue({
  router,
  store,
  template: '<app />',
  components: {
    App
  }
}).$mount('#app')

