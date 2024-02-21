// 將處理後的環境變量保存到 process.env 中，這樣就可以在整個 Node.js 應用中訪問這些環境變量。
// 布爾值字串轉為布爾類型。
// 特定鍵（如 'VITE_PORT'）的值需轉為數字類型。
// 將特定格式的字串（'VITE_PROXY' 的值）嘗試解析為 JSON 對象。

// 定義一個名為 wrapperEnv的函式，用於處理和轉換環境變量的配置選項
export function wrapperEnv(envOptions) {
  // 如果沒提供 envOptions，則直接返回空的對象
  if (!envOptions) return {}
  // 初始化一個空對象，用於存儲處理後的環境變量
  const rst = {}

  // 遍歷 envOptions 對象，並處理每個環境變量的值
  for (const key in envOptions) {
    // 獲取環境變量的值
    let val = envOptions[key]
    // 如果環境變量的值是字符串，並且是布林
    if (['true', 'false'].includes(val)) {
      // 將其轉換為布林值
      val = val === 'true'
    }
    // 如果 key 是 VITE_PORT，則將其轉換為數字
    if (['VITE_PORT'].includes(key)) {
      val = +val
    }
    // 如果 key 是 VITE_PROXY，且值不為空，則將其轉換為 JSON
    if (key === 'VITE_PROXY' && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'))
      } catch (error) {
        // 如果轉換失敗，則直接將其設置為空字符
        val = ''
      }
    }
    // 將處理後的環境變量存儲到 rst
    rst[key] = val
    // 如果 key 是字串，則將其存儲到 process.env 中
    if (typeof key === 'string') {
      process.env[key] = val
      // 如果 key 是對象，則將處理後的環境變量轉為字串儲存到 process.env 中
    } else if (typeof key === 'object') {
      process.env[key] = JSON.stringify(val)
    }
  }
  return rst
}

// 定義一個正則表達式，用於檢測一個 URL 是否以 "https://" 開頭
const httpsReg = /^https:\/\//

// 定義了一個名為 createProxy 的函式，該函式接受一個參數 list，默認值為空數組。
// list 預期是一個數組，其中每個元素都是一個包含兩個元素的數組，第一個元素是代理的前綴，第二個元素是目標地址。
export function createProxy(list = []) {
  // 初始化了一個空對象 rst，用於存放生成的代理配置。
  const rst = {}
  // 這行代碼開始遍歷 list 數組，每次迭代都會解構出前綴（prefix）和目標地址（target）。
  for (const [prefix, target] of list) {
    // 使用之前定義的正則表達式 httpsReg 來檢查 target 是否以 "https://" 開頭，結果存儲在 isHttps 變量中。
    const isHttps = httpsReg.test(target)
    // 將每個前綴 prefix 作為鍵，對應的值是一個配置對象，該對象配置了代理的目標地址、是否更改原始主機頭、是否支持 WebSocket，以及一個重寫函式，該函式將請求路徑中的前綴替換為空字串。
    // 如果目標地址是 HTTPS 的，則添加 secure: false 配置，這通常用於自簽名證書的情況，以避免節點檢查 SSL 證書。
    // https://github.com/http-party/node-http-proxy#options
    rst[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  // 返回生成的代理配置對象 rst。
  return rst
}
