import createConstants from '@utils/createConstants'

export const TYPES = createConstants('MODULE_FINDER', [
  'FIND_MODULES',
  'FIND_MODULES_SUCCESS',
  'SHOW_TRASH_CAN',
  'HIDE_TRASH_CAN'
])

export const findModules = () => ({
  type: TYPES.FIND_MODULES
})

export const findModulesSuccess = result => ({
  type: TYPES.FIND_MODULES_SUCCESS,
  modules: result
})

export const showTrashCan = () => ({
  type: TYPES.SHOW_TRASH_CAN
})

export const hideTrashCan = () => ({
  type: TYPES.HIDE_TRASH_CAN
})