import { TYPES } from './actions';

const INIT_STATE = {
  isCapturing: false,
  actionIndex: undefined,
  value: undefined
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.START_CAPTURE_MODE: {
      const { actionIndex, value } = action
      return {
        ...state,
        isCapturing: true,
        actionIndex,
        value
      }
    }
    case TYPES.FINISH_CAPTURE_MODE: {
      return {
        ...state,
        isCapturing: false,
        actionIndex: undefined,
        value: undefined
      }
    }
    default:
      return state
  }
}
