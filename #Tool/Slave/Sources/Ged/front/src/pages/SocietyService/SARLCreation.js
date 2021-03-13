import React from "react";
import { Progress } from 'semantic-ui-react'
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import { Button as BtnU, KIND } from "baseui/button";
import {FormGroup,Label,Button} from "reactstrap";
import dom from "../../assets/images/domiciliation.PNG"
import Data from "../../data/Data";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from "@material-ui/core";
import { Dropdown, Input } from 'semantic-ui-react'
import utilFunctions from "../../tools/functions";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default class SARLCreation extends React.Component{

    componentDidMount() {
        console.log("SARLCreation")
    }

    state={
        openAlert:false,
        alertMessage:"",
        alertType:"",

        step_percent:10,
        activeStep:"sarl_name",
        sarl_name:"",
        sarl_but:"",
        sarl_mission:"",
        sarl_siege:{
            adress:"",
            codePostal:"",
            ville:"",
            pays:"Tunisia"
        },
        sarl_verif_name_existence:"true",
        sarl_domiciliation_smartco:"false",
        sarl_domiciliation_enfin:"",
        sarl_is_pLocaux:"true",
        sarl_capital: {
            totalCapital: '5000',
            valeurAction:'5'
        },
        sarl_get_iban:"false",
        sarl_apports_nature:"false",
        gerants: [{
            id: utilFunctions.getUID(),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            civility: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'Tunisia',
            ville: '',
            birthday: '',
            nationality: 'Tunisia',
            origine: "",
            identityCardNum:'',
            identityCardDate:'',
            passeportNum:'',
            passeportDate:'',
            is_assoc_tmp:''
        }],
        associes: [{
            id: utilFunctions.getUID(),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            type: 'Un particulier',
            civility: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'Tunisia',
            ville: '',
            birthday: '',
            nationality: 'Tunisia',
            origine: '',
            isAdministrator: 'false',
            nbActions: '',
            representant: {
                rep_firstname: '',
                rep_lastname: '',
            },
            ej_name: '',
            formeSocial: 'SARL',
            typeTmp: 'Un particulier',
            identityCardNum:'',
            identityCardDate:'',
            passeportNum:'',
            passeportDate:'',
            immatriculation:'',
            capitalSocial:'',
            capitalSocialCurrency:'TND'
        }],
        expertSmartCo: {
            etat: 'false',
            offreDeBase: 'false',
            abERP: 'false',
            configurationERP: 'false',
            formationERP: 'false',
            helpdesk: 'false',
            siteEcommerce: 'false',
            configSite: 'false',
            formationSite: 'false',
            helpdeskSite: 'false'

        },
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openAlert: false });
    };


    save_Step = (event, values) => {
        let step = this.state.step_percent;
        if(values.step === "sarl_assoc") window.scrollTo(0,0)
        this.setState({
            activeStep:values.step === "sarl_name" ? "sarl_but" :
                values.step === "sarl_but" ? "sarl_siege" :
                    values.step === "sarl_siege" ? "sarl_capital" :
                        values.step === "sarl_capital" ? "sarl_assoc" :
                            values.step === "sarl_assoc" ? "sarl_gerants" :
                        values.step === "sarl_gerants" ? "sarl_expert" :
                            values.step === "sarl_expert" ? "sarl_expert1/3" :
                                values.step === "sarl_expert1/3" ? "sarl_expert2/3" :
                                    values.step === "sarl_expert2/3" ? "sarl_expert3/3" : "",
            step_percent:step + 15
        })
    };

    handleObjectChange = (object, name) => event => {
        let objCopy = this.state[object];
        objCopy[name] = event.target.value;
        this.setState({
            [object]: objCopy
        });
    };

    handleTypeTmpChange = (key, value) => {
        let actiosCopy = this.state.associes;
        actiosCopy[key].typeTmp = value;
        this.setState({associes: actiosCopy})
    };

    handleRadioChange = (object, name, key, value) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = value;
        this.setState({
            [object]: objCopy
        })
    };

    handleRadioObjectChange = (object, name, value) => event => {
        let objCopy = this.state[object];
        objCopy[name] = value;
        this.setState({
            [object]: objCopy
        })
    };

    handleOnChangePhone = (value, key, type) => {
        if (type === "gerant") {
            let objCopy = this.state.gerants;
            objCopy[key].phone = value;
            this.setState({gerants: objCopy});
        } else {
            let objCopy = this.state.associes;
            objCopy[key].phone = value;
            this.setState({associes: objCopy});
        }
    };

    handleArrayObjectChange = (array,key,name) => event => {
        let objCopy = this.state[array];
        objCopy[key][name] = event.target.value;
        this.setState({[array]: objCopy})
    }

    addNewAssocie = () => {
        let objCopy = this.state.associes;
        objCopy.push(
            {
                id: utilFunctions.getUID(),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                type: 'Un particulier',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'Tunisia',
                ville: '',
                birthday: '',
                nationality: 'Tunisia',
                origine: "",
                isAdministrator: 'false',
                nbActions: '',
                representant: {
                    rep_firstname: '',
                    rep_lastname: '',
                },
                ej_name: '',
                formeSocial: 'SARL',
                typeTmp: 'Un particulier',
                walletAdr:"",
                identityCardNum:'',
                identityCardDate:'',
                passeportNum:'',
                passeportDate:'',
                immatriculation:'',
                capitalSocial:'',
                capitalSocialCurrency:'TND'
            }
        );
        this.setState({associes: objCopy})
    };

    addNewGerant = () => {
        let objCopy = this.state.gerants;
        objCopy.push(
            {
                id: utilFunctions.getUID(),
                email: '',
                pwd: Math.random().toString(36).substr(2, 5),
                phone: '',
                civility: 'M.',
                firstname: '',
                lastname: '',
                adress: '',
                postalCode: '',
                pays: 'Tunisia',
                ville: '',
                birthday: '',
                nationality: 'Tunisia',
                origine: "",
                identityCardNum:'',
                identityCardDate:'',
                passeportNum:'',
                passeportDate:'',
                is_assoc_tmp:''
            }
        );
        this.setState({gerants: objCopy})
    }

    render() {

        let totalActions = (parseInt(this.state.sarl_capital.totalCapital) / parseInt(this.state.sarl_capital.valeurAction));
        let nbActionsAccordees = 0;
        let actionnaires = this.state.associes || [];
        actionnaires.map( act => {
            if(typeof parseInt(act.nbActions) === "number" && parseInt(act.nbActions) > 0){
                let actio_actions = parseInt(act.nbActions) || 0
                nbActionsAccordees = nbActionsAccordees + actio_actions
            }
        })
        let nbActionsNonAccordees = totalActions - nbActionsAccordees;

        return(
            <div className="container container-lg" style={{marginTop:120}}>

                <div className="creation_form">
                    <Progress percent={this.state.step_percent} indicating size="medium" className="custom-progress-height" />
                    <div style={{padding:"40px 60px 90px 40px"}}>

                        {
                            this.state.activeStep === "sarl_name" &&
                            <AvForm onValidSubmit={this.save_Step}>
                                <AvInput type="text" name="step" id="step" value="sarl_name" style={{visibility:"hidden",display:"none"}}/>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <AvGroup className="mb-3">
                                            <h4 className="mb-3">Quel est le nom de votre Sàrl ?</h4>
                                            <AvInput type="text" name="sName" id="sName"
                                                     placeholder="Le nom de votre Sàrl"
                                                     onChange={(e) => {this.setState({sarl_name:e.target.value})}}
                                                     value={this.state.sarl_name} required/>
                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5>Avez vous au préalable vérifier l’existence du société au
                                            même nom dans le type d’activité que vous souhaitez cibler ?</h5>
                                        <div style={{marginLeft:10,marginBottom:20}}>
                                            <RadioGroup
                                                value={this.state.sarl_verif_name_existence}
                                                onChange={e => this.setState({sarl_verif_name_existence:e.target.value})}
                                                name="number"
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

                                <FormGroup style={{marginTop:20}}>
                                    <div className="float-right">
                                        <BtnU overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor: $theme.colors.negative,
                                                }),
                                            },
                                        }} >Continuer</BtnU>
                                    </div>
                                </FormGroup>

                            </AvForm>
                        }

                        {
                            this.state.activeStep === "sarl_but" &&
                            <AvForm onValidSubmit={this.save_Step}>
                                <AvInput type="text" name="step" id="step" value="sarl_but" style={{visibility:"hidden",display:"none"}}/>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <AvGroup className="mb-3">
                                            <h4 className="mb-3">Décrivez le but social de votre société :</h4>
                                            <AvInput type="textarea" name="sBut" id="sBut" style={{height:150}}
                                                     placeholder="Vous pouvez décrire votre activité principale. Il n’est pas forcément utile d’ajouter l’intégralité de vos activités.
                                                                        Vos statuts seront rédigés de sorte à vous permettre d’exercer des activités connexes.
                                                                        Vous pouvez faire appel à un avocat de SmartCo en cas de doute."
                                                     value={this.state.sarl_but}
                                                     onChange={(e) => {this.setState({sarl_but:e.target.value})}}
                                                     required/>
                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <AvGroup className="mb-3">
                                            <h4 className="mb-3">Mission de votre société( Maximum 6 mots )</h4>
                                            <AvInput type="text" name="sMission" id="sMission"
                                                     placeholder="( Maximum 6 mots )"
                                                     onChange={(e) => {this.setState({sarl_mission:e.target.value})}}
                                                     value={this.state.sarl_mission} required/>
                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>

                                <FormGroup style={{marginTop:20}}>
                                    <div className="float-left">
                                        <BtnU kind={KIND.secondary} onClick={() => this.setState({activeStep:"sarl_name"})}>Précédent</BtnU>
                                    </div>
                                    <div className="float-right">
                                        <BtnU overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor: $theme.colors.negative,
                                                }),
                                            },
                                        }} >Continuer</BtnU>
                                    </div>
                                </FormGroup>


                            </AvForm>
                        }

                        {
                            this.state.activeStep === "sarl_siege" &&
                            <AvForm onValidSubmit={this.save_Step}>
                                <AvInput type="text" name="step" id="step" value="sarl_siege" style={{visibility:"hidden",display:"none"}}/>
                                <div className="row" style={{marginTop: 25}}>
                                    <div className="col-lg-12">
                                        <h4 className="mb-3">Souhaitez-vous avoir une domiciliation via SmartCo ? </h4>
                                        <RadioGroup
                                            value={this.state.sarl_domiciliation_smartco}
                                            onChange={e => this.setState({sarl_domiciliation_smartco:e.target.value})}
                                            name="domsm"
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

                                {
                                    this.state.sarl_domiciliation_smartco === "true" &&
                                    <div>
                                        <div style={{marginTop:15}}>
                                            <text>
                                                La domiciliation est alors la solution idéale pour
                                                établir son siège social ou une ﬁliale en Suisse,
                                                face à un marché immobilier très restreint. Faire
                                                appel à une société de domiciliation d’entreprise en
                                                Suisse est aussi le meilleur moyen d’établir sa
                                                société dans une ville suisse ce qui contribuera à
                                                améliorer l’image de marque de son entreprise.
                                                Nous vous proposons une domiciliation soit dans le
                                                canton de Genève, soit dans le canton de Vaud.
                                            </text>
                                        </div>
                                        <div style={{marginTop:10}}>
                                            <text>
                                                En Suisse, il est courant de faire appel à une
                                                fiduciaire ( expert comptable ) pour constituer son
                                                siège social ou sa société de patrimoine. C’est ce
                                                que vous proposons via l’offre de notre partenaire
                                                fiduciaire qui si vous la choisissez pourra non
                                                seulement vous proposer une domiciliation à un tarif
                                                avantageux

                                            </text>
                                        </div>
                                        <div style={{marginTop: "3%"}}>
                                            <h4>Est ce que l’adresse de domiciliation ci-dessous peux vous convenir ? </h4>
                                        </div>

                                        <div className="row" style={{marginTop:10}}>
                                            <img alt="" src={dom} style={{width:400,height:100,objectFit:"contain"}} />
                                            <div className="col" style={{marginTop:20}}>
                                                <div>Ch. de Montéclard 2A</div>
                                                <div>1066 Epalinges</div>
                                                <div>+41 21 623 00 23</div>
                                                <div>+41 79 470 18 32</div>
                                            </div>
                                        </div>
                                        <RadioGroup
                                            value={this.state.sarl_domiciliation_enfin}
                                            onChange={e => this.setState({sarl_domiciliation_enfin:e.target.value})}
                                            name="domsm"
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
                                }

                                {
                                    this.state.sarl_domiciliation_smartco === "false" &&
                                    <div>
                                        <h4 className="mb-3">Où est le siège de votre société ?</h4>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="adress">Adresse</Label>
                                                    <AvInput type="text" name="sarl_adress" id="sarl_adress"
                                                             onChange={this.handleObjectChange('sarl_siege','adress')}
                                                             value={this.state.sarl_siege.adress} required/>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="postalcode">Code postal</Label>
                                                    <AvInput type="number" name="sarl_pcode"
                                                             id="sarl_pcode"
                                                             value={this.state.sarl_siege.codePostal}
                                                             onChange={this.handleObjectChange('sarl_siege','codePostal')}
                                                             required/>
                                                    <AvFeedback>Format invalide</AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="ville">Ville</Label>
                                                    <AvInput type="text" name="sarl_ville" id="sarl_ville"
                                                             value={this.state.sarl_siege.ville}
                                                             onChange={this.handleObjectChange('sarl_siege','ville')}
                                                             required/>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="pays">Pays</Label>
                                                    <AvInput type="select" name="sarl_pays" id="sarl_pays"
                                                             className="custom-select"
                                                             value={this.state.sarl_siege.pays}
                                                             disabled={true}
                                                    >
                                                        {
                                                            Data.contreyList.map((item, key) => (
                                                                <option
                                                                    value={item.Name}>{item.Name}</option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>
                                        <div className="row" style={{marginTop: 15}}>
                                            <div className="col-lg-12">
                                                <h4 className="mb-3">Est-ce que ce sont vos propres locaux ? </h4>
                                                <RadioGroup
                                                    value={this.state.sarl_is_pLocaux}
                                                    onChange={e => this.setState({sarl_is_pLocaux:e.target.value})}
                                                    name="domsm"
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
                                                    }}  value="false">Non : Télécharger l’attestation de domiciliation</Radio>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <FormGroup style={{marginTop:20}}>
                                    <div className="float-left">
                                        <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                            activeStep: "sarl_but"
                                        })}
                                        >Précédent</BtnU>
                                    </div>
                                    <div className="float-right">
                                        <BtnU overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor: $theme.colors.negative,
                                                }),
                                            },
                                        }} >Continuer</BtnU>
                                    </div>
                                </FormGroup>
                            </AvForm>
                        }

                        {
                            this.state.activeStep === "sarl_capital" &&
                            <AvForm onValidSubmit={this.save_Step}>
                                <AvInput type="text" name="step" id="step" value="sarl_capital" style={{visibility:"hidden",display:"none"}}/>
                                <h4 className="mb-3">Quel est le capital social de votre société ?</h4>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Label for="canton">Montant du capital libéré (CHF)</Label>
                                        <div className="radio radio-pink mb-2">
                                            <input type="radio" name="radiocapital"
                                                   id="radiocapital1"
                                                   checked={this.state.sarl_capital.totalCapital === '5000'}
                                                   style={{marginLeft: 10}} value={'5000'}
                                                   onClick={() => {
                                                       let capital = this.state.sarl_capital;
                                                       capital.totalCapital = "5000"
                                                       this.setState({sarl_capital:capital})
                                                   }}
                                            />
                                            <label htmlFor="radiocapital1">
                                                TND 5'000.-
                                            </label>
                                        </div>

                                        <div className="radio radio-pink mb-2">
                                            <input type="radio" name="radiocapital"
                                                   id="radiocapita3"
                                                   checked={this.state.sarl_capital.totalCapital !== "5000"}
                                                   style={{marginLeft: 10}}
                                                   onClick={() => {
                                                       let capital = this.state.sarl_capital;
                                                       capital.totalCapital = "0"
                                                       this.setState({sarl_capital:capital})
                                                   }}
                                            />
                                            <label htmlFor="radiocapita3">
                                                Plus (au choix, maximum 400'000.-)
                                            </label>
                                        </div>
                                        {
                                            this.state.sarl_capital.totalCapital !== "5000" &&
                                            <div className="form-group mb-2">
                                                <input type="number" className="form-control"
                                                       id="nb"
                                                       style={{width: '60%', marginLeft: 30}}
                                                       value={this.state.sarl_capital.totalCapital}
                                                       onChange={this.handleObjectChange('sarl_capital','totalCapital')}
                                                />
                                                <h5 style={{color: "red", marginLeft: 35}}>
                                                    {
                                                        parseInt(this.state.sarl_capital.totalCapital) < 5000 ? "Le capital doit etre supérieur ou égal à 5000 TND" :
                                                            parseInt(this.state.sarl_capital.totalCapital) > 400000 ? "Le capital doit etre inférieur à 400 000 TND" :
                                                                parseInt(this.state.sarl_capital.totalCapital) % 10 !== 0 ? "Le capital doit etre un multiple de 10" : ""
                                                    }
                                                </h5>
                                            </div>
                                        }
                                    </div>

                                    <div className="col-lg-6">
                                        <Label for="canton">Valeur nominale des actions ?</Label>
                                        <input type="number" className="form-control"
                                               id="valeurAction"
                                               value={this.state.sarl_capital.valeurAction}
                                               onChange={this.handleObjectChange('sarl_capital','valeurAction')}
                                        />
                                        {
                                            (parseInt(this.state.sarl_capital.totalCapital) >= 5000 && parseInt(this.state.sarl_capital.totalCapital) < 400000 &&
                                                parseInt(this.state.sarl_capital.totalCapital) % 10 === 0) && parseInt(this.state.sarl_capital.valeurAction) > 1 ?
                                            <label htmlFor="valeurAction" style={{fontWeight:"normal",color:"#000",marginTop:10}}>
                                                {parseInt(this.state.sarl_capital.totalCapital) / parseInt(this.state.sarl_capital.valeurAction)}&nbsp;
                                                parts sociales d'une valeur nominale de {this.state.sarl_capital.valeurAction} TND.-
                                            </label> : null
                                        }

                                    </div>
                                </div>

                                <div className="row" style={{marginTop: 25}}>
                                    <div className="col-lg-12">
                                        <Label for="canton">Souhaitez-vous obtenir un numéro IBAN pour le compte de consignation via Smartco ?</Label>
                                        <RadioGroup
                                            value={this.state.sarl_get_iban}
                                            onChange={e => this.setState({sarl_get_iban:e.target.value})}
                                            name="number"
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
                                            }}  value="false">Non (Téléchargez l’attestation de consignation de votre banque avec signature électronique qualifiée)</Radio>
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className="row" style={{marginTop: 25}}>
                                    <div className="col-lg-12">
                                        <Label for="canton">Souhaitez-vous faire des apports en nature ?</Label>
                                        <RadioGroup
                                            value={this.state.sarl_apports_nature}
                                            onChange={e => this.setState({sarl_apports_nature:e.target.value})}
                                            name="number"
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

                                <FormGroup style={{marginTop:20}}>
                                    <div className="float-left">
                                        <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                            activeStep: "sarl_siege",
                                        })}
                                        >Précédent</BtnU>
                                    </div>
                                    <div className="float-right">
                                        <BtnU overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor: $theme.colors.negative,
                                                }),
                                            },
                                        }} >Continuer</BtnU>
                                    </div>
                                </FormGroup>
                            </AvForm>
                        }

                        {
                            this.state.activeStep === "sarl_assoc" &&
                            <div className="col-sm-12">

                                <h4 className="mb-3">Quel est (sont) l(les) associès de votre société ?</h4>
                                <p>S’il y a plusieurs associès vous pouvez cliquer sur "Ajouter un autre associé" en bas de page. </p>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <AvForm onValidSubmit={(event, values) => {
                                            if(nbActionsAccordees > totalActions){
                                                this.openSnackbar("error","Le nombre d'actions accordées est supérieur au nombre total d'actions !")
                                            }else if(nbActionsNonAccordees > 0){
                                                this.openSnackbar("warning","Il reste " + nbActionsNonAccordees + " actions non encore accordées !")
                                                this.save_Step(event, values)
                                            }else{
                                                this.save_Step(event, values)
                                            }
                                        }}
                                        >
                                            <AvInput type="text" name="step" id="step" value="sarl_assoc" style={{visibility:"hidden",display:"none"}}/>
                                            {
                                                this.state.associes.map((item, key) => (
                                                    <div key={key} style={{padding:25,backgroundColor:"#f0f0f0",borderRadius:7.5,marginBottom:20}}>
                                                        {
                                                            key > 0 &&
                                                            <div align="right" style={{marginTop:-20,marginRight:-15}}>
                                                                <IconButton onClick={() => {
                                                                    let associes = this.state.associes || [];
                                                                    associes.splice(key,1)
                                                                    this.setState({associes:associes})
                                                                }}>
                                                                    <DeleteIcon color="error"/>
                                                                </IconButton>
                                                            </div>
                                                        }

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="forme">L'associé est</Label>
                                                                    <AvInput type="select"
                                                                             className="custom-select"
                                                                             name={"formeMo" + key}
                                                                             id={"formeMo" + key}
                                                                             onChange={(event) => this.handleTypeTmpChange(key, event.target.value)}
                                                                             value={this.state.associes[key].type}
                                                                    >
                                                                        <option
                                                                            value="Un particulier">Un
                                                                            particulier
                                                                        </option>
                                                                        <option
                                                                            value="Une entité juridique">Une
                                                                            entité juridique
                                                                        </option>
                                                                    </AvInput>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                {
                                                                    item.typeTmp === "Un particulier" ?
                                                                        <AvGroup className="mb-3">
                                                                            <Label
                                                                                for="role">Civilité</Label>
                                                                            <AvInput type="select"
                                                                                     className="custom-select"
                                                                                     name={"civiliteMo" + key}
                                                                                     id={"civiliteMo" + key}
                                                                                     value={this.state.associes[key].gender}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"gender")}
                                                                            >
                                                                                <option
                                                                                    value="M.">M.
                                                                                </option>
                                                                                <option
                                                                                    value="Mme">Mme
                                                                                </option>
                                                                            </AvInput>
                                                                        </AvGroup> :
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="role">Forme social</Label>
                                                                            <AvInput type="select"
                                                                                     className="custom-select"
                                                                                     name={"formeSo" + key}
                                                                                     id={"formeSo" + key}
                                                                                     value={this.state.associes[key].formeSocial}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"formeSocial")}
                                                                            >
                                                                                <option
                                                                                    value="SARL">SARL
                                                                                </option>
                                                                                <option
                                                                                    value="SA">SA
                                                                                </option>
                                                                            </AvInput>
                                                                        </AvGroup>
                                                                }

                                                            </div>
                                                        </div>
                                                        {
                                                            item.typeTmp !== "Un particulier" &&
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="prenom">Immatriculation</Label>
                                                                        <AvInput type="text"
                                                                                 name={"immatriculation" + key}
                                                                                 id={"immatriculation" + key}
                                                                                 value={this.state.associes[key].immatriculation}
                                                                                 onChange={this.handleArrayObjectChange("associes",key,"immatriculation")}
                                                                                 required/>
                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="prenom">Numéro Siret(France)</Label>
                                                                        <AvInput type="text"
                                                                                 name={"numSiret" + key}
                                                                                 id={"numSiret" + key}
                                                                                 value={this.state.associes[key].numSiret}
                                                                                 onChange={this.handleArrayObjectChange("associes",key,"numSiret")}
                                                                        />
                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6 mb-3">
                                                                    <Label for="prenom">Capital social</Label>
                                                                    <Input
                                                                        className="custom-sui-input-size"
                                                                        size="small"
                                                                        label={
                                                                            <Dropdown defaultValue='TND' options={[
                                                                                { key: 'TND', text: 'TND', value: 'TND' },
                                                                                { key: 'EURO', text: 'EURO', value: 'EURO' },
                                                                                { key: 'CHF', text: 'CHF', value: 'CHF' },
                                                                            ]}
                                                                                      value={this.state.associes[key].capitalSocialCurrency}
                                                                                      onChange={(event, data) => {
                                                                                          console.log(data.value)
                                                                                          let objCp = this.state.associes;
                                                                                          objCp[key].capitalSocialCurrency = data.value;
                                                                                          this.setState({associes:objCp})
                                                                                      }}
                                                                        />}
                                                                        labelPosition='right'
                                                                        value={this.state.associes[key].capitalSocial}
                                                                        onChange={(event, data) => {
                                                                            console.log(event.target.value)
                                                                            let objCp = this.state.associes;
                                                                            objCp[key].capitalSocial = event.target.value;
                                                                            this.setState({associes:objCp})
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {
                                                            item.typeTmp !== "Un particulier" &&
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="email">Nom du représentant</Label>
                                                                        <AvInput type="text"
                                                                                 name={"repnom" + key}
                                                                                 id={"repnom" + key}
                                                                                 value={this.state.associes[key].representant.rep_firstname}
                                                                                 onChange={ event => {
                                                                                     let objCp = this.state.associes;
                                                                                     objCp[key].representant.rep_firstname = event.target.value;
                                                                                     this.setState({associes:objCp})
                                                                                 }}
                                                                                 required/>
                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <AvGroup className="mb-3">
                                                                        <Label for="email">Prénom du représentant</Label>
                                                                        <AvInput type="text"
                                                                                 name={"repprenom" + key}
                                                                                 id={"repprenom" + key}
                                                                                 value={this.state.associes[key].representant.rep_lastname}
                                                                                 onChange={ event => {
                                                                                     let objCp = this.state.associes;
                                                                                     objCp[key].representant.rep_lastname = event.target.value;
                                                                                     this.setState({associes:objCp})
                                                                                 }}
                                                                                 required/>
                                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                    </AvGroup>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="row">
                                                            {
                                                                item.typeTmp === "Un particulier" ?
                                                                    [
                                                                        <div className="col-lg-6">
                                                                            <AvGroup
                                                                                className="mb-3">
                                                                                <Label for="nom">Nom</Label>
                                                                                <AvInput type="text"
                                                                                         name={"firstnameMo" + key}
                                                                                         id={"firstnameMo" + key}
                                                                                         value={this.state.associes[key].firstname}
                                                                                         onChange={this.handleArrayObjectChange("associes",key,"firstname")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>,
                                                                        <div className="col-lg-6">
                                                                            <AvGroup
                                                                                className="mb-3">
                                                                                <Label
                                                                                    for="prenom">Prénom</Label>
                                                                                <AvInput type="text"
                                                                                         name={"lastnameMo" + key}
                                                                                         id={"lastnameMo" + key}
                                                                                         value={this.state.associes[key].lastname}
                                                                                         onChange={this.handleArrayObjectChange("associes",key,"lastname")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>

                                                                    ] :

                                                                    <div className="col-lg-12">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="prenom">Nom de l'entité juridique</Label>
                                                                            <AvInput type="text"
                                                                                     name={"ejname" + key}
                                                                                     id={"ejname" + key}
                                                                                     value={this.state.associes[key].ej_name}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"ej_name")}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>

                                                            }


                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="email">Email</Label>
                                                                    <AvInput type="email"
                                                                             name={"emailMo" + key}
                                                                             id={"emailMo" + key}
                                                                             value={this.state.associes[key].email}
                                                                             onChange={this.handleArrayObjectChange("associes",key,"email")}
                                                                             required/>
                                                                    <AvFeedback>Email invalide</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="password">Numéro de téléphone</Label>
                                                                    <PhoneInput
                                                                        country={'tn'}
                                                                        value={this.state.associes[key].phone}
                                                                        onChange={(value) => this.handleOnChangePhone(value, key, "associe")}
                                                                        inputStyle={{
                                                                            width: "inherit",
                                                                            height: 37
                                                                        }}/>
                                                                </AvGroup>
                                                            </div>
                                                        </div>

                                                        {
                                                            item.typeTmp === "Un particulier" &&
                                                            [
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="datnaiss">Date de naissance</Label>
                                                                            <AvInput type="date"
                                                                                     name={"birthdayMo" + key}
                                                                                     id={"birthdayMo" + key}
                                                                                     value={this.state.associes[key].birthday}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"birthday")}
                                                                                     required/>
                                                                            <AvFeedback>Date invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="nationality">Nationnalité</Label>
                                                                            <AvInput type="select"
                                                                                     className="custom-select"
                                                                                     name={"nationalityMo" + key}
                                                                                     id={"nationalityMo" + key}
                                                                                     value={this.state.associes[key].nationality}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"nationality")}
                                                                                     >
                                                                                {
                                                                                    Data.contreyList.map((item, key) => (
                                                                                        <option
                                                                                            value={item.Name}>{item.Name}</option>
                                                                                    ))
                                                                                }
                                                                            </AvInput>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>,
                                                                this.state.associes[key].nationality === "Tunisia" ?
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Titulaire de la carte d'identité numéro:</Label>
                                                                            <AvInput type="text"
                                                                                     name={"numCarteIdentiteMo" + key}
                                                                                     id={"numCarteIdentiteMo" + key}
                                                                                     value={this.state.associes[key].identityCardNum}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"identityCardNum")}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>

                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup>
                                                                            <Label for="datnaiss">Délivé le </Label>
                                                                            <AvInput type="date"
                                                                                     name={"dateCarteIdentiteMo" + key}
                                                                                     id={"dateCarteIdentiteMo" + key}
                                                                                     value={this.state.associes[key].identityCardDate}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"identityCardDate")}
                                                                                     required/>
                                                                            <AvFeedback>Date invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div> :
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            <AvGroup className="mb-3">
                                                                                <Label for="email">Titulaire du passeport numéro:</Label>
                                                                                <AvInput type="text"
                                                                                         name={"numPasseportMo" + key}
                                                                                         id={"numPasseportMo" + key}
                                                                                         value={this.state.associes[key].passeportNum}
                                                                                         onChange={this.handleArrayObjectChange("associes",key,"passeportNum")}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>

                                                                            </AvGroup>
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            <AvGroup>
                                                                                <Label for="datnaiss">Délivé le </Label>
                                                                                <AvInput type="date"
                                                                                         name={"datePasseportMo" + key}
                                                                                         id={"datePasseportMo" + key}
                                                                                         value={this.state.associes[key].passeportDate}
                                                                                         onChange={this.handleArrayObjectChange("associes",key,"passeportDate")}
                                                                                         required/>
                                                                                <AvFeedback>Date invalide</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                                    </div>

                                                            ]
                                                        }

                                                        <h4 className="mb-3">
                                                            {
                                                                item.typeTmp === "Un particulier" ? "Adresse de l'associé" : "Adresse du siège social"
                                                            }
                                                        </h4>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label
                                                                        for="adress">Adresse</Label>
                                                                    <AvInput type="text"
                                                                             name={"adressMo" + key}
                                                                             id={"adressMo" + key}
                                                                             value={this.state.associes[key].adress}
                                                                             onChange={this.handleArrayObjectChange("associes",key,"adress")}
                                                                             required/>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label
                                                                        for="adress">Ville</Label>
                                                                    <AvInput type="text"
                                                                             name={"villeMo" + key}
                                                                             id={"villeMo" + key}
                                                                             value={this.state.associes[key].ville}
                                                                             onChange={this.handleArrayObjectChange("associes",key,"ville")}
                                                                             required/>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="postalcode">Code postal</Label>
                                                                    <AvInput type="number"
                                                                             name={"postalCodeMo" + key}
                                                                             id={"postalCodeMo" + key}
                                                                             value={this.state.associes[key].postalCode}
                                                                             onChange={this.handleArrayObjectChange("associes",key,"postalCode")}
                                                                             required/>
                                                                    <AvFeedback>Code postal
                                                                        invalide</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="pays">Pays</Label>
                                                                    <AvInput type="select"
                                                                             className="custom-select"
                                                                             name={"paysMo" + key}
                                                                             id={"paysMo" + key}
                                                                             value={this.state.associes[key].pays}
                                                                             onChange={this.handleArrayObjectChange("associes",key,"pays")}
                                                                             required>
                                                                        {
                                                                            Data.contreyList.map((item, key) => (
                                                                                <option
                                                                                    value={item.Name}>{item.Name}</option>
                                                                            ))
                                                                        }
                                                                    </AvInput>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <h4 className="mb-1">
                                                                    Actions détenues
                                                                </h4>
                                                                <div style={{marginLeft:15}}>
                                                                    <span style={{color:"#000",fontWeight:"bold",fontSize:12}}>
                                                                        Nombre total d'actions:&nbsp;
                                                                        <span style={{fontWeight:"normal"}}>
                                                                            {totalActions +" actions"}
                                                                        </span>
                                                                    </span><br/>
                                                                    <span style={{color:"#000",fontWeight:"bold",fontSize:12}}>
                                                                        Actions non encore accordées:&nbsp;
                                                                        <span style={{fontWeight:"normal"}}>
                                                                            {
                                                                                nbActionsNonAccordees +" actions"}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <AvGroup className="mb-3 mt-1">
                                                                    <div style={{display:"flex"}}>
                                                                        <div>
                                                                            <Label for="adress">Nombre d'actions</Label>
                                                                            <AvInput type="number"
                                                                                     name={"nbactionsEj" + key}
                                                                                     id={"nbactionsEj" + key}
                                                                                     value={this.state.associes[key].nbActions}
                                                                                     onChange={this.handleArrayObjectChange("associes",key,"nbActions")}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </div>
                                                                        {
                                                                            typeof parseInt(this.state.associes[key].nbActions) === "number" && parseInt(this.state.associes[key].nbActions) > 0 &&
                                                                            <div style={{marginTop:33,marginLeft:30}}>
                                                                                <h6 style={{color:"red"}}>
                                                                                    { ((parseInt(this.state.associes[key].nbActions) / totalActions) * 100 ) + " % du capital"}
                                                                                </h6>
                                                                            </div>
                                                                        }

                                                                    </div>
                                                                </AvGroup>
                                                            </div>
                                                        </div>


                                                        {
                                                            item.typeTmp === "Un particulier" &&
                                                            <div className="row"
                                                                 style={{marginTop: 5}}>
                                                                <div className="col-lg-12">
                                                                    <h4 className="mb-3">
                                                                        L’associé est-il également gérant et Président de la société ?
                                                                    </h4>
                                                                    <div
                                                                        className="radio radio-pink mb-2">
                                                                        <input type="radio"
                                                                               name={"radioisPres" + key}
                                                                               id={"radioisPres1" + key}
                                                                               style={{marginLeft: 10}}
                                                                               onClick={this.handleRadioChange("associes", "isAdministrator", key, "true")}
                                                                               checked={this.state.associes[key].isAdministrator === "true"}
                                                                               value={this.state.associes[key].isAdministrator}/>
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
                                                                               onClick={this.handleRadioChange("associes", "isAdministrator", key, "false")}
                                                                               checked={this.state.associes[key].isAdministrator === "false"}
                                                                               value={this.state.associes[key].isAdministrator}/>
                                                                        <label htmlFor={"radioisPres2" + key}>
                                                                            Non
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div style={{
                                                            marginTop: 20,
                                                            marginBottom: 20,
                                                            height: 2,
                                                            backgroundColor: "#C0C0C0",
                                                            marginLeft: 40,
                                                            marginRight: 40
                                                        }}/>
                                                    </div>
                                                ))
                                            }

                                            <div className="row" style={{marginTop: 15}}>
                                                    <div className="col-lg-12">
                                                        <div className="float-right">
                                                            <Button color="primary"
                                                                    onClick={this.addNewAssocie}
                                                                    className="btn btn-success waves-effect waves-light font-weight-bold">
                                                                <i className="fa fa-plus"/>&nbsp;&nbsp;
                                                                Ajouter un autre associé
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            <FormGroup style={{marginTop:20}}>
                                                <div className="float-left">
                                                    <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                        activeStep: "sarl_capital",
                                                    })}
                                                    >Précédent</BtnU>
                                                </div>
                                                <div className="float-right">
                                                    <BtnU overrides={{
                                                        BaseButton: {
                                                            style: ({$theme}) => ({
                                                                backgroundColor: $theme.colors.negative,
                                                            }),
                                                        },
                                                    }} >Continuer</BtnU>
                                                </div>

                                            </FormGroup>

                                        </AvForm>


                                    </div>
                                </div>
                            </div>
                        }

                        {
                            this.state.activeStep === "sarl_gerants" &&
                            <div className="col-sm-12">

                                <h4 className="mb-3">Qui est(sont) le(les) gérant(s) de votre société ?</h4>
                                <p>Merci d'indiquer à nouveau les coordonnées du Gérant de la SARL.</p>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <AvForm onValidSubmit={(event, values) => this.save_Step(event, values)}>
                                            <AvInput type="text" name="step" id="step" value="sarl_gerants" style={{visibility:"hidden",display:"none"}}/>
                                            {
                                                this.state.gerants.map((item, key) => (
                                                    <div key={key} style={{padding:25,backgroundColor:"#f0f0f0",borderRadius:7.5,marginBottom:20}}>
                                                        {
                                                            key > 0 &&
                                                            <div align="right" style={{marginTop:-20,marginRight:-15}}>
                                                                <IconButton onClick={() => {
                                                                    let gerants = this.state.gerants || [];
                                                                    gerants.splice(key,1)
                                                                    this.setState({gerants:gerants})
                                                                }}>
                                                                    <DeleteIcon color="error"/>
                                                                </IconButton>
                                                            </div>
                                                        }

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label
                                                                        for="role">Le gérant est l'un des asscoiés physiques ? </Label>
                                                                    <AvInput type="select"
                                                                             className="custom-select"
                                                                             name={"civiliteMo" + key}
                                                                             id={"civiliteMo" + key}
                                                                             value={this.state.gerants[key].is_assoc_tmp}
                                                                             onChange={(e) => {
                                                                                 let objCp = this.state.gerants;
                                                                                 let find = this.state.associes.find(x => x.id === e.target.value)
                                                                                 if(find){
                                                                                     objCp[key].firstname = find.firstname
                                                                                     objCp[key].lastname = find.lastname
                                                                                     objCp[key].civility = find.civility
                                                                                     objCp[key].email = find.email
                                                                                     objCp[key].phone = find.phone
                                                                                     objCp[key].birthday = find.birthday
                                                                                     objCp[key].nationality = find.nationality
                                                                                     objCp[key].passeportNum = find.passeportNum
                                                                                     objCp[key].passeportDate = find.passeportDate
                                                                                     objCp[key].identityCardNum = find.identityCardNum
                                                                                     objCp[key].identityCardDate = find.identityCardDate
                                                                                     objCp[key].adress = find.adress
                                                                                     objCp[key].ville = find.ville
                                                                                     objCp[key].postalCode = find.postalCode
                                                                                     objCp[key].pays = find.pays
                                                                                     this.setState({gerants:objCp})
                                                                                 }
                                                                             }}
                                                                    >
                                                                        <option value=""/>
                                                                        {
                                                                            this.state.associes.filter(x => x.typeTmp === "Un particulier").map(assoc => (
                                                                                <option value={assoc.id}>{assoc.firstname + " " + assoc.lastname}</option>
                                                                            ))
                                                                        }
                                                                    </AvInput>
                                                                </AvGroup>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                            <Label
                                                                                for="role">Civilité</Label>
                                                                            <AvInput type="select"
                                                                                     className="custom-select"
                                                                                     name={"civiliteMo" + key}
                                                                                     id={"civiliteMo" + key}
                                                                                     value={this.state.gerants[key].gender}>
                                                                                <option
                                                                                    value="M.">M.
                                                                                </option>
                                                                                <option
                                                                                    value="Mme">Mme
                                                                                </option>
                                                                            </AvInput>
                                                                        </AvGroup>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                            <AvGroup
                                                                                className="mb-3">
                                                                                <Label
                                                                                    for="nom">Nom</Label>
                                                                                <AvInput type="text"
                                                                                         name={"firstnameMo" + key}
                                                                                         id={"firstnameMo" + key}
                                                                                         value={this.state.gerants[key].firstname}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                            <div className="col-lg-6">
                                                                            <AvGroup
                                                                                className="mb-3">
                                                                                <Label
                                                                                    for="prenom">Prénom</Label>
                                                                                <AvInput type="text"
                                                                                         name={"lastnameMo" + key}
                                                                                         id={"lastnameMo" + key}
                                                                                         value={this.state.gerants[key].lastname}
                                                                                         required/>
                                                                                <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                            </AvGroup>
                                                                        </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="email">Email</Label>
                                                                    <AvInput type="email"
                                                                             name={"emailMo" + key}
                                                                             id={"emailMo" + key}
                                                                             value={this.state.gerants[key].email}
                                                                             required/>
                                                                    <AvFeedback>Email invalide</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="password">Numéro de téléphone</Label>
                                                                    <PhoneInput
                                                                        country={'tn'}
                                                                        value={this.state.gerants[key].phone}
                                                                        onChange={(value) => this.handleOnChangePhone(value, key, "gerant")}
                                                                        inputStyle={{
                                                                            width: "inherit",
                                                                            height: 37
                                                                        }}/>
                                                                </AvGroup>
                                                            </div>
                                                        </div>


                                                        <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="datnaiss">Date de naissance</Label>
                                                                            <AvInput type="date"
                                                                                     name={"birthdayMo" + key}
                                                                                     id={"birthdayMo" + key}
                                                                                     value={this.state.gerants[key].birthday}
                                                                                     required/>
                                                                            <AvFeedback>Date invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="nationality">Nationnalité</Label>
                                                                            <AvInput type="select"
                                                                                     className="custom-select"
                                                                                     name={"nationalityMo" + key}
                                                                                     id={"nationalityMo" + key}
                                                                                     value={this.state.gerants[key].nationality}
                                                                                     onChange={(e) => {
                                                                                         let objCp = this.state.gerants;
                                                                                         objCp[key].nationality = e.target.value;
                                                                                         this.setState({gerants:objCp})
                                                                                     }}>
                                                                                {
                                                                                    Data.contreyList.map((item, key) => (
                                                                                        <option
                                                                                            value={item.Name}>{item.Name}</option>
                                                                                    ))
                                                                                }
                                                                            </AvInput>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>

                                                        {
                                                            this.state.gerants[key].nationality === "Tunisia" ?
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Titulaire de la carte d'identité numéro:</Label>
                                                                            <AvInput type="text"
                                                                                     name={"numCarteIdentiteMo" + key}
                                                                                     id={"numCarteIdentiteMo" + key}
                                                                                     value={this.state.gerants[key].identityCardNum}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>

                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup>
                                                                            <Label for="datnaiss">Délivé le </Label>
                                                                            <AvInput type="date"
                                                                                     name={"dateCarteIdentiteMo" + key}
                                                                                     id={"dateCarteIdentiteMo" + key}
                                                                                     value={this.state.gerants[key].identityCardDate}
                                                                                     required/>
                                                                            <AvFeedback>Date invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div> :
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <AvGroup className="mb-3">
                                                                            <Label for="email">Titulaire du passeport numéro:</Label>
                                                                            <AvInput type="text"
                                                                                     name={"numPasseportMo" + key}
                                                                                     id={"numPasseportMo" + key}
                                                                                     value={this.state.gerants[key].passeportNum}
                                                                                     required/>
                                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>

                                                                        </AvGroup>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <AvGroup>
                                                                            <Label for="datnaiss">Délivé le </Label>
                                                                            <AvInput type="date"
                                                                                     name={"datePasseportMo" + key}
                                                                                     id={"datePasseportMo" + key}
                                                                                     value={this.state.gerants[key].passeportDate}
                                                                                     required/>
                                                                            <AvFeedback>Date invalide</AvFeedback>
                                                                        </AvGroup>
                                                                    </div>
                                                                </div>
                                                        }

                                                        <h4 className="mb-3">Adresse du gérant</h4>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label
                                                                        for="adress">Adresse</Label>
                                                                    <AvInput type="text"
                                                                             name={"adressMo" + key}
                                                                             id={"adressMo" + key}
                                                                             value={this.state.gerants[key].adress}
                                                                             required/>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label
                                                                        for="adress">Ville</Label>
                                                                    <AvInput type="text"
                                                                             name={"villeMo" + key}
                                                                             id={"villeMo" + key}
                                                                             value={this.state.gerants[key].ville}
                                                                             required/>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="postalcode">Code
                                                                        postal</Label>
                                                                    <AvInput type="number"
                                                                             name={"postalCodeMo" + key}
                                                                             id={"postalCodeMo" + key}
                                                                             value={this.state.gerants[key].postalCode}
                                                                             required/>
                                                                    <AvFeedback>Code postal invalide</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <AvGroup className="mb-3">
                                                                    <Label for="pays">Pays</Label>
                                                                    <AvInput type="select"
                                                                             className="custom-select"
                                                                             name={"paysMo" + key}
                                                                             id={"paysMo" + key}
                                                                             value={this.state.gerants[key].pays}
                                                                             required>
                                                                        {
                                                                            Data.contreyList.map((item, key) => (
                                                                                <option
                                                                                    value={item.Name}>{item.Name}</option>
                                                                            ))
                                                                        }
                                                                    </AvInput>
                                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                                </AvGroup>
                                                            </div>
                                                        </div>

                                                        <div style={{
                                                            marginTop: 20,
                                                            marginBottom: 20,
                                                            height: 2,
                                                            backgroundColor: "#C0C0C0",
                                                            marginLeft: 40,
                                                            marginRight: 40
                                                        }}/>
                                                    </div>
                                                ))
                                            }

                                            <div className="row" style={{marginTop: 15}}>
                                                <div className="col-lg-12">
                                                    <div className="float-right">
                                                        <Button color="primary"
                                                                onClick={this.addNewGerant}
                                                                className="btn btn-success waves-effect waves-light font-weight-bold">
                                                            <i className="fa fa-plus"/>&nbsp;&nbsp;
                                                            Ajouter un autre gérant
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <FormGroup style={{marginTop:20}}>
                                                <div className="float-left">
                                                    <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                        activeStep: "sarl_assoc",
                                                    })}
                                                    >Précédent</BtnU>
                                                </div>
                                                <div className="float-right">
                                                    <BtnU overrides={{
                                                        BaseButton: {
                                                            style: ({$theme}) => ({
                                                                backgroundColor: $theme.colors.negative,
                                                            }),
                                                        },
                                                    }} >Continuer</BtnU>
                                                </div>

                                            </FormGroup>

                                        </AvForm>


                                    </div>
                                </div>
                            </div>
                        }

                        {
                            this.state.activeStep === "sarl_expert" &&
                            <div className="row">
                                <div className="col-lg-12">
                                    <h3>Expert-comptable</h3>
                                    <p>La gestion de votre entreprise implique de suivre votre
                                        trésorerie, déclarer votre TVA,
                                        passer vos notes de frais, etc. Un expert-comptable sera
                                        nécessaire pour établir votre
                                        bilan annuel.</p>
                                    <h3 style={{marginTop: 20}}>Offre de gestion SmartCo</h3>
                                    <p>Votre chiffre d’affaires et vos dépenses sont directement
                                        synchronisés depuis votre compte
                                        en banque vers notre plateforme de gestion. Nos experts sont
                                        disponibles pour vous accompagner
                                        au quotidien. Inclus dans l’offre:</p>
                                    <ul>
                                        <li>Suivi de vos dépenses et de votre chiffre d’affaires en
                                            temps réel.
                                        </li>
                                        <li>Synchronisation automatique avec votre banque.</li>
                                        <li>Déclarations de TVA</li>
                                        <li>Assistance par des experts (téléphone, email)</li>
                                        <li>Création illimitée de devis et factures</li>
                                        <li>Gestion des notes de frais et indemnités kilométriques
                                        </li>
                                        <li>En option : bilan annuel avec un expert-comptable
                                            partenaire
                                        </li>
                                    </ul>
                                    <div className="radio radio-pink mb-1" style={{marginTop: 20}}>
                                        <input type="radio" name="radioexp" id="radioexp1"
                                               style={{marginLeft: 10}}
                                               onClick={this.handleRadioObjectChange("expertSmartCo", "etat", "true")}
                                               checked={this.state.expertSmartCo.etat === "true"}
                                               value={this.state.expertSmartCo.etat}
                                        />
                                        <label htmlFor="radioexp1">
                                            Oui, je souhaite gérer mon entreprise avec un
                                            expert-comptable partenaire de Smartco
                                        </label>
                                    </div>
                                    <div className="radio radio-pink mb-2">
                                        <input type="radio" name="radioexp" id="radioexp2"
                                               style={{marginLeft: 10}}
                                               onClick={this.handleRadioObjectChange("expertSmartCo", "etat", "false")}

                                               checked={this.state.expertSmartCo.etat === "false"}
                                               value={this.state.expertSmartCo.etat}
                                        />
                                        <label htmlFor="radioexp2">
                                            Non merci, j'ai déjà un expert-comptable
                                        </label>
                                    </div>

                                    <FormGroup style={{marginTop:20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                activeStep: "sarl_gerants",
                                            })}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU onClick={() => {
                                                if (this.state.expertSmartCo.etat === 'true') {
                                                    this.setState({
                                                        activeStep: "sarl_expert1/3"
                                                    })
                                                } else {
                                                   console.log(this.state)
                                                }
                                            }} overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }} >
                                                {
                                                    this.state.expertSmartCo.etat === "true" ? "Suivant":"Confirmer la création"
                                                }
                                            </BtnU>
                                        </div>
                                    </FormGroup>

                                </div>
                            </div>
                        }

                        {
                            this.state.activeStep === "sarl_expert1/3" &&
                            <div className="row">
                                <div className="col-lg-12">
                                    <h3 style={{fontWeight:"bold"}}><u>Oﬀre d’expertise comptable (1/3)</u></h3>
                                    <h4 style={{fontWeight:"bold"}}>Oﬀre de base </h4>
                                    <p style={{fontWeight:"bold"}}>Un support ‘ﬁduciaire’ de base : Estimation de 1'500 CHF/an
                                        (estimation +- 12 h* ) </p>
                                    <li style={{fontWeight:"bold"}}> Contrôle et correction des saisies (si saisie des pièces
                                        comptables faite par vous)
                                    </li>
                                    <li style={{fontWeight:"bold"}}>Ecritures de bouclement</li>
                                    <li style={{fontWeight:"bold"}}> Etablissement du bilan, pertes et proﬁts, annexe</li>
                                    <li style={{fontWeight:"bold"}}> Déclaration ﬁscale de la société́ Décomptes TVA et
                                        assurances sociales Revues trimestrielles du résultat
                                    </li>

                                    <p className="mt-2" style={{marginLeft:"5%"}}>* estimation de 12 heures de saisies comptables</p>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp" id="radioexp1"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "offreDeBase", "true")}

                                                   checked={this.state.expertSmartCo.offreDeBase === "true"}
                                                   value={this.state.expertSmartCo.offreDeBase}
                                            />
                                            <label htmlFor="radioexp1">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp" id="radioexp2"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "offreDeBase", "false")}
                                                   checked={this.state.expertSmartCo.offreDeBase === "false"}
                                                   value={this.state.expertSmartCo.offreDeBase}
                                            />
                                            <label htmlFor="radioexp2">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <p className="mt-2" style={{marginLeft:"5%",color:"#000"}}>
                                        PS: Si oui, vous pouvez choisir une mensualisation et d'autres services&nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => {
                                            window.open("http://51.91.254.61:80","_blanc")
                                        }} className="btn waves-effect waves-light" style={{backgroundColor:"#00A2FF",borderColor:"#00A2FF"}}>
                                            Options & mensualisation
                                        </Button>
                                    </p>

                                    <div className="col-lg-12">
                                        <h4>Si vous souhaitez nous conﬁez les écritures
                                            comptables </h4>
                                        <li style={{fontWeight:"bold"}}>Support ﬁduciaire externalisation – 5 CHF par mouvement
                                            comptable
                                        </li>
                                        <li style={{fontWeight:"bold"}}>Support ﬁduciaire externalisation salaires – 10 CHF par
                                            ﬁche de salaire
                                        </li>

                                    </div>

                                    <FormGroup style={{marginTop:20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                activeStep: "sarl_expert",
                                            })}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU onClick={() => {
                                                this.setState({
                                                    activeStep: "sarl_expert2/3"
                                                })

                                            }}overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }} >Continuer</BtnU>
                                        </div>
                                    </FormGroup>

                                </div>
                            </div>
                        }

                        {
                            this.state.activeStep === "sarl_expert2/3" &&
                            <div className="row">
                                <div className="col-lg-12">
                                    <h3><u>Oﬀre d’expertise comptable (2/3)</u></h3>
                                    <h4>Saisie déporté en mode Cloud SaaS </h4>
                                    <li style={{fontWeight: "bold"}}> L’ERP est proposé sous forme
                                        d’abonnement (Saas) : à partir de 50 CHF/ mois/utilisateur
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp" id="radioexp1"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "abERP", "true")}

                                                   checked={this.state.expertSmartCo.abERP === "true"}
                                                   value={this.state.expertSmartCo.abERP}
                                            />
                                            <label htmlFor="radioexp1">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp" id="radioexp2"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "abERP", "false")}
                                                   checked={this.state.expertSmartCo.abERP === "false"}
                                                   value={this.state.expertSmartCo.abERP}
                                            />
                                            <label htmlFor="radioexp2">
                                                Non
                                            </label>
                                        </div>
                                    </div>
                                    <p> Cette plateforme est accessible depuis n’importe quel
                                        appareil, connecté sur un réseau internet. L’ERP est
                                        ‘connecté’, ce qui veut dire qu’un nombre de saisies, comme
                                        les factures, les ﬁches de salaires, etc sont
                                        automatiquement intégré dans la comptabilité. </p>

                                    <li style={{fontWeight: "bold"}}> La conﬁguration pour vos
                                        besoins sera faite selon un cahier de charge détaillé
                                        L’installation ‘standard’ du logo pour facturation,
                                        intégration liste de clients/ fournisseurs/produits (mise à
                                        disposition par vous), coordonnées bancaires : estimé à 350
                                        CHF (1 heure)
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp1" id="radioexp3"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "configurationERP", "true")}

                                                   checked={this.state.expertSmartCo.configurationERP === "true"}
                                                   value={this.state.expertSmartCo.configurationERP}
                                            />
                                            <label htmlFor="radioexp3">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp1" id="radioexp4"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "configurationERP", "false")}
                                                   checked={this.state.expertSmartCo.configurationERP === "false"}
                                                   value={this.state.expertSmartCo.configurationERP}
                                            />
                                            <label htmlFor="radioexp4">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <li style={{fontWeight: "bold"}}> Si besoin, nous pouvons
                                        assurer la formation sur l’utilisation de l’ERP : 250 CHF
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp2" id="radioexp5"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "formationERP", "true")}
                                                   checked={this.state.expertSmartCo.formationERP === "true"}
                                                   value={this.state.expertSmartCo.formationERP}
                                            />
                                            <label htmlFor="radioexp5">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp2" id="radioexp6"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "formationERP", "false")}
                                                   checked={this.state.expertSmartCo.formationERP === "false"}
                                                   value={this.state.expertSmartCo.formationERP}
                                            />
                                            <label htmlFor="radioexp6">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <li style={{fontWeight: "bold"}}> Un ‘helpdesk’ est disponible
                                        et est facturé par tranche de 15 min. à 150 CHF/heure
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp3" id="radioexp7"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesk", "true")}
                                                   checked={this.state.expertSmartCo.helpdesk === "true"}
                                                   value={this.state.expertSmartCo.helpdesk}
                                            />
                                            <label htmlFor="radioexp7">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp3" id="radioexp8"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesk", "false")}
                                                   checked={this.state.expertSmartCo.helpdesk === "false"}
                                                   value={this.state.expertSmartCo.helpdesk}
                                            />
                                            <label htmlFor="radioexp8">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <FormGroup style={{marginTop:20}}>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                activeStep: "sarl_expert1/3",
                                            })}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU onClick={() => {
                                                this.setState({
                                                    activeStep: "sarl_expert3/3"
                                                })

                                            }} overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }} >Continuer</BtnU>
                                        </div>
                                    </FormGroup>

                                </div>
                            </div>
                        }

                        {
                            this.state.activeStep === "sarl_expert3/3" &&
                            <div className="row">
                                <div className="col-lg-12">
                                    <h3><u>Oﬀre eCommerce lié à la compta (3/3)</u></h3>
                                    <h4>Oﬀre d’un site eCommerce lié à votre compta </h4>
                                    <li> Le Site de eCommerce est proposé sous forme d’abonnement
                                        (Saas) : à partir de 50 CHF/mois
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp" id="radioexp1"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "siteEcommerce", "true")}
                                                   checked={this.state.expertSmartCo.siteEcommerce === "true"}
                                                   value={this.state.expertSmartCo.siteEcommerce}
                                            />
                                            <label htmlFor="radioexp1">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp" id="radioexp2"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "siteEcommerce", "false")}
                                                   checked={this.state.expertSmartCo.siteEcommerce === "false"}
                                                   value={this.state.expertSmartCo.siteEcommerce}
                                            />
                                            <label htmlFor="radioexp2">
                                                Non
                                            </label>
                                        </div>
                                    </div>
                                    <p>* Cette plateforme est accessible depuis n’importe quel
                                        appareil, connecté sur un réseau internet. Il est basé sur
                                        un leader open source Woo Commerce qui premier mondial en
                                        part de marché. Le eShop lié au back oﬃce comptable qui veut
                                        dire que la génération des factures, les ﬁches d’oﬀres de
                                        vos produits, …, etc sont automatiquement intégré dans la
                                        comptabilité.</p>

                                    <li>
                                        La conﬁguration pour vos besoins sera faite selon un cahier
                                        de charge détaillé L’installation ‘standard’ du logo pour
                                        facturation, intégration liste de clients/
                                        fournisseurs/produits (mise à disposition par vous),
                                        coordonnées bancaires : estimé à 750 CHF (3 heure)
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp1" id="radioexp3"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "configSite", "true")}
                                                   checked={this.state.expertSmartCo.configSite === "true"}
                                                   value={this.state.expertSmartCo.configSite}
                                            />
                                            <label htmlFor="radioexp3">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp1" id="radioexp4"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "configSite", "false")}
                                                   checked={this.state.expertSmartCo.configSite === "false"}
                                                   value={this.state.expertSmartCo.configSite}
                                            />
                                            <label htmlFor="radioexp4">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <li> Si besoin, nous pouvons assurer la formation sur
                                        l’utilisation du site d’eCommerce : 250 CHF,
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp2" id="radioexp5"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "formationSite", "true")}
                                                   checked={this.state.expertSmartCo.formationSite === "true"}
                                                   value={this.state.expertSmartCo.formationSite}
                                            />
                                            <label htmlFor="radioexp5">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp2" id="radioexp6"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "formationSite", "false")}
                                                   checked={this.state.expertSmartCo.formationSite === "false"}
                                                   value={this.state.expertSmartCo.formationSite}
                                            />
                                            <label htmlFor="radioexp6">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <li> Un ‘helpdesk’ est disponible et est facturé par tranche de
                                        15 min. à 150 CHF/heure.
                                    </li>

                                    <div className="row"
                                         style={{marginLeft: "5%", marginTop: "2%"}}>
                                        <div className="radio radio-pink mb-1">
                                            <input type="radio" name="radioexp3" id="radioexp7"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "helpdeskSite", "true")}
                                                   checked={this.state.expertSmartCo.helpdeskSite === "true"}
                                                   value={this.state.expertSmartCo.helpdeskSite}
                                            />
                                            <label htmlFor="radioexp7">
                                                Oui
                                            </label>
                                        </div>
                                        <div className="radio radio-pink mb-2"
                                             style={{marginLeft: "2%"}}>
                                            <input type="radio" name="radioexp3" id="radioexp8"
                                                   style={{marginLeft: 10}}
                                                   onClick={this.handleRadioObjectChange("expertSmartCo", "helpdesksite", "false")}
                                                   checked={this.state.expertSmartCo.helpdesksite === "false"}
                                                   value={this.state.expertSmartCo.helpdeskSite}
                                            />
                                            <label htmlFor="radioexp8">
                                                Non
                                            </label>
                                        </div>
                                    </div>

                                    <FormGroup>
                                        <div className="float-left">
                                            <BtnU kind={KIND.secondary} onClick={() => this.setState({
                                                activeStep: "sarl_expert2/3",
                                            })}
                                            >Précédent</BtnU>
                                        </div>
                                        <div className="float-right">
                                            <BtnU isLoading={true} onClick={() => {
                                                //this.saveSociety()
                                            }} overrides={{
                                                BaseButton: {
                                                    style: ({$theme}) => ({
                                                        backgroundColor: $theme.colors.negative,
                                                    }),
                                                },
                                            }} >Confirmer la création</BtnU>
                                        </div>
                                    </FormGroup>


                                </div>
                            </div>
                        }

                    </div>
                </div>


                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={10000}
                    onClose={this.closeSnackbar}
                >
                    <Alert
                        elevation={6}
                        variant="filled"
                        onClose={this.closeSnackbar}
                        severity={this.state.alertType}
                    >
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

            </div>
        )
    }


}