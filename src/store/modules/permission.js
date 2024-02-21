import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'

/**
 * 判断给定的路由是否可以被某个角色访问
 *
 * 参数说明:
 * @param {Object} route - 单个路由对象
 * @param {String} role - 用户的角色
 *
 * 返回值说明:
 * @returns {Boolean} - 如果角色可以访问路由，则为true；否则为false
 */
function hasPermission(route, role) {
  // 从路由的meta属性中获取该路由所需的角色列表
  const routeRole = route.meta?.role ? route.meta.role : []
  // 如果用户角色列表为空，或路由没有定义所需角色，则认为没有权限
  if (!role.length || !routeRole.length) {
    return false
  }
  // 检查用户的角色是否在路由的角色列表中
  return role.some((item) => routeRole.includes(item))
}

/**
 * 根据用户角色过滤异步路由表
 *
 * 参数说明:
 * @param {Array} routes - 待过滤的路由数组
 * @param {String} role - 用户的角色
 *
 * 返回值说明:
 * @returns {Array} - 过滤后的路由数组
 */
function filterAsyncRoutes(routes = [], role) {
  const ret = [] // 存储过滤后的路由
  routes.forEach((route) => {
    if (hasPermission(route, role)) {
      const curRoute = { ...route, children: [] }
      // 递归过滤子路由
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, role)
      } else {
        Reflect.deleteProperty(curRoute, 'children')
      }
      ret.push(curRoute)
    }
  })
  return ret
}

// 定义Pinia状态管理的store
export const usePermissionStore = defineStore('permission', {
  // 定义状态
  state() {
    return {
      accessRoutes: [], // 用户有权访问的路由列表
    }
  },
  // 定义计算属性
  getters: {
    // 计算全部路由（基础路由+有权限的异步路由）
    routes() {
      return basicRoutes.concat(this.accessRoutes)
    },
    // 计算菜单项（过滤掉隐藏的路由）
    menus() {
      return this.routes.filter((route) => route.name && !route.isHidden)
    },
  },
  // 定义动作
  actions: {
    // 生成基于角色的访问路由
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
  },
})

// 权限判断：通过 hasPermission 函数判断某个路由是否可以被特定角色访问。这依赖于路由对象的 meta.role 属性，该属性定义了可以访问该路由的角色列表。

// 路由过滤：filterAsyncRoutes 函数根据用户的角色过滤出可访问的路由。它递归地检查每个路由（及其子路由），只保留那些用户有权限访问的路由。

// 状态管理：usePermissionStore 利用 Pinia 管理应用的路由权限状态，包括计算出的可访问路由列表（accessRoutes）和菜单项（menus）。

// 动态路由和菜单生成：状态存储中的 generateRoutes 动作基于用户角色动态生成访问路由，并更新状态中的 accessRoutes。这些路由随后可用于 Vue Router 或 UI 组件来动态展示导航菜单。
