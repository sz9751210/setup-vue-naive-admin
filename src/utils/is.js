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

// 以下函數的註解省略，因為它們的用途和用法與上述類似，主要是進行不同條件的值檢查。
