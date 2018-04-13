import React from 'react'
import styled from 'styled-components'
import Button from '@components/dumbs/Button'

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
  height: 36px;
  margin: 8px;
  padding: 4px;
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  border-bottom: 2px solid #fff;
  text-align: center;
`

export default class ButtonEditor extends React.Component {

  onChange(value) {
    const { control } = this.props
    console.log('onChange', value)
  }

  render() {
    const { control } = this.props
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
          {actions.map(({
            id,
            index: moduleIndex,
            params: {
              true: trueParam,
              false: falseParam
            } }, index) => (
              <AttrRow key={index}>
                <AttrItem>{
                  trueParam !== undefined && <div>
                    {`${moduleIndex}. ${id}`}<br />{`${trueParam}`}
                  </div>
                }</AttrItem>
                <AttrItem>{
                  falseParam !== undefined && <div>
                    {`${moduleIndex}. ${id}`}<br />{`${falseParam}`}
                  </div>
                }</AttrItem>
              </AttrRow>
            ))}
        </AttrList>
      </Root>
    )
  }
}