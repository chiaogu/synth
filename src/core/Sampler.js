import Tone from 'tone';
import Module from './Module'
import * as AudioUtils from '@utils/audioUtils'

export default class Sampler extends Module {
  constructor(module) {
    super(module)
    this.recorder = null
    this.pitch = 'C3'
  }

  set(key, value, params) {
    if (key === 'record') {
      if (value) {
        this.recorder = AudioUtils.record()
        this.recorder.result.then(buffer => {
          this.set('buffer', true, ['C3', buffer])
        })
      } else {
        if (this.recorder) {
          this.recorder.stop()
          this.recorder = null
        }
      }
    } else if (key === 'trigger') {
      this.set('_trigger', value, [this.pitch])
    } else if (key === 'pitch') {
      this.pitch = value
    } else {
      super.set(key, value, params)
    }
  }
}