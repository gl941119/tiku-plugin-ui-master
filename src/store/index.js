import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import TopicStore from './modules/topic-store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    TopicStore
  }
})
