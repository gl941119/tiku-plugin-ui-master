/* 未作答 */
export const REVIEW_NO_ANSWER = '0'
/* 主观题批阅中 */
export const REVIEW_NO_REVIEW = '1'
/* 主观题待改错 */
export const REVIEW_ERROR_ANSWER = '2'
/* 主观题部分正确待改错状态 */
export const REVIEW_RIGHT_PART_ANSWER = '3'
/*  作答正确 */
export const REVIEW_RIGHT_ANSWER = '4'
/* 主观题待批阅 */
export const REVIEW_TO_READ = '5'
/* 已作答 */
export const HAS_ANSWER = '6'
/* 作答错误 */
export const ERROR_ANSWER = '7'
/* 部分正确 */
export const RIGHT_PART_ANSWER = '8'
/* 未全部作答 */
export const NOT_ALL_ANSWER = '9'


export const CONTROL_TYPE = new Map([
  [REVIEW_NO_ANSWER, { wrapClass: 'circle-notAnswer', name: '未作答' }],
  [REVIEW_NO_REVIEW, { wrapClass: 'circle-readyCorrect', name: '批阅中', badgeClass: 'circle-badge-readyCorrect' }],
  [REVIEW_ERROR_ANSWER, { wrapClass: 'circle-readyWrong', name: '待改错', badgeClass: 'circle-badge-readyWrong' }],
  [REVIEW_RIGHT_PART_ANSWER, { wrapClass: 'circle-portionCorrect-readyWrong', name: '部分正确待改错', badgeClass: 'circle-badge-portionCorrect-readyWrong' }],
  [REVIEW_RIGHT_ANSWER, { wrapClass: 'circle-correct', name: '正确' }],
  [REVIEW_TO_READ, { wrapClass: 'circle-readyCorrect', name: '待批改', badgeClass: 'circle-badge-readyCorrect' }],
  [HAS_ANSWER, { wrapClass: 'circle-hasAnswer', name: '已作答' }],
  [ERROR_ANSWER, { wrapClass: 'circle-wrong', name: '错误' }],
  [RIGHT_PART_ANSWER, { wrapClass: 'circle-portionCorrect', name: '部分正确' }],
  [NOT_ALL_ANSWER, { wrapClass: 'circle-notAllAnswer', name: '未全部作答' }],
])
