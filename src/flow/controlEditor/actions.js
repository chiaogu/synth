import createConstants from '@utils/createConstants'

export const TYPES = createConstants('CONTROL_FINDER', [
  'LOAD_CONTROL',
  'LOAD_CONTROL_SUCCESS'
])

export const loadControl = () => ({
  type: TYPES.LOAD_CONTROL,
})

export const loadControlSuccess = result => ({
  type: TYPES.LOAD_CONTROL_SUCCESS,
  control: result
})
