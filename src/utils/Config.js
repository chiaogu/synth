import Tone from 'tone';

const CONTROLS = {
  "oscillator": [
    {
      type: 'switch',
      name: 'power',
      id: 'power'
    },
    {
      type: 'range',
      name: 'volume',
      id: 'volume',
      min: -40,
      max: 0
    },
    {
      type: 'range',
      name: 'frequency',
      id: 'frequency',
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

const EFFECTS = [
  {
    "type": "oscillator",
    "params": {
      "power": true,
      "volume": -20,
      "frequency": 220,
      "type": "sine"
    }
  }
];

class Config {
  constructor() {
  }

  getEffects() {
    return EFFECTS;
  }

  getControls(type) {
    const controls = CONTROLS[type];
    if (controls === undefined) {
      throw new Error(`Unsupported type "${type}"`);
    }
    return controls;
  }
}

export default new Config();