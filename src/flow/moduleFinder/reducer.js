import { TYPES } from './actions'

const INIT_STATE = {
  isTrashCanVisible: false,
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
    case TYPES.SHOW_TRASH_CAN:{
      return {
        ...state,
        isTrashCanVisible: true
      }
    }
    case TYPES.HIDE_TRASH_CAN:{
      return {
        ...state,
        isTrashCanVisible: false
      }
    }
    default:
      return state
  }
}
