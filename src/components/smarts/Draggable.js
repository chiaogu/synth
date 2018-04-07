import React from 'react'
import { DragSource } from 'react-dnd'

export default DragSource('DEFAULT', {
  beginDrag({ children }) {
    return children;
  },
  canDrag({ canDrag = true }) {
    if (typeof canDrag === 'function') {
      return canDrag()
    }
    return canDrag
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
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