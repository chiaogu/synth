import Tone from 'tone';

function getSource(type) {
    switch (type) {
        case "noise":
            return new Tone.Noise(type);
        case "oscillator":
            return new Tone.OmniOscillator();
        default:
            throw new Error(`Unsupported type "${type}"`);
    }
}

function getEffect(type) {
    switch (type) {
        case 'oscillator':
            return new Tone.Oscillator();
        default:
            throw new Error(`Unsupported type "${type}"`);
    }
}

function getControls(type) {
    switch (type) {
        case 'oscillator':
            return [
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
            ];
        default:
            throw new Error(`Unsupported type "${type}"`);
    }
}

class Center {
    constructor() {
        this.getControls = getControls;
    }

    setSource(type) {
        if (this.source) {
            this.source.dispose();
        }
        this.source = getSource(type).toMaster().start();
    }

    setSourceParam(key, value) {
        if(!this.source) return;

        this.source.set(key, value);
    }
}

export default new Center();