// 引入用于检查值是否为null或undefined的工具函数
import { isNullOrUndef } from '@/utils/is'

// 定义Storage类
class Storage {
  /**
   * Storage类的构造函数
   * @param {Object} option 配置项
   * @param {Storage} option.storage 实际的存储介质，可以是localStorage或sessionStorage
   * @param {String} option.prefixKey 存储项目的键名前缀
   */
  constructor(option) {
    this.storage = option.storage // 存储介质（localStorage或sessionStorage）
    this.prefixKey = option.prefixKey // 键名前缀
  }

  /**
   * 获取加上前缀后的键名
   * @param {String} key 键名
   * @returns {String} 加上前缀和转换为大写后的键名
   */
  getKey(key) {
    // 返回加上前缀并转换为大写的键名
    return `${this.prefixKey}${key}`.toUpperCase()
  }

  /**
   * 设置存储项目
   * @param {String} key 键名
   * @param {*} value 值
   * @param {Number} [expire] 过期时间（秒），不提供则不过期
   */
  set(key, value, expire) {
    // 将值、当前时间戳和过期时间封装成对象，并转换为字符串格式存储
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUndef(expire) ? new Date().getTime() + expire * 1000 : null,
    })
    // 调用存储介质的setItem方法，存储数据
    this.storage.setItem(this.getKey(key), stringData)
  }

  /**
   * 获取存储项目的值
   * @param {String} key 键名
   * @returns {*} 存储项目的值，如果不存在则返回undefined
   */
  get(key) {
    // 调用getItem方法获取存储项，并直接返回其值部分
    const { value } = this.getItem(key, {})
    return value
  }

  /**
   * 获取存储项目，包括值、存储时间和过期时间
   * @param {String} key 键名
   * @param {*} def 默认值，如果项目不存在或已过期
   * @returns {Object|null} 存储项目的值和时间信息，或者默认值
   */
  getItem(key, def = null) {
    // 从存储介质获取数据
    const val = this.storage.getItem(this.getKey(key))
    // 如果数据不存在，返回默认值
    if (!val) return def
    try {
      // 尝试解析存储的字符串数据为对象
      const data = JSON.parse(val)
      const { value, time, expire } = data
      // 检查数据是否过期，未过期则返回数据对象
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time }
      }
      // 数据已过期，移除存储项
      this.remove(key)
      return def
    } catch (error) {
      // 解析失败，移除存储项，返回默认值
      this.remove(key)
      return def
    }
  }

  /**
   * 移除存储项目
   * @param {String} key 键名
   */
  remove(key) {
    // 调用存储介质的removeItem方法，移除指定的存储项
    this.storage.removeItem(this.getKey(key))
  }

  /**
   * 清空所有存储项目
   */
  clear() {
    // 调用存储介质的clear方法，清空所有存储数据
    this.storage.clear()
  }
}

/**
 * 创建一个Storage实例的工厂函数
 * @param {Object} { prefixKey = '', storage = sessionStorage } 配置项，默认使用sessionStorage和空字符串前缀
 * @returns {Storage} Storage实例
 */
export function createStorage({ prefixKey = '', storage = sessionStorage }) {
  // 根据提供的配置项创建Storage实例并返回
  return new Storage({ prefixKey, storage })
}

// 在提供的 `Storage` 类中，`this.storage` 是一个实例属性，它代表实际的存储介质，可以是 Web 浏览器提供的 `localStorage` 或 `sessionStorage` 对象。这两种存储介质都是 Web Storage API 的一部分，提供了在客户端存储数据的能力。`localStorage` 和 `sessionStorage` 提供了类似的方法来操作存储的数据，但它们在数据的生命周期上有所不同：

// - **`localStorage`**：为了长期存储数据，数据不会因浏览器会话结束而被清除，除非主动删除数据。
// - **`sessionStorage`**：仅在当前浏览器会话下有效，关闭浏览器标签页或窗口后，存储的数据会被清除。

// `localStorage` 和 `sessionStorage` 都提供了以下方法：

// 1. **`setItem(key, value)`**：接收一个键（`key`）和值（`value`），将它们作为一对存储到存储介质中。如果键已经存在，则更新其对应的值。

// 2. **`getItem(key)`**：接收一个键（`key`），返回键对应的值。如果键不存在，则返回 `null`。

// 3. **`removeItem(key)`**：接收一个键（`key`），从存储中移除该键及其对应的值。

// 4. **`clear()`**：清除存储介质中的所有项。

// 5. **`key(index)`**（较少使用）：接收一个数值索引，返回存储中该索引对应的键名。

// 6. **`length`**（属性，不是方法）：返回存储中存储项的数量。

// 这些方法允许你在客户端存储、检索、修改和删除键值对数据，非常适合存储少量的数据，如用户偏好设置、应用状态等。

// 在 `Storage` 类中，`this.storage` 被初始化为 `option.storage`，这意味着你可以在创建 `Storage` 实例时指定使用 `localStorage` 或 `sessionStorage` 作为存储介质。例如：

// ```javascript
// const localStorageInstance = new Storage({ storage: localStorage, prefixKey: 'LOCAL_' });
// const sessionStorageInstance = new Storage({ storage: sessionStorage, prefixKey: 'SESSION_' });
// ```

// 通过这种方式，`Storage` 类抽象了对 `localStorage` 和 `sessionStorage` 的操作，提供了更灵活的数据存储解决方案。
