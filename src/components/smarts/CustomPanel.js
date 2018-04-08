import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import Slider from '@components/dumbs/Slider'
import Draggable from '@components/smarts/Draggable'
import Droppable from '@components/smarts/Droppable'
import { noteToFrequency } from '@utils/converter'

const Root = styled.div`
  position: relative;
  overflow: auto;
`

const StyledButton = styled(Button) `
  width: 100%;
  height: 100%;
  ${({ isEditingPanel }) => isEditingPanel ? `
    pointer-events: none;
  ` : ``}
`

const StyledSwitch = styled(Switch) `
  width: 100%;
  height: 100%;
  ${({ isEditingPanel }) => isEditingPanel ? `
    pointer-events: none;
  ` : ``}
`

const StyledSlider = styled(Slider) `
  width: 100%;
  height: 100%;
  ${({ isEditingPanel }) => isEditingPanel ? `
    pointer-events: none;
  ` : ``}
`

const ControlWrapper = styled.div`
  position: absolute;
`

const StyledDroppable = styled(Droppable) `
  height: 100%;
`

function controlStyleToCss(style) {
  return Object.keys(style).reduce((css, key) => {
    css[key] = `${style[key]}px`
    return css
  }, {})
}

export class CustomPanel extends React.Component {
  onChange({ actions = [] }, pressed) {
    const { setParameter } = this.props
    actions.forEach(({ index, id, params }) => {
      let value = pressed
      if (params === undefined) {
        setParameter(index, id, value)
      } else {
        value = params[value]
        if (value !== undefined) {
          setParameter(index, id, value)
        }
      }
    });
  }

  onDrop({ diff: { x, y }, item: { control, index } }) {
    const { editCustomPanelControl } = this.props
    control.style.left += x
    control.style.top += y
    editCustomPanelControl(control, index)
  }

  controlToComponent(index, control, isEditingPanel) {
    switch (control.type) {
      case 'button':
        return <StyledButton
          key={index}
          isEditingPanel={isEditingPanel}
          onToggle={pressed => this.onChange(control, pressed)} />

      case 'switch':
        return <StyledSwitch
          key={index}
          isEditingPanel={isEditingPanel}
          onToggle={selected => this.onChange(control, selected)} />

      case 'slider':
        return <StyledSlider
          key={index}
          config={control.config}
          isEditingPanel={isEditingPanel}
          onChange={value => this.onChange(control, value)} />
    }
  }

  render() {
    const {
      preset: { panels: [panel = {}] = [] } = {},
      isEditingPanel
    } = this.props

    const { controls = [] } = panel

    return (
      <StyledDroppable onDrop={e => this.onDrop(e)}>
        <Root className={this.props.className}>
          {controls.map((control, index) => {
            return (
              <Draggable
                key={index}
                canDrag={isEditingPanel}
                item={{ control, index }}>
                <ControlWrapper style={controlStyleToCss(control.style)}>
                  {this.controlToComponent(index, control, isEditingPanel)}
                </ControlWrapper>
              </Draggable>
            )
          })}
        </Root>
      </StyledDroppable>
    )
  }
}

import { connect } from 'react-redux'
import { setParameter } from '@flow/modules/actions'
import { editCustomPanelControl } from '@flow/preset/actions'

export default connect(
  state => ({
    preset: state.preset.preset,
    isEditingPanel: state.preset.isEditingPanel
  }),
  dispatch => ({
    setParameter(moduleIndex, controlName, value) {
      dispatch(setParameter(moduleIndex, controlName, value))
    },
    editCustomPanelControl(control, index) {
      dispatch(editCustomPanelControl(control, index))
    }
  })
)(CustomPanel)