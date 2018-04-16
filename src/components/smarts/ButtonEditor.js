import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'
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

class ButtonEditor extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { control, startCaptureMode, finishCaptureMode } = this.props
    const isControlChanged = !_.isEqual(nextProps.control, control)
    if (isControlChanged) {
      finishCaptureMode()
    }
  }

  onChange(value) {
    const { control } = this.props
    console.log('onChange', value)
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

    const { actions, style } = control

    return (
      <Root>
        <ControlWrapper>
          <StyledButton onToggle={pressed => this.onChange(pressed)} />
        </ControlWrapper>
        <AttrList>
          <AttrHeader>properties</AttrHeader>
          <AttrColumn>
            <AttrName>label</AttrName>
            <AttrRow>
              <AttrItem value={'true'}>on</AttrItem>
              <AttrItem value={'false'}>off</AttrItem>
            </AttrRow>
          </AttrColumn>

          <AttrHeader>actions</AttrHeader>
          {actions.map(({ id, params, index: moduleIndex }, actionIndex) => (
            <AttrColumn key={actionIndex}>
              <AttrNameRow>
                <AttrName>{id}</AttrName>
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
        </AttrList>
      </Root>
    )
  }
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ControlEditorActions from '@flow/controlEditor/actions'
import { updateCustomPanelControl } from '@flow/preset/actions'

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
      }
    }
  }
)(ButtonEditor)