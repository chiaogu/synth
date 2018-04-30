import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
  isEditing: false,
  isEditingPanel: false,
  isEditingControl: false,
  isSharing: false,
  preset: undefined,
  currentEditingControl: {
    panelIndex: undefined,
    controlIndex: undefined,
    control: undefined
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_PRESET: {
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
      const { panelIndex, controlIndex, control } = action
      return {
        ...state,
        isEditingControl: true,
        currentEditingControl: {
          panelIndex,
          controlIndex,
          control
        }
      }
    }
    case TYPES.FINISH_EDIT_CONTROL: {
      return {
        ...state,
        isEditingControl: false
      }
    }
    case TYPES.ADD_CUSTOM_PANEL_CONTROL: {
      const { preset } = state
      const { control } = action
      preset.panels[0].controls.push(control)
      return {
        ...state,
        preset: {...preset}
      }
    }
    case TYPES.REMOVE_CUSTOM_PANEL_CONTROL: {
      const { preset } = state
      const { index } = action
      preset.panels[0].controls.splice(index, 1)
      return {
        ...state,
        preset: {...preset}
      }
    }
    case TYPES.SHARE_PRESET: {
      return {
        ...state,
        isSharing: true
      }
    }
    case TYPES.SHARE_PRESET_SUCCESS: {
      const { preset } = action
      return {
        ...state,
        isSharing: false
      }
    }
    default:
      return state
  }
}
