import React from 'react';
import styled from 'styled-components';
import Panel from '@components/smarts/Panel';
import Core from '@utils/Core';

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
      effects: []
    }
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const effects = Core.getEffects();
    this.setState({ effects });
  }

  render() {
    let panels = this.state.effects.map((effect, index) => {
      return <StyledPanel key={index} id={index} effect={effect}/>
    });

    return (
      <Root>
        {panels}
      </Root>
    );
  }

}