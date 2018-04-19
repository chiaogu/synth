import { TYPES } from './actions';

const INIT_STATE = {
  isOpened: false
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
    default:
      return state
  }
}