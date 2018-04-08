import React from 'react'
import styled from 'styled-components'
import Hammer from 'react-hammerjs'
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

const Resizable = styled.div`
  position: absolute;
`

const ResizeHandle = styled(Hammer) `
  position: absolute;
  z-index: 6;
  width: 10px;
  height: 10px;
  background: black;
  ${({ index }) => {
    switch (index) {
      case 0:
        return `
          left: -5px;
          top: -5px;
          cursor: nwse-resize;
        `
      case 1:
        return `
          right: -5px;
          top: -5px;
          cursor: nesw-resize;
        `
      case 2:
        return `
          right: -5px;
          bottom: -5px;
          cursor: nwse-resize;
        `
      case 3:
        return `
          left: -5px;
          bottom: -5px;
          cursor: nesw-resize;
        `
    }
  }}
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

  onResize({ velocityX: x, velocityY: y }, { control, index }) {
    //TODO: Use transform to preview the size and only invoke action when onPanEnd
    console.log(x, y)
    const { editCustomPanelControl } = this.props
    control.style.width += x * 9
    control.style.height += y * 9
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
                <Resizable style={controlStyleToCss(control.style)}>
                  {isEditingPanel && [0, 1, 2, 3].map(item => (
                    <ResizeHandle
                      key={item}
                      index={item}
                      direction={'DIRECTION_ALL'}
                      onMouseDown={e => e.stopPropagation()}
                      onTouchStart={e => e.stopPropagation()}
                      onPan={e => this.onResize(e, { control, index })}>
                      <div></div>
                    </ResizeHandle>
                  ))}
                  {this.controlToComponent(index, control, isEditingPanel)}
                </Resizable>
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