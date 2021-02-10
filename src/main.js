import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式
import './assets/css/globle.css'
//导入触摸移动
import 'default-passive-events'
// 导入store
import store from './store/index'
//导入图片懒加载
import LazyLoad from 'vue-lazyload'

// 导入axios
import axios from 'axios'
// axios.defaults.baseURL = 'https://autumnfish.cn/'
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

// Vue.config.productionTip = false

//图片懒加载的使用
Vue.use(LazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')