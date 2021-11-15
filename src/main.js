import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* 自适应文件 */
import '@/assets/js/rem.js'
/* 引入样式文件 */
import '_scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
