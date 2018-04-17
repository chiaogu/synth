import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import connect from '@components/smarts/ControlEditorLogic'

const SHINE = '0px 2px 15px 0px rgba(255,255,255,1)'

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
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

const AttrList = styled.div`
  flex: 1 1 auto;
  margin-left: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

const AttrHeader = styled.div`
  height: 32px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  color: #fff;
  flex-shrink: 0;
  font-size: 18px;
`

const AttrColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  flex-shrink: 0;
`

const AttrNameRow = styled.div`
  display: flex;
  flex-shrink: 0;
`

const AttrName = styled.div`
  display: flex;
  color: #fff;
  flex: 1 0;
`

const DeleteActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  cursor: pointer;
`

const AttrRow = styled.div`
  margin-top: 4px;
  display: flex;
  flex-shrink: 0;
`

const AttrItem = styled.div`
  width: calc(50% - 16px);
  min-height: 36px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #fff;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  ${({ value }) => value === 'true' && `
    margin-right: 8px;
  `}
  ${({ value }) => value === 'false' && `
    margin-left: 8px;
  `}
  ${({ isSelected }) => isSelected ? `
    color: #000;
    background: #fff;
  ` : `
    color: #fff;
    background: #000;
  `}
`

const AddActionButton = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
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

    addAction(control, controlIndex)
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
              <AttrItem value={'true'}>1</AttrItem>
              <AttrItem value={'false'}>0</AttrItem>
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
                  <AttrItem
                    key={paramIndex}
                    value={value}
                    isSelected={
                      selectedIndex === actionIndex
                      && selectedValue === value
                    }
                    onClick={e => this.onClickActionItem(actionIndex, value)}>
                    {params[value] !== undefined && (typeof params[value] === 'number' ?
                      `${params[value].toFixed()}` : `${params[value]}`)}
                  </AttrItem>
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