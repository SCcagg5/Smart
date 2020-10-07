import React from "react";
import A from "../../assets/images/nutriscore/A.png"
import B from "../../assets/images/nutriscore/B.png"
import C from "../../assets/images/nutriscore/C.png"
import D from "../../assets/images/nutriscore/D.png"
import E from "../../assets/images/nutriscore/E.png"
import  pdf from '../../assets/doc/PadthaiNL.pdf'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs'
import "./recetteid.css"
import Button from '@material-ui/core/Button';
import axios from "axios";
import data from "../../data/Data";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

export default function recetteDetail(props){

    async function generatepdf(recette,ingredients) {
        const url = pdf
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        // Draw a string of text diagonally across the first page
        firstPage.drawText(recette.list_Nombre_person.toString(), {
            x: 200,
            y: height / 2 + 295,
            size: 18,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Duree_Cuission.toString(), {
            x: 195,
            y: height / 2 + 280,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })

        let y=200

        ingredients.map((item,key)=>{
            firstPage.drawText(("- "+item.nom_Ingr+" "+item.dose_Ingre.toString()+" g" ), {
                x: 10,
                y: height / 2 + y,
                size: 14,
                font: helveticaFont,
                color: rgb(0, 0, 0),
                rotate: degrees(0),
            })
            y=y-50
        })

        firstPage.drawText(recette.list_Gramme_Glucide ? recette.list_Gramme_Glucide.toString()+" g" : "0 g", {
            x: 850,
            y: height / 2 + 280,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Gramme_Lipide ? recette.list_Gramme_Lipide.toString()+" g" : "0 g", {
            x: 850,
            y: height / 2 + 260,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })
        firstPage.drawText(recette.list_Gramme_Proteine? recette.list_Gramme_Proteine.toString()+" g" : "0 g", {
            x: 850,
            y: height / 2 + 300,
            size: 14,
            font: helveticaFont,
            color: rgb(0, 0, 0),
            rotate: degrees(0),
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save()
        let file = new File(pdfBytes, props.recette.list_nomRecette+".pdf",{type: "application/pdf"})

        console.log(file)

        let formData = new FormData();
        formData.append('file', file);
        formData.append('folder_id',localStorage.getItem("recette_folder_id"));
        axios.request({
            method: 'POST',
            url:  'https://api.smartdom.ch/ged/894ca0ed-8b4a-41fd-aeff-8de26ee1bcf9/doc/addfile',
            data: formData,
            headers: {
                'Content-Type':
                    'multipart/form-data',
                token: localStorage.getItem(
                    'token'
                ),
                usrtoken: localStorage.getItem(
                    'usrtoken'
                )
            },
            onUploadProgress: (p) => {
               console.log((p.loaded / p.total) * 100)
            }
        })
            .then((res) => {
                props.reloadGed()
                console.log("ok")
            }).catch(err => {
                console.log(err)
                props.reloadGed()
            })

        download(pdfBytes, props.recette.list_nomRecette+".pdf", "application/pdf");

    }

    return(
        console.log(props.recette),
        <div className="container-fluid " style={{paddingBottom:100}}>
            <div>
                    <div className="row ">
                        <div className="col-md-3">
                            <div>
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Nombre de personne : <text style={{color:"black"}}>{props.recette.list_Nombre_person || ""}</text>
                                </text>
                            </div>
                            <div className="mt-2">
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Preparation :<text style={{color:"black"}}> {props.recette.list_Duree_prepa_repas} </text>
                                </text>
                            </div>
                            <div className="mt-2">
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Cuisson: <text style={{color:"black"}}>{props.recette.list_Duree_Cuission}</text>
                                </text>
                            </div>

                        </div>
                        <div className="col-md-6 ">
                            <div className="row justify-content-center align-items-center">

                                <div className="col-md-3">
                                </div>
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-3">

                                </div>
                                <div className="col-md-3">
                                    {props.recette.nutriscore==="A"&&

                                    <img src={A} style={{width:"100%"}}/>
                                    }
                                    {props.recette.nutriscore==="B"&&

                                    <img src={B} style={{width:"100%"}}/>
                                    }
                                    {props.recette.nutriscore==="C"&&

                                    <img src={C} style={{width:"100%"}}/>
                                    }
                                    {props.recette.nutriscore==="D"&&

                                    <img src={D} style={{width:"100%"}}/>
                                    }
                                    {props.recette.nutriscore==="E"&&

                                    <img src={E} style={{width:"100%"}}/>
                                    }

                                </div>
                            </div>


                        </div>
                        <div className="col-md-3">
                            <div>
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Proteines : <text style={{color:"black"}}>{props.recette.list_Gramme_Proteine+" "} </text>gr
                                </text>
                            </div>
                            <div className="mt-2">
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Glucides : <text style={{color:"black"}}>{props.recette.list_Gramme_Glucide+" "} </text>gr
                                </text>
                            </div>
                            <div className="mt-2">
                                <text style={{fontSize:"1.2vw" , color:"#ffd739",fontWeight:"bold"}}>
                                    Lipides : <text style={{color:"black"}}>{props.recette.list_Gramme_Lipide+" "} </text>gr
                                </text>
                            </div>
                        </div>
                    </div>
                    <hr style={{width:"100%",height:1,borderWidth:2,borderColor:"#e47252",borderRadius:10}}/>

                    <div className="row justify-content-center">
                        <div className="col-md-4">

                            <h2 style={{color:"#f8bf5e"}}>
                                INGREDIENTS
                            </h2>

                            {props.ingrediens !== [] && props.ingrediens.map((item,key)=>(
                                <div className="mt-3">
                                    <text style={{fontSize:"1.2vw"}}>   {"- "+item.dose_Ingre+"g "+item.nom_Ingr} </text>
                                </div>
                            ))}

                        </div>
                        <div className="col-md-8">
                            <h2 style={{color:"#f8bf5e"}}>
                                PREPARATION :
                            </h2>




                            {props.recette.preparation ?
                                <div style={{marginLeft:10}}>
                                    {
                                        props.recette.preparation.split("(space)").map((item, idx) =>
                                            (
                                                <div style={{marginTop:10}}>
                                                    <text style={{fontSize:"1.0vw"}}>{item}</text>
                                                </div>
                                            )
                                        )
                                    }
                                </div>

                                :null}


                            <div className="row mt-3 align-items-end">
                                <div className="col-md-3">

                                    <h2 style={{color:"#f8bf5e"}}>
                                        Bon a Savoir
                                    </h2>
                                </div>
                                <div className="col-md-8 text-center">
                                    <img src={props.recette.list_photo} style={{width:"60%",borderRadius:30}}/>
                                </div>
                            </div>

                        </div>

                    </div>



                   <div className="row align-items-start mt-3">
                       <div className="col-md-4 text-center">

                           <div className="mt-3">
                               <Button onClick={()=>{generatepdf(props.recette,props.ingrediens)}}
                                       startIcon={<PictureAsPdfIcon style={{color:"red",backgroundColor:"#fff"}} />}
                                       variant="contained" style={{backgroundColor:"#fff",color:"#000"}}>
                                   Télécharger la recette
                               </Button>
                           </div>


                       </div>



                   </div>

                </div>
        </div>
    )

}