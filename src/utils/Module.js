import Tone from 'tone';
import getIn from 'lodash.get';
import setIn from 'lodash.set';
import { debug } from 'util';

export default class Module {
  constructor(module) {
    this.module = module;
    const { params = {}, config: { type, className } } = this.module;

    if(type === 'Native'){
      if(className === 'Master'){
        this.instance = Tone.Master;
      }else {
        this.instance = new Tone[className]();
      }

      for(let key in params){
        this.set(key, params[key]);
      }
    }
  }

  connect({instance}) {
    this.instance.connect(instance);
  }

  set(key, value) {
    const { params = {}, config: { controls } } = this.module;
    const controlConfig = controls.find(control => control.id === key);
    if(!controlConfig) return;

    const { action: { type, functionName } = {} } = controlConfig;
    if(type === 'call'){
      const name = typeof functionName === 'object' ? functionName[value] : functionName;
      this.instance[name]();
    }else {
      setIn(this.instance, key, value);
    }
    params[key] = value;
  }
}