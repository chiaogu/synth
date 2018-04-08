import React from 'react'
import styled from 'styled-components'
import Hammer from 'react-hammerjs'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import Slider from '@components/dumbs/Slider'
import Draggable from '@components/smarts/Draggable'
import Droppable from '@components/smarts/Droppable'
import { noteToFrequency } from '@utils/converter'

const RESIZE_HANDLE_SIZE = 16
const MINIMUN_CONTROL_SIZE = 28

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
  z-index: 1;
`

const ResizeHandle = styled(Hammer) `
  position: absolute;
  z-index: 2;
  width: ${RESIZE_HANDLE_SIZE}px;
  height: ${RESIZE_HANDLE_SIZE}px;
  background: black;
  ${({ index }) => {
    switch (index) {
      case 0:
        return `
          left: -${RESIZE_HANDLE_SIZE / 2}px;
          top: -${RESIZE_HANDLE_SIZE / 2}px;
          cursor: nwse-resize;
        `
      case 1:
        return `
          right: -${RESIZE_HANDLE_SIZE / 2}px;
          top: -${RESIZE_HANDLE_SIZE / 2}px;
          cursor: nesw-resize;
        `
      case 2:
        return `
          right: -${RESIZE_HANDLE_SIZE / 2}px;
          bottom: -${RESIZE_HANDLE_SIZE / 2}px;
          cursor: nwse-resize;
        `
      case 3:
        return `
          left: -${RESIZE_HANDLE_SIZE / 2}px;
          bottom: -${RESIZE_HANDLE_SIZE / 2}px;
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

  constructor() {
    super()
    this.state = {
      isResizing: false
    }
  }

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


  onResizeStart(e, { control: { style } }) {
    this.sizeBeforeResize = { ...style }
  }

  onResize({ deltaX: x, deltaY: y }, { control, index }, handleIndex) {
    const { editCustomPanelControl } = this.props
    const current = control.style
    const previous = this.sizeBeforeResize
    if (handleIndex === 0) {
      current.width = previous.width - x
      current.height = previous.height - y
      if(current.width >= MINIMUN_CONTROL_SIZE){
        current.left = previous.left + x
      }
      if(current.height >= MINIMUN_CONTROL_SIZE){
        current.top = previous.top + y
      }
    } else if (handleIndex === 1) {
      current.width = previous.width + x
      current.height = previous.height - y
      if(current.height >= MINIMUN_CONTROL_SIZE){
        current.top = previous.top + y
      }
    } else if (handleIndex === 2) {
      current.width = previous.width + x
      current.height = previous.height + y
    } else if (handleIndex === 3) {
      current.width = previous.width - x
      current.height = previous.height + y
      if(current.width >= MINIMUN_CONTROL_SIZE){
        current.left = previous.left + x
      }
    }

    current.width = Math.max(current.width, MINIMUN_CONTROL_SIZE)
    current.height = Math.max(current.height, MINIMUN_CONTROL_SIZE)

    editCustomPanelControl(control, index)
  }

  onResizeHandleTouchDown(e) {
    this.setState({ isResizing: true })
  }

  onResizeHandleTouchUp(e) {
    e.stopPropagation()
    this.setState({ isResizing: false })
  }

  onSelectControl(control, index) {
    console.log('onSelectControl', control, index)
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
    const { isResizing } = this.state

    const { controls = [] } = panel

    return (
      <StyledDroppable onDrop={e => this.onDrop(e)}>
        <Root className={this.props.className}>
          {controls.map((control, index) => {
            return (
              <Draggable
                key={index}
                canDrag={isEditingPanel && !isResizing}
                item={{ control, index }}>
                <Resizable
                  style={controlStyleToCss(control.style)}
                  onTouchEnd={e => this.onSelectControl(control, index)}
                  onMouseUp={e => this.onSelectControl(control, index)}>
                  {isEditingPanel && [0, 1, 2, 3].map(item => (
                    <ResizeHandle
                      key={item}
                      index={item}
                      direction={'DIRECTION_ALL'}
                      onMouseDown={e => this.onResizeHandleTouchDown(e)}
                      onMouseUp={e => this.onResizeHandleTouchUp(e)}
                      onTouchStart={e => this.onResizeHandleTouchDown(e)}
                      onTouchEnd={e => this.onResizeHandleTouchUp(e)}
                      onTouchCancel={e => this.onResizeHandleTouchUp(e)}
                      onPan={e => this.onResize(e, { control, index }, item)}
                      onPanStart={e => this.onResizeStart(e, { control, index })}>
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