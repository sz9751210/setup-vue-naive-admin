import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { createProxy, wrapperEnv } from './build/utils.js'
import { createVitePlugins } from './build/plugin/index.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  // 加載當前模式下的環境變量
  const env = loadEnv(mode, process.cwd())
  // 使用自定義函式處理環境變量
  const viteEnv = wrapperEnv(env)

  // 從處理後的環境變量中解構需要的變量
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || '/', // 設置應用的基礎路徑
    resolve: {
      // 配置路徑別名
      alias: {
        // 將 '@' 設定為專案源碼目錄的別名，這樣在導入時可以更簡潔
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        // 配置 scss 導入路徑
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    server: {
      // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      host: '0.0.0.0',
      port: VITE_PORT || 3000,
      proxy: createProxy(VITE_PROXY),
    },
  }
})
