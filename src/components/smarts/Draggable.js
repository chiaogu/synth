import React from 'react'
import { DragSource } from 'react-dnd'

export default DragSource('DEFAULT', {
  canDrag({ canDrag = true }) {
    if (typeof canDrag === 'function') {
      return canDrag()
    }
    return canDrag
  },
  beginDrag({ children, item }) {
    return { children, item }
  },
  endDrag(props, monitor, component) {
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
      display: isDragging ? 'none' : 'block',
      cursor: '-webkit-grab',
      userSelect: 'none'
    }}>
      {children}
    </div>
  )
})