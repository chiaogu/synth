import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
  isEditing: false,
  isEditingPanel: false,
  isEditingControl: false,
  preset: undefined,
  currentEditingControl: {
    panelIndex: undefined,
    controlIndex: undefined
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_PRESET: {
      const { id } = action
      return {
        ...state,
        isFetching: true
      }
    }
    case TYPES.LOAD_PRESET_SUCCESS: {
      const { preset } = action
      return {
        ...state,
        isFetching: false,
        preset
      }
    }
    case TYPES.START_EDIT_PRESET: {
      return {
        ...state,
        isEditing: true
      }
    }
    case TYPES.FINISH_EDIT_PRESET: {
      return {
        ...state,
        isEditing: false
      }
    }
    case TYPES.START_EDIT_PRESET_PANEL: {
      return {
        ...state,
        isEditingPanel: true
      }
    }
    case TYPES.FINISH_EDIT_PRESET_PANEL: {
      return {
        ...state,
        isEditingPanel: false
      }
    }
    case TYPES.UPDATE_CUSTOM_PANEL_CONTROL: {
      const { preset } = state
      const { control, index } = action
      preset.panels[0].controls[index] = control

      return {
        ...state,
        preset: {...preset}
      }
    }
    case TYPES.START_EDIT_CONTROL: {
      const { panelIndex, controlIndex } = action
      return {
        ...state,
        isEditingControl: true,
        currentEditingControl: {
          panelIndex,
          controlIndex
        }
      }
    }
    case TYPES.FINISH_EDIT_CONTROL: {
      return {
        ...state,
        isEditingControl: false
      }
    }
    default:
      return state
  }
}
