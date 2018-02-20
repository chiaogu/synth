import React from 'react';
import styled from 'styled-components';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { id, effect } = this.props;

    return (
      <Root className={this.props.className}>
        <Name>{id}<br />{effect.type}</Name>
        {controls}
      </Root>
    );
  }
}