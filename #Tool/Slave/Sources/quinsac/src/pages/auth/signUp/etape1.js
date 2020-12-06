import React, {Component} from "react";
import logo from "../../../assets/images/vin/logo.png"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from '@material-ui/core/FormGroup';
import {FormGroup as formGroup, Label} from "reactstrap";
import countryWithCodes from "../../../tools/contrylistWithPhoneCodes";
import countryList from "../../../tools/countryList";
import '../../../assets/css/reactDatez.css';
import firebase from "firebase/app";
import "firebase/database"
import windowSize from 'react-window-size';

class etape1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: 'particulier',
            civilite: 'M.',
            nom: "",
            prenom: "",
            nationnalite: "France",
            phone: {
                code: "+33",
                number: ""
            },
            datenaiss: "",
            paysnaiss: "France",
            residenceFiscale: "France (Métropoloe et DOM)",
            adress: {
                adress: "",
                codepostal: "",
                ville: ""
            }
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0)
        if (localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null) {
            firebase.database().ref('/users/' + localStorage.getItem("uid")).on('value', (snapshot) => {
                const investisor = snapshot.val();

                this.setState({
                    type: investisor.type || 'particulier',
                    civilite: investisor.civilite || 'M.',
                    nom: investisor.nom || "",
                    prenom: investisor.prenom || "",
                    nationnalite: investisor.nationnalite || "France",
                    phone: {
                        code: investisor.phone ? investisor.phone.code : "+33",
                        number: investisor.phone ? investisor.phone.numero : ""
                    },
                    datenaiss: investisor.datenaiss || "",
                    paysnaiss: investisor.paysnaiss || "France",
                    residenceFiscale: investisor.residenceFiscale || "France (Métropoloe et DOM)",
                    adress: {
                        adress: investisor.adress ? investisor.adress.adress : "",
                        codepostal: investisor.adress ? investisor.adress.codepostal : "",
                        ville: investisor.adress ? investisor.adress.ville : ""
                    }
                })

            });
        } else {
            this.props.history.push("/comment-investir")
        }

    }

    registerStep1 = (event, values) => {
        this.setState({loading: true});

        firebase.database().ref('users/' + localStorage.getItem("uid")).update({
            "type": this.state.type,
            "civilite": this.state.civilite,
            "nom": values.nom,
            "prenom": values.prenom,
            "nationnalite": values.nationnalite,
            "phone": {
                "code": values.codePays,
                "numero": values.numero
            },
            "datenaiss": values.datenaiss,
            "paysnaiss": values.paysnaiss,
            "residenceFiscale": this.state.residenceFiscale,
            "adress": {
                "adress": values.adress,
                "codepostal": values.codepostal,
                "ville": values.ville
            },
            "step1": "ok"
        }).then(ok => {

            this.setState({loading: false});
            localStorage.setItem("isProfilCompleted", "false");

            setTimeout(() => {
                this.props.history.push("/signup/investisor/step2")
            }, 500);

        })

    };


    render() {

        return (
            <div>
                <div className="row">

                    <div className="col-md-3 etape1-left-block visibility" style={{position: "fixed"}}>
                        <img alt="" src={logo}/>
                        <div className="text-center">
                            <h1 className="text-white"
                                style={{fontSize: "1.46rem", lineHeight: 1.2, fontWeight: "bold"}}>Bienvenue chez
                                QUINSAC !</h1>
                            <div style={{margin: "0px auto"}}>
                                <div style={{height: 4, backgroundColor: "#fff", fontWeight: "bold", width: 30,}}/>
                            </div>
                            <p style={{
                                fontSize: "0.95rem",
                                color: "#fff",
                                textAlign: "center",
                                margin: "0px",
                                lineHeight: 1.6,
                                marginTop: 25
                            }}>
                                L'inscription vous prendra environ 5 minutes.<br/><br/>
                                Nous allons notamment vérifier votre identité, ou celle de votre société, en vous
                                demandant quelques pièces justificatives.<br/>
                                Vous ne les avez pas avec vous ?<br/><br/>
                                Pas de panique !
                                Votre inscription se sauvegarde à chaque étape. Vous aurez la possibilité de nous
                                fournir ces justificatifs ultérieurement.<br/><br/>
                                Vous êtes prêt à investir ? Allons-y !
                            </p>

                        </div>
                    </div>

                    <div className="col-md-9" style={{marginLeft:this.props.windowWidth > 1084 ? "25%" : "2%" }}>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                <button type="button" onClick={() => this.props.history.push("/acceuil")}
                                        className="btn btn-outline-info waves-effect waves-light font-weight-bolder mt-2 mr-2 custombtn">
                                    Terminer plus tard
                                </button>
                            </div>
                            <div className="col-md-12 ml-2 mr-2" >
                                <div align="center" className="font-24 font-weight-bold text-info mt-3">
                                    Informations personnelles (1/2)
                                </div>
                            </div>

                        </div>

                        <div style={{padding: "8.3125rem 1.4375rem",paddingTop:"2.3rem"}} className="text-center">
                            <AvForm onValidSubmit={this.registerStep1}>

                                <Label className="text-dark font-22 font-weight-bold mb-2">Je suis</Label>
                                <FormGroup row style={{display: "block"}}>
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.type === 'particulier'}
                                                              onChange={(event) => this.setState({type: event.target.value})}
                                                              value='particulier'
                                                              classes={{
                                                                  root: "customUICheckboxIcon"
                                                              }}
                                                          />
                                                      }
                                                      label="Un particulier"
                                    />
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.type === 'personneMorale'}
                                                              onChange={(event) => this.setState({type: event.target.value})}
                                                              value='personneMorale'
                                                          />
                                                      }
                                                      label="Une personne morale"
                                    />
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4"
                                       style={{marginTop: 70}}>Civilité</Label>
                                <FormGroup row style={{display: "block"}}>
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.civilite === 'M.'}
                                                              onChange={(event) => this.setState({civilite: event.target.value})}
                                                              value='M.'
                                                              classes={{
                                                                  root: "customUICheckboxIcon"
                                                              }}
                                                          />
                                                      }
                                                      label="Monsieur"
                                    />
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.civilite === 'Mme'}
                                                              onChange={(event) => this.setState({civilite: event.target.value})}
                                                              value='Mme'
                                                          />
                                                      }
                                                      label="Madame"
                                    />
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-3"
                                       style={{marginTop: 70}}>Nom</Label>
                                <div align="center">
                                    <AvGroup className="mb-3">
                                        <AvInput type="text" name="nom" id="nom" style={{
                                            height: 75,
                                            fontSize: "1.1rem",
                                            textAlign: "center",
                                        }}
                                                 placeholder="Entrer votre nom"
                                                 value={this.state.nom} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner votre nom.</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3"
                                       style={{marginTop: 40}}>Prénom</Label>
                                <div align="center">
                                    <AvGroup className="mb-3">
                                        <AvInput type="text" name="prenom" id="prenom"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 placeholder="Entrer votre prénom"
                                                 value={this.state.prenom} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner votre prénom</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3" style={{marginTop: 40}}>Numéro
                                    de téléphone</Label>
                                <div align="center">
                                    <AvGroup className="mb-3" style={{display: "block ruby"}}>
                                        <AvInput type="select" name="codePays" id="codePays" style={{
                                            height: 75,
                                            fontSize: "1.1rem",
                                            textAlign: "center",
                                            width: "25%",
                                        }}
                                                 value={this.state.phone.code}>
                                            {
                                                countryWithCodes.map((item, key) => (
                                                    <option selected={item.dial_code === this.state.phone.code}
                                                            value={item.dial_code}>{item.dial_code + "(" + item.code + ")"} </option>
                                                ))
                                            }
                                        </AvInput>

                                        <AvInput type="number" name="numero" id="numero" style={{
                                            height: 75,
                                            fontSize: "1.1rem",
                                            textAlign: "center",
                                            width: "100%",
                                        }}
                                                 placeholder="Ex: 06123456789" required
                                                 value={this.state.phone.number}/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner un numéro de téléphone valide</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3"
                                       style={{marginTop: 40}}>Nationnalité</Label>
                                <div align="center">
                                    <AvGroup className="mb-3">
                                        <AvInput type="select" name="nationnalite" id="nationnalite"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 value={this.state.nationnalite}>
                                            {
                                                countryList.map((item, key) => (
                                                    <option selected={item.Name === this.state.nationnalite}
                                                            value={item.Name}>{item.Name} </option>
                                                ))
                                            }
                                        </AvInput>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3" style={{marginTop: 40}}>Date
                                    de naissance</Label>
                                <div align="center">
                                    <AvGroup className="mb-3" >
                                        <AvInput type="date" name="datenaiss" id="datenaiss"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 placeholder="Entrer votre date de naissance"
                                                 value={this.state.datenaiss} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                            invalide</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3" style={{marginTop: 40}}>Pays
                                    de naissance</Label>
                                <div align="center">
                                    <AvGroup className="mb-3">
                                        <AvInput type="select" name="paysnaiss" id="paysnaiss"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 value={this.state.paysnaiss}>
                                            {
                                                countryList.map((item, key) => (
                                                    <option selected={item.Name === this.state.paysnaiss}
                                                            value={item.Name}>{item.Name} </option>
                                                ))
                                            }
                                        </AvInput>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop: 70}}>Résidence
                                    fiscale</Label>
                                <FormGroup row style={{display: "block"}}>
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.residenceFiscale === 'France (Métropoloe et DOM)'}
                                                              onChange={(event) => this.setState({residenceFiscale: event.target.value})}
                                                              value='France (Métropoloe et DOM)'
                                                              classes={{
                                                                  root: "customUICheckboxIcon"
                                                              }}
                                                          />
                                                      }
                                                      label="France (Métropoloe et DOM)"
                                    />
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.residenceFiscale === 'France des DOM'}
                                                              onChange={(event) => this.setState({residenceFiscale: event.target.value})}
                                                              value='France des DOM'
                                                          />
                                                      }
                                                      label="France des DOM"
                                    />
                                    <FormControlLabel className="customFormControlLabel"
                                                      classes={{
                                                          label: "customUILabel",
                                                          root: "customUILabel-root"
                                                      }}
                                                      control={
                                                          <Checkbox
                                                              checked={this.state.residenceFiscale === 'Étranger'}
                                                              onChange={(event) => this.setState({residenceFiscale: event.target.value})}
                                                              value='Étranger'
                                                          />
                                                      }
                                                      label="Étranger"
                                    />
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-3"
                                       style={{marginTop: 40}}>Adresse</Label>
                                <div align="center">
                                    <AvGroup className="mb-3" >
                                        <AvInput type="text" name="adress" id="adress"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 placeholder="Entrer votre adresse"
                                                 value={this.state.adress.adress} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner une adresse.</p></AvFeedback>
                                    </AvGroup>
                                </div>


                                <Label className="text-dark font-22 font-weight-bold mb-3" style={{marginTop: 40}}>Code
                                    postal</Label>
                                <div align="center">
                                    <AvGroup className="mb-3" >
                                        <AvInput type="number" name="codepostal" id="codepostal"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 placeholder="Entrer votre code postal"
                                                 value={this.state.adress.codepostal} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner un code postal.</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <Label className="text-dark font-22 font-weight-bold mb-3"
                                       style={{marginTop: 40}}>Ville</Label>
                                <div align="center">
                                    <AvGroup className="mb-3">
                                        <AvInput type="text" name="ville" id="ville"
                                                 style={{height: 75, fontSize: "1.1rem", textAlign: "center"}}
                                                 placeholder="Entrer votre ville"
                                                 value={this.state.adress.ville} required/>
                                        <AvFeedback><p
                                            style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Veuillez
                                            renseigner une ville.</p></AvFeedback>
                                    </AvGroup>
                                </div>

                                <formGroup>
                                    <div>
                                        <button
                                            className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                            style={{width: "70%", height: 75, marginTop: 20}}>

                                            {
                                                this.state.loading ?
                                                    <div
                                                        className="spinner-border avatar-xs spinnerColor m-1"
                                                        role="status"></div> : 'Valider'
                                            }
                                        </button>
                                    </div>

                                </formGroup>


                            </AvForm>
                        </div>

                    </div>
                </div>
            </div>
        )

    }


}

export default windowSize(etape1);
