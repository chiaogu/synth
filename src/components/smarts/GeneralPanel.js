import React from 'react';
import styled from 'styled-components';
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Core from '@utils/Core';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 8px;
  background: #fff;
`;

const EffectName = styled.div`
  margin-right: 16px;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const ControlName = styled.div`
  margin-bottom: 8px;
`;

const StyledMenu = styled(Menu) `
  height: 200px;
`;

const StyledRange = styled(Range) `
  height: 200px;
`;

const StyledSwitch = styled(Switch) `
  width: 30px;
  height: 30px;
`;

export default class GeneralPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange(name, value) {
  }

  controlToComponent(control, index) {
    switch (control.type) {
      case 'range':
        return <StyledRange
          config={control}
          onChange={value => this.onChange(control.name, value)}
        />;
      case 'menu':
        return <StyledMenu
          config={control}
          onSelect={(choice, index) => this.onChange(control.name, choice.key)}
        />;
      case 'switch':
        return  <StyledSwitch
          config={control}
          onSelect={(choice, index) => this.onChange(control.name, choice.key)}
        />;
    }
  }

  render() {
    const { id, effect } = this.props;

    const controls = Core.getControls(effect.type).map((control, index) => {
      const component = this.controlToComponent(control, index);
      return (
        <ControlWrapper key={index}>
          <ControlName>{control.name}</ControlName>
          {component}
        </ControlWrapper>
      );
    });

    return (
      <Root className={this.props.className}>
        <EffectName>{id}<br />{effect.type}</EffectName>
        {controls}
      </Root>
    );
  }
}