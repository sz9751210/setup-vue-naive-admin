// 導入之前創建的localStorage存儲實例
import { lStorage } from './cache'

// 定義存儲在localStorage中的access_token的鍵名
const TOKEN_CODE = 'access_token'
// 定義token的過期時間，這裡設置為6小時（6小時 * 60分鐘 * 60秒）
const DURATION = 6 * 60 * 60

/**
 * 從localStorage中獲取存儲的token。
 * @returns {String|null} 返回存儲的token，如果沒有找到則返回null。
 */
export function getToken() {
  return lStorage.get(TOKEN_CODE)
}

/**
 * 將token存儲到localStorage中。
 * @param {String} token 要存儲的token字符串。
 */
export function setToken(token) {
  lStorage.set(TOKEN_CODE, token, DURATION)
}

/**
 * 從localStorage中移除存儲的token。
 */
export function removeToken() {
  lStorage.remove(TOKEN_CODE)
}
