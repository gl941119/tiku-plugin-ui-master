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
    },
    {
      path: '/ty',
      name: 'h5-answer',
      component: () => import(/* webpackChunkName: "h5Answer" */ '../views/h5-answer/index-copy.vue')
    },
    {
      path: '/offline',
      name: 'offline-answer',
      component: () => import(/* webpackChunkName: "h5Answer" */ '../views/offline-answer/index.vue')
    },
    {
      path: '/gl',
      name: 'gl',
      component: () => import(/* webpackChunkName: "h5Answer" */ '../views/offline-answer/gl.vue')
    },
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
