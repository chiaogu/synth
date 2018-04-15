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

const AttrName = styled.div`
  margin-top: 16px;
  color: #fff;
`
const AttrRow = styled.div`
  display: flex;
  flex-shrink: 0;
`

const AttrItem = styled.div`
  width: calc(50% - 16px);
  min-height: 36px;
  margin: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border-bottom: 2px solid #fff;
  text-align: center;
  cursor: pointer;
  user-select: none;
  ${({ isSelected }) => isSelected ? `
    color: #000;
    background: #fff;
  ` : `
    color: #fff;
    background: #000;
  `}
`

class ButtonEditor extends React.Component {

  constructor() {
    super()
  }

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

  render() {
    const { control, actionIndex: selectedIndex, value: selectedValue } = this.props
    if (!control) {
      return null
    }

    const { actions } = control

    return (
      <Root>
        <ControlWrapper>
          <StyledButton onToggle={pressed => this.onChange(pressed)} />
        </ControlWrapper>
        <AttrList>
          <AttrName>label</AttrName>
          <AttrRow>
            <AttrItem>on</AttrItem>
            <AttrItem>off</AttrItem>
          </AttrRow>
          <AttrName>actions</AttrName>
          {actions.map(({ id, params, index: moduleIndex }, actionIndex) => (
            <AttrRow key={actionIndex}>
              {['true', 'false'].map((value, paramIndex) => (
                <AttrItem
                  key={paramIndex}
                  isSelected={
                    selectedIndex === actionIndex
                    && selectedValue === value
                  }
                  onClick={e => this.onClickActionItem(actionIndex, value)}>{
                    params[value] !== undefined && (
                      <div>
                        {id}<br />{`${params[value]}`}
                      </div>
                    )
                  }</AttrItem>
              ))}
            </AttrRow>
          ))}
        </AttrList>
      </Root>
    )
  }
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ControlEditorActions from '@flow/controlEditor/actions'

export default connect(
  ({ controlEditor: {
    isCapturing, actionIndex, value
  } }) => ({
    isCapturing, actionIndex, value
  }),
  dispatch => {
    const {
      startCaptureMode,
      finishCaptureMode
    } = bindActionCreators(ControlEditorActions, dispatch)

    return {
      startCaptureMode,
      finishCaptureMode
    }
  }
)(ButtonEditor)