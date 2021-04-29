// 获取本地state
export function getState(name, value) {
  value = typeof value === 'undefined' ? null : value
  return (
    JSON.parse(sessionStorage.getItem(name)) ||
    // JSON.parse(localStorage.getItem(name)) ||
    value
  )
}

export function setState(name, state, data) {
  if (typeof data === 'undefined') {
    return
  }
  sessionStorage.setItem(name, JSON.stringify(data))
  // localStorage.setItem(name, JSON.stringify(data))
}
