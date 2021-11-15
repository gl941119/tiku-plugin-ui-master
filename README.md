# 题库插件UI

整个做题包含三个层次
1.组件：，包含选择题，判断题，填空题，简答题（一期不做），答题卡
2.端：手机横屏，竖屏，DA横屏，做题和解析完整功能
3.业务线：各做题业务线
#### 组件部分
组件部分需要支撑各端的使用，尽量做到通用，少量依赖传参，样式端可以自定义

#### 端
要负责所有对应端的做题和解析功能，做题支持外部少许自定义（如倒计时）。解析基本外部直接使用

#### 业务线
当前大概分
课堂测试：
  手机横屏
  手机竖屏
  DA横屏
入学诊断
  手机竖屏
预习，联系，复习
手机竖屏


### 项目说明

src/h5{web}用于区分端
src/components是基础组件，里面区分web和wap
src/entry.js 是对外导出的统一入口

### 开发

npm run serve:web 启动 web 端开发，随后访问
```
  http://localhost:8080/h5
```
npm run serve:h5 启动 h5 端开发，随后访问
```
  http://localhost:8080/h5
```

### 使用
目前主要暴露了H5Answer（h5答题页面，包括横屏与竖屏，可自由切换）、PortraitScreen（h5竖屏答题页面）两个页面，webAnswer（pc端答题页面），使用时按照下面传参即可。其他暴露详情参见src/entry.js。所有UI均以本题库UI为主，功能不够时请使用者及时提出。

props
/** 试卷题目数据 */
topicData: {
  type: Array,
  default: () => []
},
/** 试卷答题倒计时，以秒为单位，有则显示 */
secondTime: {
  type: Number
},
/** 是否显示底部解析 */
controlShowBottom: {
  type: Boolean,
  default: false
},
/** 当前为解析还是作答 */
controlAnswered: {
  type: Boolean,
  default: false
},
/** 是否显示题目顶部状态 */
controlShowStatus: {
  type: Boolean,
  default: false
},
/** 当前显示的题目索引 */
controlCurrentTopicIndex: {
  type: Number,
  default: 0
},

on
submit 提交事件
countdown-over 倒计时结束事件
save(topic) 保存答案事件，topic为题目信息
