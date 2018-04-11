import { TYPES } from './actions';

const INIT_STATE = {
  isFetching: false,
  control: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_CONTROL:{
      return {
        ...state,
        isFetching: true
      }
    }
    case TYPES.LOAD_CONTROL_SUCCESS:{
      const { control } = action
      return {
        ...state,
        isFetching: false,
        control
      }
    }
    default:
      return state
  }
}
