import Tone from 'tone';

class Core {
    constructor() {}

    setModules(modules) {
        // Tone.Master.dispose();

        let a = new Tone.OmniOscillator();
        // a.start();

        Tone.connectSeries(...[
          a, Tone.Master
        ]);
    }
}

export default new Core();