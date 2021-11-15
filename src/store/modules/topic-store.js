import { getTopicFile } from '@/libs/utils/handle-topic.js'
import { MATERIAL_TYPE } from '@/config/subject-config'

const { BODY_AUDIO, ANALYSIS_VIDEO, ANALYSIS_AUDIO } = MATERIAL_TYPE

export default {
  state: {
    audioList: {},
    currentTopic: {},
    isWifi: true // 默认是wifi环境
  },
  getters: {
    getAudioList: state => state.audioList,
    getCurrentTopic: state => state.currentTopic,
    getIsWifi: state => state.isWifi
  },
  mutations: {
    setAudioList (state, value) {
      state.audioList[value.url] = value
    },
    setCurrentTopic (state, value) {
      state.currentTopic = value
    },
    setIsWifi (state, value) {
      state.isWifi = value
    }
  },
  actions: {
    fetchCurrentTopic: async ({ commit }, value) => {
      /** 先设置一次，避免请求vod资源过慢导致展示问题 */
      commit('setCurrentTopic', { ...value })
      if (!(value.body_audio || value.analysis_audio || value.analysis_video)) {
        const temp = await getTopicFile(value.topic_file)
        value.body_audio = temp[BODY_AUDIO]
        value.analysis_audio = temp[ANALYSIS_AUDIO]
        value.analysis_video = temp[ANALYSIS_VIDEO]
      }
      commit('setCurrentTopic', { ...value })
    }
  }
}
