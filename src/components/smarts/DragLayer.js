import React from 'react'
import styled from 'styled-components'
import { DragLayer } from 'react-dnd'

const PreviewWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: -webkit-grabbing;
`

class ItemPreview extends React.Component {
  render() {
    const { isDragging, currentOffset, children } = this.props

    if (!isDragging || currentOffset === null) {
      return null
    }

    const { x, y } = currentOffset

    return (
      <PreviewWrapper style={{ transform: `translate(${x}px, ${y}px)`}}>
        {children}
      </PreviewWrapper>
    )
  }
}

export default DragLayer(monitor => ({
  children: monitor.getItem() && monitor.getItem().children,
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(ItemPreview);