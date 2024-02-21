// 从user模块的Pinia store中导入useUserStore
import { useUserStore } from '@/store/modules/user'

// 定义一个数组，列出了不需要token验证的API
const WITHOUT_TOKEN_API = [{ url: '/auth/login', method: 'POST' }]

/**
 * 判断给定的API请求是否在不需要token验证的列表中。
 *
 * 参数说明:
 * @param {Object} param - 包含url和method属性的对象。
 * @param {String} param.url - API的URL路径。
 * @param {String} [param.method=''] - HTTP请求方法，默认为空字符串。
 *
 * 返回值说明:
 * @returns {Boolean} - 如果该API请求不需要token验证，则返回true；否则返回false。
 */
export function isWithoutToken({ url, method = '' }) {
  // 使用Array.prototype.some方法检查当前请求是否存在于WITHOUT_TOKEN_API数组中
  // 对比时，将method转换为大写形式进行严格匹配
  return WITHOUT_TOKEN_API.some((api) => api.url === url && api.method === method.toUpperCase())
}

/**
 * 给API请求参数添加基础参数，如userId。
 *
 * 参数说明:
 * @param {Object} params - API请求的参数对象。
 *
 * 返回值说明:
 * @returns {void}
 */
export function addBaseParams(params) {
  // 检查params对象中是否已有userId属性，如果没有，则从user store中获取当前用户的ID并添加到params中
  if (!params.userId) {
    // 使用useUserStore().userId获取当前登录用户的ID
    params.userId = useUserStore().userId
  }
}
