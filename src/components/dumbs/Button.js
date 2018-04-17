import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 15px -5px rgba(0,0,0,0.6);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
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

  mapPropsToState({ value, config: { defaultValue } = {} }) {
    if(value === undefined) value = defaultValue
    if(value !== undefined) this.setState({ pressed: value })
  }


  onMouseDown(e) {
    e.preventDefault()
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
    const { style: propsStyle } = this.props
    const { pressed } = this.state
    const state = pressed ? '1' : '0'
    const style = {
      background: pressed ? '#000' : '#fff',
      color: pressed ? '#fff' : '#000',
      ...propsStyle
    }

    return (
      <Root
        style={style}
        className={this.props.className}
        onTouchStart={e => this.onMouseDown(e)}
        onTouchEnd={e => this.onMouseUp()}
        onMouseDown={e => this.onMouseDown(e)}
        onMouseUp={e => this.onMouseUp()}>
        {state}
      </Root>
    );
  }
}