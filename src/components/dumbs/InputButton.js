import React from 'react';
import styled from 'styled-components';
import Button from '@components/dumbs/Button';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  user-select: none;
`;

const Input = styled.input`
  width: 100%;
  text-align: center;
  flex: 1 1 auto;
  border: none;
  outline: none;
  border: 1px solid #000;
  border-bottom: none;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 30px;
`;

export default class InputButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      pressed : this.props.value 
    };
  }

  onToggle(pressed) {
    if (this.props.onToggle) {
      this.props.onToggle(pressed);
    }
  }

  render() {
    return (
      <Root className={this.props.className}>
        <Input placeholder="note"/>
        <StyledButton onToggle={e => this.onToggle(e)}></StyledButton>
      </Root>
    );
  }
}