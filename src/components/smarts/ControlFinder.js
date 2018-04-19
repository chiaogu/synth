import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  position: relative;
  background: red;
`

class ControlFinder extends React.Component {

  render() {
    return (
      <Root>
      </Root>
    )
  }
}


import { connect } from 'react-redux'

export default connect(
  (state) => {
    return {}
  },
  dispatch => ({

  })
)(ControlFinder)