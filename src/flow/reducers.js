import { combineReducers } from 'redux'
import modules from './modules/reducer'
import preset from './preset/reducer'
import moduleFinder from './moduleFinder/reducer'
import controlEditor from './controlEditor/reducer'
import controlFinder from './controlFinder/reducer'
import { routerReducer as router } from 'react-router-redux'

export default combineReducers({
  modules,
  preset,
  moduleFinder,
  controlEditor,
  controlFinder,
  router
})
