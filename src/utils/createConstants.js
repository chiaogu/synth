export default (prefix, keys) => keys.reduce((constants, key) => {
  constants[key] = `${prefix ? prefix + '.' : ''}${key}`
  return constants
}, {})