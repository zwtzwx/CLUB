import Vue from '../../common';
import LoginDialog from '../../components/Login.vue';

const LoginConstructor = Vue.extend(LoginDialog);



let login; 

/**
 * params type = 1: 登录 type = 0 注册
 */
const showLogin = (listType = 0) => {
  if  (!login) {
    login = new LoginConstructor({
      el: document.createElement('div')
    });
  }
  console.log(listType);
  
  login.isLogin = !!listType;
  login.loginVisible = true;
  document.body.appendChild(login.$el);
}

export default showLogin;
