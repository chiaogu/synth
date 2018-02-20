import React from 'react';
import styled from 'styled-components';
import GeneralPanel from '@components/smarts/GeneralPanel';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { id, module } = this.props;

    let panel;
    switch (module.type) {
      default:
        panel = <GeneralPanel key={id} id={id} module={module} />
        break;
    }

    return (
      <div className={this.props.className}>
        {panel}
      </div>
    )
  }
}