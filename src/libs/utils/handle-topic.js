/**  扁平化题目数据，将有分组的题目数据处理成按顺序无分组的题目数据，返回处理后的题目数据 */
export const flatTopic = (topicData) => {
  const dataSource = []
  Array.isArray(topicData) && topicData.reduce((initial, v) => {
    v.exam_paper_topic.forEach(topic => {
      if (topic) {
        topic.index = initial.length
        topic.subIndex = 0
        initial.push(topic)
      }
    })
    return initial
  }, dataSource)
  return dataSource
}

/**  获取题目数据里的文件 */
export const getTopicFile = async (fileList = []) => {
  const res = {}
  const handleFileUrl = window.$handleFileUrl
  let fetchList = []
  if (handleFileUrl) {
    fetchList = await Promise.allSettled(fileList.map((v) => {
      return handleFileUrl(v)
    }))
  } else {
    throw new Error('请在window挂载$handleFileUrl方法,用于请求vod播放地址，并返回该播放地址')
  }
  fetchList.forEach(v => {
    const { value = {} } = v
    res[value.file_purpose] = { ...value }
  })
  return res
}
