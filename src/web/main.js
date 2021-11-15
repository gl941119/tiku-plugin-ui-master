import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
/* 引入样式文件 */
import '_scss/web/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
