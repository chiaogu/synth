import { TYPES } from './actions';

const INIT_STATE = {
  isOpened: false,
  isFetching: false,
  controls: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.OPEN_FINDER:
      return {
        ...state,
        isOpened: true
      }
    case TYPES.CLOSE_FINDER:
      return {
        ...state,
        isOpened: false
      }
    case TYPES.FIND_CONTROLS:
      return {
        ...state,
        isFetching: true
      }
    case TYPES.FIND_CONTROLS_SUCCESS:{
      const { controls } = action
      return {
        ...state,
        isFetching: false,
        controls
      }
    }
    default:
      return state
  }
}