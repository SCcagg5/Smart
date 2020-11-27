import React from 'react';
import 'rc-collapse/assets/index.css'
import Collapse, { Panel } from 'rc-collapse';
import moment from 'moment';
import main_functions from '../../controller/main_functions';
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import FolderIcon from '@material-ui/icons/Folder';
import { Avatar, Button as MuiButton, IconButton, Input, MenuItem, Select as MuiSelect } from '@material-ui/core';
import Data from '../../data/Data';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { TabPanel } from 'react-tabs';
import SaveIcon from '@material-ui/icons/Save';
import AtlButton from '@atlaskit/button';
import CB from '@material-ui/core/Checkbox';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { Checkbox } from '@atlaskit/checkbox';
import SmartService from '../../provider/SmartService';


export default class Mandats extends React.Component{


  state={
    client_mandat:"",
    openDeleteModal:false,
    toRemoveFolderKey:"",
    toRemoveFolder_id:"",
    delete_folder_ged:false
  }


  componentDidMount() {
    let s_client = this.props.selectedClient;
    let client_mandat = this.props.clients_tempo.find(x => x.ID === s_client.ID);
    this.setState({client_mandat:client_mandat})
  }


  render() {
    let s_client = this.props.selectedClient;
    let clients_tempo_copie = this.props.clients_tempo_copie;
    let client_mandat_key = clients_tempo_copie.findIndex(x => x.ID === s_client.ID );
    console.log(client_mandat_key)

    return(
      <div style={{ marginTop: 30 }}>
        <Collapse>
          {
            this.state.client_mandat && this.state.client_mandat.folders && (this.state.client_mandat.folders || []).map((doss,key) =>
              <Panel header={doss.name}  key={key} headerClass="mandat_collapse_header">
                <div className="row">
                  <div className="col-md-12">
                    <h5>Crée par: {localStorage.getItem("email") === doss.created_by ? "Vous" : doss.created_by }</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div align="right">
                      <AtlButton
                        onClick={() => {
                          this.setState({toRemoveFolderKey:key,toRemoveFolder_id:doss.folder_id, openDeleteModal:true})
                        }}
                        appearance="danger"
                      > Supprimer ce dossier </AtlButton>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" style={{display:"flex"}}>
                    <FolderIcon/>
                    <h5 style={{textDecoration:"underline",textTransform:"uppercase",
                      cursor:"pointer",color:"cornflowerblue",marginTop:5,marginLeft:8}}
                        onClick={() => {
                          this.props.onFolderClick(doss.folder_id,this.state.client_mandat.folder_id)
                        }}
                    >
                      Voir le contenu du dossier
                    </h5>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <div>
                      Nom du dossier
                    </div>
                    <div>
                      <input
                        style={{ color: '#000' }}
                        className="form-control"
                        defaultValue={doss.name}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      Type de dossier
                    </div>
                    <div>
                      <select
                        className="form-control custom-select"
                        value={doss.type}
                        onChange={(e) => {
                          let obj = this.state.client_mandat;
                          obj.folders[key].type = e.target.value;
                          this.setState({client_mandat:obj})
                        }}
                      >
                        {
                          Data.secteurs2.map((secteur, key) =>
                            <option
                              key={key}
                              value={secteur}>{secteur}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12" style={{marginTop:20}}>
                    <div>
                      Description du mandat
                    </div>
                    <div>
                      <textarea
                        style={{color: "#000",maxWidth:700}}
                        className="form-control"
                        value={doss.desc}
                        onChange={(e) => {
                          let obj = this.state.client_mandat;
                          obj.folders[key].desc = e.target.value;
                          this.setState({client_mandat:obj})
                        }}
                        rows={5}
                      />
                    </div>
                  </div>
                </div>


                <div className="row" style={{marginTop:20}}>
                  <div className="col-md-6">
                    <p style={{ marginBottom: 10 }}>Contrepartie</p>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={doss.contrepartie}
                      onChange={(e) => {
                        let obj = this.state.client_mandat;
                        obj.folders[key].contrepartie = e.target.value;
                        this.setState({client_mandat:obj})
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <p style={{ marginBottom: 10 }}>Autres parties</p>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={doss.autrepartie}
                      onChange={(e) => {
                        let obj = this.state.client_mandat;
                        obj.folders[key].autrepartie = e.target.value;
                        this.setState({client_mandat:obj})
                      }}
                    />
                  </div>
                </div>

                <hr style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#c0c0c0',
                  marginTop: 35,
                  marginBottom: 30
                }} />

                <div>
                  <h4>Facturation</h4>
                  <div className="row mt-2">
                    <div style={{minWidth:500}} className="col-md-6">
                      <div style={{ display: 'flex' }}>
                        <div className="mt-2">Associés</div>
                        <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                    onClick={() => {
                                      let objCp = this.state.client_mandat;
                                      objCp.folders[key].team.push({
                                        fname: '',
                                        email: '',
                                        uid: '',
                                        tarif: '',
                                        type: 'lead'
                                      });
                                      this.setState({ client_mandat: objCp });
                                    }}>
                          <AddCircleIcon color="primary" />
                        </IconButton>
                      </div>
                      {
                        (doss.team || []).map((item, i) =>
                          item.type === "lead" &&
                          <div key={i}  className="mb-1" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginTop: 15
                          }}>
                            <div>
                              <div>
                                <MuiSelect
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  style={{ width: 230,marginTop:20 }}
                                  onChange={(e) => {
                                    let uid = e.target.value;
                                    let contact = main_functions.getOAContactByUid(this.props.contacts,uid);
                                    if (contact) {
                                      let objCp = this.state.client_mandat;
                                      objCp.folders[key].team[i].fname = contact.nom + ' ' + contact.prenom;
                                      objCp.folders[key].team[i].email = contact.email;
                                      objCp.folders[key].team[i].uid = contact.uid;
                                      objCp.folders[key].team[i].tarif = contact.rateFacturation || '';
                                      this.setState({ client_mandat: objCp });
                                    }
                                  }}
                                  value={doss.team[i].uid}
                                >
                                  {this.props.contacts.filter(x => x.type === "associe" ).map((contact, key) => (
                                    <MenuItem
                                      key={key}
                                      value={contact.uid}>
                                      <div style={{display:"flex"}}>
                                        <Avatar style={{marginLeft:10}}
                                                alt=""
                                                src={contact.imageUrl} />
                                        <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                      </div>
                                    </MenuItem>
                                  ))}
                                </MuiSelect>
                              </div>
                            </div>
                            <div style={{ marginTop: doss.team[i].uid !== '' ? 12 : -7 }}>
                              <div style={{marginLeft:10}}>
                                Taux horaire
                              </div>
                              <Input
                                style={{ width: 210,marginLeft:10 }}
                                className="form-control "
                                id="duree35411"
                                name="duree687811"
                                type="text"
                                endAdornment={
                                  <InputAdornment
                                    position="end">CHF/h</InputAdornment>}
                                value={doss.team[i].tarif}
                                onChange={(e) => {
                                  let objCp = this.state.client_mandat;
                                  objCp.folders[key].team[i].tarif = e.target.value;
                                  this.setState({ client_mandat: objCp });
                                }}
                              />
                            </div>
                            <div>
                              <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: doss.team[i].uid !== '' ? 28 : 8}}
                                          onClick={() => {
                                            let objCp = this.state.client_mandat;
                                            objCp.folders[key].team.splice(i,1)
                                            this.setState({ client_mandat: objCp });
                                          }}
                              >
                                <DeleteOutlineIcon color="error"/>
                              </IconButton>
                            </div>
                          </div>
                        )
                      }
                    </div>

                    <div className="col-md-6" style={{minWidth:500}}>
                      <div style={{ display: 'flex' }}>
                        <div className="mt-2">Collaborateur/Stagiaire</div>
                        <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                    onClick={() => {
                                      let objCp = this.state.client_mandat;
                                      objCp.folders[key].team.push({
                                        fname: '',
                                        email: '',
                                        uid: '',
                                        tarif: '',
                                        type: 'team'
                                      });
                                      this.setState({ client_mandat: objCp });
                                    }}>
                          <AddCircleIcon color="primary" />
                        </IconButton>
                      </div>
                      {
                        (doss.team || []).map((item, j) =>
                          item.type === "team" &&
                          <div key={j}  className="mb-1" style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginTop: 15
                          }}>
                            <div>
                              <div>
                                <MuiSelect
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  style={{ width: 230 ,marginTop:20}}
                                  onChange={(e) => {
                                    let uid = e.target.value;
                                    let contact = main_functions.getOAContactByUid(this.props.contacts,uid);
                                    if (contact) {
                                      let objCp = this.state.client_mandat;
                                      objCp.folders[key].team[j].fname = contact.nom + ' ' + contact.prenom;
                                      objCp.folders[key].team[j].email = contact.email;
                                      objCp.folders[key].team[j].uid = contact.uid;
                                      objCp.folders[key].team[j].tarif = contact.rateFacturation || '';
                                      this.setState({ client_mandat: objCp });
                                    }
                                  }}
                                  value={doss.team[j].uid}
                                >
                                  {this.props.contacts.filter(x => !x.type ).map((contact, key) => (
                                    <MenuItem
                                      key={key}
                                      value={contact.uid}>
                                      <div style={{display:"flex"}}>
                                        <Avatar style={{marginLeft:10}}
                                                alt=""
                                                src={contact.imageUrl} />
                                        <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                      </div>
                                    </MenuItem>
                                  ))}
                                </MuiSelect>
                              </div>
                            </div>
                            <div style={{ marginTop: doss.team[j].uid !== '' ? 12 : -7 }}>
                              <div style={{marginLeft:10}}>
                                Taux horaire
                              </div>
                              <Input
                                className="form-control "
                                id="duree35411"
                                style={{ width: 210,marginLeft:10 }}
                                name="duree687811"
                                type="text"
                                endAdornment={
                                  <InputAdornment
                                    position="end">CHF/h</InputAdornment>}
                                value={doss.team[j].tarif}
                                onChange={(e) => {
                                  let objCp = this.state.client_mandat;
                                  objCp.folders[key].team[j].tarif = e.target.value;
                                  this.setState({ client_mandat: objCp });
                                }}
                              />
                            </div>
                            <div>
                              <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: doss.team[j].uid !== '' ? 28 : 8}}
                                          onClick={() => {
                                            let objCp = this.state.client_mandat;
                                            objCp.folders[key].team.splice(j,1)
                                            this.setState({ client_mandat: objCp });
                                          }}
                              >
                                <DeleteOutlineIcon color="error"/>
                              </IconButton>
                            </div>
                          </div>
                        )
                      }
                    </div>

                  </div>
                </div>


                <div className="mt-4">
                  <h5>FACTURATION-CLIENT</h5>
                  <div
                    className="row align-items-center">
                    <div className="col-md-5">
                      <div
                        className="row justify-content-center align-items-center">
                        <div
                          className="col-md-4">
                          <div>Par Email</div>
                        </div>
                        <div
                          className="col-md-8">
                          <CB color="primary"
                              checked={doss.facturation.byEmail}
                              onChange={(e) => {
                                let obj = this.state.client_mandat;
                                obj.folders[key].facturation.byEmail = e.target.checked
                                this.setState({client_mandat:obj})
                              }}
                          />
                        </div>
                      </div>
                      <div
                        className="row justify-content-center align-items-center">
                        <div
                          className="col-md-4">
                          <div>Fréquence</div>
                        </div>
                        <div
                          className="col-md-8">
                          <MuiSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: '100%' }}
                            value={doss.facturation.frequence}
                            onChange={(e) => {
                              let obj = this.state.client_mandat;
                              obj.folders[key].facturation.frequence = e.target.value
                              this.setState({client_mandat:obj})
                            }}
                          >
                            <MenuItem
                              value={'Mensuelle'}>Mensuelle</MenuItem>
                            <MenuItem
                              value={'Trimestrielle'}>Trimestrielle</MenuItem>
                            <MenuItem
                              value={'Semestrielle'}>Semestrielle</MenuItem>
                            <MenuItem
                              value={'Annuelle'}>Annuelle</MenuItem>
                          </MuiSelect>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div
                        className="row justify-content-center align-items-center">
                        <div
                          className="col-md-6">
                          <div>Envoyé par le secrétariat
                          </div>
                        </div>
                        <div
                          className="col-md-6">
                          <CB color="primary"
                              checked={doss.facturation.sentBySecr}
                              onChange={(e) => {
                                let obj = this.state.client_mandat;
                                obj.folders[key].facturation.sentBySecr = e.target.checked
                                this.setState({client_mandat:obj})
                              }} />
                        </div>
                      </div>
                      <div
                        className="row justify-content-center align-items-center">
                        <div
                          className="col-md-6">
                          <div>Envoyé par l’avocat
                          </div>
                        </div>
                        <div
                          className="col-md-6">
                          <CB color="primary"
                              checked={doss.facturation.sentByAvocat}
                              onChange={(e) => {
                                let obj = this.state.client_mandat;
                                obj.folders[key].facturation.sentByAvocat = e.target.checked
                                this.setState({client_mandat:obj})
                              }} />
                        </div>
                      </div>
                      <div
                        className="row justify-content-center align-items-center">
                        <div
                          className="col-md-6">
                          <div>Langue de Facturation
                          </div>
                        </div>
                        <div
                          className="col-md-6">
                          <MuiSelect
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            style={{ width: '100%' }}
                            value={doss.facturation.language}
                            onChange={(e) => {
                              let obj = this.state.client_mandat;
                              obj.folders[key].facturation.language = e.target.value
                              this.setState({client_mandat:obj})
                            }}
                          >
                            <MenuItem
                              value={'Francais'}>Français</MenuItem>
                            <MenuItem
                              value={'Anglais'}>Anglais</MenuItem>
                          </MuiSelect>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="row mt-2">
                  <div className="col-md-12">
                    <div align="right">
                      <AtlButton
                        onClick={() => {
                          this.props.update_client_tempo(client_mandat_key, this.state.client_mandat)
                        }}
                        appearance="primary"
                        style={{ margin: 20 }}> Enregistrer vos modifications </AtlButton>
                    </div>
                  </div>
                </div>

              </Panel>
            )
          }
        </Collapse>
        {
          (!this.state.client_mandat || !this.state.client_mandat.folders || this.state.client_mandat.folders.length === 0) &&
          <h6 style={{marginTop:15,marginleft:10,color:"red"}}>Aucun dossier encore ouvert pour ce client !</h6>
        }

        <ModalTransition>
          {this.state.openDeleteModal === true && (
            <Modal
              actions={[
                { text: 'Supprimer', onClick: () => {
                  if(this.state.delete_folder_ged === true){
                    SmartService.deleteFile(this.state.toRemoveFolder_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( ok => {
                      console.log(ok)
                      this.props.reloadGed()
                    }).catch(err => console.log(err))
                  }
                    let obj = this.state.client_mandat;
                    obj.folders.splice(this.state.toRemoveFolderKey,1);
                    this.setState({client_mandat:obj,toRemoveFolderKey:"",toRemoveFolder_id:"",openDeleteModal:false})
                    setTimeout(() => {
                      this.props.update_client_tempo(client_mandat_key,this.state.client_mandat)
                    },300);

                  } },
                { text: 'Annuler', onClick: () => {
                  this.setState({openDeleteModal:false,toRemoveFolderKey:"",toRemoveFolder_id:""})
                  }},
              ]}
              onClose={() => this.setState({openDeleteModal:false,toRemoveFolderKey:"",toRemoveFolder_id:""})}
              heading="Vous êtes sur le point de supprimer ce dossier"
              appearance="danger"
            >

              <Checkbox
                isChecked={this.state.delete_folder_ged}
                label="Voulez-vous supprimer le dossier du client dans la ged aussi ?"
                onChange={() => {
                  this.setState({delete_folder_ged:!this.state.delete_folder_ged})
                }}
                name="checkbox-default-1"
                value="checkbox-default-1"
              />

            </Modal>
          )}
        </ModalTransition>

      </div>
    )
  }

}