import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  cursor: default;
  user-select: none;
`;

export default class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: true
    };
  }

  onSelect() {
    const selected = !this.state.selected;
    this.setState({ selected });
  }

  render() {
    const state = this.state.selected ? 'on' : 'off';
    const style = {
      background: this.state.selected ? '#000' : '#fff',
      color: this.state.selected ? '#fff' : '#000'
    };

    return (
      <Root
        style={style}
        className={this.props.className}
        onClick={e => this.onSelect()}>
        {state}
      </Root>
    );
  }
}