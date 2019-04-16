import Vue from 'vue';
import Vuex from 'vuex';
import { rsaVerify } from '@/lib/key';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 用户 token
        token: '',
        // 用户基本信息
        user: {
            id: '',
            name: '',
            headpic: '',
            // description: '',
            // integray: 0
        }
    },
    getters: {

    },
    mutations: {
        initToken(state) {
            state.token = localStorage.getItem('gen_id') || '';
            if (!localStorage.getItem('gen_id')) {
                localStorage.removeItem('SUID');
            }
        },
        saveToken(state, data) {
            state.token = data;
            if (data) {
                localStorage.setItem('gen_id', data);
            }
        },
        saveUserInfo (state, user) {
            state.user.id = user.id;
            state.user.name = user.name;
            state.user.headpic = user.pic;
        }
    },
    actions: {
        getUser(context) {
            if (context.state.token) {
                // 查看 token 中的用户信息
                rsaVerify(context.state.token).then((decoded) => {
                    context.commit('saveUserInfo', decoded);
                    // 保存用户 ID
                    localStorage.setItem('SUID', decoded.id);
                }).catch((err) => {
                    localStorage.removeItem('gen_id');
                    localStorage.removeItem('SUID');
                    // 跳转到首页
                    window.location.href = '/';
                })
            }
        }
    }
});