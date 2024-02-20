module.exports = {
  // 表示這是ESLint的根設定檔，ESLint將不再往父目錄查找其他的設定檔
  root: true,

  // 擴展一組特定的規則集。這裡擴展了適用於Vue 3的推薦規則
  extends: ['plugin:vue/vue3-recommended'],

  // 自定義的規則設定
  rules: {
    // 將 prettier 的規則設置為警告。這樣，當代碼不符合 prettier 的格式時，ESLint 將會顯示警告而不是錯誤
    'prettier/prettier': 'warn',

    // 禁用規則：檢查Vue模板根元素的有效性。此設定表示不檢查模板根元素是否有效
    'vue/valid-template-root': 'off',

    // 禁用規則：不允許模板中有多個根元素。在Vue 3中，這是允許的，所以這裡關閉此規則
    'vue/no-multiple-template-root': 'off',

    // 自定義規則：要求組件名必須是多單詞的，除了忽略的名單之外。這是為了避免與HTML原生標籤衝突，提高組件名的可讀性和可維護性
    'vue/multi-word-component-names': [
      'error', // 違反這條規則時，將會拋出錯誤
      {
        ignores: ['index', '401', '404'], // 這裡設定忽略的組件名。即使是單詞名稱，只要列在這個列表中，就不會報錯
      },
    ],
  },
}
