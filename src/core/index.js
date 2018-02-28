import Module from './Module';

export default class Core {
  constructor(store) {
    store.subscribe(e => this.onStateChanged(store.getState()))
  }

  onStateChanged(state) {
    const { modules: { modules } } = state;
    console.log(modules)
  }

  setModules(modules) {
    this.clearModules();
    this.modules = modules.map(module => new Module(module));
    this.modules.forEach((module, index) => {
      if(index === 0) return;
      this.modules[index - 1].connect(module);
    });
  }

  clearModules() {
    this.modules.forEach(module => {
      module.dispose();
    });
    this.modules = [];
  }

  set(id, key, value) {
    const module = this.modules[id];
    module.set(key, value);
  }
}