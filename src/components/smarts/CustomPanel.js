import React from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd';
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import Slider from '@components/dumbs/Slider'
import { noteToFrequency } from '@utils/converter'

const Root = styled.div`
  position: relative;
  overflow: auto;
`

const StyledButton = styled(Button)`
  position: absolute;
`

const StyledSwitch = styled(Switch)`
  position: absolute;
`

const StyledSlider = styled(Slider)`
  position: absolute;
`

const Draggable = DragSource('CONTROL', {
  beginDrag({ children }) {
    return children;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))((props) => {
  const { connectDragSource, isDragging, children } = props
  return connectDragSource(
    <div style={{
      display: isDragging ? 'none' : 'block',
      cursor: '-webkit-grab',
      userSelect: 'none'
    }}>
      {children}
    </div>
  )
})

export class CustomPanel extends React.Component {

  onChange({ actions = [] }, pressed) {
    const { setParameter } = this.props
    actions.forEach(({ index, id, params }) => {
      let value = pressed
      if(params === undefined){
        setParameter(index, id, value)
      }else {
        value = params[value]
        if(value !== undefined) {
          setParameter(index, id, value)
        }
      }
    });
  }

  controlToComponent(index, control) {
    switch (control.type) {
      case 'button':
        return <StyledButton
          key={index}
          style={control.style}
          onToggle={pressed => this.onChange(control, pressed)}/>

      case 'switch':
        return <StyledSwitch
          key={index}
          style={control.style}
          onToggle={selected => this.onChange(control, selected)}/>

      case 'slider':
        return <StyledSlider
          key={index}
          style={control.style}
          config={control.config}
          onChange={value => this.onChange(control, value)}/>
    }
  }

  render() {
    const { preset: { panels: [ panel = {} ] = [] } = {} } = this.props
    const { controls = [] } = panel

    return (
      <Root className={this.props.className}>
        {controls.map((control, index) => (
          <Draggable key={index}>
            {this.controlToComponent(index, control)}
          </Draggable>
        ))}
      </Root>
    )
  }
}

import { connect } from 'react-redux'
import { setParameter } from '@flow/modules/actions'

export default connect(
  state => ({
    preset: state.preset.preset,
  }),
  dispatch => ({
    setParameter(moduleIndex, controlName, value) {
      dispatch(setParameter(moduleIndex, controlName, value))
    }
  })
)(CustomPanel)