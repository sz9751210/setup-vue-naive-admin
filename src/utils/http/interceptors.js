// 引入用於判斷值是否為null或undefined的工具函數
import { isNullOrUndef } from '@/utils/is'
import { isWithoutToken } from './helper'
import { getToken } from '@/utils/token'
import { toLogin } from '@/utils/auth'
/**
 * 請求攔截器的成功處理函數。
 * 為GET請求添加時間戳，防止緩存。
 * @param {Object} config Axios請求配置對象
 * @returns {Object} 修改後的Axios請求配置對象
 */
export function reqResolve(config) {
  // 如果請求方法為GET，則在請求的params中添加一個時間戳參數
  // 防止缓存，给GET请求加上时间戳
  if (config.method === 'get') {
    // 使用展开运算符复制现有的查询参数，然后添加时间戳`t`
    config.params = { ...config.params, t: new Date().getTime() }
  }

  // 处理不需要token的请求
  if (isWithoutToken(config)) {
    // 如果请求被标记为无需Token，则直接返回修改后的配置对象
    return config
  }

  // 尝试从存储中获取Token
  const token = getToken()
  if (!token) {
    // 如果没有Token，视为未登录或Token过期，执行登出操作并跳转到登录页
    toLogin()
    // 返回一个拒绝的Promise，中断请求并带有错误信息
    return Promise.reject({ code: '-1', message: '未登录' })
  }

  // 为请求添加JWT Token认证头部
  // 使用Bearer令牌认证方案，如果headers中已存在Authorization则不覆盖
  config.headers.Authorization = config.headers.Authorization || 'Bearer ' + token

  // 返回修改后的请求配置对象
  return config
}

/**
 * 請求攔截器的失敗處理函數。
 * @param {Object} error 發生的錯誤對象
 * @returns {Promise} 一個包含錯誤的Promise對象
 */
export function reqReject(error) {
  return Promise.reject(error)
}

/**
 * 響應攔截器的成功處理函數。
 * 直接返回響應中的數據。
 * @param {Object} response Axios的響應對象
 * @returns {*} 響應對象中的data屬性
 */
export function resResolve(response) {
  return response?.data
}

/**
 * 響應攔截器的失敗處理函數。
 * 根據後端返回的錯誤碼進行統一處理，並封裝成統一格式返回。
 * @param {Object} error 發生的錯誤對象
 * @returns {Promise} 一個包含處理後錯誤信息的Promise對象
 */
export function resReject(error) {
  let { code, message } = error.response?.data || {}
  if (isNullOrUndef(code)) {
    // 如果錯誤碼未定義或為null，則設置為-1並給出默認錯誤消息
    code = -1
    message = '接口异常！'
  } else {
    // 根據錯誤碼定義特定的錯誤消息
    switch (code) {
      case 401:
        message = message || '登录已过期'
        break
      case 403:
        message = message || '没有权限'
        break
      case 404:
        message = message || '资源或接口不存在'
        break
      default:
        message = message || '未知异常'
        break
    }
  }
  // 在控制台輸出錯誤信息，並返回處理後的錯誤信息
  console.error(`【${code}】 ${error}`)
  return Promise.resolve({ code, message, error })
}
