// 从router配置文件中导入router实例
import { router } from '@/router'

/**
 * 重定向到登录页面
 *
 * 参数说明: 无
 *
 * 返回值说明:
 * @returns {void} - 该函数没有返回值
 */
export function toLogin() {
  // 使用router实例的replace方法来更改当前的路由
  // replace方法确保用户在点击浏览器后退按钮时，不会返回到被替换的路由
  router.replace({ path: '/login' })
}
