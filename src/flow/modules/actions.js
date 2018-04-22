import createConstants from '@utils/createConstants'

export const TYPES = createConstants('MODULES', [
  'LOAD_MODULES',
  'LOAD_MODULES_SUCCESS',
  'SET_PARAMETER',
  'INSERT_MODULE',
  'MOVE_MODULE',
  'DELETE_MODULE'
])

export const loadModules = presetId => ({
  type: TYPES.LOAD_MODULES,
  presetId
})

export const loadModulesSuccess = result => ({
  type: TYPES.LOAD_MODULES_SUCCESS,
  modules: result
})

export const setParameter = (moduleIndex, controlName, value, params) => ({
  type: TYPES.SET_PARAMETER,
  moduleIndex,
  controlName,
  value,
  params
})

export const insertModule = (module, index) => ({
  type: TYPES.INSERT_MODULE,
  module,
  index
})

export const moveModule = (from, to) => ({
  type: TYPES.MOVE_MODULE,
  from,
  to
})

export const deleteModule = index => ({
  type: TYPES.DELETE_MODULE,
  index
})