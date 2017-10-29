import React from 'react';
import styled from 'styled-components';
import Tone from 'tone';
import Panel from '@components/smarts/Panel'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledPanel = styled(Panel)`
  margin: 8px;
`;

function getSource(type) {
  switch(type){
    case "white":
    case "pink":
    case "brown":
      return new Tone.Noise(type);
    case "oscillator":    
      return new Tone.Oscillator();
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
            {key: 'sine'},
            {key: 'square'},
            {key: 'triangle'},
            {key: 'sawtooth'}
          ]
        },
        {
          type: 'range',
          name: 'partial-1',
          min: 50,
          max: -50
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
      source: 'oscillator',
      effect: []
    };

    this.syncTone();
  }

  syncTone() {
    if(this.source) {
      this.source.dispose();
    }
    this.source = getSource(this.state.source).toMaster().start();
    // this.effects = this.state.effect.map(type => getEffect(type));
  }

  onSourceChange(e) {
    if(!this.source) return;

    let { name, value } = e;

    if(name.indexOf('partials') !== -1){

    }
    this.source.set(name, value);
  }

  onPanelChange(index, e) {
    console.log('onPanelChange', index, e);
  }

  render() {
    let panels = this.state.effect.map((type, index) => {
      let controls = getControls(type);
      return <StyledPanel key={index} controls={controls} onChange={e => this.onPanelChange(index, e)}/>
    });

    let sourceControl = getControls(this.state.source);

    return (
      <Root>
        <StyledPanel controls={sourceControl} onChange={this.onSourceChange.bind(this)}/>
        {panels}
      </Root>
    );
  }

}