import React from 'react'
import { DropTarget } from 'react-dnd'

export default DropTarget('DEFAULT', {
  // canDrop(props, monitor) {},
  // hover(props, monitor, component) {},
  drop(props, monitor, component) {
    console.log('drop')
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