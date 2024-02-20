// 引入用於檢查值是否為null或undefined的工具函數
import { isNullOrUndef } from '@/utils/is'

// 定義Storage類
class Storage {
  /**
   * Storage類的構造函數
   * @param {Object} option 配置項
   * @param {Storage} option.storage 實際的存儲介質，可以是localStorage或sessionStorage
   * @param {String} option.prefixKey 存儲項目的鍵名前綴
   */
  constructor(option) {
    this.storage = option.storage
    this.prefixKey = option.prefixKey
  }

  /**
   * 獲取加上前綴後的鍵名
   * @param {String} key 鍵名
   * @returns {String} 加上前綴和轉換為大寫後的鍵名
   */
  getKey(key) {
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  /**
   * 設置存儲項目
   * @param {String} key 鍵名
   * @param {*} value 值
   * @param {Number} [expire] 過期時間（秒），不提供則不過期
   */
  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  /**
   * 獲取存儲項目的值
   * @param {String} key 鍵名
   * @returns {*} 存儲項目的值，如果不存在則返回undefined
   */
  get(key) {
    const { value } = this.getItem(key, {})
    return value
  }

  /**
   * 獲取存儲項目，包括值、存儲時間和過期時間
   * @param {String} key 鍵名
   * @param {*} def 默認值，如果項目不存在或已過期
   * @returns {Object|null} 存儲項目的值和時間信息，或者默認值
   */
  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val) return def
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      this.remove(key)
      return def
    } catch (error) {
      this.remove(key)
      return def
    }
  }

  /**
   * 移除存儲項目
   * @param {String} key 鍵名
   */
  remove(key) {
    this.storage.removeItem(this.getKey(key))
  }

  /**
   * 清空所有存儲項目
   */
  clear() {
    this.storage.clear()
  }
}

/**
 * 創建一個Storage實例的工廠函數
 * @param {Object} { prefixKey = '', storage = sessionStorage } 配置項
 * @returns {Storage} Storage實例
 */
export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  return new Storage({ prefixKey, storage })
}
