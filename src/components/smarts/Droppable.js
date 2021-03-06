import React from 'react'
import { DropTarget } from 'react-dnd'

export default DropTarget('DEFAULT', {
  // canDrop(props, monitor) {},
  // hover(props, monitor, component) {},
  drop({ onDrop }, monitor, component) {
    const diff = monitor.getDifferenceFromInitialOffset()
    const offset = monitor.getSourceClientOffset()
    const item = monitor.getItem().item
    if (onDrop && monitor.isOver({ shallow: false })) {
      onDrop({ diff, offset, item })
    }
  }
}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(props => {
  const { children, className, connectDropTarget } = props
  return connectDropTarget(
    <div className={className}>
      {children}
    </div>
  )
})