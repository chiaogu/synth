import React from 'react'
import styled from 'styled-components'
import Slider from '@components/dumbs/Slider'
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

const StyledSlider = styled(Slider) `
  width: 48px;
  height: 200px;
  box-shadow: ${SHINE};
`

const StyledAttrItem = AttrItem.extend`
  width: 100%;
`

const HalfColumn = AttrColumn.extend`
  width: calc(50% - 16px);
`

const Row = styled.div`
  display: flex;
  flex-shrink: 0;
`

class SliderEditor extends React.Component {

  onChange(pressed) {
    const { performAction, control } = this.props
    performAction(control, pressed)
  }

  onClickActionItem(index) {
    const {
      actionIndex: currIndex,
      value: currValue,
      clickActionItem
    } = this.props

    clickActionItem(currIndex, currValue, index)
  }

  addAction() {
    const {
      control,
      controlIndex,
      addAction
    } = this.props

    addAction(control, controlIndex, {
      index: undefined,
      id: undefined
    })
    this.onClickActionItem(control.actions.length - 1)
  }

  render() {
    const { control, actionIndex: selectedIndex, value: selectedValue } = this.props
    if (!control) {
      return null
    }

    const { actions, style, type, config } = control
    const { min, max, defaultValue } = config

    return (
      <Root>
        <ControlWrapper>
          <StyledSlider
            config={config}
            onChange={value => this.onChange(value)} />
        </ControlWrapper>
        <AttrList>
          <AttrHeader>properties</AttrHeader>
          <Row>
            <HalfColumn>
              <AttrName>min</AttrName>
              <AttrRow>
                <StyledAttrItem>{min}</StyledAttrItem>
              </AttrRow>
            </HalfColumn>
            <HalfColumn>
              <AttrName>max</AttrName>
              <AttrRow>
                <StyledAttrItem>{max}</StyledAttrItem>
              </AttrRow>
            </HalfColumn>
          </Row>

          <AttrHeader>action</AttrHeader>
          {actions.map(({ id, params, index: moduleIndex }, actionIndex) => (
            <AttrColumn key={actionIndex}>
              <AttrRow>
                <StyledAttrItem isSelected={selectedIndex === actionIndex}
                  onClick={e => this.onClickActionItem(actionIndex)}>
                  {id}
                </StyledAttrItem>
              </AttrRow>
            </AttrColumn>
          ))}
          {actions.length === 0 &&
            <AddActionButton onClick={e => this.addAction()}>
              +
            </AddActionButton>
          }
        </AttrList>
      </Root>
    )
  }
}

export default connect(SliderEditor)