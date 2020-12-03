// 浏览器本地存储, isPermanent 是否永久缓存

// 写入
function set (name, data, isPermanent) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }

  isPermanent ? localStorage.setItem(name, data) : sessionStorage.setItem(name, data)
}
// 读取
function get (name, isPermanent) {
  const value = isPermanent ? localStorage.getItem(name) : sessionStorage.getItem(name)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

function remove (name, isPermanent) {
  isPermanent ? localStorage.removeItem(name) : sessionStorage.removeItem(name)
}

// 永久缓存 - 读写
function setCache (name, data) {
  set(name, data, true)
}
function getCache (name) {
  return get(name, true)
}
// 清空浏览器缓存
function clear (isPermanent) {
  isPermanent ? localStorage.clear() : sessionStorage.clear()
}
// 浏览器缓存 - 删除指定项
function clearNames (names = [], isPermanent = false) {
  names.forEach(name => isPermanent ? localStorage.removeItem(name) : sessionStorage.removeItem(name))
}

export default {
  set,
  get,
  remove,
  setCache,
  getCache,
  clear,
  clearNames
}
