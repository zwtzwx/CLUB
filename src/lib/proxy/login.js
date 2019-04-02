import Vue from '../../common';
import LoginDialog from '../../components/Login.vue';
import store from '@/store';
import router from '@/router';
const LoginConstructor = Vue.extend(LoginDialog);

let mixin = {
  store
}

let login; 

/**
 * params type = 1: 登录 type = 0 注册
 */
const showLogin = (listType = 0) => {
  if  (!login) {
    login = new LoginConstructor({
      el: document.createElement('div'),
      router,
      mixins: [mixin]
    });
  }
  login.isLogin = !!listType;
  login.loginVisible = true;
  document.body.appendChild(login.$el);
}

export default showLogin;
