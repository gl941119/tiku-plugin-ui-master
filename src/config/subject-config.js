import { REVIEW_RIGHT_ANSWER } from './answer-config'

/* 题目类型(单选) */
export const QUESTION_TYPE_SINGLE = 1
/* 题目类型(多选) */
export const QUESTION_TYPE_MULTIPLE = 2
/* 题目类型(判断) */
export const QUESTION_TYPE_JUDGE = 3
/* 题目类型(填空) */
export const QUESTION_TYPE_FILL = 4
/* 题目类型(简答) */
export const QUESTION_TYPE_ANALYSIS = 5
/* 题目类型(组合) */
export const QUESTION_TYPE_GROUP = 6

/* 题目类型(线下题) */
export const QUESTION_TYPE_OFFLINE = 7
export const QUESTION_TYPE_SELF = 8

/* 题目类型对象 类型字段为key 中文题型为value */
export const SUBJECT_TYPE = {
  '1': '单选题',
  '2': '多选题',
  '3': '判断题',
  '4': '填空题',
  '5': '简答题',
  '6': '组合题',
  '7': '线下题',
  '8': '自主作答'
}
/* 简答题、线下题基本状态顺序 0-5-1-2（3）-4 */
/* 客观题基本状态顺序 0-2（3）-4 */


/** 部分正确 */
export const PART_RIGHT = '1'

/* 是否答对 */
export const RIGHTSTATUS = REVIEW_RIGHT_ANSWER

/** 组合题是否有作答 */
export const GROUP_HAS_ANSWER = '1'

/** 音视频类型 */
export const MATERIAL_TYPE = {
  BODY_AUDIO: '1',
  ANALYSIS_VIDEO: '2',
  ANALYSIS_AUDIO: '3'
}
