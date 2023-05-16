import Vue from 'vue'
import router from '@/router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'//默认读取index
import App from './App.vue'
import { Message } from 'element-ui' // 引入消息插件
import 'element-ui/lib/theme-chalk/index.css' // 样式必须引入，否则插件不生效
// import env from './env'

const mock = false;
if (mock) {
  require('./mock/api')
}

// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL


// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  // 获取路径，此处使用的是哈希路由 => 比如：/#/xxx
  let path = location.hash
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    if (path != '#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  } else {
    Message.warning(res.msg)
    return Promise.reject(res)
  }
}, (error) => {//error是http状态码的拦截请求  
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
})

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueLazyLoad, {
  loading: require('../src/assets/imgs/loading-svg/loading-bars.svg')
})
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
