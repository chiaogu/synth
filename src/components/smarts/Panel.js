import React from 'react';
import styled from 'styled-components';
import GeneralPanel from '@components/smarts/GeneralPanel';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { id, effect } = this.props;

    let panel;
    switch (effect.type) {
      default:
        panel = <GeneralPanel key={id} id={id} effect={effect} />
        break;
    }

    return (
      <div className={this.props.className}>
        {panel}
      </div>
    )
  }
}