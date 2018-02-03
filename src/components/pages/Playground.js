import React from 'react';
import styled from 'styled-components';
import Panel from '@components/smarts/Panel';
import Center from '@utils/Center';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledPanel = styled(Panel)`
  margin: 8px;
`;

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
    Center.setSource(this.state.source);
    // this.effects = this.state.effect.map(type => getEffect(type));
  }

  onSourceChange(e) {
    let { name, value } = e;
    Center.setSourceParam(name, value);
  }

  onPanelChange(index, e) {
    console.log('onPanelChange', index, e);
  }

  render() {
    let panels = this.state.effect.map((type, index) => {
      let controls = Center.getControls(type);
      return <StyledPanel key={index} controls={controls} onChange={e => this.onPanelChange(index, e)}/>
    });

    let sourceControl = Center.getControls(this.state.source);

    return (
      <Root>
        <StyledPanel controls={sourceControl} onChange={this.onSourceChange.bind(this)}/>
        {panels}
      </Root>
    );
  }

}