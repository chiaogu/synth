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

export default class Button extends React.Component {

  constructor(props) {
    super(props);

    this.state = { pressed : false };
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  mapPropsToState({ value = false }) {
    this.setState({ pressed: value });
  }

  onMouseDown() {
    this.toggle(true);
  }

  onMouseUp() {
    this.toggle(false);
  }

  toggle(pressed) {
    this.setState({ pressed });

    if (this.props.onToggle) {
      this.props.onToggle(pressed);
    }
  }

  render() {
    const { pressed } = this.state;
    const state = pressed ? 'on' : 'off';
    const style = {
      background: pressed ? '#000' : '#fff',
      color: pressed ? '#fff' : '#000'
    };

    return (
      <Root
        style={style}
        className={this.props.className}
        onMouseDown ={e => this.onMouseDown()}
        onMouseUp ={e => this.onMouseUp()}>
        {state}
      </Root>
    );
  }
}