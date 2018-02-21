import React from 'react';
import styled from 'styled-components';
import GeneralPanel from '@components/smarts/GeneralPanel';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange(key, value) {
    const { onChange } = this.props;

    if(onChange) onChange(key, value);
  }

  getPanel(type) {
    const { index, module } = this.props;

    switch (module.type) {
      default:
        return (
          <GeneralPanel
            index={index}
            module={module}
            onChange={(key, value) => this.onChange(key, value)}
          />
        )
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