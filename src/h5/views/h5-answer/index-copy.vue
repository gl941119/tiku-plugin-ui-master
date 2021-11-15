<template>
  <wap-answer class="wap-answer" :topicData="topicData" @save="handleSave" :controlShowBottom="true" :controlAnswered="true" :controlShowStatus="true"></wap-answer>
</template>

<script>
import { getTopic } from '_axios/mock.js'
import tsconfig from '../../../mock/tsconfig'
import WapAnswer from './index'

export default {
  components: {
    WapAnswer
  },
  data () {
    return {
      topicData: []
    }
  },
  computed: {
  },
  created () {
    this.topicData = [
      {
        'id': 2816,
        'module': '单选题',
        'module_points': 0,
        'exam_paper_topic': []
      },
      {
        'id': 2817,
        'module': '多选题',
        'module_points': 0,
        'exam_paper_topic': []
      },
      {
        'id': 2818,
        'module': '判断题',
        'module_points': 0,
        'exam_paper_topic': []
      },
      {
        'id': 2819,
        'module': '填空题',
        'module_points': 4,
        'exam_paper_topic': [
          {
            'points': 4,
            'exam_paper_topic_option': [
              {
                'id': 4544,
                'points': 2,
                'sort': 1,
                'option_title': '1',
                'is_answer': 1,
                'label': ''
              },
              {
                'id': 4545,
                'points': 2,
                'sort': 1,
                'option_title': '一',
                'is_answer': 1,
                'label': ''
              },
              {
                'id': 4546,
                'points': 2,
                'sort': 2,
                'option_title': '2',
                'is_answer': 1,
                'label': ''
              },
              {
                'id': 4547,
                'points': 2,
                'sort': 2,
                'option_title': '二',
                'is_answer': 1,
                'label': ''
              }
            ],
            'children': [],
            'correct_answer': [
              '1',
              '一',
              '2',
              '二'
            ],
            'student_answer': [],
            'id': 1856,
            'topic_type': 4,
            'topic_body': '<p>唐的填空题<input readonly="readonly" class="custom-fill-slot" value="{(__1__)}"/></p><p>填空题<input readonly="readonly" class="custom-fill-slot" value="{(__2__)}"/></p>',
            'subject_id': 61,
            'topic_analysis': '<p>啊撒大声地撒</p>',
            'parent_id': 0,
            'topic_source_details': '七中',
            'hard_rank': 5,
            'district_title': '四川省,成都市,武侯区',
            'topic_year_id': 9,
            'topic_semester_id': 4,
            'topic_year': {
              'id': 9,
              'title': '2021'
            },
            'topic_semester': {
              'id': 4,
              'title': '一上'
            },
            'knowledge_point': [
              {
                'id': 38,
                'title': '拼音',
                'parent_id': 36,
                'knowledge_tree_id': 1,
                'level_queue': '0.36.38',
                'level_num': 2,
                'sort': 1
              }
            ],
            'topic_file': [
              {
                'id': 116,
                'topic_id': 1856,
                'file_url': 'https://xthk-knowledge-center.oss-cn-shenzhen.aliyuncs.com/topic',
                'path': '/topic',
                'file_purpose': 2,
                'media_id': 'ca222da4df154fab9f3114b49bed4dce',
                'resource_type': 2
              },
              {
                'id': 117,
                'topic_id': 1856,
                'file_url': 'https://xthk-knowledge-center.oss-cn-shenzhen.aliyuncs.com/topic',
                'path': '/topic',
                'file_purpose': 3,
                'media_id': 'af25481c623b4c0fbe9c066b959541b8',
                'resource_type': 2
              }
            ]
          }
        ]
      },
      {
        'id': 2820,
        'module': '简答题',
        'module_points': 0,
        'exam_paper_topic': []
      },
      {
        'id': 2821,
        'module': '组合题',
        'module_points': 4,
        'exam_paper_topic': [
          {
            'points': 4,
            'exam_paper_topic_option': [],
            'children': [
              {
                'topic_parent_id': 6666,
                'points': 2,
                'exam_paper_topic_option': [
                  {
                    'id': 4536,
                    'points': 0,
                    'sort': 1,
                    'option_title': '<p>选我</p>',
                    'is_answer': 1,
                    'label': 'A'
                  },
                  {
                    'id': 4537,
                    'points': 0,
                    'sort': 2,
                    'option_title': '<p>选A</p>',
                    'is_answer': 2,
                    'label': 'B'
                  },
                  {
                    'id': 4538,
                    'points': 0,
                    'sort': 3,
                    'option_title': '<p>选A</p>',
                    'is_answer': 2,
                    'label': 'C'
                  },
                  {
                    'id': 4539,
                    'points': 0,
                    'sort': 4,
                    'option_title': '<p>选A</p>',
                    'is_answer': 2,
                    'label': 'D'
                  }
                ],
                'correct_answer': [
                  'A'
                ],
                'student_answer': [],
                'id': 1854,
                'topic_type': 1,
                'topic_body': '<p>选A</p>',
                'subject_id': 0,
                'topic_analysis': '<p>小题1文字解析</p>',
                'parent_id': 1853,
                'topic_source_details': '',
                'hard_rank': 0,
                'district_title': '',
                'topic_year_id': 0,
                'topic_semester_id': 0,
                'topic_year': null,
                'topic_semester': null,
                'knowledge_point': [],
                'topic_file': []
              },
              {
                'topic_parent_id': 6666,
                'points': 2,
                'exam_paper_topic_option': [
                  {
                    'id': 4540,
                    'points': 0,
                    'sort': 1,
                    'option_title': '<p>选我</p>',
                    'is_answer': 1,
                    'label': 'A'
                  },
                  {
                    'id': 4541,
                    'points': 0,
                    'sort': 2,
                    'option_title': '<p>选我</p>',
                    'is_answer': 1,
                    'label': 'B'
                  },
                  {
                    'id': 4542,
                    'points': 0,
                    'sort': 3,
                    'option_title': '<p>选AB</p>',
                    'is_answer': 2,
                    'label': 'C'
                  },
                  {
                    'id': 4543,
                    'points': 0,
                    'sort': 4,
                    'option_title': '<p>选AB</p>',
                    'is_answer': 2,
                    'label': 'D'
                  }
                ],
                'correct_answer': [
                  'A',
                  'B'
                ],
                'student_answer': [],
                'id': 1855,
                'topic_type': 2,
                'topic_body': '<p>选AB</p>',
                'subject_id': 0,
                'topic_analysis': '<p>小题2文字解析</p>',
                'parent_id': 1853,
                'topic_source_details': '',
                'hard_rank': 0,
                'district_title': '',
                'topic_year_id': 0,
                'topic_semester_id': 0,
                'topic_year': null,
                'topic_semester': null,
                'knowledge_point': [],
                'topic_file': []
              }
            ],
            'correct_answer': [],
            'student_answer': [],
            'id': 1853,
            'topic_type': 6,
            'topic_body': '<p>唐建的组合题</p>',
            'subject_id': 61,
            'topic_analysis': '<p>组合题文字解析</p>',
            'parent_id': 0,
            'topic_source_details': '七中',
            'hard_rank': 4,
            'district_title': '四川省,成都市,武侯区',
            'topic_year_id': 8,
            'topic_semester_id': 4,
            'topic_year': {
              'id': 8,
              'title': '2020'
            },
            'topic_semester': {
              'id': 4,
              'title': '一上'
            },
            'knowledge_point': [
              {
                'id': 38,
                'title': '拼音',
                'parent_id': 36,
                'knowledge_tree_id': 1,
                'level_queue': '0.36.38',
                'level_num': 2,
                'sort': 1
              }
            ],
            'topic_file': [
              {
                'id': 113,
                'topic_id': 1853,
                'file_url': 'https://xthk-knowledge-center.oss-cn-shenzhen.aliyuncs.com/topic',
                'path': '/topic',
                'file_purpose': 1,
                'media_id': '29de8fd25d3446b7a9b1eed05f6c5345',
                'resource_type': 2
              },
              {
                'id': 114,
                'topic_id': 1853,
                'file_url': 'https://xthk-knowledge-center.oss-cn-shenzhen.aliyuncs.com/topic',
                'path': '/topic',
                'file_purpose': 2,
                'media_id': 'dea1757195104c4cab7f050c8619e2d7',
                'resource_type': 2
              },
              {
                'id': 115,
                'topic_id': 1853,
                'file_url': 'https://xthk-knowledge-center.oss-cn-shenzhen.aliyuncs.com/topic',
                'path': '/topic',
                'file_purpose': 3,
                'media_id': 'ecf4d6cf90554dcba496b5bd45cf84cd',
                'resource_type': 2
              }
            ]
          }
        ]
      }
    ]
    // test().then(({ data }) => {
    //   const temp = data.exam_paper_topic_group[0]
    //   this.topicData = [temp, JSON.parse(JSON.stringify(temp))]
    // })
  },
  methods: {
    handleSave (v) {
      console.log(v)
    }
  }
}
</script>
<style lang="scss">
.wap-answer {
  height: 100%;
}
</style>
