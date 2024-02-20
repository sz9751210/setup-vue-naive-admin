// 導入之前定義的createStorage函數
import { createStorage } from './storage'

// 定義一個預設的鍵名前綴
const prefixKey = 'Vue_Naive_Admin_'

/**
 * 創建一個封裝的localStorage存儲實例。
 * @param {Object} option 配置選項，可選。
 * @returns {Storage} 一個封裝好的Storage實例，使用localStorage作為存儲介質。
 */
export const createLocalStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || prefixKey, // 如果提供了prefixKey則使用提供的值，否則使用預設值
    storage: localStorage, // 指定存儲介質為localStorage
  })
}

/**
 * 創建一個封裝的sessionStorage存儲實例。
 * @param {Object} option 配置選項，可選。
 * @returns {Storage} 一個封裝好的Storage實例，使用sessionStorage作為存儲介質。
 */
export const createSessionStorage = function (option = {}) {
  return createStorage({
    prefixKey: option.prefixKey || prefixKey, // 如果提供了prefixKey則使用提供的值，否則使用預設值
    storage: sessionStorage, // 指定存儲介質為sessionStorage
  })
}

// 使用預設的鍵名前綴來創建localStorage的實例
export const lStorage = createLocalStorage({ prefixKey })

// 使用預設的鍵名前綴來創建sessionStorage的實例
export const sStorage = createSessionStorage({ prefixKey })
