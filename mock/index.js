// 从vite-plugin-mock插件中导入createProdMockServer函数，用于创建模拟服务器
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 使用import.meta.globEager静态导入./modules目录下所有的.js文件
// import.meta.globEager是Vite特有的API，用于在构建时静态导入模块
// 这个API会在构建时导入匹配的模块，并返回一个对象，对象的键是文件路径，值是导入的模块
const modules = import.meta.globEager('./modules/*.js')

// 初始化一个空数组，用于存储所有导入的mock模块
const mockModules = []

// 遍历modules对象的所有键（即 module 路径）
Object.keys(modules).forEach((key) => {
  // 将每个模块的默认导出（假设是一个数组）展开并添加到mockModules数组中
  // 这里使用了展开运算符...来将数组元素逐个添加，而不是整个数组作为一个元素
  mockModules.push(...modules[key].default)
})

/**
 * 定义一个函数setupProdMockServer，当调用时，它会使用收集到的模拟数据模块来启动模拟服务器
 *
 * 参数说明: 无
 *
 * 返回值说明:
 * @returns {void} - 该函数没有返回值
 */
export function setupProdMockServer() {
  // 调用createProdMockServer函数，传入mockModules数组作为参数，即传入所有收集的mock模块
  // 这个函数会根据提供的模拟数据设置和启动模拟服务器
  createProdMockServer(mockModules)
}
