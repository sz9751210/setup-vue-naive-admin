import vue from "@vitejs/plugin-vue";

/**
 * 擴展setup插件，支持在script標籤中使用name屬性
 * usage: <script setup name="xxx"></script>
 */
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// rollup打包分析插件，可以將打包後的模塊分析成圖表
// https://juejin.cn/post/7159410085460983839
import { visualizer } from "rollup-plugin-visualizer";

import { configHtmlPlugin } from "./html";
import { unocss } from "./unocss";

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
  ];
  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    );
  }
  return plugins;
}
