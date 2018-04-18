import styled from 'styled-components'

export const SHINE = '0px 2px 15px 0px rgba(255,255,255,1)'

export const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`

export const AttrList = styled.div`
  flex: 1 1 auto;
  margin-left: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

export const AttrHeader = styled.div`
  height: 32px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  color: #fff;
  flex-shrink: 0;
  font-size: 18px;
`

export const AttrColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  flex-shrink: 0;
`

export const AttrNameRow = styled.div`
  display: flex;
  flex-shrink: 0;
`

export const AttrName = styled.div`
  display: flex;
  color: #fff;
  flex: 1 0;
`

export const AttrRow = styled.div`
  margin-top: 4px;
  display: flex;
  flex-shrink: 0;
`

export const AttrItem = styled.div`
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
  ${({ isSelected }) => isSelected ? `
    color: #000;
    background: #fff;
  ` : `
    color: #fff;
    background: #000;
  `}
`

export const DeleteActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  cursor: pointer;
`

export const AddActionButton = styled.div`
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