import createConstants from '@utils/createConstants'

export const TYPES = createConstants('CONTROL_EDITOR', [
  'OPEN_FINDER',
  'CLOSE_FINDER'
])

export const openControlFinder = () => ({
  type: TYPES.OPEN_FINDER
})

export const closeControlFinder = () => ({
  type: TYPES.CLOSE_FINDER
})