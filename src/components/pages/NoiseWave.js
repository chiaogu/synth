import React from 'react';
import styled from 'styled-components';
import Tone from 'tone';

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Slide = styled.input`
  width: 300px;
`;

export default class NoiseWave extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }

    this.noise = new Tone.Noise("brown");
    this.noise.toMaster();
  }

  onChange(e) {
    let value = e.target.value;
    this.setState({
      value
    });

    let ratio = value / 100;
    this.noise.volume.value = -10 + ratio * 10;
  }

  onMouseDown(e) {
    this.noise.start();
  }

  onMouseUp(e) {
    this.noise.stop();
  }

  render() {
    return (
      <Root>
        <Slide
          type="range"
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
        ></Slide>
      </Root>
    );
  }

}