import createConstants from '@utils/createConstants'

export const TYPES = createConstants('PRESET', [
  'LOAD_PRESET',
  'LOAD_PRESET_SUCCESS',
  'START_EDIT_PRESET',
  'FINISH_EDIT_PRESET',
  'START_EDIT_PRESET_PANEL',
  'FINISH_EDIT_PRESET_PANEL',
  'UPDATE_CUSTOM_PANEL_CONTROL',
  'ADD_CUSTOM_PANEL_CONTROL',
  'REMOVE_CUSTOM_PANEL_CONTROL',
  'START_EDIT_CONTROL',
  'FINISH_EDIT_CONTROL',
  'SHARE_PRESET',
  'SHARE_PRESET_SUCCESS'
])

export const loadPreset = () => ({
  type: TYPES.LOAD_PRESET
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

export const startEditPresetPanel = () => ({
  type: TYPES.START_EDIT_PRESET_PANEL
})

export const finishEditPresetPanel = () => ({
  type: TYPES.FINISH_EDIT_PRESET_PANEL
})

export const updateCustomPanelControl = (control, index) => ({
  type: TYPES.UPDATE_CUSTOM_PANEL_CONTROL,
  control,
  index
})

export const addCustomPanelControl = control => ({
  type: TYPES.ADD_CUSTOM_PANEL_CONTROL,
  control
})

export const removeCustomPanelControl = index => ({
  type: TYPES.REMOVE_CUSTOM_PANEL_CONTROL,
  index
})


export const startEditControl = (panelIndex, controlIndex, control) => ({
  type: TYPES.START_EDIT_CONTROL,
  panelIndex,
  controlIndex,
  control
})

export const finishEditControl = () => ({
  type: TYPES.FINISH_EDIT_CONTROL
})

export const sharePreset = () => ({
  type: TYPES.SHARE_PRESET
})

export const sharePresetSuccess = () => ({
  type: TYPES.SHARE_PRESET_SUCCESS
})