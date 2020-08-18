import React, {useState} from "react";
import {Document, Page} from 'react-pdf';
//import Draggable from "react-draggable";
import CancelIcon from '@material-ui/icons/Cancel';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

export default function Test2(props) {

    const [numPages, setNumPages] = useState(null);
    const [pages, setPages] = useState([])
    const [closeBtn, setCloseBtn] = useState(false)
    const [xPostion, setXposition] = useState(0)
    const [yPostion, setYposition] = useState(0)
    const [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0})

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
        let pages = [];
        for (let i = 0; i < numPages; i++) {
            pages.push(i + 1)
        }
        setPages(pages)
    }

    function dragItem(key) {
        return(
            <div key={key} className="box" onMouseEnter={event => setCloseBtn(true)}
                 onMouseLeave={event => setCloseBtn(false)}>
                {
                    closeBtn === true &&
                    <CancelIcon fontSize="small" style={{
                        zIndex: 1500,
                        backgroundColor: "#fff",
                        color: "#000"
                    }}/>
                }
                <img alt="" src={require('../assets/images/signatureExp4.png')}
                     className="dragable_image"/>
            </div>
        )
    }


    return (

        <div align="center" style={{backgroundColor: "#f0f0f0", display: "grid"}}>
            <Document
                file={require('../assets/images/pdf/test1.pdf')}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {
                    pages.map((item, key) =>
                        <Page key={key} pageNumber={item} className="custom_pdf_page">
                            <DragDropContext key={key} onDragEnd={(e) => console.log(e)}>
                                <Droppable key={key} droppableId={key.toString()} DroppableMode="virtual">
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            <Draggable key={key} draggableId={key.toString()} index={key} >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="box" onMouseEnter={event => setCloseBtn(true)}
                                                        onMouseLeave={event => setCloseBtn(false)}
                                                    >
                                                        {
                                                            closeBtn === true &&
                                                            <CancelIcon fontSize="small" style={{
                                                                zIndex: 1500,
                                                                backgroundColor: "#fff",
                                                                color: "#000"
                                                            }}/>
                                                        }
                                                        <img alt="" src={require('../assets/images/signatureExp4.png')}
                                                             className="dragable_image"/>

                                                    </div>
                                                )}
                                            </Draggable>

                                        </div>
                                        )}

                                </Droppable>
                            </DragDropContext>
                        </Page>
                    )
                }


            </Document>
        </div>
    )


}