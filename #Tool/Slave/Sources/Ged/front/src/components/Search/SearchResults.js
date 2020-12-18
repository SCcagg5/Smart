import React from "react";
import moment from "moment";
import Highlighter from "react-highlight-words";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import styles from "./highlight.css"
//import SmartService from "../../provider/SmartService";
import SmartService from "../../provider/masterNodeService";

export default function SearchResults(props){

    const [activeTab,setActiveTab] = React.useState("docs")
    const [textSearch,setTextSearch] = React.useState(props.textSearch)

    let results = props.data;

    let textToSearch = "";
    let nbHits = 0;

    results.result.map((item, key) => {
        if(item.match && item.match.perfect) nbHits = nbHits + item.match.perfect;
        item.match &&
        (item.match.text || []).map((text, k) => {
            textToSearch = textToSearch.concat(text).concat(". ... ");
            return null;
        })
        return null;
    });

    return (

        <div className="card">
            <div className="card-body">

                <ul className="nav nav-tabs nav-bordered">
                    <li className="nav-item">
                        <a data-toggle="tab" aria-expanded="true" onClick={() => setActiveTab("docs")} style={{cursor:"pointer"}}
                           className={activeTab === "docs" ? "nav-link active" : "nav-link"}>
                            Tous les résultats
                            <span className="badge badge-success ml-1">{nbHits}</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a  data-toggle="tab" aria-expanded="false" onClick={() => setActiveTab("files")} style={{cursor:"pointer"}}
                            className={activeTab === "files" ? "nav-link active" : "nav-link"}>
                            Documents
                            <span className="badge badge-danger ml-1">{results.result.length}</span>
                        </a>
                    </li>
                </ul>

                <div className="tab-content">

                    <div className={activeTab === "docs" ? "tab-pane active" : "tab-pane"}  >
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    results.result.map((item, key) => (

                                        <div className="search-item item_ocr_search mb-2" key={key}>
                                            <div className="row inside" style={{justifyContent:"space-between"}}>
                                                <h4 className="mb-1" style={{color:"#323335",marginLeft: 5,marginTop: -5, marginBottom: 12}}>
                                                    {item.name+".pdf"}
                                                </h4>
                                                <div  style={{marginTop:-14}}>
                                                    <IconButton onClick={() => {props.onPdfIconClick(item)}}>
                                                        <PictureAsPdfIcon style={{color: "red", backgroundColor: "#fff"}}/>
                                                    </IconButton>
                                                    <IconButton onClick={() => {
                                                        props.setLoading(true)
                                                        SmartService.getFile(item.file_id, localStorage.getItem("token"), localStorage.getItem("usrtoken")).then(fileRes => {
                                                            if (fileRes.succes === true && fileRes.status === 200) {
                                                                let a = document.createElement("a");
                                                                a.href ="data:application/pdf;base64," + fileRes.data.Content.Data
                                                                a.download = item.name+".pdf";
                                                                props.setLoading(false)
                                                                a.click();
                                                            } else {
                                                                console.log(fileRes.error)
                                                            }
                                                        }).catch(err => console.log(err))
                                                    }}>
                                                        <VerticalAlignBottomIcon/>
                                                    </IconButton>
                                                </div>


                                            </div>

                                            <div style={{display:"flex",marginBottom:17}}>
                                                <span className="badge badge-pink ml-1 p-1 font-13">{item.match.perfect + " hits"}</span>
                                                <span className="badge badge-info ml-1 p-1 font-13">{item.match.partial + " partial hits"}</span>
                                            </div>

                                            <Highlighter
                                                unhighlightClassName={styles.Not_active}
                                                unhighlightStyle={{color:"#000",fontSize:14,fontFamily: "Halvetica",lineHeight:"1.6rem"}}
                                                activeClassName={styles.Active}
                                                highlightClassName={styles.Highlight}
                                                highlightStyle={{color:"#000",fontSize:14,fontFamily: "Halvetica",
                                                    backgroundColor:"#CCCCCC",paddingTop:"0.2rem",paddingBottom:"0.2rem",paddingLeft:0,paddingRight:0 }}
                                                searchWords={[textSearch]}
                                                autoEscape={true}
                                                textToHighlight={item.match.text.slice(0,4).join(" ... ")}
                                            />
                                        </div>
                                    ))
                                }
                                <div className="clearfix"/>
                            </div>
                        </div>
                    </div>

                    <div className={activeTab === "files" ? "tab-pane active" : "tab-pane"}>
                        <div>
                            {
                                props.viewMode === "list" &&
                                <div className="list_view_item">
                                    <div style={{width:56}}>
                                        <h6 style={{color:"#000"}}>Type</h6>
                                    </div>
                                    <div style={{width:300}}>
                                        <h6 style={{color:"#000"}}>Nom</h6>
                                    </div>
                                    <div style={{width:215}}>
                                        <h6 style={{color:"#000"}}>Propriétaire</h6>
                                    </div>
                                    <div style={{width:200}}>
                                        <h6 style={{color:"#000"}}>Date de création</h6>
                                    </div>
                                    <div style={{width:150}}>
                                        <h6 style={{color:"#000"}}>Taille</h6>
                                    </div>
                                </div>
                            }
                            {
                                results.result.map((item, key) =>
                                    props.viewMode === "grid" ?
                                        <div key={key} className="cf_itemDoc">
                                            <span
                                                className="cf-itemDoc_preview"
                                                onClick={() => props.onClickDoc(item)}
                                            >
                                                <img alt=""
                                                     src={item.thumbnail || require("../../assets/icons/icon-pdf.png")}
                                                     className={item.thumbnail ? "cf-itemDoc_preview_image" : "cf-itemDoc_preview_staticImg"}/>
                                                <div
                                                    className="cf_itemDoc_preview_details">
                                                    <div
                                                        className="cf_itemDoc_preview_details_title">
                                                        {item.name + ".pdf"}
                                                    </div>
                                                </div>

                                            </span>
                                        </div> :

                                        <div key={key} className="list_view_item"  onClick={() => props.onClickDoc(item)} /*onClick={() => {
                                            this.setState({
                                                selectedDoc: item,
                                                openRightMenu: true
                                            })
                                        }}*/
                                        >
                                            <div style={{width:56}}>
                                                <IconButton color="default">
                                                    <PictureAsPdfIcon style={{color:"red",backgroundColor:"#fff"}}/>
                                                </IconButton>
                                            </div>
                                            <div style={{width:300}}>
                                                <h6>{item.name + ".pdf"}</h6>
                                            </div>
                                            <div style={{width:215}}>
                                                <h6 style={{color:"grey"}}>Moi</h6>
                                            </div>
                                            <div style={{width:200}}>
                                                <h6 style={{color:"grey"}}>{moment(parseInt(item.date)).format("DD MMMM YYYY hh:mm")}</h6>
                                            </div>
                                            <div style={{width:150}}>
                                                <h6 style={{color:"grey"}}>50 Ko</h6>
                                            </div>
                                        </div>
                                )
                            }
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )

    /*state = {
        activeTab:"docs",
        viewMode:this.props.viewMode
    }*/


}