// 从vue-router包中导入createRouter和createWebHashHistory函数
import { createRouter, createWebHashHistory } from 'vue-router'
// 从当前目录下的routes.js文件中导入basicRoutes并重命名为routes
import { basicRoutes as routes } from './routes'

/**
 * 创建并导出一个Vue Router实例
 *
 * 使用createWebHashHistory创建基于hash模式的路由历史对象
 * hash模式的URL形如: http://example.com/#/user/id
 *
 * 使用basicRoutes作为路由配置
 *
 * 设置scrollBehavior滚动行为，使得每次导航时页面都滚动到顶部
 */
export const router = createRouter({
  // 配置路由的历史模式为“哈希模式”（Hash Mode），并设置基路径为根路径 '/'。
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 定义并导出一个函数setupRouter，用于将路由实例应用到Vue应用实例上
 *
 * 参数说明:
 * @param {VueApp} app - Vue 应用实例
 *
 * 返回值说明:
 * @returns {void}
 */
export function setupRouter(app) {
  // 使用Vue应用实例的use方法注册路由插件
  app.use(router)
}
