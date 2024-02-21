// 从Pinia库中导入defineStore，用于定义状态存储
import { defineStore } from 'pinia'
// 导入用于获取用户信息的API函数
import { getUser } from '@/api/user'
// 导入用于移除token的工具函数
import { removeToken } from '@/utils/token'
// 导入用于重定向到登录页的函数
import { toLogin } from '@/utils/auth'

/**
 * 定义并导出一个使用Pinia的用户状态存储
 *
 * 参数说明: 无
 *
 * 返回值说明:
 * @returns {Store} - Pinia用户状态存储实例
 */
export const useUserStore = defineStore('user', {
  // 定义存储的状态
  state() {
    return {
      userInfo: {}, // 初始的用户信息为空对象
    }
  },
  // 定义基于状态的计算属性
  getters: {
    userId() {
      // 返回用户ID
      return this.userInfo?.id
    },
    name() {
      // 返回用户名
      return this.userInfo?.name
    },
    avatar() {
      // 返回用户头像URL
      return this.userInfo?.avatar
    },
    role() {
      // 返回用户角色数组，如果未定义则默认为空数组
      return this.userInfo?.role || []
    },
  },
  // 定义修改状态的方法
  actions: {
    // 异步获取用户信息并更新状态
    async getUserInfo() {
      try {
        const res = await getUser() // 调用API函数获取用户信息
        if (res.code === 0) {
          // 如果响应代码为0，表示成功获取用户信息
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role } // 更新用户信息状态
          return Promise.resolve(res.data) // 返回获取到的用户信息
        } else {
          // 如果响应代码不为0，表示获取用户信息失败
          return Promise.reject(res)
        }
      } catch (error) {
        // 捕获并返回异步操作中的错误
        return Promise.reject(error)
      }
    },
    // 异步登出操作
    async logout() {
      removeToken() // 移除token
      this.userInfo = {} // 清空用户信息状态
      toLogin() // 重定向到登录页
    },
    // 设置用户信息
    setUserInfo(userInfo = {}) {
      // 使用展开运算符合并现有用户信息和新用户信息
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
