import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import {XtConfirm,XtMessage} from  '../components/wap/components/xt/index'
Vue.prototype.$confirm = XtConfirm()
Vue.prototype.$message = XtMessage()
/* 自适应文件 */
import '@/assets/js/rem.js'
/* 引入样式文件 */
import '_scss/h5/index.scss'
import VConsole from 'vconsole'
new VConsole()

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
