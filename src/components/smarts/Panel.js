import React from 'react';
import styled from 'styled-components';
import GeneralPanel from '@components/smarts/GeneralPanel';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  getPanel(type) {
    const { index, module } = this.props;

    switch (module.type) {
      default:
        return <GeneralPanel index={index}/>
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.getPanel()}
      </div>
    )
  }
}