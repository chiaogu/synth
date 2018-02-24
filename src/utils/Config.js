const MODULES = {
  "master": {
    "id": "master",
    "name": "Master Output",
    "type": "Native",
    "className": "Master",
    "controls": []
  },
  "omniOscillator": {
    "id": "omniOscillator",
    "name": "Omni Oscillator",
    "type":"Native",
    "className":"OmniOscillator",
    "controls": [
      {
        type: 'switch',
        name: 'power',
        id: 'power',
        action: {
          type: 'call',
          functionName: {
            true: 'start',
            false: 'stop'
          }
        }
      },
      {
        type: 'range',
        name: 'volume',
        id: 'volume.value',
        min: -40,
        max: 0
      },
      {
        type: 'range',
        name: 'frequency',
        id: 'frequency.value',
        min: 0,
        max: 440
      },
      {
        type: 'menu',
        name: 'type',
        id: 'type',
        choices: [
          { key: 'sine' },
          { key: 'square' },
          { key: 'triangle' },
          { key: 'sawtooth' },
          { key: 'fatsine' },
          { key: 'fatsquare' },
          { key: 'fattriangle' },
          { key: 'fatsawtooth' },
          { key: 'fmsine' },
          { key: 'fmsquare' },
          { key: 'fmtriangle' },
          { key: 'fmsawtooth' },
          { key: 'amsine' },
          { key: 'amsquare' },
          { key: 'amtriangle' },
          { key: 'amsawtooth' },
          { key: 'pulsesine' },
          { key: 'pulsesquare' },
          { key: 'pulsetriangle' },
          { key: 'pulsesawtooth' },
          { key: 'pwm' }
        ]
      }
    ]
  },
  "amplitudeEnvelope": {
    "id": "amplitudeEnvelope",
    "name": "Amplitude Envelope",
    "type":"Native",
    "className":"AmplitudeEnvelope",
    "controls": [
      {
        type: 'switch',
        name: 'button',
        id: 'button',
        action: {
          type: 'call',
          functionName: {
            true: 'triggerAttack',
            false: 'triggerRelease'
          }
        }
      },
      {
        type: 'range',
        name: 'attack',
        id: 'attack',
        min: 0,
        max: 1
      },
      {
        type: 'range',
        name: 'decay',
        id: 'decay',
        min: 0,
        max: 1
      },
      {
        type: 'range',
        name: 'sustain',
        id: 'sustain',
        min: 0,
        max: 1
      },
      {
        type: 'range',
        name: 'release',
        id: 'release',
        min: 0,
        max: 1
      }
    ]
  }
}

const PRESET = {
  "name": "test",
  "modules": [
    {
      "id": "omniOscillator",
      "params": {
        "power": true,
        "volume.value": -20,
        "frequency.value": 220,
        "type": "square"
      }
    },
    {
      "id": "amplitudeEnvelope",
      "params": {
        "attack": 0.1,
        "decay": 0.2,
        "sustain": 1,
        "release": 0.8
      }
    },
    {
      "id": "master"
    }
  ]
};

class Config {
  constructor() {
  }

  getPreset() {
    return PRESET;
  }

  getModule(id) {
    const module = MODULES[id];
    if (module === undefined) {
      return Promise.reject(`Unsupported id: "${id}"`);
    }
    return Promise.resolve(module);
  }

  getModules(ids) {
    return Promise.resolve(ids.map(id => {
      const module = MODULES[id];
      if (module === undefined) {
        throw new Error(`Unsupported id: "${id}"`);
      }
      return module;
    }));
  }
}

export default new Config();