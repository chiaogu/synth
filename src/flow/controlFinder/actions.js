import createConstants from '@utils/createConstants'

export const TYPES = createConstants('CONTROL_EDITOR', [
  'OPEN_FINDER',
  'CLOSE_FINDER',
  'FIND_CONTROLS',
  'FIND_CONTROLS_SUCCESS'
])

export const openControlFinder = () => ({
  type: TYPES.OPEN_FINDER
})

export const closeControlFinder = () => ({
  type: TYPES.CLOSE_FINDER
})

export const findControls = () => ({
  type: TYPES.FIND_CONTROLS
})

export const findControlsSuccess = result => ({
  type: TYPES.FIND_CONTROLS_SUCCESS,
  controls: result
})