import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import moment from "moment";
import DescriptionIcon from '@material-ui/icons/Description';


export default function RoomDocs(props) {


    return(
        <div style={{minHeight:700}}
             onDragOver={event => event.preventDefault()}
             onDrop={event => {
                 let node = JSON.parse(event.dataTransfer.getData("node"))
                 props.onDropFile(node)
             }}
        >

            <div className="list_view_item" style={{marginTop:15}}>
                    <div
                        style={{width: 56}}>
                        <h6 style={{color: "#000"}}>Type</h6>
                    </div>
                    <div
                        style={{width: 300}}>
                        <h6 style={{color: "#000"}}>Nom</h6>
                    </div>
                    <div
                        style={{width: 215}}>
                        <h6 style={{color: "#000"}}>Ajouté par</h6>
                    </div>
                    <div
                        style={{width: 200}}>
                        <h6 style={{color: "#000"}}>Ajouté le</h6>
                    </div>
                    <div
                        style={{width: 150}}>
                        <h6 style={{color: "#000"}}>Taille</h6>
                    </div>
            </div>
            {
                props.docs.length === 0 &&
                    <div style={{height:400,backgroundColor:"#f0f0f0",padding:20}}
                         onDragOver={event => event.preventDefault()}
                         onDrop={event => {
                             let node = JSON.parse(event.dataTransfer.getData("node"))
                             props.onDropFile(node)
                         }}
                    >
                        <div align="center">
                            <p style={{marginTop:40}}>Pas de documents encore ajoutés !</p><br/>
                            <p>Glisser les documents que vous voulez depuis la Ged</p>
                        </div>

                    </div>
            }

            {
                (props.docs || []).map((item, key) =>

                    <div key={key} className="list_view_item"
                         onClick={() => props.onDocClick(item)}
                        >
                            <div style={{width: 56}}>
                                <IconButton
                                    color="default">
                                    <DescriptionIcon
                                        style={{
                                            color: "red",
                                            backgroundColor: "#fff"
                                        }}/>
                                </IconButton>
                            </div>
                            <div
                                style={{width: 300}}>
                                <h6>{item.name + ".pdf"}</h6>
                            </div>
                            <div
                                style={{width: 215}}>
                                <h6 style={{color: "grey"}}>{item.by}</h6>
                            </div>
                            <div
                                style={{width: 200}}>
                                <h6 style={{color: "grey"}}>{moment(parseInt(item.in)).format("DD MMMM YYYY hh:mm")}</h6>
                            </div>
                            <div
                                style={{width: 150}}>
                                <h6 style={{color: "grey"}}>50 Ko</h6>
                            </div>
                        </div>
                )
            }

        </div>

    )

}