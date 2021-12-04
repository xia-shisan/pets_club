import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/iconfont/iconfont.css'

// 过滤器
import * as filters from '@/filters'
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
