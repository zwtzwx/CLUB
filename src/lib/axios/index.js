import $form from 'axios';
import qs from 'qs';
import baseURL from './base_url';

$form.defaults.timeout = 10000;
$form.defaults.responseType = 'json';
$form.defaults.baseURL = `${baseURL}`;

// 表单提交方式
$form.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
$form.defaults.transformRequest = [
    function (params) {
        return qs.stringify(params);
    }
];

// JSON 提交方式
let $json = $form.create({

    baseURL: `${baseURL}`,
    headers: {
        ['Content-Type']: 'application/json; charset=utf-8'
    },
    transformRequest: [
        function (params) {
            return JSON.stringify(params);
        }
    ]
});

// 配置拦截器
function interceptorsRequestSuccess (config) {
    return config;
}

function interceptorsResponseSuccess (response) {
    return response.data;
}

function interceptorsResponseError (error) {
    if (!error.request) return;

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