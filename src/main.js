import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import * as filters from './filters' // global filters

// 注册vue全局函数
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
