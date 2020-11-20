import React from 'react';
import 'rc-collapse/assets/index.css'
import Collapse, { Panel } from 'rc-collapse';
import moment from 'moment';
import main_functions from '../../controller/main_functions';
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import FolderIcon from '@material-ui/icons/Folder';
import { IconButton } from '@material-ui/core';


export default class Mandats extends React.Component{




  renderAssocie = (doss) => {
    let team = doss.team || [];
    let assoc = team.find(x => x.type === "lead");
    let contact = undefined;
    if(assoc){
      contact = main_functions.getOAContactByEmail2(this.props.contacts, assoc.email)
    }
    return(
      <div className="row">
        <div className="col-md-6">
          {
            contact ?
              <div style={{display:"flex"}}>
                <img alt="" src={contact.imageUrl || defaultAvatar } style={{width:30,height:30,borderRaduis:"50%"}}/>
                <h6 style={{marginLeft:5}}>{contact.nom + " " + contact.prenom}</h6>
              </div> :
              <div>Aucun</div>
          }
        </div>
        <div className="col-md-6">
          {
            contact &&
              <div style={{display:"flex"}}>
                <h6>Taux horaire:</h6>
                <p style={{marginLeft:5,marginTop:7}}>{assoc.tarif +" CHF"}</p>
              </div>
          }
        </div>
      </div>
    )
  }

  renderCollab = (collab,key) => {

   let contact = main_functions.getOAContactByEmail2(this.props.contacts, collab.email);

    return(
      <div key={key}>
            <div className="row">
              <div className="col-md-6">
                <div style={{display:"flex"}}>
                      <img alt="" src={contact.imageUrl || defaultAvatar } style={{width:30,height:30,borderRaduis:"50%"}}/>
                      <h6 style={{marginLeft:5}}>{contact.nom + " " + contact.prenom}</h6>
                    </div>
              </div>
              <div className="col-md-6">
                <div style={{display:"flex"}}>
                    <h6>Taux horaire:</h6>
                    <p style={{marginLeft:5,marginTop:7}}>{collab.tarif +" CHF"}</p>
                  </div>
              </div>
            </div>
      </div>

    )
  }




  render() {
    let s_client = this.props.selectedClient;
    let client_mandat = this.props.clients_tempo.find(x => x.ID === s_client.ID);

    return(
      <div style={{ marginTop: 30 }}>
        <Collapse>
          {
            client_mandat && client_mandat.folders && (client_mandat.folders || []).map((doss,key) =>
              <Panel header={doss.name}  key={key} headerClass="mandat_collapse_header">
                <div className="row">
                  <div className="col-md-12" style={{display:"flex"}}>
                    <FolderIcon/>
                    <h5 style={{textDecoration:"underline",textTransform:"uppercase",
                      cursor:"pointer",color:"cornflowerblue",marginTop:5,marginLeft:8}}
                        onClick={() => {
                          this.props.onFolderClick(doss.folder_id,client_mandat.folder_id)
                        }}
                    >
                      Voir le contenu du dossier
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{textDecoration:"underline",textTransform:"uppercase"}}>Informations générales</h5>
                  </div>
                  <div className="col-md-6">
                    <h6>Nom du dossier</h6>
                    <p>{doss.name}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Ouvert le</h6>
                    <p>{moment(doss.created_at).format("DD/MM/YYYY")}</p>
                  </div>
                  <div className="col-md-12">
                    <h6>Description</h6>
                    <p>{doss.desc}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Contre partie</h6>
                    <p>{doss.contrepartie}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Autre partie</h6>
                    <p>{doss.autrepartie}</p>
                  </div>
                </div>
                <div style={{margin:5,marginTop:2,height:1,backgroundColor:"#f0f0f0"}}/>
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{textDecoration:"underline"}}>FACTURATION</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h6>Associé</h6>
                  </div>
                </div>
                {
                  this.renderAssocie(doss)
                }
                <div className="row">
                  <div className="col-md-12">
                    <h6>Collaborateurs/Stagiaires</h6>
                  </div>
                </div>
                {
                  (doss.team || []).filter(x => x.type === "team").map((item,key) =>
                    this.renderCollab(item,key)
                  )
                }
                {
                  (doss.team || []).filter(x => x.type === "team").length === 0 &&
                  <div>Aucun</div>
                }
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{textDecoration:"underline"}}>FACTURATION-CLIENT</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div style={{display:"flex"}}>
                      <h6>Langue:</h6>
                      <p style={{marginTop:7,marginLeft:7}}>{doss.facturation.language === "Anglais" ? "Anglais" : "Français"}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div style={{display:"flex"}}>
                    <h6>Fréquence:</h6>
                    <p style={{marginTop:7,marginLeft:7}}>{doss.facturation.frequence}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div style={{display:"flex"}}>
                    <h6>Par email:</h6>
                    <p style={{marginTop:7,marginLeft:7}}>{doss.facturation.byEmail === true ? "Oui" : "Non"}</p>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="col-md-6">
                    <div style={{display:"flex"}}>
                    <h6>Envoyé par le secrétariat :</h6>
                    <p style={{marginTop:7,marginLeft:7}}>{doss.facturation.sentBySecr === true ? "Oui" : "Non"}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div style={{display:"flex"}}>
                    <h6>Envoyé par l'avocat:</h6>
                    <p style={{marginTop:7,marginLeft:7}}>{doss.facturation.sentByAvocat === true ? "Oui" : "Non"}</p>
                    </div>
                  </div>

                </div>

              </Panel>
            )
          }
        </Collapse>
        {
          !client_mandat &&
          <h6 style={{marginTop:15,marginleft:10,color:"red"}}>Aucun dossier encore ouvert pour ce client !</h6>
        }
      </div>
    )
  }

}