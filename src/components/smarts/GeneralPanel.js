import React from 'react'
import styled from 'styled-components'
import _ from '@utils/lodash'
import Range from '@components/dumbs/Range'
import Menu from '@components/dumbs/Menu'
import Switch from '@components/dumbs/Switch'
import Button from '@components/dumbs/Button'
import InputButton from '@components/dumbs/InputButton'

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  overflow: auto;
  box-sizing: border-box;
`

const ModuleName = styled.div`
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-contens: center;
`

const ControlList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex: 1 1 auto;
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 12px;
`

const ControlName = styled.div`
  margin-bottom: 8px;
`

const StyledMenu = styled(Menu) `
  height: 100%;
`

const StyledRange = styled(Range) `
  height: 100%;
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
          {component}
          <ControlName>{control.name}</ControlName>
        </ControlWrapper>
      )
    })

    return (
      <Root className={this.props.className}>
        <ModuleName>{name}</ModuleName>
        <ControlList>
          {components}
        </ControlList>
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