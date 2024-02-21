// 从项目的环境变量中获取应用的基本标题
const baseTitle = import.meta.env.VITE_APP_TITLE

/**
 * 创建并配置页面标题的全局路由守卫。
 *
 * @param {VueRouter} router - Vue 应用的路由实例。
 */
export function createPageTitleGuard(router) {
  // 使用router的全局后置守卫，在每次路由跳转完成后设置页面标题
  router.afterEach((to) => {
    // 尝试从即将进入的路由的元信息中获取页面标题
    const pageTitle = to.meta?.title
    // 如果在路由元信息中定义了页面标题
    if (pageTitle) {
      // 将文档标题设置为“页面标题 | 基本标题”
      document.title = `${pageTitle} | ${baseTitle}`
    } else {
      // 如果没有定义页面标题，就只使用基本标题
      document.title = baseTitle
    }
  })
}
