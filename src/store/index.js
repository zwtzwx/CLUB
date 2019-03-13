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
        },
        saveToken(state, data) {
            state.token = data;
            localStorage.setItem('gen_id', data);
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
                }).catch((err) => {
                    console.log(err.message);
                    
                })
            }
        }
    }
});