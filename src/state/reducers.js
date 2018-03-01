import { combineReducers } from 'redux'
import modules from './modules/reducer'
import preset from './preset/reducer'

export default combineReducers({
  modules,
  preset
})
