import { TYPES } from './actions';
import _ from '@utils/lodash';

const INIT_STATE = {
  isFetching: false,
  modules: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.FIND_MODULES:{
      return {
        ...state,
        isFetching: true
      }
    }
    case TYPES.FIND_MODULES_SUCCESS:{
      const { modules } = action
      return {
        ...state,
        isFetching: false,
        modules
      }
    }
    default:
      return state
  }
}
