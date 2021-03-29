// 导入axios    二次封装
import Vue from 'vue';

import axios from 'axios';

// 导入element-ui中的消息提示方法
import { Message } from 'element-ui';

// 配置基础域名
axios.defaults.baseURL='http://localhost:3000/api';

axios.interceptors.request.use(function(config){
    const loginInfo=JSON.parse(localStorage.getItem('loginInfo')|| '{}')
    // 必须通过自定义请求头authorization,将登录凭证发送给数据接口
    config.headers.authorization=loginInfo.token;
    return config;
})

// 响应拦截器
axios.interceptors.response.use(function(response){
    console.log(response);
    // 登录超时
    if(response.data.code===403){
        // 消息提示
        Message({type:'warning',message:response.data.msg})

        // 将页面重定向到登录页
        location.href='#/login';

    }
    return response.data
});


// 将axios挂载到Vue的原型对象上
Vue.prototype.$http=axios;


// 导出
export default axios;