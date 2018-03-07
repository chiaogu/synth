import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
  isEditing: false,
  preset: undefined
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_PRESET:{
      const { id } = action
      return {
        ...state,
        isFetching: true
      }
    }
    case TYPES.LOAD_PRESET_SUCCESS:{
      const { preset } = action
      return {
        ...state,
        isFetching: false,
        preset
      }
    }
    case TYPES.START_EDIT_PRESET:{
      return {
        ...state,
        isEditing: true
      }
    }
    case TYPES.FINISH_EDIT_PRESET:{
      return {
        ...state,
        isEditing: false
      }
    }
    default:
      return state
  }
}