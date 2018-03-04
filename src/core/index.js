import Module from './Module'
import { TYPES as MODULES_ACTION } from '@state/modules/actions'

export default class Core {
  constructor() {
    this.modules = []
  }

  middleware() {
    return store => next => action => {
      const result = next(action)
      const state = store.getState()

      switch (action.type) {
        case MODULES_ACTION.INSERT_MODULE:
        case MODULES_ACTION.MOVE_MODULE:
        case MODULES_ACTION.LOAD_MODULES_SUCCESS:
          return this.setModules(modules)

        case MODULES_ACTION.SET_PARAMETER:
          const { moduleIndex, controlName, value } = action
          return this.set(moduleIndex, controlName, value)
      }

      return result
    }
  }

  setModules(modules) {
    this.clearModules()
    this.modules = modules.map(module => new Module(module))
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

  set(index, key, value) {
    const module = this.modules[index]
    module.set(key, value)
  }
}