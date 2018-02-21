import Tone from 'tone';
import getIn from 'lodash.get';
import setIn from 'lodash.set';

export default class Module {
  constructor(module) {
    const { params = {}, config: { type, className } } = module;

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
    setIn(this.instance, key, value);
    console.log(key, getIn(this.instance, key));
  }

  call(name) {
    console.log(this.instance[name]());
  }
}