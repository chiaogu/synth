import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
    overflow: auto;
`;

const Item = styled.div`
    text-align: center;
    height: 44px;
    width: 100%;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;
`;

export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: 0
    }
  }

  onSelect(choice, index) {
    if (this.props.onSelect) {
      this.props.onSelect(choice, index);
    }

    this.setState({ selected: index });
  }

  render() {
    let items = (this.props.config.choices || []).map((choice, index) => {
      let style = {
        background: index === this.state.selected ? '#000' : '#fff',
        color: index === this.state.selected ? '#fff' : '#000'
      };
      return (
        <Item key={index} style={style} onClick={e => this.onSelect(choice, index)}>
          {choice.title || choice.key}
        </Item>
      );
    });
    return (
      <Root className={this.props.className}>
        <List>
          {items}
        </List>
      </Root>
    )
  }
}