import { TYPES } from './actions';
import _ from '@utils/lodash';

const INIT_STATE = {
  isFetching: false,
  modules: [],
  presetId: undefined
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_MODULES:{
      const { presetId, modules } = action
      return {
        ...state,
        isFetching: true,
        presetId
      }
    }
    case TYPES.LOAD_MODULES_SUCCESS:{
      const { presetId, modules } = action
      return {
        ...state,
        isFetching: false,
        modules
      }
    }
    case TYPES.SET_PARAMETER:{
      const { moduleIndex, controlName, value } = action
      const modules = [ ...state.modules ]
      const module = { ...modules[moduleIndex] }
      const params = { ...module.params }
      params[controlName] = value
      module.params = params
      modules[moduleIndex] = module

      return {
        ...state,
        modules
      }
    }
    default:
      return state
  }
}
