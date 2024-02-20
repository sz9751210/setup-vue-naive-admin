<template>
  <!-- 使用AppProvider組件來包裹應用的主體，以獲取上文定義的全局配置和方法 -->
  <AppProvider>
    <!-- 使用n-space組件來創建按鈕間的間隔 -->
    <n-space m-50>
      <!-- 定義了多種不同類型的按鈕，以展示Naive UI按鈕的多樣性 -->
      <n-button>Default</n-button>
      <n-button type="tertiary"> Tertiary </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </AppProvider>
</template>

<script setup>
import { onMounted } from 'vue'
import AppProvider from '@/components/AppProvider/index.vue'

// 當組件掛載完成後，啟動加載條，並在500毫秒後完成加載並顯示成功消息
onMounted(() => {
  $loadingBar.start()
  setTimeout(() => {
    $loadingBar.finish()
    $message.success('加载完成，Perfect~')
  }, 500)
})
</script>
