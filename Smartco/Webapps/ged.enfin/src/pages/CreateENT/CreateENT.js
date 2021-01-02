import React from "react";
import ModalDialog, { ModalTransition } from '@atlaskit/modal-dialog';
import Textfield from '@atlaskit/textfield';
import { Checkbox } from '@atlaskit/checkbox';
import Data from "../../data/Data";



export default class CreateENT extends React.Component{



    state={
        isOpen:true,
        check_rooms:true,
        check_meet:true,
        check_timesheet:false,
        check_marketplace:false,
        check_marketplace_edit_recette:false,
        check_marketplace_supp_rh_ponctuel:false,
        ent_logob64:Data.default_b64_logo,
        ent_name:"",
        services:""

    }
    uploadFile(e){
        let file = e.target.files[0];
        if(file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"){
            var reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ent_logob64:reader.result})
            };
            reader.readAsDataURL(file);
        }else{
            alert("Type de fichier erroné ! ")
        }

    }

    render() {


        return(
            <ModalTransition>
                {this.state.isOpen && (
                    <ModalDialog
                        actions={[
                            { text: 'Lancer la création',
                                onClick: () => {
                                if(this.state.ent_name.trim() === ""){
                                    alert("Vous devez saisir le nom de l'ENT !")
                                }else{
                                    console.log(this.state.ent_name)
                                    let services = [];
                                    if(this.state.check_rooms === true) services.push("ROOMS")
                                    if(this.state.check_meet === true) services.push("MEET")
                                    if(this.state.check_timesheet === true) services.push("TIMESHEET")
                                    if(this.state.check_marketplace === true) services.push("MARKETPLACE")
                                    if(this.state.check_marketplace_edit_recette === true) services.push("MARKETPLACE_EDITEUR_RECETTE")
                                    if(this.state.check_marketplace_supp_rh_ponctuel === true) services.push("MARKETPLACE_RH_SP")
                                    console.log(services.join("/"))
                                }
                                }
                            }
                        ]}
                        onClose={() => {}}
                        heading="Création ENT"
                        width="x-large"
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <label>Choisir un logo</label>
                                <div style={{display:"flex"}}>
                                    <img alt="" src={this.state.ent_logob64}
                                         style={{width:80,height:80,objectFit:"contain",border:"3px solid #f0f0f0",borderRadius:"10%",marginRight:10}}/>
                                    <Textfield type="file" onChange={(e => {this.uploadFile(e)})}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>Nom</label>
                                <Textfield name="nom" value={this.state.ent_name} onChange={(e) => {this.setState({ent_name:e.target.value})}} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-8">
                                <h5>Services:</h5>
                                <Checkbox
                                    isChecked={this.state.check_rooms}
                                    label="Rooms"
                                    onChange={() => {this.setState({check_rooms:!this.state.check_rooms})}}
                                />
                                <Checkbox
                                    isChecked={this.state.check_meet}
                                    label="Meeting"
                                    onChange={() => {this.setState({check_meet:!this.state.check_meet})}}
                                />
                                <Checkbox
                                    isChecked={this.state.check_timesheet}
                                    label="TimeSheet"
                                    onChange={() => {this.setState({check_timesheet:!this.state.check_timesheet})}}
                                />
                                <Checkbox
                                    isChecked={this.state.check_marketplace}
                                    label="Marketplace"
                                    onChange={() => {
                                        if(this.state.check_marketplace === true){
                                            this.setState({check_marketplace_edit_recette:false,check_marketplace_supp_rh_ponctuel:false})
                                        }
                                        this.setState({check_marketplace:!this.state.check_marketplace})
                                    }}
                                />
                                <div style={{marginLeft:20}}>
                                    <Checkbox
                                        isChecked={this.state.check_marketplace_edit_recette}
                                        label="Editeur de recettes"
                                        onChange={() => {this.setState({check_marketplace_edit_recette:!this.state.check_marketplace_edit_recette})}}
                                    />
                                    <Checkbox
                                        isChecked={this.state.check_marketplace_supp_rh_ponctuel}
                                        label="RH support ponctuel"
                                        onChange={() => {this.setState({check_marketplace_supp_rh_ponctuel:!this.state.check_marketplace_supp_rh_ponctuel})}}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalDialog>
                )}
            </ModalTransition>
        )


    }

}