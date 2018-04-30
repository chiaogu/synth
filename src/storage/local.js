const PRESET = 'Prest'

const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
  return Promise.resolve()
}
const get = (key) => {
  let value = window.localStorage.getItem(key)
  try {
    value = JSON.parse(value)
  } catch (e) { }
  return Promise.resolve(value)
}

export const saveCurrentPreset = preset => set(PRESET, preset)
export const getCurrentPreset = () => get(PRESET)