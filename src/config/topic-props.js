export const SELECT_PROPS = {}

export const FILL_PROPS = {
  /* 控制类props */
  /** 控制直接显示正确答案，优先级高于controlAnswered */
  controlShowRightAnswer: {
    type: Boolean,
    default: false
  }
}

export const JUDGE_PROPS = {}

export const ANALYSIS_PROPS = {
  /** 控制类props */
  /** 是否显示老师批阅 */
  controlShowTeacherAnswer: {
    type: Boolean,
    default: false
  },

  /** 提目状态 */
  controlStatus: {
    type: String,
    default: '0'
  }
}

export const GROUP_PROPS = {
  /* 控制类props */
  /** (wap组合题中)是否显示子题目 */
  controlShowSubTitle: {
    type: Boolean,
    default: true
  },
   /** (组合题中)大题顶部状态栏 */
   controlShowGroupStatus:{
    type: Boolean,
    default: true
  },
}

export const BASE_PUBLIC_PROPS = {
  /** 是否显示拍照作答按键 */
  controlShowPictureAnswer: {
    type: Boolean,
    default: false
  },
  showSheet:{
    type: Boolean,
    default: true
  },
  controlLimit:{
    type: Boolean,
    default: true
  },
  /** 是否显示题目要求 */
  controlTopicRequest: {
    type: Boolean,
    default: false
  },
  /** 未作答、已作答标志，true为已作答 */
  controlAnswered: {
    type: Boolean,
    default: false
  },
  /** 题目对象 */
  dataSubject: {
    type: Object,
    default: () => {
      return {}
    }
  },
  /** 控制类props */
  /** 学生作答上传图片之后轮询传入图片数组 */
  dataStudentAnswer: {
    type: Array,
    default: () => {
      return []
    }
  },
  /** 题目索引 （wap端需要传入当前索引和题目总数以/分割） 使用时需设置controlShowTitle为true */
  dataRankSting: {
    type: String,
    default: '1.'
  },
  /** 题目选项的宽度，百分比展示，默认100%，可根据剩余宽度自动调整间距 */
  dataWidth: {
    type: Number,
    default: 100
  },
  /* 控制类props */
  /** 是否显示title */
  controlShowTitle: {
    type: Boolean,
    default: true
  },
  /** 是否显示底部解析 */
  controlShowBottom: {
    type: Boolean,
    default: false
  },
  /** 是否显示标题样式 */
  controlShowStyle: {
    type: Boolean,
    default: true
  },
  /** (wap端用于组合题小题显示)组合题右边小题和题目总数显示 */
  dataSubInnerIndexRight: {
    type: String,
    default: ''
  },
  /** 是否显示组合题的小题题目前面的序号 */
  controlIsGroup: {
    type: Boolean,
    default: true
  },
  /** 是否显示分数 */
  controlShowScore: {
    type: Boolean,
    default: true
  },
  /** 改变音频播放时长后是否自动播放 */
  controlAutoPlay: {
    type: Boolean,
    default: true
  },
  /* 样式类props */
  /** 自定义类名 */
  styleSetClass: {
    type: String,
    default: ''
  },
  /** 是否显示顶部答题状态 */
  controlShowStatus: {
    type: Boolean,
    default: false
  },
  /** 是否显示题目来源 */
  controlShowSource: {
    type: Boolean,
    default: true
  }
}
