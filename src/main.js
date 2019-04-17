import Vue from 'vue';
import axios from './lib/axios';
import VueRouter from 'vue-router';
// import VueQuillEditor from 'vue-quill-editor';
import MavonEditor from 'mavon-editor'
import router from './router';
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

const toolBarOption = [
  ['bold', 'italic', 'underline', 'strike', 'code', 'link'],
  ['blockquote', 'code-block'],
  [{'header': 1}, {'header': 2}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{ 'color': [] }, { 'background': [] }],
  [{'script': 'sub'}, {'script': 'super'}],
  [{'indent': '-1'}, {'indent': '+1'}],
  ['image', 'clean']
]

// Vue.use(VueQuillEditor, {
//   modules: {
//     toolbar: toolBarOption
//   },
//   theme: 'snow'
// });
Vue.prototype.$message = Message;
Vue.prototype.$baseURL = baseURL;
// 初始化 TOKEN
store.commit('initToken');
// 初始化个人信息
store.dispatch('getUser');

new Vue({
  router,
  store,
  el: '#app'
})

