// 导入定义的路由守卫
import { createPageLoadingGuard } from './page-loading-guard'
import { createPageTitleGuard } from './page-title-guard'
import { createPermissionGuard } from './permission-guard'

/**
 * 配置并应用路由守卫到Vue应用的路由实例。
 *
 * @param {VueRouter} router - Vue 应用的路由实例。
 */
export function setupRouterGuard(router) {
  // 应用页面加载状态的路由守卫，用于控制页面加载进度条
  createPageLoadingGuard(router)
  // 应用权限控制的路由守卫，用于管理访问权限和重定向未授权的访问
  createPermissionGuard(router)
  // 应用页面标题更新的路由守卫，用于根据当前路由动态更新页面标题
  createPageTitleGuard(router)
}
