import Module from './Module'
import { TYPES as MODULES_ACTION } from '@state/modules/actions'

export default class Core {
  constructor() {
    this.modules = []
  }

  middleware() {
    return store => next => action => {
      const result = next(action)
      switch(action.type){
        case MODULES_ACTION.LOAD_MODULES_SUCCESS:
          this.onLoadModulesSuccess(store.getState())
      }
      return result
    }
  }

  onLoadModulesSuccess({ modules: { modules } }) {
    this.setModules(modules)
  }

  setModules(modules) {
    this.clearModules()
    this.modules = modules.map(module => new Module(module))
    this.modules.forEach((module, index) => {
      if (index === 0) return;
      this.modules[index - 1].connect(module)
    });
  }

  clearModules() {
    this.modules.forEach(module => {
      module.dispose()
    });
    this.modules = []
  }

  set(id, key, value) {
    const module = this.modules[id]
    module.set(key, value)
  }
}