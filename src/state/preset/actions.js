import createConstants from '@utils/createConstants'

export const TYPES = createConstants('PRESET', [
  'LOAD_PRESET',
  'LOAD_PRESET_SUCCESS',
  'START_EDIT_PRESET',
  'FINISH_EDIT_PRESET'
])

export const loadPreset = id => ({
  type: TYPES.LOAD_PRESET,
  id
})

export const loadPresetSuccess = result => ({
  type: TYPES.LOAD_PRESET_SUCCESS,
  preset: result
})

export const startEditPreset = () => ({
  type: TYPES.START_EDIT_PRESET
})

export const finishEditPreset = () => ({
  type: TYPES.FINISH_EDIT_PRESET
})