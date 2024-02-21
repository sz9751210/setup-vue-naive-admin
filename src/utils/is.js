// 獲得對象的精確類型信息
const toString = Object.prototype.toString

/**
 * 檢查變量的類型。
 * @param {*} val 需要檢查的變量。
 * @param {String} type 期望的類型名稱。
 * @returns {Boolean} 如果變量的類型與期望的類型匹配，則返回 true，否則返回 false。
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 檢查變量是否已定義（不是 undefined）。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量不是 undefined，則返回 true，否則返回 false。
 */
export function isDef(val) {
  return typeof val !== 'undefined'
}

/**
 * 檢查變量是否未定義（是 undefined）。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是 undefined，則返回 true，否則返回 false。
 */
export function isUndef(val) {
  return typeof val === 'undefined'
}

/**
 * 檢查變量是否為 null。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是 null，則返回 true，否則返回 false。
 */
export function isNull(val) {
  return val === null
}

/**
 * 檢查變量是否為空字符串。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是空字符串，則返回 true，否則返回 false。
 */
export function isWhitespace(val) {
  return val === ''
}

/**
 * 檢查變量是否為對象（排除 null）。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是對象，則返回 true，否則返回 false。
 */
export function isObject(val) {
  return !isNull(val) && is(val, 'Object')
}

/**
 * 檢查變量是否為數組。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是數組，則返回 true，否則返回 false。
 */
export function isArray(val) {
  return val && Array.isArray(val)
}

/**
 * 檢查變量是否為字符串。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是字符串，則返回 true，否則返回 false。
 */
export function isString(val) {
  return is(val, 'String')
}

/**
 * 檢查變量是否為數字。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是數字，則返回 true，否則返回 false。
 */
export function isNumber(val) {
  return is(val, 'Number')
}

/**
 * 檢查變量是否為布爾值。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是布爾值，則返回 true，否則返回 false。
 */
export function isBoolean(val) {
  return is(val, 'Boolean')
}

/**
 * 檢查變量是否為日期對象。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是日期對象，則返回 true，否則返回 false。
 */
export function isDate(val) {
  return is(val, 'Date')
}

/**
 * 檢查變量是否為正則表達式對象。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是正則表達式對象，則返回 true，否則返回 false。
 */
export function isRegExp(val) {
  return is(val, 'RegExp')
}

/**
 * 檢查變量是否為函數。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是函數，則返回 true，否則返回 false。
 */
export function isFunction(val) {
  return typeof val === 'function'
}

/**
 * 檢查變量是否為 Promise 對象。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是 Promise 對象且具有 then 和 catch 方法，則返回 true，否則返回 false。
 */
export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 檢查變量是否為 DOM 元素。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是 DOM 元素（具有 tagName 屬性），則返回 true，否則返回 false。
 */
export function isElement(val) {
  return isObject(val) && !!val.tagName
}

/**
 * 檢查變量是否為 window 對象。
 * @param {*} val 需要檢查的變量。
 * @returns {Boolean} 如果變量是 window 對象，則返回 true，否則返回 false。
 */
export function isWindow(val) {
  return typeof window !== 'undefined' && isDef(window) && is(val, 'Window')
}

/**
 * 检查变量是否为null或undefined。
 * @param {*} val - 需要检查的变量。
 * @returns {Boolean} - 如果变量是null或undefined，则返回true；否则返回false。
 */
export function isNullOrUndef(val) {
  return isNull(val) || isUndef(val)
}

/**
 * 检查变量是否为null、undefined或空字符串。
 * @param {*} val - 需要检查的变量。
 * @returns {Boolean} - 如果变量是null、undefined或空字符串，则返回true；否则返回false。
 */
export function isNullOrWhitespace(val) {
  return isNullOrUndef(val) || isWhitespace(val)
}

/**
 * 检查变量是否为空（空字符串、空数组、空对象、null、undefined）。
 * @param {*} val - 需要检查的变量。
 * @returns {Boolean} - 如果变量为空，则返回true；否则返回false。
 */
export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

/**
 * 类似于MySQL的IFNULL函数，如果第一个参数为null/undefined/空字符串，则返回第二个参数。
 * @param {Number|Boolean|String} val - 需要检查的变量。
 * @param {Number|Boolean|String} def - 默认值，如果第一个参数为null/undefined/空字符串。
 * @returns {Number|Boolean|String} - 返回第一个参数或第二个参数作为备用值。
 */
export function ifNull(val, def = '') {
  return isNullOrWhitespace(val) ? def : val
}

/**
 * 检查给定的路径是否为URL格式。
 * @param {String} path - 需要检查的路径。
 * @returns {Boolean} - 如果路径符合URL格式，则返回true；否则返回false。
 */
export function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 检查给定的路径是否为外部URL。
 * @param {String} path - 需要检查的路径。
 * @returns {Boolean} - 如果路径为外部URL（例如以http、https、mailto或tel开头），则返回true；否则返回false。
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 检查当前环境是否为服务器环境（即是否在浏览器环境之外）
export const isServer = typeof window === 'undefined'

// 检查当前环境是否为客户端环境（浏览器环境）
export const isClient = !isServer
