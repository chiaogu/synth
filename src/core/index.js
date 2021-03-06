import Module from './Module'
import { TYPES as MODULES_ACTION } from '@flow/modules/actions'
import reduceModuleAction from '@flow/modules/reducer'
import Sampler from './Sampler';

export default class Core {
  constructor() {
    this.modules = []
  }

  middleware() {
    return store => next => action => {
      const { modules: modulesState } = store.getState()
      const nextState = reduceModuleAction(modulesState, action)

      try{
        switch (action.type) {
          case MODULES_ACTION.DELETE_MODULE:
          case MODULES_ACTION.INSERT_MODULE:
          case MODULES_ACTION.MOVE_MODULE:
          case MODULES_ACTION.LOAD_MODULES_SUCCESS:{
            const { modules } = nextState
            this.setModules(modules)
            break
          }
          case MODULES_ACTION.SET_PARAMETER:{
            const { moduleIndex, controlName, value, params } = action
            this.set(moduleIndex, controlName, value, params)
            break
          }
        }
      }catch(e) {
        alert(e.message)
        console.error(e)
        return
      }

      return next(action)
    }
  }

  setModules(modules) {
    this.clearModules()
    this.modules = modules.map(module => {
      switch(module.config.id) {
        case 'sampler':
          return new Sampler(module)
        default:
          return new Module(module)
      }
    })
    this.modules.forEach((module, index) => {
      if (index === 0) return
      this.modules[index - 1].connect(module)
    })
  }

  clearModules() {
    this.modules.forEach(module => {
      module.dispose()
    });
    this.modules = []
  }

  set(index, key, value, params) {
    const module = this.modules[index]
    module.set(key, value, params)
  }
}