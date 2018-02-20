import Tone from 'tone';

const CONTROLS = {
  "oscillator": [
    {
      type: 'range',
      name: 'volume',
      min: -40,
      max: 0
    },
    {
      type: 'range',
      name: 'frequency',
      min: 0,
      max: 440
    },
    {
      type: 'menu',
      name: 'type',
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
    "type": "oscillator"
  },
  {
    "type": "oscillator"
  }
];

class Core {
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

export default new Core();