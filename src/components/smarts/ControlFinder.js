import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import Slider from '@components/dumbs/Slider'
import Draggable from '@components/smarts/Draggable'
import Droppable from '@components/smarts/Droppable'

const SHINE = '0px 2px 15px 0px rgba(255,255,255,1)'

const Root = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: center;
`

const StyledDroppable = styled(Droppable) `
  height: 100%;
`

const ControlColumn = styled.div`
  height: calc(100% - 16px);
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-event: none;
`

const ControlName = styled.div`
  margin-top: 8px;
  color: #fff;
  user-select: none;
`

const ControlWrapper = styled.div`
  box-shadow: ${SHINE};
`

const StyledButton = styled(Button) `
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const StyledSwitch = styled(Switch) `
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const StyledSlider = styled(Slider) `
  width: 100%;
  height: 100%;
  pointer-events: none;
`

class ControlFinder extends React.Component {

  controlToComponent(control) {
    switch (control.id) {
      case 'button':
        return <StyledButton />

      case 'switch':
        return <StyledSwitch />

      case 'slider':
        return <StyledSlider config={control.config} />
    }
  }

  componentDidMount() {
    const { loadControls } = this.props
    loadControls()
  }

  render() {
    const { controls } = this.props

    return (
      <StyledDroppable>
        <Root>
          {controls.map((control, index) => (
            <ControlColumn key={index}>
              <Draggable item={{ control, isFromFinder: true }}>
                <ControlWrapper style={control.style}>
                  {this.controlToComponent(control)}
                </ControlWrapper>
              </Draggable>
              <ControlName>{control.name}</ControlName>
            </ControlColumn>
          ))}
        </Root>
      </StyledDroppable>
    )
  }
}


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ControlFinderActions from '@flow/controlFinder/actions'
import * as Config from '@utils/config'

export default connect(
  state => ({
    controls: state.controlFinder.controls
  }),
  dispatch => {
    const {
      findControls,
      findControlsSuccess
    } = bindActionCreators(ControlFinderActions, dispatch)

    return {
      loadControls() {
        findControls()
        Config.findControls().then(controls => {
          findControlsSuccess(controls)
        })
      }
    }
  }
)(ControlFinder)