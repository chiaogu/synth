import React from 'react'
import { DragSource } from 'react-dnd'

export default DragSource('DEFAULT', {
  canDrag({ canDrag = true }) {
    if (typeof canDrag === 'function') {
      return canDrag()
    }
    return canDrag
  },
  beginDrag({ children, item, onDragStart }) {
    if (onDragStart) onDragStart()
    return { children, item }
  },
  endDrag({ onDragEnd }, monitor, component) {
    if (onDragEnd) onDragEnd()
    if (!monitor.didDrop()) {
      return
    }
  }
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(props => {
  const { connectDragSource, isDragging, children } = props
  return connectDragSource(
    <div style={{
      visibility: isDragging ? 'hidden' : 'visible',
      cursor: '-webkit-grab',
      userSelect: 'none'
    }}>
      {children}
    </div>
  )
})