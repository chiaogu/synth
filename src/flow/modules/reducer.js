import { TYPES } from './actions'

const INIT_STATE = {
  isFetching: false,
  modules: [],
  presetId: undefined
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOAD_MODULES: {
      const { presetId, modules } = action
      return {
        ...state,
        isFetching: true,
        presetId
      }
    }
    case TYPES.LOAD_MODULES_SUCCESS: {
      const { presetId, modules } = action
      return {
        ...state,
        isFetching: false,
        modules
      }
    }
    case TYPES.SET_PARAMETER: {
      const { moduleIndex, controlName, value } = action
      const modules = [...state.modules]
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
    case TYPES.INSERT_MODULE: {
      const { module, index } = action
      const modules = [...state.modules]
      modules.splice(index, 0, { config: { ...module } })
      return {
        ...state,
        modules
      }
    }
    case TYPES.MOVE_MODULE: {
      const { from, to } = action
      const modules = [...state.modules]
      modules.splice(to, 0, ...modules.splice(from, 1))
      return {
        ...state,
        modules
      }
    }
    case TYPES.DELETE_MODULE: {
      const { index } = action
      const modules = [...state.modules]
      modules.splice(index, 1)
      return {
        ...state,
        modules
      }
    }
    default:
      return state
  }
}
