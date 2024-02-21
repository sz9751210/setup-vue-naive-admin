<template>
  <div p-35>
    <!-- 显示当前用户的角色 -->
    <n-gradient-text flex items-center text-26 type="info">
      我的角色是：<n-gradient-text type="error">{{ userStore.name }}</n-gradient-text>
    </n-gradient-text>

    <!-- 显示用户有权限访问的页面列表 -->
    <n-gradient-text text-16 mt-10 type="info">我有这些页面的权限：</n-gradient-text>
    <ul mt-10>
      <li
        v-for="item in permissionStore.menus"
        :key="item.name"
        cursor-pointer
        hover-color-red
        @click="$router.push(item.path)"
      >
        {{ item.meta?.title }}
      </li>
    </ul>

    <!-- 提供一个按钮让用户注销登录 -->
    <n-button type="info" mt-20 size="small" @click="logout">换个角色看看</n-button>
  </div>
</template>

<script setup>
import { usePermissionStore } from '../../store/modules/permission'
import { useUserStore } from '../../store/modules/user'

// 使用Pinia的store
const permissionStore = usePermissionStore()
const userStore = useUserStore()

// 定义注销登录的函数
function logout() {
  userStore.logout() // 调用userStore中的logout方法执行注销逻辑
  $message.success('已退出登录') // 显示成功注销的消息提示
}
</script>
