import fetch from '../index'

export const getTopic = data => fetch.get('/html/parper/info', {
  parper_id: 38
}, {
  baseUrl: 'http://xthk-learning-api-pub_1.dev.xthktech.cn'
})

