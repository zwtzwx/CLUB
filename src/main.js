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
  Icon, Dialog, Message, Loading, Notification, MessageBox
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
Vue.prototype.$confirm = MessageBox.confirm
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
Vue.filter('formateDateTime', function (dateTime) {
  if (!dateTime) return ''
  let dateTimeStamp = new Date(dateTime).getTime()
  let minute = 1000 * 60  // 分钟
  let hour = 60 * minute  // 小时
  let day = hour * 24  // 日
  let month = day * 30  // 月
  let year = month * 12  // 年
  let now = new Date().getTime()  // 当前时间戳
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) return ''
  let yearC = diffValue / year
  let monthC = diffValue / month
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minC
  let result = '刚刚'
  if (yearC >= 1) {
    result = `${Number.parseInt(yearC)}年前`
  }else if (monthC >= 1) {
    result = `${Number.parseInt(monthC)}月前`
  }else if (dayC >= 1) {
    result = `${Number.parseInt(dayC)}天前`
  }else if (minC >= 1) {
    result = `${Number.parseInt(minC)}分钟前`
  }
  return result
})

new Vue({
  router,
  store,
  template: '<app />',
  components: {
    App
  }
}).$mount('#app')

