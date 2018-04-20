import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import connect from './ControlEditorLogic'
import {
  SHINE,
  ControlWrapper,
  AttrList,
  AttrHeader,
  AttrColumn,
  AttrNameRow,
  AttrName,
  AttrRow,
  AttrItem,
  DeleteActionButton,
  AddActionButton
} from './styles'

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const StyledButton = styled(Button) `
  width: 48px;
  height: 48px;
  box-shadow: ${SHINE};
`

const StyledSwitch = styled(Switch) `
  width: 48px;
  height: 48px;
  box-shadow: ${SHINE};
`

const StyledAttrItem = AttrItem.extend`
  width: calc(50% - 16px);
  ${({ value }) => value === 'true' && `
    margin-right: 8px;
  `}
  ${({ value }) => value === 'false' && `
    margin-left: 8px;
  `}
`

class ButtonEditor extends React.Component {

  onChange(pressed) {
    const { performAction, control } = this.props
    performAction(control, pressed)
  }

  onClickActionItem(index, value) {
    const {
      actionIndex: currIndex,
      value: currValue,
      clickActionItem
    } = this.props

    clickActionItem(currIndex, currValue, index, value)
  }

  addAction() {
    const {
      control,
      controlIndex,
      addAction
    } = this.props

    addAction(control, controlIndex, {
      index: undefined,
      id: undefined,
      params: {
        'true': undefined,
        'false': undefined
      }
    })
    this.onClickActionItem(control.actions.length - 1, 'true')
  }

  deleteAction(actionIndex) {
    const {
      control,
      controlIndex,
      actionIndex: capturingActionIndex,
      value: capturingActionValue,
      deleteAction
    } = this.props
    if(capturingActionIndex === actionIndex) {
      this.onClickActionItem(capturingActionIndex, capturingActionValue)
    }
    deleteAction(control, actionIndex, controlIndex)
  }

  render() {
    const { control, actionIndex: selectedIndex, value: selectedValue } = this.props
    if (!control) {
      return null
    }

    const { actions, style, type } = control

    return (
      <Root>
        <ControlWrapper>
          { type === 'button' ?
            <StyledButton onToggle={pressed => this.onChange(pressed)} /> :
            <StyledSwitch onToggle={pressed => this.onChange(pressed)} />
          }
        </ControlWrapper>
        <AttrList>
          <AttrHeader>properties</AttrHeader>
          <AttrColumn>
            <AttrName>label</AttrName>
            <AttrRow>
              <StyledAttrItem value={'true'}>1</StyledAttrItem>
              <StyledAttrItem value={'false'}>0</StyledAttrItem>
            </AttrRow>
          </AttrColumn>

          <AttrHeader>actions</AttrHeader>
          {actions.map(({ id, params, index: moduleIndex }, actionIndex) => (
            <AttrColumn key={actionIndex}>
              <AttrNameRow>
                <AttrName>
                  {moduleIndex === undefined ? '?' : moduleIndex}
                  {` - `}
                  {id === undefined ? '?' : id}
                </AttrName>
                <DeleteActionButton onClick={e => this.deleteAction(actionIndex)}>
                  x
                </DeleteActionButton>
              </AttrNameRow>
              <AttrRow>
                {['true', 'false'].map((value, paramIndex) => (
                  <StyledAttrItem
                    key={paramIndex}
                    value={value}
                    isSelected={
                      selectedIndex === actionIndex
                      && selectedValue === value
                    }
                    onClick={e => this.onClickActionItem(actionIndex, value)}>
                    {params[value] !== undefined && (typeof params[value] === 'number' ?
                      `${params[value].toFixed()}` : `${params[value]}`)}
                  </StyledAttrItem>
                ))}
              </AttrRow>
            </AttrColumn>
          ))}
          <AddActionButton onClick={e => this.addAction()}>+</AddActionButton>
        </AttrList>
      </Root>
    )
  }
}

export default connect(ButtonEditor)