/**
 * 创建并配置页面加载状态的全局路由守卫。
 *
 * @param {VueRouter} router - Vue 应用的路由实例。
 */
export function createPageLoadingGuard(router) {
  // 在每次路由跳转之前，启动加载条
  router.beforeEach(() => {
    // 使用可选链操作符安全地调用start方法，开始显示加载进度
    // 这里假设window.$loadingBar是一个全局可访问的加载条实例
    window.$loadingBar?.start()
  })

  // 在每次路由跳转完成后，结束加载条显示
  router.afterEach(() => {
    // 使用setTimeout延迟200毫秒来结束加载条
    // 这样可以确保加载条有足够的时间展示，即使页面加载非常快
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  // 在路由跳转过程中如果发生错误，显示加载条的错误状态
  router.onError(() => {
    // 使用可选链操作符安全地调用error方法，展示加载进度的错误状态
    window.$loadingBar?.error()
  })
}
