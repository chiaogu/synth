import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import { noteToFrequency } from '@utils/converter'

const Root = styled.div`
  position: relative;
  overflow: auto;
`

const StyledButton = styled(Button)`
  position: absolute;
`

export class CustomPanel extends React.Component {

  onChange({ actions = [] }, pressed) {
    const { setParameter } = this.props
    actions.forEach(({ index, id, params }) => {
      let value = pressed
      if(params === undefined){
        setParameter(index, id, value)
        console.log('setParameter', index, id, value)
      }else {
        value = params[value]
        if(value !== undefined) {
          setParameter(index, id, value)
          console.log('setParameter', index, id, value)
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
          onToggle={pressed => this.onChange(control, pressed)}
        />
    }
  }

  render() {
    const { preset: { panels: [ panel ] = [] } } = this.props
    const { controls } = panel
    console.log(controls)
    return (
      <Root className={this.props.className}>
        {controls.map((control, index) => this.controlToComponent(index, control))}
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