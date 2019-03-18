import $form from 'axios';
import qs from 'qs';
import store from '@/store';
import baseURL from './base_url';
import { Message } from 'element-ui';
$form.defaults.timeout = 10000;
$form.defaults.responseType = 'json';
$form.defaults.baseURL = `${baseURL}/web`;

// 表单提交方式
$form.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
$form.defaults.transformRequest = [
    function (params) {
        return qs.stringify(params);
    }
];

// JSON 提交方式
let $json = $form.create({

    baseURL: `${baseURL}/web`,
    headers: {
        ['Content-Type']: 'application/json; charset=utf-8'
    },
    transformRequest: [
        function (params) {
            return JSON.stringify(params);
        }
    ]
});
const defaultMsg = '服务器错误，请重新连接服务器';

// 配置拦截器
function interceptorsRequestSuccess (config) {
    config.headers['Authorization'] = store.state.token || localStorage.getItem('gen_id');
    return config;
}

function interceptorsResponseSuccess (response) {
    if (!response.data.ret) {
        const msg = response.data.msg || defaultMsg;
        !response.config.no_message && Message({ message: msg, type: 'error' });
        return Promise.reject(response.data);
    }
    return response.data;
}

function interceptorsResponseError (error) {
    if (!error.request) return;
    if (error.request.status !== 401) {
        const msg = error.response.data.msg ||  defaultMsg;
        !error.config.no_message && Message({ message: msg, type: 'error' });
    }
    return Promise.reject(error.response.data);
}

$json.interceptors.request.use(interceptorsRequestSuccess);
$json.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError);

$form.interceptors.request.use(interceptorsRequestSuccess);
$form.interceptors.response.use(interceptorsResponseSuccess, interceptorsResponseError);

export {$form, $json };

export default function (Vue) {
    Vue.prototype.$form = $form;
    Vue.prototype.$json = $json;
} 