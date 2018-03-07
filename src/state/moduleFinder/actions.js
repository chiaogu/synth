import createConstants from '@utils/createConstants'

export const TYPES = createConstants('MODULE_FINDER', [
  'FIND_MODULES',
  'FIND_MODULES_SUCCESS'
])

export const findModules = () => ({
  type: TYPES.FIND_MODULES
})

export const findModulesSuccess = result => ({
  type: TYPES.FIND_MODULES_SUCCESS,
  modules: result
})