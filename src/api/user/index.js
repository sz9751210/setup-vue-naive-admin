// 引入封裝好的 Axios 實例
import { defAxios as request } from '@/utils/http'

/**
 * 獲取用戶列表。
 * @param {Object} data - 包含查詢參數的對象，例如分頁信息、篩選條件等。
 * @returns {Promise} Axios Promise 對象。
 */
export function getUsers(data = {}) {
  return request({
    url: '/users', // API路徑
    method: 'get', // HTTP方法
    data, // 發送到服務端的數據（對於GET請求，通常參數會放在params而不是data，這裡可能需要根據實際後端API的設計調整）
  })
}

/**
 * 根據用戶ID獲取單個用戶的詳細信息。
 * @param {String|Number} id - 用戶的唯一標識符。
 * @returns {Promise} Axios Promise 對象。
 */
export function getUser(id) {
  if (id) {
    return request({
      url: `/user/${id}`, // 使用模板字符串插入變量id來構造請求URL
      method: 'get', // HTTP方法
    })
  }
  // 如果沒有提供id，則請求一個通用的用戶信息接口
  return request({
    url: '/user',
    method: 'get',
  })
}

/**
 * 保存用戶信息。如果提供了id，則更新該用戶信息；如果沒有提供id，則創建新的用戶。
 * @param {Object} data - 包含用戶信息的對象。
 * @param {String|Number} [id] - 需要更新的用戶的唯一標識符，可選。
 * @returns {Promise} Axios Promise 對象。
 */
export function saveUser(data = {}, id) {
  if (id) {
    // 如果有id，執行更新操作
    return request({
      url: `/user/${id}`, // 注意：這裡與文檔描述不一致，應該將id插入URL中
      method: 'put', // 更新操作通常使用PUT方法
      data, // 包含需要更新的用戶信息
    })
  }
  // 如果沒有id，則認為是創建新用戶
  return request({
    url: '/user', // 創建操作的URL
    method: 'put', // 這裡使用PUT方法，但通常創建操作會使用POST方法，根據後端API的實際要求調整
    data,
  })
}
