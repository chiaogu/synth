import React from 'react';
import styled from 'styled-components';
import Tone from 'tone';
import Level from '@components/dumbs/Level'

const StyledLevel = styled(Level)`
  height: 100px;
  width: 30px;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TouchPad = styled.div`
  width: 500px;
  height: 500px;
  background: #000;
`;

export default class Playground extends React.Component {

  constructor(props) {
    super(props);

    let pingPong = new Tone.PingPongDelay("16n", 0.5);
    this.freeverb = new Tone.Freeverb();
    this.env = new Tone.AmplitudeEnvelope();

    this.sound = new Tone.Oscillator("C4")
    this.sound.set('volume', -20);

    this.sound.connect(this.freeverb);
    this.freeverb.connect(this.env);
    this.env.toMaster();

    this.sound.start();
  }

  onLevelChange(e) {
    console.log('onLevelChange', e);
  }

  render() {
    return (
      <Root>
        {/* <TouchPad
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
        ></TouchPad> */}
        <StyledLevel onChange={this.onLevelChange.bind(this)}/>
      </Root>
    );
  }

}