import React from 'react';
import styled from 'styled-components';
import GeneralPanel from './GeneralPanel';
import SamplerPanel from './SamplerPanel';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  getPanel(type) {
    const { index, module: { config: { id }} } = this.props
    switch (id) {
      case 'sampler':
        return <SamplerPanel index={index}/>
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