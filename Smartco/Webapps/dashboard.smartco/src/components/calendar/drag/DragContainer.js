import { Box } from './Box'
import update from 'immutability-helper'
import React,{useState} from "react";
import { useDrop } from 'react-dnd'
const styles = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
}
export const DragContainer = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 10, left: 10, title: 'Drag me around' }
    })
    const [, drop] = useDrop({
        accept: 'box',
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            moveBox(item.id, left, top)
            return undefined
        },
    })
    const moveBox = (id, left, top) => {
        setBoxes(
            update(boxes, {
                [id]: {
                    $merge: { left, top },
                },
            }),
        )
    }
    return (
        <div ref={drop} style={styles}>
            {Object.keys(boxes).map((key) => {
                const { left, top, title } = boxes[key]
                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        hideSourceOnDrag={hideSourceOnDrag}
                    >
                        <div className="sk_signature_sticker">
                            <div className="sk_signature_card p-1">
                                <h1 className="skh3">babba@yopmail.com</h1>
                                <div style={{display:"flex",marginBottom:8}}>
                                    <button className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                            style={{backgroundColor:"deepskyblue",borderColor:"deepskyblue"}}>SES</button>
                                    <h1 className="skh4" style={{marginLeft:15,marginTop:42}}>
                                        Simple electronic signature</h1>
                                </div>
                            </div>
                        </div>

                    </Box>
                )
            })}
        </div>
    )
}