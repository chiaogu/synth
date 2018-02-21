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

  setParameter(id, key, value) {
    const node = this.modules[id];
    node
  }

  callFunction(id, name, param) {

  }
}

export default new Core();