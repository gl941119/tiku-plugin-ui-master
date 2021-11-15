module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': [0, { vars: 'all', args: 'after-used' }],
    'no-sparse-arrays': [0],
    'no-undef': [0],
    // 空行最多不能超过100行
    'no-multiple-empty-lines': [0, { max: 100 }],
    // 关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    quotes: ['error', 'single'],
    // 强制不使用分号结尾
    semi: ['error', 'never'],
    //关闭强制使用骆驼拼写法命名约定
    'camelcase':[0]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
