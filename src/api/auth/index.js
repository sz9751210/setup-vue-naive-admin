// 從封裝好的HTTP工具模塊導入預設的Axios實例，這裡重新命名為request方便使用
import { defAxios as request } from '@/utils/http'

/**
 * 登錄函數，向後端發送登錄請求。
 * @param {Object} data 包含用戶登錄信息的對象，比如用戶名和密碼。
 * @returns {Promise} Axios Promise，可用於進一步處理響應或捕獲錯誤。
 */
export const login = (data) => {
  return request({
    url: '/auth/login', // 請求的URL，這裡指向後端的登錄接口
    method: 'post', // HTTP方法，表示這是一個POST請求
    data, // POST請求的數據體，包含登錄必需的用戶信息
  })
}

/**
 * 刷新令牌函數，用於當用戶的登錄憑證（如JWT令牌）即將過期時，獲取一個新的令牌。
 * @returns {Promise} Axios Promise，可用於進一步處理響應或捕獲錯誤。
 */
export const refreshToken = () => {
  return request({
    url: '/auth/refreshToken', // 請求的URL，指向後端的刷新令牌接口
    method: 'post', // HTTP方法，這裡使用POST表示發送刷新令牌的請求
    // 這裡沒有發送數據體（data），因為刷新令牌通常不需要額外信息，令牌通常從HTTP頭部的Authorization字段讀取
  })
}
