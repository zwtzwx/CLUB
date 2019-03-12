import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 用户 token
        token: '',
        // 用户基本信息
        user: {
            name: '',
            headpic: '',
            description: '',
            integray: 0
        }
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});