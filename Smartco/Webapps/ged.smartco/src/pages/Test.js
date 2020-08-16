import React,{useState} from "react";
import { Document, Page } from 'react-pdf';
import Draggable,{DraggableCore} from "react-draggable";

export default function Test(props) {

    const [numPages, setNumPages] = useState(null);
    const [pages,setPages] = useState([])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        let pages = [];
        for(let i = 0 ; i< numPages;i++){
            pages.push(i+1)
        }
        setPages(pages)
    }

    return(

        <div align="center" style={{backgroundColor:"#f0f0f0",display:"grid"}}>
            <Document
                file={require('../assets/images/pdf/test1.pdf')}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {
                    pages.map((item,key) =>
                        <Page key={key} pageNumber={item} className="custom_pdf_page" onMouseMove={(e) => {
                            //console.log(e.nativeEvent.offsetX)
                            //console.log(e.nativeEvent.offsetY)
                        }}>
                            <Draggable bounds="parent" scale={1} allowAnyClick={true} enableUserSelectHack={true} >
                                <div style={{width:150,height:60,position:"absolute",bottom:35,right:60}}>
                                    <i className="mdi mdi-close-circle" style={{fontSize:22,color:"#000"}}/>
                                    <img alt="" src={require('../assets/images/signatureExp4.png')} className="dragable_image"/>
                                </div>


                            </Draggable>
                        </Page>
                    )
                }


            </Document>
        </div>
    )


}