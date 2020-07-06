import React from 'react'
import { useDrag } from 'react-dnd'
const style = {
    position: 'absolute',
    cursor: 'move',
}
export const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { id, left, top, type: 'box' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    if (isDragging && hideSourceOnDrag) {
        return <div ref={drag} />
    }
    return (
        <div ref={drag} style={{ ...style, left, top }}>
            {children}
        </div>
    )
}