import React, {Component} from "react";
import logo from "../../../assets/images/vin/logo.png"
import {AvForm} from "availity-reactstrap-validation";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from '@material-ui/core/FormGroup';
import {FormGroup as formGroup, Label} from "reactstrap";
import '../../../assets/css/reactDatez.css';
import firebase from "firebase/app";
import "firebase/database"
import windowSize from 'react-window-size';

const situationProfArray = [
    {
        name:"Agriculteur exploitant",
    },
    {
        name:"Artisan, commerçant et chef d’entreprise",
    },
    {
        name:"Cadre et profession intellectuelle supérieure",
    },
    {
        name:"Profession intermédiaire",
    },
    {
        name:"Employé",
    },
    {
        name:"Ouvrier",
    },
    {
        name:"Retraité",
    },
    {
        name:"Sans activité professionnelle",
    },
];

const sourcePrincArray = [
    {
        name:"Salaires"
    },
    {
        name:"Revenus foncier"
    },
    {
        name:"Pensions, retraites, rentes"
    },
    {
        name:"Autres"
    },

];

const montantsRevenuAnnuArray = [
    {
        name:"Inférieur à 25 000€",
    },
    {
        name:"Entre 25 000€ et 50 000€",
    },
    {
        name:"Entre 50 000€ et 200 000€",
    },
    {
        name:"Plus de 200 000€",
    }
];

const montantsPatrimoine = [
    {
        name:"Inférieur à 25 000€",
    },
    {
        name:"Entre 25 000€ et 100 000€",
    },
    {
        name:"Entre 100 000€ et 250 000€",
    },
    {
        name:"Plus de 250 000€",
    }
];

const horizonPlacemCapitalInv = [
    {
        name:"Tous horizons",
    },
    {
        name:"Jusqu’à 3 ans",
    },
    {
        name:"Jusqu’à 5 ans",
    },
    {
        name:"Plus de 5 ans",
    }
];

const invSecteursGeo = [
    {
        name:"LePerray",
    },
    {
        name:"Communauté de commune de\n" +
            "Rambouillet",
    },
    {
        name:"Le département des Yvelines",
    },
    {
        name:"La\n" +
            "région ile-de-France",
    }
];

const invSecteursActivite = [
    {
        name:"Energies renouvelables",
    },
    {
        name:"Immobilier",
    }
];


class etape2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            situationProf:"",
            RevenuSource:"",
            revenuMontantAnnuel : "",
            montantPatrimoine:"",
            horizonPlacemCapitalInv:"",
            invSecteursGeo : [],
            invSecteursActivite: []
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0)
        if(localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null){
            firebase.database().ref('/users/'+ localStorage.getItem("uid")).on('value', (snapshot) => {
                const investisor = snapshot.val();

                this.setState({
                    situationProf: investisor.situationProf || "",
                    RevenuSource: investisor.RevenuSource || "",
                    revenuMontantAnnuel : investisor.revenuMontantAnnuel || "",
                    montantPatrimoine: investisor.montantPatrimoine || "",
                    horizonPlacemCapitalInv: investisor.horizonPlacemCapitalInv || "",
                    invSecteursGeo : investisor.invSecteursGeo || [],
                    invSecteursActivite: investisor.invSecteursActivite || []
                })

            });
        }else{
            this.props.history.push("/comment-investir")
        }

    }

    registerStep2 = (event,values) => {
        this.setState({loading:true});

        firebase.database().ref('users/'+ localStorage.getItem("uid")).update({
            "situationProf":this.state.situationProf,
            "RevenuSource":this.state.RevenuSource,
            "revenuMontantAnnuel" : this.state.revenuMontantAnnuel,
            "montantPatrimoine": this.state.montantPatrimoine,
            "horizonPlacemCapitalInv": this.state.horizonPlacemCapitalInv,
            "invSecteursGeo" : this.state.invSecteursGeo,
            "invSecteursActivite": this.state.invSecteursActivite,
            "step2":"ok",
            "step3":"ok"
        }).then( ok => {

            this.setState({loading:false});
            localStorage.setItem("isProfilCompleted","true");
            setTimeout(() => {
                this.props.history.push("/investisor/completer-profil/documents")
            },500);

        })

    };


    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-md-3 etape1-left-block visibility" style={{position:"fixed"}}>
                        <img alt="" src={logo}/>
                        <div className="text-center">
                            <h1 className="text-white"
                                style={{fontSize: "1.46rem", lineHeight: 1.2, fontWeight: "bold"}}>Profil investisseur</h1>
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
                                Ces questions nous permettent de déterminer votre profil investisseur afin de vous conseiller des projets en adéquation.
                                <br/><br/>
                                Bien évidemment, toutes ces informations restent confidentielles.
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
                                    Informations personnelles (2/2)
                                </div>
                            </div>

                        </div>
                        <div style={{padding:"8.3125rem 1.4375rem",paddingTop:"2.3rem"}} className="text-center">
                            <AvForm onValidSubmit={this.registerStep2}>

                                <Label className="text-dark font-22 font-weight-bold mb-4">Situation professionnelle</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        situationProfArray.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"situaProf"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control={
                                                                   <Checkbox
                                                                       checked={this.state.situationProf === item.name}
                                                                       onChange={(event) => this.setState({situationProf: event.target.value})}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Source principale de vos revenus</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        sourcePrincArray.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"sourcePrinc"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control={
                                                                   <Checkbox
                                                                       checked={this.state.RevenuSource === item.name}
                                                                       onChange={(event) => this.setState({RevenuSource: event.target.value})}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Montant de vos revenus annuels</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        montantsRevenuAnnuArray.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"revenuMontantAnnuel"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control = {
                                                                   <Checkbox
                                                                       checked={this.state.revenuMontantAnnuel === item.name}
                                                                       onChange={(event) => this.setState({revenuMontantAnnuel: event.target.value})}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Montant de votre patrimoine</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        montantsPatrimoine.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"montantPtri"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control = {
                                                                   <Checkbox
                                                                       checked={this.state.montantPatrimoine === item.name}
                                                                       onChange={(event) => this.setState({montantPatrimoine: event.target.value})}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Quel est l’horizon de placement pour le capital que vous projetez d’investir ?</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        horizonPlacemCapitalInv.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"horizonPlacemCapitalInv"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control = {
                                                                   <Checkbox
                                                                       checked={this.state.horizonPlacemCapitalInv === item.name}
                                                                       onChange={(event) => this.setState({horizonPlacemCapitalInv: event.target.value})}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Avez-vous des secteurs géographiques de prédilection pour vos investissements ?</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        invSecteursGeo.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"invSecteursGeo"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control = {
                                                                   <Checkbox
                                                                       checked={this.state.invSecteursGeo.find(x => x.key === key) !== undefined}
                                                                       onChange={(event) => {
                                                                           let invSecteursGeo = this.state.invSecteursGeo;
                                                                           let found = invSecteursGeo.find(x => x.key === key);
                                                                           if (found === undefined) {
                                                                               invSecteursGeo.push({
                                                                                   name: event.target.value,
                                                                                   key: key
                                                                               })
                                                                           } else {
                                                                               invSecteursGeo.splice(invSecteursGeo.indexOf(found), 1)
                                                                           }
                                                                           this.setState({invSecteursGeo: invSecteursGeo})
                                                                       }}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <Label className="text-dark font-22 font-weight-bold mb-4" style={{marginTop:70}}>Avez-vous des secteurs d’activité de prédilection pour vos investissements ?</Label>
                                <FormGroup row style={{display:"block"}}>
                                    {
                                        invSecteursActivite.map((item,key) => (
                                            <FormControlLabel  className="customFormControlLabel" id={"invSecteursActivite"+key}
                                                               classes={{
                                                                   label:"customUILabel",
                                                                   root:"customUILabel-root"
                                                               }}
                                                               control = {
                                                                   <Checkbox
                                                                       checked={this.state.invSecteursActivite.find(x => x.key === key) !== undefined}
                                                                       onChange={(event) => {
                                                                           let invSecteursActivite = this.state.invSecteursActivite;
                                                                           let found = invSecteursActivite.find(x => x.key === key);
                                                                           if (found === undefined) {
                                                                               invSecteursActivite.push({
                                                                                   name: event.target.value,
                                                                                   key: key
                                                                               })
                                                                           } else {
                                                                               invSecteursActivite.splice(invSecteursActivite.indexOf(found), 1)
                                                                           }
                                                                           this.setState({invSecteursActivite: invSecteursActivite})
                                                                       }}
                                                                       value={item.name}
                                                                       classes={{
                                                                           root:"customUICheckboxIcon"
                                                                       }}
                                                                   />
                                                               }
                                                               label={item.name}
                                            />
                                        ))
                                    }
                                </FormGroup>

                                <formGroup>
                                    <div>
                                        <button className="btn btn-info waves-effect waves-light font-weight-bolder custombtn" style={{width:"70%",height:75,marginTop:20}}>
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

export default windowSize(etape2);
