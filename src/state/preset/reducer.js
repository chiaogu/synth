import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
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
    default:
      return state
  }
}
