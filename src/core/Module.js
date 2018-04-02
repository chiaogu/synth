import Tone from 'tone';
import _ from '@utils/lodash';

export default class Module {
  constructor(module) {
    const { params = {}, config } = module
    const { type, className, controls } = config

    this.config = config
    this.controlMap = controls.reduce((result, control) => {
      result[control.id] = control
      return result
    }, {})

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
    const controlConfig = this.controlMap[key]
    if(!controlConfig) return

    const { action: { type, functionName } = {} } = controlConfig
    if(type === 'call'){
      const name = typeof functionName === 'object' ? functionName[value] : functionName
      this.instance[name]()
    }else {
      _.set(this.instance, key, value)
      console.log(_.get(this.instance, key))
    }
  }

  dispose(){
    const { type, className } = this.config
    if(type === 'Native'){
      if(className !== 'Master'){
        this.instance.dispose()
      }
    }
  }
}