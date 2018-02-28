import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
  modules: [],
  presetId: undefined
}

export default (state = INIT_STATE, {
  type,
  presetId,
  modules
}) => {
  switch (type) {
    case TYPES.LOAD_MODULES:
      return {
        ...state,
        isFetching: true,
        presetId
      }
    case TYPES.LOAD_MODULES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        modules
      }
    default:
      return state
  }
}
