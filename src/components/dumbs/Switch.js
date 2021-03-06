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
`;

export default class Switch extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: false };
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  mapPropsToState({ value }) {
    if(value !== undefined) this.setState({ selected: value });
  }

  onToggle() {
    const selected = !this.state.selected;
    this.setState({ selected });

    if (this.props.onToggle) {
      this.props.onToggle(selected);
    }
  }

  render() {
    const { style: propsStyle } = this.props
    const { selected } = this.state
    const state = selected ? '1' : '0'
    const style = {
      background: selected ? '#000' : '#fff',
      color: selected ? '#fff' : '#000',
      ...propsStyle
    }

    return (
      <Root
        style={style}
        className={this.props.className}
        onTouchStart={e => e.preventDefault()}
        onTouchEnd={e => this.onToggle()}
        onMouseUp={e => this.onToggle()}>
        {state}
      </Root>
    );
  }
}