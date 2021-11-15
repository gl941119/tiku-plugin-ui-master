import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
/* 按照模块进行路由加载 */
// import personalCenter from './modules/personal-center'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
