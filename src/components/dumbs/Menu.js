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
    height: 100%;
    box-shadow: 0px 2px 15px -5px rgba(0,0,0,0.6);
    overflow: auto;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    height: 44px;
    width: 100%;
    margin: 0 8px;
    text-align: center;
    cursor: default;
    user-select: none;
    font-size: 16px;
`;

export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = { selected: undefined };
  }

  componentDidMount() {
    this.mapPropsToState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.mapPropsToState(nextProps);
  }

  mapPropsToState({ value, config: { defaultValue, choices = []} }) {
    if(value === undefined) value = defaultValue
    let selected = choices.findIndex(choice => choice.key === value)
    if(selected === -1){
      selected = 0
    }

    this.setState({ selected });
  }

  onSelect(choice, index) {
    this.setState({ selected: index });

    if (this.props.onSelect) {
      this.props.onSelect(choice, index);
    }
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