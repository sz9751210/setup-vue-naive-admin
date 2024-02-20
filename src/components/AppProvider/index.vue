<template>
    <!-- 使用n-config-provider組件來提供全局配置，如主題定制 -->
    <n-config-provider :theme-overrides="themeOverrides">
      <!-- 加載條的全局配置 -->
      <n-loading-bar-provider>
        <!-- 對話框的全局配置 -->
        <n-dialog-provider>
          <!-- 通知消息的全局配置 -->
          <n-notification-provider>
            <!-- 消息提示的全局配置 -->
            <n-message-provider>
              <!-- 插槽，用於插入任何需要在提供者內顯示的內容 -->
              <slot></slot>
              <!-- Naive UI 全局方法的初始化組件 -->
              <NaiveProviderContent />
            </n-message-provider>
          </n-notification-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </template>
  
  <script setup>
  import { defineComponent, h } from 'vue'
  import { useLoadingBar, useDialog, useMessage, useNotification } from 'naive-ui'
  
  // 主題定制的配置對象
  const themeOverrides = {
    common: {
      primaryColor: '#316C72FF', // 主色
      primaryColorHover: '#316C72E3', // 主色懸停
      primaryColorPressed: '#2B4C59FF', // 主色按壓
      primaryColorSuppl: '#316C7263', // 補充色
    },
  }
  
  // 在全局對象window上掛載Naive UI的功能方法，以便在全局範圍內使用
  // 將 Naive UI 的幾個核心功能（如加載條、對話框、消息提示和通知）掛載到了 window 對象上。這樣做的目的是為了讓這些功能能夠在 Vue 應用的全局範圍內被方便地調用，而不需要在每個組件中單獨引入和實例化。
  function setupNaiveTools() {
    // 將加載條的實例掛載到 window，使其可以在全局任何地方通過 $loadingBar 調用加載條的方法。
    window.$loadingBar = useLoadingBar()
    // 將對話框的實例掛載到 window，允許在任何組件中直接使用 $dialog 來彈出對話框。
    window.$dialog = useDialog()
    // 將消息提示的實例掛載到 window，使得 $message 可以在應用的任何地方被用來顯示提示消息。
    window.$message = useMessage()
    // 將通知的實例掛載到 window，讓 $notification 能夠在全局範圍內用於彈出通知。
    window.$notification = useNotification()
  }
  
  // 定義一個組件，用於初始化並提供Naive UI的方法
  const NaiveProviderContent = defineComponent({
    setup() {
      setupNaiveTools()
    },
    render() {
      return h('div')
    },
  })
  </script>
  