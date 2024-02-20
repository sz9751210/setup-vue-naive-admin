// 引入axios庫
import axios from 'axios'
// 引入定義的請求和響應攔截器的處理函數
import { resResolve, resReject, reqResolve, reqReject } from './interceptors'

/**
 * 創建Axios實例的函數。
 * @param {Object} options Axios創建時的配置選項。
 * @returns {AxiosInstance} Axios實例。
 */
export function createAxios(options = {}) {
  // 定義默認配置選項
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_API, // 從環境變量中獲取API基礎路徑
    timeout: 12000, // 設置默認請求超時時間
  }
  // 使用axios.create方法創建一個Axios實例，並將默認配置和外部傳入的配置合併
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  // 為創建的Axios實例添加請求和響應攔截器
  service.interceptors.request.use(reqResolve, reqReject) // 請求攔截器
  service.interceptors.response.use(resResolve, resReject) // 響應攔截器

  // 返回配置好的Axios實例
  return service
}

// 使用默認配置創建一個Axios實例
export const defAxios = createAxios()

// 使用特定的API基礎路徑創建另一個Axios實例
export const testAxios = createAxios({
  baseURL: import.meta.env.VITE_APP_BASE_API_TEST, // 從環境變量中獲取測試環境的API基礎路徑
})
