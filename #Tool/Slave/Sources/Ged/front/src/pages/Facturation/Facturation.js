import React, {Component} from 'react';
import bill from "../../assets/icons/bill.svg"
import quote from "../../assets/icons/quote.svg"
import arrow from "../../assets/icons/arrow.svg"
import add from "../../assets/icons/add.svg"
import edit from "../../assets/icons/edit.svg"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {Modal} from "react-bootstrap";
import SmartService from "../../provider/SmartService"
//import SmartService from "../../provider/masterNodeService"
import moment from "moment"
import InputAdornment from '@material-ui/core/InputAdornment';


class Facturation extends Component {
    constructor(props){
        super(props)
        this.state={
            showStep1:true ,
            showStep2:false,
            showStep3:false,
            showStep4:false,
            elements:[],
            showModal:false,
            titreDevis:"",
            descriptionDevis:"",
            acompte:"10%",
            newElement:{
                titre:"",
                description:"",
                unite:1,
                prixUnitaire:0,
                tva:0,
                total:"",
                totalht:""
            }
        }
    }
    handleChange(name,e){
        this.setState({[name]:e.target.value})
    }
    handleChangeSelect(e){
        this.setState({acompte:e.target.value})
    }
    onChangeElement(name,e){
        let data = this.state.newElement
        data[name]=e.target.value
        data["totalht"]=(data.prixUnitaire*data.unite)
        data["total"]=data.totalht+((data.totalht*data.tva)/100)
        this.setState({newElement:data})

    }

    valider(){
        let data = this.state.newElement
        let datas=this.state.elements
        datas.push(data)
        this.setState({elements:datas})
        data ={
            titre:"",
            description:"",
            unite:1,
            prixUnitaire:0,
            tva:0,
            total:"",
            totalht:""
        }
        this.setState({newElement:data,showModal:false})
    }

    createFacture(){
        let odoo_data = [{
            "access_token":"eafd285777ggobfvxyvnx",
            "state": "draft",
            "type": "out_invoice",
            "invoice_sent": false,
            "l10n_ch_isr_sent": false,
            "name": this.state.titreDevis,
            "invoice_date": moment(new Date()).format("YYYY-MM-DD"),
            "date": moment(new Date()).format("YYYY-MM-DD"),
            "journal_id": 1,
            "currency_id": 5,
            "invoice_user_id": 3,
            "invoice_incoterm_id": false,
            "auto_post": false,
            "to_check": false,
            "authorized_transaction_ids": [
                [
                    6,
                    false,
                    []
                ]
            ],
            "tax_lock_date_message": false,
            "id": false,
            "invoice_payment_state": "not_paid",
            "invoice_filter_type_domain": "sale",
            "company_currency_id": 5,
            "commercial_partner_id": "",
            "bank_partner_id": 1,
            "invoice_has_outstanding": false,
            "l10n_ch_currency_name": "EURO",
            "invoice_sequence_number_next_prefix": false,
            "invoice_sequence_number_next": false,
            "invoice_has_matching_suspense_amount": false,
            "has_reconciled_entries": false,
            "restrict_mode_hash_table": false,
            "partner_id": 84,
            "ref": 121006,
            "invoice_vendor_bill_id": false,
            "invoice_payment_term_id": 1,
            "invoice_date_due": "2020-09-06",
            "company_id": 1,
            "amount_untaxed": 0,
            "amount_by_group": [],
            "amount_total": 0,
            "invoice_payments_widget": "False",
            "amount_residual": 0,
            "invoice_outstanding_credits_debits_widget": false,
            "narration": false,
            "invoice_origin": false,
            "fiscal_position_id": 1,
            "invoice_cash_rounding_id": false,
            "invoice_source_email": false,
            "invoice_payment_ref": false,
            "invoice_partner_bank_id": false,
            "reversed_entry_id": false,
            "message_follower_ids": [],
            "activity_ids": [],
            "message_ids": [],
            "message_attachment_count": 0,
            "invoice_line_ids": [
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity":this.state.elements[0].unite ,
                        "discount": 0,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 0,
                        "display_type": false,
                        "product_id": 1,
                        "name": this.state.elements[0].titre,
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit": parseFloat(this.state.elements[0].prixUnitaire),
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    },

                ],
                [
                    0,
                    "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                    {
                        "sequence": 10,
                        "account_id": 104,
                        "quantity":false,
                        "discount": 0,
                        "partner_id": false,
                        "currency_id": false,
                        "debit": 0,
                        "credit": 0,
                        "display_type": false,
                        "product_id": 1,
                        "name": "Acompte "+this.state.acompte.toString()+" %",
                        "analytic_account_id": false,
                        "analytic_tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],

                        "price_unit":0,
                        "tax_ids": [
                            [
                                6,false,[]
                            ]
                        ],
                        "amount_currency": 0,
                        "date_maturity": false,
                        "tag_ids": [
                            [
                                6,
                                false,
                                []
                            ]
                        ],
                        "recompute_tax_line": false,
                        "is_rounding_line": false,
                        "exclude_from_invoice_tab": false
                    },

                ],


            ],
            "line_ids": [

            ]
        }]


        //console.log(total)
        /*  odoo_data[0].line_ids.push(
              [
                  0,
                  "virtual_"+(Math.floor(100 + Math.random() * 900)).toString(),
                  {
                      "account_id": 6,
                      "sequence": 10,
                      "name": false,
                      "quantity": 1,
                      "price_unit": 350,
                      "discount": 0,
                      "debit": -350,
                      "credit": 350,
                      "amount_currency": 0,
                      "date_maturity": "2020-09-08",
                      "currency_id": false,
                      "partner_id": false,
                      "product_uom_id": false,
                      "product_id": false,
                      "payment_id": false,
                      "tax_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "tax_base_amount": 0,
                      "tax_exigible": true,
                      "tax_repartition_line_id": false,
                      "tag_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "analytic_account_id": false,
                      "analytic_tag_ids": [
                          [
                              6,
                              false,
                              []
                          ]
                      ],
                      "recompute_tax_line": false,
                      "display_type": false,
                      "is_rounding_line": false,
                      "exclude_from_invoice_tab": true
                  }
              ]
          )

         */

        SmartService.create_facture_odoo(localStorage.getItem("token"),localStorage.getItem("usrtoken"),{data:odoo_data}).then( createFactRes => {
         console.log(createFactRes)
         /*  let file ="http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true"
            let file2=endpoint+"acompteDevi/"+createFactRes.data.id+"/"+this.state.acompte
            let data ={
                email:this.props.email,
                nom :this.props.fullname,
                file:file.toString(),
                file2:file2.toString()
            }
            PatientService.sendMailDevi(data)*/
          // window.open("http://91.121.162.202:10013/my/invoices/"+createFactRes.data.id+"?access_token=eafd285777ggobfvxyvnx&report_type=pdf&download=true","_blank")
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
             <div  className="Container text-center">
                 {
                     this.state.showStep1===true &&
                         <div className="mt-5">
                             <div className="row justify-content-center">
                                 <div className="col-md-3 "style={{borderRadius:100,backgroundColor:"#f6f6fe",padding:5,cursor:"pointer"}}>
                                     <div className="row align-items-center justify-content-center">
                                         <div className="col-md-1">
                                             <img src={bill} style={{width:30,height:30}}/>
                                         </div>
                                         <div className="col-md-6">
                                             <h4 style={{color:"#6172f1"}}>Créer une facture</h4>
                                         </div>

                                     </div>
                                 </div>
                             </div>
                             <div className="row justify-content-center mt-3">
                                 <div onClick={()=>{this.setState({showStep1:false,showStep2:true})}} className="col-md-3 "
                                      style={{borderRadius:100,backgroundColor:"#f6f6fe",padding:5,cursor:"pointer"}}>
                                     <div className="row align-items-center justify-content-center">
                                         <div className="col-md-1">
                                             <img src={quote} style={{width:30,height:30}}/>
                                         </div>
                                         <div className="col-md-6">
                                             <h4 style={{color:"#6172f1"}}>Créer un devis</h4>
                                         </div>

                                     </div>
                                 </div>
                             </div>
                         </div>
                 }
                 {
                     this.state.showStep2===true &&
                     <div>
                         <div className="row justify-content-center">
                             <div className="col-md-4">
                                 <div className="row align-items-center justify-content-start">
                                     <div className="col-md-2">
                                         <img src={arrow} style={{width:30,height:30}}/>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4 ">
                             <div className="col-md-4">
                                 <h4>
                                     Comment souhaitez-vous nommer cette prestation ?
                                 </h4>

                                 <h5>
                                     Le titre figurera en  tete de votre devis.
                                 </h5>

                                 <div className="mt-4">
                                     <div style={{width:"100%"}}>
                                     <TextField id="standard-basic" label="Titre de devis " value={this.state.titreDevis} onChange={(e)=>{this.handleChange("titreDevis",e)}} style={{width:"100%"}}/>
                                     </div>

                                     <div className="text-left" >
                                         <h6>
                                             Cela peut etre une brève description ou une periode
                                         </h6>
                                     </div>

                                     <div style={{width:"100%"}}>
                                         <TextField id="standard-basic" label="Description (facultatif) " style={{width:"100%"}}/>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4">
                             <Button onClick={()=>{this.setState({showStep2:false,showStep3:true})}} variant="contained" color="primary" style={{position:"absolute",bottom:70,borderRadius:100,width:"20%"}}>
                                 Suivant
                             </Button>
                         </div>

                     </div>
                 }
                 {
                     this.state.showStep3===true &&
                     <div>
                         <div className="row justify-content-center">
                             <div className="col-md-4">
                                 <div className="row align-items-center justify-content-start">
                                     <div className="col-md-2">
                                         <img src={arrow} style={{width:30,height:30}}/>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4 ">
                             <div className="col-md-4">
                                 <h4>
                                     Qu'allez-vous réaliser pour {this.props.fullname} ?
                                 </h4>

                                 {this.state.elements.map((item)=>(
                                     <div className="mt-4 px-5">
                                         <div>
                                             <div className="row align-items-center">
                                                 <div className="col-md-8 text-left">
                                                     <h5 style={{fontWeight:"bold"}}>{item.titre}</h5>
                                                     <h6>{item.description}</h6>
                                                 </div>
                                                 <div className="col-md-4">
                                                     <img  src={edit} style={{width:20,height:20}}/>
                                                 </div>

                                             </div>
                                             <div className="row justify-content-start">
                                                 <div className="ml-2" style={{backgroundColor:"#bababa",borderRadius:100,padding:1,height:20,width:20}}>
                                                     <h4 style={{color:"white"}}>{item.unite}</h4>
                                                 </div>

                                                 <div className="ml-1">
                                                     <h4 style={{color:"#bababa"}}>×</h4>
                                                 </div>

                                                 <div className="ml-1">
                                                     <h4  style={{color:"#bababa"}}>{item.prixUnitaire} €</h4>
                                                 </div>

                                                 <div className="ml-4">
                                                     <h4  style={{color:"#bababa"}}>({item.tva}% TVA )</h4>
                                                 </div>

                                             </div>
                                             <hr style={{height:1,width:"100%",backgroundColor:"#a6a6a6",borderRadius:"100%"}}/>

                                             <div className="row ">
                                                 <div className="col-md-6 text-left" >
                                                     <h4 style={{fontWeight:"bold"}}>Total</h4>
                                                 </div>
                                                 <div className="col-md-6 text-right">
                                                     <h4 style={{fontWeight:"bold"}}>{item.total} </h4>
                                                 </div>

                                             </div>
                                             <div className="row mt-2">
                                                 <div className="col-md-6 text-left" >
                                                     <h4 style={{color:"#a6a6a6"}}>Total HT</h4>
                                                 </div>
                                                 <div className="col-md-6 text-right">
                                                     <h4 style={{color:"#a6a6a6"}}>{item.totalht} </h4>
                                                 </div>

                                             </div>
                                         </div>

                                     </div>
                                 ))

                                 }

                                 <div className="row justify-content-center mt-4">

                                     <div onClick={()=>{this.setState({showModal:true})}} className="col-md-12 "style={{borderRadius:100,backgroundColor:"#f6f6fe",padding:5,cursor:"pointer"}}>

                                         <div className="row align-items-center justify-content-center">
                                             <div className="col-md-1">
                                                 <img src={add} style={{width:20,height:20}}/>
                                             </div>
                                             <div className="col-md-6">
                                                 <h4 style={{color:"#6172f1"}}>Ajouter un Element </h4>
                                             </div>

                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4">
                             <Button onClick={()=>{this.setState({showStep3:false,showStep4:true})}} variant="contained" color="primary" style={{position:"absolute",bottom:70,borderRadius:100,width:"20%"}}>
                                 Suivant
                             </Button>
                         </div>
                     </div>
                 }
                 {
                     this.state.showStep4===true &&
                     <div>
                         <div className="row justify-content-center">
                             <div className="col-md-4">
                                 <div className="row align-items-center justify-content-start">
                                     <div className="col-md-2">
                                         <img src={arrow} style={{width:30,height:30}}/>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4 ">
                             <div className="col-md-4">
                                 <h4>
                                    Quelles sont vos conditions ?
                                 </h4>

                                 <h5 className="mt-5">
                                     ce devis est émis le
                                 </h5>

                                 <h5>
                                     28/10/2020
                                 </h5>

                                 <div className="mt-4">
                                     <h5>
                                         Votre client aura 30 jours pour vous payer apres l'envoi de votre facture
                                     </h5>
                                 </div>
                                 <div className="mt-5">
                                     <FormControl style={{width:"100%"}} >
                                         <InputLabel id="demo-simple-select-label" style={{fontWeight:"bold",fontSize:18}}>Acompte devis </InputLabel>
                                         <Select
                                             style={{width:"100%"}}
                                             labelId="demo-simple-select-label"
                                             id="demo-simple-select"
                                             value={this.state.acompte}
                                             onChange={(e)=>this.handleChangeSelect(e)}
                                         >
                                             <MenuItem value={10}>10%</MenuItem>
                                             <MenuItem value={20}>20%</MenuItem>
                                             <MenuItem value={30}>30%</MenuItem>
                                             <MenuItem value={40}>40%</MenuItem>
                                             <MenuItem value={50}>50%</MenuItem>
                                         </Select>
                                     </FormControl>
                                 </div>
                             </div>
                         </div>
                         <div className="row justify-content-center mt-4">
                             <Button onClick={()=>{this.createFacture()}} variant="contained" color="primary" style={{position:"absolute",bottom:70,borderRadius:100,width:"20%"}}>
                                 Suivant
                             </Button>
                         </div>

                     </div>
                 }



                 <Modal
                     show={this.state.showModal}
                     size="lg"
                     aria-labelledby="contained-modal-title-vcenter"
                     centered
                 >
                     <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">
                             Ajouter un element
                         </Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                         <div className="row ">
                             <div className="col-md-6">
                                 <TextField id="standard-basic" label="Titre de l'élement " value={this.state.newElement.titre} onChange={(e)=>{this.onChangeElement("titre",e)}}  style={{width:"100%"}}/>

                             </div>
                             <div className="col-md-6">
                                 <TextField id="standard-basic" label="Description  de l'élement (facultatitf)" value={this.state.newElement.description} onChange={(e)=>{this.onChangeElement("description",e)}} style={{width:"100%"}}/>

                             </div>
                         </div>

                         <div className="row mt-3 justify-content-around">

                             <div className="col-md-2 text-center">
                                 <h5>
                                     Unité
                                 </h5>

                                 <TextField id="filled-basic"   value={this.state.newElement.unite} onChange={(e)=>{this.onChangeElement("unite",e)}}  type="number"  style={{backgroundColor:"#f6f6fe"}} />


                             </div>

                             <div className="col-md-4">
                                 <h5>
                                     Prix unitaire (HT)
                                 </h5>

                                 <TextField id="filled-basic"  value={this.state.newElement.prixUnitaire} onChange={(e)=>{this.onChangeElement("prixUnitaire",e)}}  type="number"  style={{backgroundColor:"#f6f6fe"}}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end" >€</InputAdornment>,
                                            }}/>

                             </div>

                             <div className="col-md-2">
                                 <h5>
                                    TVA
                                 </h5>

                                 <TextField id="filled-basic" value={this.state.newElement.tva} onChange={(e)=>{this.onChangeElement("tva",e)}} type="number"  style={{backgroundColor:"#f6f6fe"}}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end" >%</InputAdornment>,
                                            }}/>


                             </div>


                         </div>

                         <hr className="mt-3" style={{width:"100%",height:1,backgroundColor:"#a6a6a6",borderRadius:100}}/>

                        <div className="row ">
                            <div className="col-md-6 text-left" >
                                <h4 style={{fontWeight:"bold"}}>Total</h4>
                            </div>
                            <div className="col-md-6 text-right">
                                <h4 style={{fontWeight:"bold"}}>{this.state.newElement.total} </h4>
                            </div>

                        </div>
                         <div className="row mt-2">
                             <div className="col-md-6 text-left" >
                                 <h4 style={{color:"#a6a6a6"}}>Total HT</h4>
                             </div>
                             <div className="col-md-6 text-right">
                                 <h4 style={{color:"#a6a6a6"}}>{this.state.newElement.totalht} </h4>
                             </div>

                         </div>

                     </Modal.Body>
                     <Modal.Footer>
                         <div className="row justify-content-around w-100">

                             <Button variant="contained" color="primary" style={{borderRadius:100}}>
                                 supprimer
                             </Button>

                             <Button onClick={()=>{this.valider()}} variant="contained" color="primary" style={{borderRadius:100}}>
                                 valider
                             </Button>
                         </div>
                     </Modal.Footer>
                 </Modal>
            </div>
        );
    }
}

export default Facturation;
