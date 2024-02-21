<template>
  <!-- 外层容器，使用flex布局使内容居中 -->
  <div flex h-full>
    <!-- 登录表单容器，灰色背景，居中显示，设定宽度和内边距 -->
    <div m-auto bg-gray-100 w-350 flex flex-col items-center border border-gray-300 p-30 rounded-10>
      <!-- 显示页面标题 -->
      <h5 text-24 font-normal color="#6a6a6a">
        {{ title }}
      </h5>
      <!-- 用户名输入框 -->
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.name"
          autofocus
          class="text-16 items-center h-50 pl-10"
          placeholder="admin"
          :maxlength="20"
        >
        </n-input>
      </div>
      <!-- 密码输入框 -->
      <div mt-30 w-full>
        <n-input
          v-model:value="loginInfo.password"
          class="text-16 items-center h-50 pl-10"
          type="password"
          show-password-on="mousedown"
          placeholder="123456"
          :maxlength="20"
          @keydown.enter="handleLogin"
        />
      </div>
      <!-- 记住我选择框 -->
      <div mt-20 w-full>
        <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />
      </div>
      <!-- 登录按钮 -->
      <div mt-20 w-full>
        <n-button w-full h-50 rounded-5 text-16 type="primary" @click="handleLogin">登录</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入登录API函数
import { login } from '@/api/auth'
// 导入本地存储工具函数
import { lStorage } from '@/utils/cache'
// 导入设置Token的工具函数
import { setToken } from '@/utils/token'
// 导入Vue的响应式引用函数
import { ref } from 'vue'
// 导入Vue Router的钩子函数，用于在组件内部获取路由实例
import { useRouter } from 'vue-router'

// 从环境变量中获取并设置页面标题
const title = import.meta.env.VITE_APP_TITLE

// 获取路由实例
const router = useRouter()

// 定义登录信息的响应式引用，包括用户名和密码
const loginInfo = ref({
  name: '',
  password: '',
})

// 组件初始化时调用initLoginInfo函数，以尝试从本地存储中恢复登录信息
initLoginInfo()

/**
 * 初始化登录信息
 * 尝试从本地存储中读取登录信息并填充到loginInfo响应式引用中
 */
function initLoginInfo() {
  // 从本地存储中获取名为'loginInfo'的登录信息
  const localLoginInfo = lStorage.get('loginInfo')
  // 检查是否成功获取到了登录信息
  if (localLoginInfo) {
    // 如果获取到了登录信息，则将获取到的用户名赋值给loginInfo.value.name
    // 如果localLoginInfo.name不存在，则默认为空字符串''
    loginInfo.value.name = localLoginInfo.name || ''
    // 如果获取到了登录信息，则将获取到的密码赋值给loginInfo.value.password
    // 如果localLoginInfo.password不存在，则默认为空字符串''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

// 定义是否记住登录信息的响应式引用，默认为false
const isRemember = ref(false)

/**
 * 处理登录逻辑
 * 验证输入，调用登录API，处理登录成功或失败的情况
 */
async function handleLogin() {
  const { name, password } = loginInfo.value
  // 验证用户名和密码是否输入
  if (!name || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    // 调用登录API
    const res = await login({ name, password: password.toString() })
    // 登录成功处理逻辑
    if (res.code === 0) {
      $message.success('登录成功')
      // 设置Token到本地存储
      setToken(res.data.token)
      // 根据是否记住登录信息，决定是否在本地存储中保存登录信息
      if (isRemember.value) {
        lStorage.set('loginInfo', { name, password })
      } else {
        lStorage.remove('loginInfo')
      }
      // 登录成功后跳转到首页
      router.push('/')
    } else {
      // 登录失败显示错误信息
      $message.warning(res.message)
    }
  } catch (error) {
    // 登录过程中出现异常，显示错误信息
    $message.error(error.message)
  }
}
</script>
