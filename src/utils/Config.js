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
        id: 'power'
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