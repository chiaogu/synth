import React from 'react'
import styled from 'styled-components'
import _ from '@utils/lodash'
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Button from '@components/dumbs/Button'
import InputButton from '@components/dumbs/InputButton'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 8px;
  background: #fff;
`

const ModuleName = styled.div`
  margin-right: 16px;
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`

const ControlName = styled.div`
  margin-bottom: 8px;
`

const StyledMenu = styled(Menu) `
  height: 200px;
`

const StyledRange = styled(Range) `
  height: 200px;
`

const StyledSwitch = styled(Switch) `
  width: 30px;
  height: 30px;
`

const StyledButton = styled(Button) `
  width: 30px;
  height: 30px;
`

const StyledInputButton = styled(InputButton) `
  width: 50px;
  height: 70px;
`

class GeneralPanel extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    const params = this.props.modules[this.props.index].params
    const nextParams = nextProps.modules[nextProps.index].params
    return !_.isEqual(params, nextParams)
  }

  onChange(control, value) {
    const { id } = control
    const { index, setParameter } = this.props
    setParameter(index, id, value);
  }

  controlToComponent(control, param) {
    switch (control.type) {
      case 'range':
        return <StyledRange
          config={control}
          value={param}
          onChange={value => this.onChange(control, value)}
        />
      case 'menu':
        return <StyledMenu
          config={control}
          value={param}
          onSelect={(choice, index) => this.onChange(control, choice.key)}
        />
      case 'switch':
        return <StyledSwitch
          config={control}
          value={param}
          onToggle={selected => this.onChange(control, selected)}
        />
      case 'button':
        return <StyledButton
          config={control}
          value={param}
          onToggle={pressed => this.onChange(control, pressed)}
        />
      case 'inputButton':
        return <StyledInputButton
          config={control}
          value={param}
          onToggle={pressed => this.onChange(control, pressed)}
        />
    }
  }

  render() {
    const { index, modules } = this.props
    const { params = {}, config: { controls = [], name } } = modules[index]

    const components = controls.map((control, index) => {
      const param = params[control.id]
      const component = this.controlToComponent(control, param)

      return (
        <ControlWrapper key={index}>
          <ControlName>{control.name}</ControlName>
          {component}
        </ControlWrapper>
      )
    })

    return (
      <Root className={this.props.className}>
        <ModuleName>{index}<br />{name}</ModuleName>
        {components}
      </Root>
    )
  }
}


import { connect } from 'react-redux'
import { setParameter } from '@state/modules/actions'

export default connect(
  state => ({
    modules: state.modules.modules
  }),
  dispatch => ({
    setParameter(moduleIndex, controlName, value) {
      dispatch(setParameter(moduleIndex, controlName, value))
    }
  })
)(GeneralPanel)