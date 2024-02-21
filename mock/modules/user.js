// 导入resolveToken函数，用于从请求头的Authorization字段中解析出token
import { resolveToken } from '../utils'

// 定义一个包含预设用户信息的对象
const users = {
  admin: {
    id: 1,
    name: 'admin',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['admin'],
  },
  editor: {
    id: 2,
    name: 'editor',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: ['editor'],
  },
  guest: {
    id: 3,
    name: 'guest',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    role: [],
  },
}

// 导出一个数组，包含mock接口的定义
export default [
  {
    // 定义获取用户信息的mock接口
    url: '/api/user',
    method: 'get',
    // 定义响应函数
    // 参数说明:
    // @param {Object} headers - 请求头对象，包含Authorization字段
    // 返回值说明:
    // @returns {Object} - 根据token返回对应用户信息的对象
    response: ({ headers }) => {
      // 从请求头的Authorization字段中解析出token
      const token = resolveToken(headers?.authorization)
      // 根据token返回对应用户的信息，如果token不存在或无法匹配到用户，则默认返回guest用户的信息
      return {
        code: 0,
        data: {
          // 使用展开运算符(...)返回找到的用户对象或guest用户对象
          ...(users[token] || users.guest),
        },
      }
    },
  },
]
