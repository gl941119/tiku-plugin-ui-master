import Vue from 'vue'
import Router from 'vue-router'
import Answer from '../views/answer'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Answer
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
