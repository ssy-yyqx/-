// webpack的入口文件  全部生效

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入重置样式表
import './assets/css/reset.css'

// 导入element
import './utils/element'

// 导入axios的封装代码
import './utils/http'

// 导入数据存储
import store from './store';


// 配置图片基础域名
Vue.prototype.$imgBaseUrl = 'http://localhost:3000'


Vue.config.productionTip = false


// 全局过滤器
Vue.filter("dateFmt", function (time, divider = "-") {
  // console.log(time);
  const date = new Date(Number(time));
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const mm = date.getMinutes();
  const s = date.getSeconds();
  return `${y}${divider}${m}${divider}${d} ${h}:${mm}:${s}`
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  // 挂载数据存储对象
  store
})
