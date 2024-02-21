// 从vite-plugin-mock包中导入viteMockServer函数
import { viteMockServer } from 'vite-plugin-mock'

/**
 * 配置并返回mock插件的实例
 *
 * 参数说明:
 * @param {Boolean} isBuild - 表示当前是否处于构建模式
 *
 * 返回值说明:
 * @returns {Object} - vite-plugin-mock插件的配置实例
 */
export function configMockPlugin(isBuild) {
  // 调用viteMockServer函数，配置mock插件
  return viteMockServer({
    // 指定mock文件所在目录
    mockPath: 'mock/modules',
    // 控制在非构建模式（即开发模式）下是否启用mock
    localEnable: !isBuild,
    // 控制在构建模式下是否启用mock
    prodEnable: isBuild,
    // 注入代码到项目入口文件，用于在生产模式下启动mock服务器
    injectCode: `
        import { setupProdMockServer } from '../mock';
        setupProdMockServer();
        `,
  })
}
