import React, {Suspense} from "react";
import Loader from "../../../../components/Loader";
import firebase from "firebase/app";
import "firebase/database"
import {Container} from "reactstrap";
import PopupDate from "../../../../components/PopupDate";
import {Button} from "reactstrap";
import { Tabs, Tab, ORIENTATION} from "baseui/tabs";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Select, TYPE } from "baseui/select";
import PhoneInput from "react-phone-input-2";
import contreyList from "../../../../tools/countryList";

import moment from "moment";
import cantonList from "../../../../tools/cantonSuisse";
import MySnackbarContentWrapper from "../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";

const Topbar = React.lazy(() => import("../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../components/Navbar"));
const loading = () => <Loader/>;


class UpdateSo extends React.Component{

    state={
        openAlert: false,
        alertMessage: '',
        alertType: '',

        loading: true,
        isMenuOpened: false,
        activeMenuItem: 'item-gestion',
        activeKey:"0",
        activeGerKey:"0",
        activeAssocKey:"0",
        activerRespTokenKey:"0",
        society:"",
        montantChoix:""
    }

    componentDidMount() {

        firebase.database().ref("society/"+this.props.match.params.uid).on("value",(snapshot) => {
            let society= snapshot.val() || [];
            //console.log(society);
            this.setState({society:society,loading:false})
        })
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg, //***
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    handleObjectChange = (object, name) => event => {

            let objCopy = this.state[object];
            objCopy[name] = event.target.value;
            this.setState({
                [object]: objCopy
            });
    };
    handleObjectObjectChange = (object1,object2, name) => event => {

        let objCopy = this.state[object1];
        objCopy[object2][name] = event.target.value;
        this.setState({
            [object1]: objCopy
        });
    };
    handle3ObjectChange = (object1,object2,object3, name) => event => {

        let objCopy = this.state[object1];
        objCopy[object2][object3][name] = event.target.value;
        this.setState({
            [object1]: objCopy
        });
    };

    handleObjectObjectKeyChange = (object1,object2,key, name) => event => {

        let objCopy = this.state[object1];
        objCopy[object2][key][name] = event.target.value;
        this.setState({
            [object1]: objCopy
        });
    };


    handleChoixMontantChange = (x) => event => {
        if (event.target.value === "20000" || event.target.value === "100000") {
            let objCopy = this.state.society;
            objCopy["sCapital"].totalCapital = (event.target.value).toString();
            objCopy["totalNbActions"] = (parseInt(event.target.value) / 100).toString();
            this.setState({
                montantChoix: "",
                society: objCopy
            })
        } else {
            let objCopy = this.state.society;
            objCopy["sCapital"].totalCapital = (event.target.value).toString();
            objCopy["sCapital"].totalNbActions = (parseInt(event.target.value) / 100).toString();
            this.setState({
                montantChoix: (event.target.value).toString(),
                society: objCopy
            })
        }
    };

    handleOnChangePhone = (value, key, type) => {
        if (type === "gerant") {
            let objCopy = this.state.society;
            objCopy['sAdministrator'][key].phone = value;
            this.setState({society: objCopy});
        } else {
            let objCopy = this.state.society;
            objCopy['sAssociate'][key].phone = value;
            this.setState({society: objCopy});
        }

    };

    addRepresentant = (key) => event => {
        let objCopy = this.state.society;
        objCopy['sAssociate'][key].representant.push({
            rep_firstname: '',
            rep_lastname: '',
        });
        this.setState({
            society: objCopy
        })

    };




    render() {
        return(
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}

                            <div className="row" style={{marginTop: 20}}>
                                <div className="col-md-6">
                                    <i className="mdi mdi-arrow-left-circle" onClick={() => this.props.history.goBack()}
                                       style={{color: "cornflowerblue", fontSize: 28, cursor: "pointer"}}>
                                        <h5 style={{cursor: 'auto'}}>Entreprise: {this.state.society.sName}</h5>
                                    </i>
                                </div>
                                <div className="col-md-6">
                                    <div align="right" style={{float:"right"}}>
                                        <Button color="primary"
                                                onClick={()=> {
                                                    this.setState({loading:true});
                                                    firebase.database().ref("society/"+this.props.match.params.uid).update({
                                                        dateCreation: this.state.society.dateCreation,
                                                        nbAssociate: this.state.society.sAssociate.length,
                                                        nbGerant: this.state.society.sAdministrator.length,
                                                        sAdministrator:this.state.society.sAdministrator || [],
                                                        sAssociate:this.state.society.sAssociate || [],
                                                        sBut: this.state.society.sBut,
                                                        sCapital:this.state.society.sCapital,
                                                        sName: this.state.society.sName,
                                                        sSiege:this.state.society.sSiege
                                                    }).then( ok => {
                                                        this.openSnackbar("success","Vos modifications sont bien enregistrées")
                                                    }).catch(err => alert(err))
                                                }}
                                                className="btn btn-danger waves-effect waves-light">
                                            Appliquer vos modifications
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">

                                            {
                                                this.state.society !== "" &&

                                                <Tabs orientation={ORIENTATION.horizontal}
                                                      onChange={({ activeKey }) => {
                                                          console.log(activeKey)
                                                          this.setState({activeKey:activeKey})
                                                      }}
                                                      activeKey={this.state.activeKey}
                                                >
                                                    <Tab  title="Informations générales">
                                                        <div className="row mt-3">
                                                            <div className="col-md-6">
                                                                <label>Nom de la société</label>
                                                                <Input
                                                                    value={this.state.society.sName}
                                                                    onChange={this.handleObjectChange("society","sName")}
                                                                    placeholder="Nom de la société"
                                                                />

                                                            </div>
                                                            <div className="col-md-6">
                                                                <label>But social :</label>

                                                                <Textarea
                                                                    value={this.state.society.sBut}
                                                                    onChange={this.handleObjectChange("society","sBut")}
                                                                    placeholder="Vous pouvez décrire votre activité principale.
                                                                Il n’est pas forcément utile d’ajouter l’intégralité de vos activités.
                                                                Vos statuts seront rédigés de sorte à vous permettre d’exercer des activités connexes.
                                                                Vous pouvez faire appel à un avocat de SmartCo en cas de doute."
                                                                    overrides={{
                                                                        Input: {
                                                                            style: {
                                                                                maxHeight: '300px',
                                                                                minHeight: '100px',
                                                                                minWidth: '300px',
                                                                                width: '100vw', // fill all available space up to parent max-width
                                                                                resize: 'both',
                                                                            },
                                                                        },
                                                                        InputContainer: {
                                                                            style: {
                                                                                maxWidth: '100%',
                                                                                width: 'min-content',
                                                                            },
                                                                        },
                                                                    }}
                                                                />

                                                            </div>

                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-6">
                                                                <label>Organe de révison</label>
                                                                <Input
                                                                    value={this.state.society.OrganeRevision}
                                                                    onChange={this.handleObjectChange("society","OrganeRevision")}
                                                                    placeholder="Organe de révison"

                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label>Date de création</label>
                                                                <div style={{display:"flex"}}>
                                                                    <PopupDate
                                                                        showLabels={false}
                                                                        value={new Date(moment(this.state.society.dateCreation).format("MM/DD/YYYY"))}
                                                                        onDateChange={ date => {
                                                                            let objCp = this.state.society;
                                                                            objCp.dateCreation = date;
                                                                            this.setState({society:objCp})
                                                                        }}
                                                                        format='day/month/year'
                                                                        invalidMessage="Date invalide"
                                                                    />
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </Tab>
                                                    <Tab  title="Siége">
                                                        <div className="row mt-3">
                                                            <div className="col-md-12">
                                                                <label>Souhaitez-vous avoir une domiciliation via SmartCo ?</label>
                                                                <div style={{marginLeft:10,marginBottom:20}}>
                                                                    <RadioGroup
                                                                        value={this.state.society.sSiege.domiciliation}
                                                                        onChange={this.handleObjectObjectChange("society","sSiege","domiciliation")}
                                                                        name="domiSmartco"
                                                                        align={ALIGN.vertical}
                                                                    >
                                                                        <Radio overrides={{
                                                                            RadioMarkOuter: {
                                                                                style: ({$theme}) => ({
                                                                                    backgroundColor: $theme.colors.negative300,
                                                                                }),
                                                                            },
                                                                        }}  value="true">Oui</Radio>
                                                                        <Radio overrides={{
                                                                            RadioMarkOuter: {
                                                                                style: ({$theme}) => ({
                                                                                    backgroundColor: $theme.colors.negative300,
                                                                                }),
                                                                            },
                                                                        }}  value="false">Non</Radio>
                                                                    </RadioGroup>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        {
                                                            this.state.society.sSiege.domiciliation === "false" &&
                                                                <div className="mt-3">
                                                                    <label>Où est le siège de votre société ?</label>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <label>Adresse</label>
                                                                            <Input
                                                                                value={this.state.society.sSiege.adress}
                                                                                onChange={this.handleObjectObjectChange("society","sSiege","adress")}
                                                                                placeholder="Adresse de  la société"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label>Code postal</label>
                                                                            <Input
                                                                                value={this.state.society.sSiege.postalCode}
                                                                                onChange={this.handleObjectObjectChange("society","sSiege","postalCode")}
                                                                                placeholder="Code postal"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-6">
                                                                            <label>Ville</label>
                                                                            <Input
                                                                                value={this.state.society.sSiege.ville}
                                                                                onChange={this.handleObjectObjectChange("society","sSiege","ville")}
                                                                                placeholder="Ville"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label>Canton</label>
                                                                            <select  className="custom-select"
                                                                                     onChange={this.handleObjectObjectChange("society","sSiege","canton")}
                                                                                     value={this.state.society.sSiege.canton}>
                                                                                {
                                                                                    cantonList.flatMap((item,key) => (
                                                                                        <option key={key} value={item.CantonSuisse}>{item.CantonSuisse}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-12">
                                                                            <label>Est-ce que ce sont vos propres locaux ?</label>
                                                                            <div style={{marginLeft:10,marginBottom:20}}>
                                                                                <RadioGroup
                                                                                    value={this.state.society.sSiege.isPropreLocaux}
                                                                                    onChange={this.handleObjectObjectChange("society","sSiege","isPropreLocaux")}
                                                                                    name="isPropreLocaux"
                                                                                    align={ALIGN.vertical}
                                                                                >
                                                                                    <Radio overrides={{
                                                                                        RadioMarkOuter: {
                                                                                            style: ({$theme}) => ({
                                                                                                backgroundColor: $theme.colors.negative300,
                                                                                            }),
                                                                                        },
                                                                                    }}  value="true">Oui</Radio>
                                                                                    <Radio overrides={{
                                                                                        RadioMarkOuter: {
                                                                                            style: ({$theme}) => ({
                                                                                                backgroundColor: $theme.colors.negative300,
                                                                                            }),
                                                                                        },
                                                                                    }}  value="false">Non</Radio>
                                                                                </RadioGroup>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                        }
                                                    </Tab>
                                                    <Tab title="Capital">
                                                            <div className="mt-2">
                                                                <h5 className="mb-3">Capital social de votre société</h5>
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <label for="canton">Montant du capital libéré (CHF)</label>
                                                                        <div className="radio radio-pink mb-2">
                                                                            <input type="radio" name="radiocapital"
                                                                                   id="radiocapital1"
                                                                                   checked={this.state.society.sCapital.totalCapital === "20000"}
                                                                                   style={{marginLeft: 10}} value={'20000'}
                                                                                   onClick={this.handleObjectObjectChange('society','sCapital', 'totalCapital')}
                                                                            />
                                                                            <label htmlFor="radiocapital1">
                                                                                CHF 20'000.-
                                                                            </label>
                                                                        </div>

                                                                        <div className="radio radio-pink mb-2">
                                                                            <input type="radio" name="radiocapital"
                                                                                   id="radiocapita3"
                                                                                   checked={this.state.society.sCapital.totalCapital === this.state.montantChoix}
                                                                                   style={{marginLeft: 10}}
                                                                                   value={this.state.montantChoix}
                                                                                   onClick={this.handleObjectObjectChange('society','sCapital', 'totalCapital')}
                                                                            />
                                                                            <label htmlFor="radiocapita3">
                                                                                Plus (au choix, maximum 400'000.-)
                                                                            </label>
                                                                        </div>
                                                                        {
                                                                            this.state.society.sCapital.totalCapital !== "20000" && this.state.society.sCapital.totalCapital !== "100000" &&
                                                                            <div className="form-group mb-2">
                                                                                <input type="number" className="form-control"
                                                                                       id="nb"
                                                                                       style={{width: '60%', marginLeft: 30}}
                                                                                       value={this.state.montantChoix}
                                                                                       onChange={this.handleChoixMontantChange('')}
                                                                                />
                                                                                <h5 style={{color: "red", marginLeft: 35}}>
                                                                                    {
                                                                                        parseInt(this.state.montantChoix) < 20000 ? "Le capital doit etre supérieur à 20000 CHF" :
                                                                                            parseInt(this.state.montantChoix) > 400000 ? "Le capital doit etre inférieur à 400 000 CHF" :
                                                                                                parseInt(this.state.montantChoix) % 10 !== 0 ? "Le capital doit etre un multiple de 10" : ""
                                                                                    }
                                                                                </h5>
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                    <div className="col-lg-6">
                                                                        <label for="canton">Valeur nominale des actions ?</label>
                                                                        <div className="radio radio-pink mb-2">
                                                                            <input type="radio" name="radiovalnominal"
                                                                                   id="radiovalnominal1"
                                                                                   checked={parseInt(this.state.society.sCapital.totalNbActions) === parseInt(this.state.society.sCapital.totalCapital) / 100}
                                                                                   onClick={this.handleObjectObjectChange('society','sCapital', 'totalNbActions')}
                                                                                   style={{marginLeft: 10}}
                                                                                   value={(parseInt(this.state.society.sCapital.totalCapital) / 100).toString()}/>
                                                                            <label htmlFor="radiovalnominal1">
                                                                                {parseInt(this.state.society.sCapital.totalCapital) / 100}&nbsp;
                                                                                parts sociales d'une valeur nominale de 100 CHF -.
                                                                                (standard)
                                                                            </label>
                                                                        </div>
                                                                        <div className="radio radio-pink mb-2">
                                                                            <input type="radio" name="radiovalnominal"
                                                                                   id="radiovalnominal2"
                                                                                   checked={parseInt(this.state.society.sCapital.totalNbActions) === parseInt(this.state.society.sCapital.totalCapital) / 1000}
                                                                                   onClick={this.handleObjectObjectChange('society','sCapital', 'totalNbActions')}
                                                                                   style={{marginLeft: 10}}
                                                                                   value={(parseInt(this.state.society.sCapital.totalCapital) / 1000).toString()}
                                                                            />
                                                                            <label htmlFor="radiovalnominal2">
                                                                                {parseInt(this.state.society.sCapital.totalCapital) / 1000}&nbsp;
                                                                                parts sociales d'une valeur nominale de 1000 CHF.-
                                                                            </label>
                                                                        </div>

                                                                    </div>
                                                                </div>


                                                                <div className="row mt-2">
                                                                    <div className="col-md-12">
                                                                        <label>Souhaitez-vous obtenir un numéro IBAN pour le compte de consignation via Smartco ?</label>
                                                                        <div style={{marginLeft:10,marginBottom:20}}>
                                                                            <RadioGroup
                                                                                value={this.state.society.sCapital.getIBAN || "true"}
                                                                                onChange={this.handleObjectObjectChange("society","sCapital","getIBAN")}
                                                                                name="getIBAN"
                                                                                align={ALIGN.vertical}
                                                                            >
                                                                                <Radio overrides={{
                                                                                    RadioMarkOuter: {
                                                                                        style: ({$theme}) => ({
                                                                                            backgroundColor: $theme.colors.negative300,
                                                                                        }),
                                                                                    },
                                                                                }}  value="true">Oui</Radio>
                                                                                <Radio overrides={{
                                                                                    RadioMarkOuter: {
                                                                                        style: ({$theme}) => ({
                                                                                            backgroundColor: $theme.colors.negative300,
                                                                                        }),
                                                                                    },
                                                                                }}  value="false">Non (Téléchargez l’attestation de consignation de votre banque
                                                                                    avec signature électronique qualifiée)</Radio>
                                                                            </RadioGroup>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="row mt-2">
                                                                    <div className="col-md-12">
                                                                        <label>Souhaitez-vous faire des apports en nature ?</label>
                                                                        <div style={{marginLeft:10,marginBottom:20}}>
                                                                            <RadioGroup
                                                                                value={this.state.society.sCapital.apportsNAture || "false"}
                                                                                onChange={this.handleObjectObjectChange("society","sCapital","apportsNAture")}
                                                                                name="apportsNAture"
                                                                                align={ALIGN.vertical}
                                                                            >
                                                                                <Radio overrides={{
                                                                                    RadioMarkOuter: {
                                                                                        style: ({$theme}) => ({
                                                                                            backgroundColor: $theme.colors.negative300,
                                                                                        }),
                                                                                    },
                                                                                }}  value="true">Oui</Radio>
                                                                                <Radio overrides={{
                                                                                    RadioMarkOuter: {
                                                                                        style: ({$theme}) => ({
                                                                                            backgroundColor: $theme.colors.negative300,
                                                                                        }),
                                                                                    },
                                                                                }}  value="false">Non (le plus fréquent)</Radio>
                                                                            </RadioGroup>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>


                                                    </Tab>
                                                    <Tab title="Gérants">

                                                        <Tabs orientation={ORIENTATION.horizontal}
                                                              onChange={({ activeKey }) => {
                                                                  this.setState({activeGerKey:activeKey})
                                                              }}
                                                              activeKey={this.state.activeGerKey}
                                                        >
                                                            {
                                                                (this.state.society.sAdministrator || []).map((item, key) => (
                                                                    <Tab key={key} title={item.firstname +" " + item.lastname}>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Civilité</label>
                                                                                    <select  className="custom-select"
                                                                                             onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"gender")}
                                                                                             value={this.state.society.sAdministrator[key].gender}>
                                                                                        <option value="M.">M.</option>
                                                                                        <option value="Mme">Mme</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Nom</label>
                                                                                    <input type="text"  className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"firstname")}
                                                                                             value={this.state.society.sAdministrator[key].firstname}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Prénom</label>
                                                                                    <input type="text" className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"lastname")}
                                                                                             value={this.state.society.sAdministrator[key].lastname}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Email</label>
                                                                                    <input type="email" className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"email")}
                                                                                             value={this.state.society.sAdministrator[key].email}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Numéro de téléphone</label>
                                                                                    <PhoneInput
                                                                                        country={'fr'}
                                                                                        value={this.state.society.sAdministrator[key].phone}
                                                                                        onChange={(value) => this.handleOnChangePhone(value, key, "phy")}
                                                                                        inputStyle={{
                                                                                            width: "inherit",
                                                                                            height: 37
                                                                                        }}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3" style={{display:"inline-block"}}>
                                                                                    <label>Date de naissance</label>
                                                                                    <PopupDate
                                                                                        showLabels={false}
                                                                                        value={new Date(moment(this.state.society.sAdministrator[key].birthday).format("MM/DD/YYYY"))}
                                                                                        onDateChange={ date => {
                                                                                            let objCp = this.state.society;
                                                                                            objCp['sAdministrator'][key].birthday = date;
                                                                                            this.setState({society:objCp})
                                                                                        }}
                                                                                        format='day/month/year'
                                                                                        invalidMessage="Date invalide"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label>Nationnalité</label>
                                                                                    <select className="custom-select"
                                                                                             value={this.state.society.sAdministrator[key].nationality}
                                                                                             onChange={(e) => {
                                                                                                 let objCp = this.state.society;
                                                                                                 objCp['sAdministrator'][key].nationality = e.target.value;
                                                                                                 this.setState({society:objCp})
                                                                                             }}>
                                                                                        {
                                                                                            contreyList.map((item, key) => (
                                                                                                <option key={key}
                                                                                                        value={item.Name}>{item.Name}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.society.sAdministrator[key].nationality === "Switzerland" &&
                                                                            <div className="row">
                                                                                <div className="col-lg-6">
                                                                                </div>
                                                                                <div className="col-lg-3">
                                                                                    <div className="form-group mb-3">
                                                                                        <label>Merci d'ajouter votre origine</label>
                                                                                        <select className="custom-select "
                                                                                               onChange={(e) => {
                                                                                                   let objCp = this.state.society;
                                                                                                   objCp['sAdministrator'][key].origine = e.target.value;
                                                                                                   this.setState({society:objCp})
                                                                                               }}
                                                                                                 value={this.state.society.sAdministrator[key].origine}
                                                                                        >
                                                                                            {
                                                                                                cantonList.map((item,key) => (
                                                                                                    <option key={key} value={item.CantonSuisse}>{item.CantonSuisse}</option>
                                                                                                ))
                                                                                            }

                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        }


                                                                        <h4>Adresse du gérant:</h4>

                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Adresse</label>
                                                                                    <input type="text" className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"adress")}
                                                                                             value={this.state.society.sAdministrator[key].adress}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Ville</label>
                                                                                    <input type="text" className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"adress")}
                                                                                             value={this.state.society.sAdministrator[key].ville}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Code postal</label>
                                                                                    <input type="number" className="form-control"
                                                                                           onChange={this.handleObjectObjectKeyChange("society","sAdministrator",key,"postalCode")}
                                                                                             value={this.state.society.sAdministrator[key].postalCode}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/*<div className="row"
                                                                             style={{marginTop: 15}}>
                                                                            <div className="col-lg-12">
                                                                                <label for="canton">Le gérant a-t-il une SuisseID ?</label>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuiAd" + key}
                                                                                           id={"radioiSuiAd1" + key}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("sActionnairePhy", "isHaveSuisseId", key, "true")}
                                                                                           checked={this.state.society.sAdministrator[key].isHaveSuisseId === "true"}
                                                                                           value={this.state.society.sAdministrator[key].isHaveSuisseId}/>
                                                                                    <label
                                                                                        htmlFor={"radioiSuiAd1" + key}>
                                                                                        Oui
                                                                                    </label>
                                                                                </div>
                                                                                <div
                                                                                    className="radio radio-pink mb-2">
                                                                                    <input type="radio"
                                                                                           name={"radioiSuiAd" + key}
                                                                                           id={"radioiSuiAd2" + key}
                                                                                           style={{marginLeft: 10}}
                                                                                           onClick={this.handleRadioChange("sActionnairePhy", "isHaveSuisseId", key, "false")}
                                                                                           checked={this.state.sActionnairePhy[key].isHaveSuisseId === "false"}
                                                                                           value={this.state.sActionnairePhy[key].isHaveSuisseId}/>
                                                                                    <label
                                                                                        htmlFor={"radioiSuiAd2" + key}>
                                                                                        Non : Identification par
                                                                                        vidéo au moyen de votre
                                                                                        passeport
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>*/}

                                                                        <div style={{
                                                                            marginTop: 20,
                                                                            marginBottom: 20,
                                                                            height: 2,
                                                                            backgroundColor: "#C0C0C0",
                                                                            marginLeft: 40,
                                                                            marginRight: 40
                                                                        }}/>

                                                                    </Tab>
                                                                ))
                                                            }



                                                        </Tabs>

                                                    </Tab>
                                                    <Tab title="Asociés">

                                                        <Tabs orientation={ORIENTATION.horizontal}
                                                              onChange={({ activeKey }) => {
                                                                  this.setState({activeAssocKey:activeKey})
                                                              }}
                                                              activeKey={this.state.activeAssocKey}
                                                              overrides={{
                                                                  TabContent:{
                                                                      style: ({ $theme }) => {
                                                                          return {
                                                                              width:"100%"
                                                                          };
                                                                      }
                                                                  }
                                                              }}
                                                        >

                                                            {
                                                                (this.state.society.sAssociate || []).map((item, key) => (
                                                                    <Tab key={key} title={item.ej_name === "" ? item.firstname + " " +item.lastname : item.ej_name}>

                                                                        <div className="row mt-1">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>L'associé est</label>
                                                                                    <select className="custom-select"
                                                                                             onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"type")}
                                                                                             value={this.state.society.sAssociate[key].type}>
                                                                                        <option
                                                                                            value="Un particulier">Un particulier
                                                                                        </option>
                                                                                        <option
                                                                                            value="Une entité juridique">Une entité juridique
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                {
                                                                                    this.state.society.sAssociate[key].ej_name === "" ?
                                                                                        <div className="form-group mb-3">
                                                                                            <label>Civilité</label>
                                                                                            <select className="custom-select"
                                                                                                    onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"gender")}
                                                                                                     value={this.state.society.sAssociate[key].gender}>
                                                                                                <option value="M.">M.</option>
                                                                                                <option value="Mme">Mme</option>
                                                                                            </select>
                                                                                        </div>  :

                                                                                        <div className="form-group mb-3">
                                                                                            <label>Forme social</label>
                                                                                            <select className="custom-select"
                                                                                                    onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"formeSocial")}
                                                                                                     value={this.state.society.sAssociate[key].formeSocial}>
                                                                                                <option
                                                                                                    value="SARL">SARL
                                                                                                </option>
                                                                                                <option
                                                                                                    value="SA">SA
                                                                                                </option>
                                                                                            </select>
                                                                                        </div>
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            this.state.society.sAssociate[key].ej_name !== "" &&

                                                                            [
                                                                                (this.state.society.sAssociate[key].representant || []).map((rep, keyrep) => (
                                                                                <div key={0} className="row">
                                                                                    <div className="col-lg-6">
                                                                                        <div className="form-group mb-3">
                                                                                            <label>Nom du représentant</label>
                                                                                            <input type="text" className="form-control"
                                                                                                    onChange={(e) => {
                                                                                                        let objCp = this.state.society;
                                                                                                        objCp['sAssociate'][key].representant[keyrep].rep_firstname = e.target.value;
                                                                                                        this.setState({society:objCp})
                                                                                                    }}
                                                                                                     value={this.state.society.sAssociate[key].representant[keyrep].rep_firstname}
                                                                                                     required/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-6">
                                                                                        <div className="mb-3">
                                                                                            <label>Prénom du
                                                                                                représentant</label>
                                                                                            <input type="text" className="form-control"
                                                                                                   onChange={(e) => {
                                                                                                       let objCp = this.state.society;
                                                                                                       objCp['sAssociate'][key].representant[keyrep].rep_lastname = e.target.value;
                                                                                                       this.setState({society:objCp})
                                                                                                   }}
                                                                                                     value={this.state.society.sAssociate[key].representant[keyrep].rep_lastname}
                                                                                                     required/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )),

                                                                                <div className="row" key={1}>
                                                                                    <div className="col-lg-12">
                                                                                        <div
                                                                                            className="float-right">
                                                                                            <Button color="primary"
                                                                                                    onClick={this.addRepresentant(key)}
                                                                                                    className="btn btn-danger waves-effect waves-light">
                                                                                                Ajouter un autre
                                                                                                représentant
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ]
                                                                        }
                                                                        <div className="row">
                                                                            {
                                                                                this.state.society.sAssociate[key].ej_name === "" ?
                                                                                    [
                                                                                        <div key={0} className="col-lg-6">
                                                                                            <div className="form-group mb-3">
                                                                                                <label>Nom</label>
                                                                                                <input type="text" className="form-control"
                                                                                                       onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"firstname")}
                                                                                                         value={this.state.society.sAssociate[key].firstname}
                                                                                                         required/>
                                                                                            </div>
                                                                                        </div>,
                                                                                        <div key={1} className="col-lg-6">
                                                                                            <div className="form-group mb-3">
                                                                                                <label>Prénom</label>
                                                                                                <input type="text" className='form-control'
                                                                                                       onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"lastname")}
                                                                                                         value={this.state.society.sAssociate[key].lastname}
                                                                                                         required/>
                                                                                            </div>
                                                                                        </div>

                                                                                    ] :

                                                                                    <div className="col-lg-12">
                                                                                        <div className="mb-3">
                                                                                            <label>Nom de l'entité juridique</label>
                                                                                            <input type="text" className="form-control"
                                                                                                   onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"ej_name")}
                                                                                                     value={this.state.society.sAssociate[key].ej_name}
                                                                                                     required/>
                                                                                        </div>
                                                                                    </div>

                                                                            }


                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label >Email</label>
                                                                                    <input type="email" className="form-control"
                                                                                           onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"email")}
                                                                                             value={this.state.society.sAssociate[key].email}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label>Numéro de
                                                                                        téléphone</label>
                                                                                    <PhoneInput
                                                                                        country={'fr'}
                                                                                        value={this.state.society.sAssociate[key].phone}
                                                                                        onChange={(value) => this.handleOnChangePhone(value,key,"assoc")}
                                                                                        inputStyle={{
                                                                                            width: "inherit",
                                                                                            height: 37
                                                                                        }}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {
                                                                            this.state.society.sAssociate[key].ej_name === "" &&
                                                                            [
                                                                                <div className="row" key={0}>
                                                                                    <div className="col-lg-6">
                                                                                        <div className="mb-3" style={{display:"inline-block"}}>
                                                                                            <label>Date de naissance</label>
                                                                                            <PopupDate
                                                                                                showLabels={false}
                                                                                                 value={new Date(moment(this.state.society.sAssociate[key].birthday).format("MM/DD/YYYY"))}
                                                                                                onDateChange={ date => {
                                                                                                    let objCp = this.state.society;
                                                                                                    objCp['sAssociate'][key].birthday = date;
                                                                                                    this.setState({society:objCp})
                                                                                                }}
                                                                                                format='day/month/year'
                                                                                                invalidMessage="Date invalide"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-6">
                                                                                        <div className="mb-3">
                                                                                            <label>Nationnalité</label>
                                                                                            <select className="custom-select"
                                                                                                     value={this.state.society.sAssociate[key].nationality}
                                                                                                     onChange={(e) => {
                                                                                                         let objCp = this.state.society;
                                                                                                         objCp['sAssociate'][key].nationality = e.target.value;
                                                                                                         this.setState({society:objCp})
                                                                                                     }}>
                                                                                                {
                                                                                                    contreyList.map((item, key) => (
                                                                                                        <option key={key} value={item.Name}>{item.Name}</option>
                                                                                                    ))
                                                                                                }
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>,
                                                                                this.state.society.sAssociate[key].nationality === "Switzerland" &&
                                                                                <div key={1} className="row">
                                                                                    <div className="col-lg-6">
                                                                                    </div>
                                                                                    <div className="col-lg-3">
                                                                                        <div className="mb-3">
                                                                                            <label>Merci
                                                                                                d'ajouter votre
                                                                                                origine</label>
                                                                                            <select  className="custom-select"
                                                                                                     value={this.state.society.sAssociate[key].origine}
                                                                                                     required>
                                                                                                {
                                                                                                    cantonList.map((item,key) => (
                                                                                                        <option key={key} value={item.CantonSuisse}>{item.CantonSuisse}</option>
                                                                                                    ))
                                                                                                }

                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            ]
                                                                        }

                                                                        <h4 className="mb-3">
                                                                            {
                                                                                this.state.society.sAssociate[key].ej_name === "" ? "Adresse de l'associé" : "Adresse du siège social"
                                                                            }
                                                                        </h4>

                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label>Adresse</label>
                                                                                    <input type="text" className="form-control"
                                                                                           onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"adress")}
                                                                                             value={this.state.society.sAssociate[key].adress}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label>Ville</label>
                                                                                    <input type="text" className="form-control"
                                                                                           onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"ville")}
                                                                                             value={this.state.society.sAssociate[key].ville}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <div className="form-group mb-3">
                                                                                    <label >Code
                                                                                        postal</label>
                                                                                    <input type="number" className="form-control"
                                                                                           onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"postalCode")}
                                                                                             value={this.state.society.sAssociate[key].postalCode}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <div className="mb-3">
                                                                                    <label>Pays</label>
                                                                                    <select className="form-control"
                                                                                            onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"pays")}
                                                                                             value={this.state.society.sAssociate[key].pays}
                                                                                             required>
                                                                                        {
                                                                                            contreyList.map((item, key) => (
                                                                                                <option key={key}
                                                                                                    value={item.Name}>{item.Name}</option>
                                                                                            ))
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <h4 className="mb-3">
                                                                                    Actions détenues
                                                                                </h4>
                                                                                <div className="form-group mb-3">
                                                                                    <label>Nombre d'actions</label>
                                                                                    <input type="number" className="form-control"
                                                                                           onChange={ this.handleObjectObjectKeyChange("society","sAssociate",key,"nbActions")}
                                                                                             value={this.state.society.sAssociate[key].nbActions}
                                                                                             required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        {/*{
                                                                            item.typeTmp === "Un particulier" &&
                                                                            <div className="row"
                                                                                 style={{marginTop: 25}}>
                                                                                <div className="col-lg-12">
                                                                                    <h4 className="mb-3">
                                                                                        L’associé est-il également
                                                                                        gérant et Président de la
                                                                                        société ?
                                                                                    </h4>
                                                                                    <div
                                                                                        className="radio radio-pink mb-2">
                                                                                        <input type="radio"
                                                                                               name={"radioisPres" + key}
                                                                                               id={"radioisPres1" + key}
                                                                                               style={{marginLeft: 10}}
                                                                                               onClick={this.handleRadioChange("sActionnaireMoral", "isAdministrator", key, "true")}
                                                                                               checked={this.state.sActionnaireMoral[key].isAdministrator === "true"}
                                                                                               value={this.state.sActionnaireMoral[key].isAdministrator}/>
                                                                                        <label
                                                                                            htmlFor={"radioisPres1" + key}>
                                                                                            Oui
                                                                                        </label>
                                                                                    </div>
                                                                                    <div
                                                                                        className="radio radio-pink mb-2">
                                                                                        <input type="radio"
                                                                                               name={"radioisPres" + key}
                                                                                               id={"radioisPres2" + key}
                                                                                               style={{marginLeft: 10}}
                                                                                               onClick={this.handleRadioChange("sActionnaireMoral", "isAdministrator", key, "false")}
                                                                                               checked={this.state.sActionnaireMoral[key].isAdministrator === "false"}
                                                                                               value={this.state.sActionnaireMoral[key].isAdministrator}/>
                                                                                        <label
                                                                                            htmlFor={"radioisPres2" + key}>
                                                                                            Non
                                                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                                                                <Button color="primary"
                                                                                                        className="btn btn-xs btn-light waves-effect waves-light">
                                                                                                    je souhaite nommer
                                                                                                    un gérant domicilié
                                                                                                    en Suisse
                                                                                                </Button>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        }


                                                                        {
                                                                            item.typeTmp === "Un particulier" ?
                                                                                <div className="row" style={{marginTop: 15}}>
                                                                                    <div className="col-lg-12">
                                                                                        <label for="canton">L'associé
                                                                                            a-t-il une SuisseID
                                                                                            ?</label>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioiSuis" + key}
                                                                                                   id={"radioiSuis1" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isHaveSuisseId", key, "true")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isHaveSuisseId === "true"}
                                                                                                   value={this.state.sActionnaireMoral[key].isHaveSuisseId}/>
                                                                                            <label
                                                                                                htmlFor={"radioiSuis1" + key}>
                                                                                                Oui
                                                                                            </label>
                                                                                        </div>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioiSuis" + key}
                                                                                                   id={"radioiSuis2" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isHaveSuisseId", key, "false")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isHaveSuisseId === "false"}
                                                                                                   value={this.state.sActionnaireMoral[key].isHaveSuisseId}/>
                                                                                            <label
                                                                                                htmlFor={"radioiSuis2" + key}>
                                                                                                Non : Identification
                                                                                                par vidéo
                                                                                                au moyen de votre
                                                                                                passeport
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> :

                                                                                <div className="row"
                                                                                     style={{marginTop: 15}}>
                                                                                    <div className="col-lg-12">
                                                                                        <Label for="canton">Est-ce
                                                                                            que le(s)
                                                                                            représentant(s) a(ont)
                                                                                            une SuisseID ? </Label>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioiSuis" + key}
                                                                                                   id={"radioiSuis1" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isResresentantsHaveSuisseID", key, "true")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID === "true"}
                                                                                                   value={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID}/>
                                                                                            <label
                                                                                                htmlFor={"radioiSuis1" + key}>
                                                                                                Oui
                                                                                            </label>
                                                                                        </div>
                                                                                        <div
                                                                                            className="radio radio-pink mb-2">
                                                                                            <input type="radio"
                                                                                                   name={"radioiSuis" + key}
                                                                                                   id={"radioiSuis2" + key}
                                                                                                   style={{marginLeft: 10}}
                                                                                                   onClick={this.handleRadioChange("sActionnaireMoral", "isResresentantsHaveSuisseID", key, "false")}
                                                                                                   checked={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID === "false"}
                                                                                                   value={this.state.sActionnaireMoral[key].isResresentantsHaveSuisseID}/>
                                                                                            <label
                                                                                                htmlFor={"radioiSuis2" + key}>
                                                                                                Non : Identification
                                                                                                par vidéo
                                                                                                au moyen de votre
                                                                                                passeport
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-12">
                                                                                        <p style={{marginTop: 15}}>Si
                                                                                            l’actionnaire est une
                                                                                            société étrangère vous
                                                                                            devez télécharger
                                                                                            l’extrait du registre du
                                                                                            commerce démontrant que
                                                                                            1) la société existe et
                                                                                            2) qui sont les
                                                                                            représentants autorisés
                                                                                            de la société
                                                                                            dûment légalisé et
                                                                                            apostillé.</p>
                                                                                        <div className="float-left">
                                                                                            <Button color="primary"
                                                                                                    className="btn btn-light waves-effect waves-light">
                                                                                                Télécharger le
                                                                                                document
                                                                                            </Button>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                        }*/}
                                                                        <div style={{
                                                                            marginTop: 20,
                                                                            marginBottom: 20,
                                                                            height: 2,
                                                                            backgroundColor: "#C0C0C0",
                                                                            marginLeft: 40,
                                                                            marginRight: 40
                                                                        }}/>
                                                                    </Tab>
                                                                ))
                                                            }

                                                        </Tabs>

                                                    </Tab>
                                                    <Tab title="Responsable de Tokenization">

                                                        {
                                                            this.state.society.respTokenization &&

                                                            <Tabs orientation={ORIENTATION.horizontal}
                                                                  onChange={({activeKey}) => {
                                                                      this.setState({activerRespTokenKey: activeKey})
                                                                  }}
                                                                  activeKey={this.state.activerRespTokenKey}
                                                            >
                                                                <Tab title="Informations générales">
                                                                    {
                                                                        this.state.society.respTokenization &&
                                                                        <div>
                                                                            <div className="row mt-1">
                                                                                <div className="col-md-6">
                                                                                    <label>Nom</label>
                                                                                    <Input
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.firstname : ""}
                                                                                        onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "firstname")}
                                                                                        placeholder="Nom"
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <label>Prénom</label>
                                                                                    <Input
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.lastname : ""}
                                                                                        onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "lastname")}
                                                                                        placeholder="Prénom"
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                            <div className="row mt-1">
                                                                                <div className="col-md-6">
                                                                                    <label>Email</label>
                                                                                    <Input
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.email : ""}
                                                                                        onChange={this.handleObjectObjectChange("society", "respTokenization", "email")}
                                                                                        placeholder="Email"
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <label>Date de naissance</label>
                                                                                    <div style={{display: "flex"}}>
                                                                                        <PopupDate
                                                                                            showLabels={false}
                                                                                            value={this.state.society.respTokenization ? new Date(this.state.society.respTokenization.otherData.birthday) : new Date()}
                                                                                            onDateChange={date => {
                                                                                                let objCp = this.state.society;
                                                                                                objCp['respTokenization']['otherData'].birthday = date;
                                                                                                this.setState({society: objCp})
                                                                                            }}
                                                                                            format='day/month/year'
                                                                                            invalidMessage="Date invalide"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-1">
                                                                                <div className="col-md-6">
                                                                                    <label>Numéro de téléphone</label>
                                                                                    <PhoneInput
                                                                                        country={'fr'}
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.phone : ""}
                                                                                        onChange={(value) => {
                                                                                            let objCp = this.state.society;
                                                                                            objCp['respTokenization'].phone = value;
                                                                                            this.setState({society: objCp})
                                                                                        }}
                                                                                        inputStyle={{
                                                                                            width: "inherit",
                                                                                            height: 37
                                                                                        }}/>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <label>Activité</label>
                                                                                    <select className="custom-select"
                                                                                            onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "activity")}
                                                                                            value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.activity : "Directeur"}>
                                                                                        <option
                                                                                            value="Directeur">Directeur
                                                                                        </option>
                                                                                        <option
                                                                                            value="Développeur">Développeur
                                                                                        </option>
                                                                                        <option value="Docteur">Docteur
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-1">
                                                                                <div className="col-md-6">
                                                                                    <label>Username</label>
                                                                                    <Input
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.username : ""}
                                                                                        onChange={this.handleObjectObjectChange("society", "respTokenization", "username")}
                                                                                        placeholder="Email"
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <label>Mot de passe</label>
                                                                                    <Input
                                                                                        type="password"
                                                                                        value={this.state.society.respTokenization ? this.state.society.respTokenization.password : ""}
                                                                                        onChange={this.handleObjectObjectChange("society", "respTokenization", "password")}
                                                                                        placeholder="Mot de passe"
                                                                                    />
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    }

                                                                </Tab>
                                                                <Tab title="Adresse">
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-6">
                                                                            <label>Adresse</label>
                                                                            <Input
                                                                                value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.adress : ""}
                                                                                onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "adress")}
                                                                                placeholder="Adresse"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label>Ville</label>
                                                                            <Input
                                                                                value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.ville : ""}
                                                                                onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "ville")}
                                                                                placeholder="Ville"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-1">
                                                                        <div className="col-md-6">
                                                                            <label>Code postal</label>
                                                                            <Input
                                                                                value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.postalCode : ""}
                                                                                onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "postalCode")}
                                                                                placeholder="Code postal"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label>Nationnalité</label>
                                                                            <select className="custom-select"
                                                                                    onChange={this.handle3ObjectChange("society", "respTokenization", "otherData", "nationality")}
                                                                                    value={this.state.society.respTokenization ? this.state.society.respTokenization.otherData.nationality : "France"}>
                                                                                {
                                                                                    contreyList.map((item, key) => (
                                                                                        <option key={key}
                                                                                                value={item.Name}>{item.Name}</option>
                                                                                    ))
                                                                                }

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </Tab>
                                                                <Tab title="Documents">

                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <div className="card"
                                                                                 style={{backgroundColor: "#f0f0f0"}}>
                                                                                <div align="center"
                                                                                     className="card-body ">
                                                                                    <img
                                                                                        src={this.state.society.CIN1RespTokenFile.url}
                                                                                        alt="img" style={{
                                                                                        width: "100%",
                                                                                        height: 200,
                                                                                        objectFit: "contain"
                                                                                    }}/>
                                                                                    <h5>{this.state.society.CIN1RespTokenFile.name}</h5>
                                                                                    <label>Taille: {this.state.society.CIN1RespTokenFile.size + " Ko"}</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className="card"
                                                                                 style={{backgroundColor: "#f0f0f0"}}>
                                                                                <div align="center"
                                                                                     className="card-body ">
                                                                                    <img
                                                                                        src={this.state.society.CIN2RespTokenFile.url}
                                                                                        alt="img" style={{
                                                                                        width: "100%",
                                                                                        height: 200,
                                                                                        objectFit: "contain"
                                                                                    }}/>
                                                                                    <h5>{this.state.society.CIN2RespTokenFile.name}</h5>
                                                                                    <label>Taille: {this.state.society.CIN2RespTokenFile.size + " Ko"}</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </Tab>
                                                                <Tab title="Signature">
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <label>Signature:</label>
                                                                            <div className="card mt-1"
                                                                                 style={{backgroundColor: "#f0f0f0"}}>
                                                                                <div align="center"
                                                                                     className="card-body ">
                                                                                    <img
                                                                                        src={this.state.society.respTokenization.otherData.signature}
                                                                                        alt="img"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Tab>
                                                            </Tabs>

                                                        }




                                                    </Tab>
                                                </Tabs>
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openAlert}
                                autoHideDuration={3000}
                                onClose={this.closeSnackbar}
                            >
                                <MySnackbarContentWrapper
                                    onClose={this.closeSnackbar}
                                    variant={this.state.alertType}
                                    message={this.state.alertMessage}
                                />
                            </Snackbar>

                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default UpdateSo;
