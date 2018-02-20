import React from 'react';
import styled from 'styled-components';
import GeneralPanel from '@components/smarts/GeneralPanel';
import Core from '@utils/Core';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledGeneralPanel = styled(GeneralPanel) `
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
    const panels = this.state.effects.map((effect, index) => {
      return <StyledGeneralPanel key={index} id={index} effect={effect} />
    });

    return (
      <Root>
        {panels}
      </Root>
    );
  }

}