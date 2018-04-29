export const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export const get = (key) => {
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) { }
  return value
}