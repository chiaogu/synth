import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
import Switch from '@components/dumbs/Switch'
import _ from '@utils/lodash'

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

  componentWillReceiveProps(nextProps) {
    const { control, startCaptureMode, finishCaptureMode } = this.props
    const isControlChanged = !_.isEqual(nextProps.control, control)
    if (isControlChanged) {
      finishCaptureMode()
    }
  }

  onChange(pressed) {
    const { setParameter, control: { actions } } = this.props
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

  onClickActionItem(index, value) {
    const {
      startCaptureMode,
      finishCaptureMode,
      actionIndex: currIndex,
      value: currValue
    } = this.props

    if (currIndex === index && currValue === value) {
      finishCaptureMode()
    } else {
      startCaptureMode(index, value)
    }
  }

  addAction() {
    const {
      control,
      controlIndex,
      updateCustomPanelControl
    } = this.props

    control.actions.push({
      index: undefined,
      id: undefined,
      params: {
        'true': undefined,
        'false': undefined
      }
    })

    updateCustomPanelControl(control, controlIndex)

    this.onClickActionItem(control.actions.length - 1, 'true')
  }

  deleteAction(index) {
    const {
      control,
      controlIndex,
      updateCustomPanelControl
    } = this.props

    control.actions.splice(index, 1)

    updateCustomPanelControl(control, controlIndex)
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

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ControlEditorActions from '@flow/controlEditor/actions'
import { updateCustomPanelControl } from '@flow/preset/actions'
import { setParameter } from '@flow/modules/actions'

export default connect(
  ({
    controlEditor: {
      isCapturing,
      actionIndex,
      value
    },
    preset: {
      currentEditingControl: {
        controlIndex
      }
    }
  }) => ({
    isCapturing,
    actionIndex,
    value,
    controlIndex
  }),
  dispatch => {
    const {
      startCaptureMode,
      finishCaptureMode
    } = bindActionCreators(ControlEditorActions, dispatch)

    return {
      startCaptureMode,
      finishCaptureMode,
      updateCustomPanelControl(control, index) {
        dispatch(updateCustomPanelControl(control, index))
      },
      setParameter(moduleIndex, controlName, value) {
        dispatch(setParameter(moduleIndex, controlName, value))
      }
    }
  }
)(ButtonEditor)