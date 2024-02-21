// 导入需要用到的模块和函数
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import { getToken, removeToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'

// 定义不需要登录验证的白名单路由
const WHITE_LIST = ['/login']

/**
 * 创建并应用一个全局的路由守卫，用于权限控制。
 *
 * @param {VueRouter} router - Vue 应用的路由实例。
 */
export function createPermissionGuard(router) {
  // 获取用户状态和权限状态的存储
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 注册全局前置守卫
  router.beforeEach(async (to, from, next) => {
    // 尝试获取token
    const token = getToken()
    // 如果存在token，表示用户已登录或之前登录过
    if (token) {
      // 如果当前路由是登录页，则重定向到首页
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 检查用户信息是否已加载
        if (userStore.userId) {
          next()
        } else {
          // 尝试加载用户信息
          await userStore.getUserInfo().catch((error) => {
            // 获取用户信息失败，移除token并跳转到登录页
            removeToken()
            toLogin()
            $message.error(error.message || '获取用户信息失败！')
            return
          })
          // 动态添加可访问路由
          const accessRoutes = permissionStore.generateRoutes(userStore.role)
          accessRoutes.forEach((route) => {
            !router.hasRoute(route.name) && router.addRoute(route)
          })
          // 添加处理未找到的路由
          router.addRoute(NOT_FOUND_ROUTE)
          // 重新定位到当前路由，确保添加的路由被应用
          next({ ...to, replace: true })
        }
      }
    } else {
      // 用户未登录，检查当前路由是否在白名单中
      if (WHITE_LIST.includes(to.path)) {
        // 在白名单中直接放行
        next()
      } else {
        // 不在白名单中重定向到登录页
        next({ path: '/login' })
      }
    }
  })
}
