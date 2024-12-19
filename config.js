module.exports = {
  types: [
    { value: '✨ feat: ', name: '✨ feat: 新功能' },
    { value: '🐛 fix:', name: '🐛 fix: 修正bug' },
    { value: '📦️ build: ', name: '📦️ build: 打包' },
    { value: '⚡️ perf:', name: '⚡️ perf: 性能優化' },
    { value: '🎉 release:', name: '🎉 release: 發布正式版' },
    { value: '💄 style:', name: '💄 style: 程式碼的樣式美化' },
    { value: '♻️ refactor:', name: '♻️ refactor: 重構' },
    { value: '✏️ docs:', name: '✏️ docs: 文件變更' },
    { value: '✅ test:', name: '✅ test: 測試' },
    { value: '⏪️ revert:', name: '⏪️ revert: 回話退' },
    { value: '🚀 chore:', name: '🚀 chore: 建置/工程依賴/工具' },
    { value: '👷 ci:', name: '👷 ci: CI related changes' }
  ],
  messages: {
    type: '請選擇提交類型(必填)',
    customScope: '請輸入檔案修改範圍(可選)',
    subject: '請簡單描述提交(必填)',
    body: '請輸入詳細描述(可選)',
    breaking: '列出任何BREAKING CHANGES(可選)',
    footer: '請輸入要關閉的issue(可選)',
    confirmCommit: '確定提交此說明嗎？ '
  },
  allowCustomScopes: true,
  // 跳過問題
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72
}
