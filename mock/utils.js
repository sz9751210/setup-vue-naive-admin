// 定义resolveToken函数，用于解析HTTP请求的Authorization头部中的JWT
export function resolveToken(authorization) {
  /**
   * * jwt token
   * * Bearer + token
   * ! 认证方案: Bearer
   *
   * 参数说明:
   * @param {String} authorization - 包含'Bearer'关键字和JWT的授权头部字符串
   *
   * 返回值说明:
   * @returns {String} - 解析出的JWT，如果格式不符合预期，则返回空字符串
   */

  // 使用空格将authorization字符串分割成数组
  const reqTokenSplit = authorization.split(' ')

  // 检查分割后的数组长度是否为2
  // 正确的Bearer Token格式应该是"Bearer [token]"，因此分割后数组长度应该为2
  if (reqTokenSplit.length === 2) {
    // 如果格式正确，返回数组的第二个元素，即JWT本身
    return reqTokenSplit[1]
  }

  // 如果格式不正确，返回空字符串
  return ''
}
