// 从 '../utils' 目录导入 resolveToken 函数，用于解析请求头中的令牌
import { resolveToken } from '../utils'

// 定义一个简单的令牌对象，模拟不同用户角色的令牌
const token = {
  admin: 'admin',
  editor: 'editor',
}

// 定义并导出一个数组，包含模拟的 API 请求响应配置
export default [
  {
    // 模拟登录 API
    url: '/api/auth/login',
    method: 'post',
    // response 函数定义了接收到登录请求时的响应逻辑
    // 参数说明:
    // @param {Object} body - 请求的正文内容
    // 返回值说明:
    // @returns {Object} - 根据登录逻辑返回的响应对象
    response: ({ body }) => {
      // 检查 body 中的 name 是否为 'admin' 或 'editor'
      if (['admin', 'editor'].includes(body?.name)) {
        // 如果是，返回 code 0 和对应角色的令牌
        return {
          code: 0,
          data: {
            token: token[body.name],
          },
        }
      } else {
        // 如果不是，返回 code -1 和错误信息
        return {
          code: -1,
          message: '没有此用户',
        }
      }
    },
  },
  {
    // 模拟刷新令牌 API
    url: '/api/auth/refreshToken',
    method: 'post',
    // response 函数定义了接收到刷新令牌请求时的响应逻辑
    // 参数说明:
    // @param {Object} headers - 请求的头部信息
    // 返回值说明:
    // @returns {Object} - 根据刷新令牌逻辑返回的响应对象
    response: ({ headers }) => {
      // 使用 resolveToken 函数解析 authorization 头部，获取新的令牌
      return {
        code: 0,
        data: {
          token: resolveToken(headers?.authorization),
        },
      }
    },
  },
]
