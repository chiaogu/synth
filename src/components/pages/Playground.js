import React from 'react';
import styled from 'styled-components';
import Tone from 'tone';
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

function getToneModule(type) {
  switch (type) {
    case 'oscillator':
      return new Tone.Oscillator();
    default:
      throw new Error(`Unsupported type "${type}"`);
  }
}

function getModuleControls(type) {
  switch (type) {
    case 'oscillator':
      return [
        {
          type: 'level',
          name: 'volumn',
          min: -40,
          max: 40
        },
        {
          type: 'level',
          name: 'frequency',
          min: 0,
          max: 440
        }
      ];
    default:
      throw new Error(`Unsupported type "${type}"`);
  }
}

export default class Playground extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modules: ['oscillator']
    };

    let modules = this.state.modules.map(type => getToneModule(type));
  }

  render() {
    let panels = this.state.modules.map((type, index) => {
      let controls = getModuleControls(type);
      return <Panel key={index} controls={controls} />
    });

    return (
      <Root>
        {panels}
      </Root>
    );
  }

}