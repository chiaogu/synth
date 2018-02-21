import Module from '@utils/Module';

class Core {
  constructor() {
    this.modules = [];
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

  call(id, name) {
    const module = this.modules[id];
    module.call(name);
  }
}

export default new Core();