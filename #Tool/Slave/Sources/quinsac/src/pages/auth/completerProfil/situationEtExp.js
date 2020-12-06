import React, {Component, Suspense} from "react";
import Topbar from "../../../components/Menu/Topbar";
import {Container, FormGroup as formGroup, Label} from "reactstrap";
import Loader from "../../../components/Loader";
import firebase from "firebase/app";
import "firebase/database"
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";

const loading = () => <Loader/>;

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

class situationEtExp extends Component{



    constructor(props){
        super(props);


        this.state={
            loading:false,
            situationProf:"",
            revenuSource:"",
            revenuMontantAnnuel:"",
            montantPatrimoine:"",
            experInv:[],
            connaissInv:{
                question1:"",
                question2:"",
                question3:"",
                question4:"",
                question5:"",
            },
            luteContreBlanch:{
                question1:"Non",
                question2:"Oui",
                question3:"Oui",
            },
            risqueEtResp:{
                question1:"Oui",
                question2:"Oui",
                question3:"Oui",
                question4:"Oui",
                question5:"Oui",
                question6:"Oui",
            }
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
                    experInv:investisor.experInv || this.state.experInv,
                    connaissInv:investisor.connaissInv ||this.state.connaissInv,
                    luteContreBlanch:investisor.luteContreBlanch || this.state.luteContreBlanch,
                    risqueEtResp:investisor.risqueEtResp || this.state.risqueEtResp

                })

            });
        }else{
            this.props.history.push("/comment-investir")
        }

    }

    handleObjectChange = (object,item) => event => {
        let objCopy = this.state[object];
        objCopy[item] = event.target.value;
        this.setState({
            [object]:objCopy
        })
    };


    saveSituatExp = () => {

        this.setState({loading:true});

        firebase.database().ref('users/'+ localStorage.getItem("uid")).update({
            "situationProf":this.state.situationProf,
            "RevenuSource":this.state.revenuSource,
            "revenuMontantAnnuel":this.state.revenuMontantAnnuel,
            "montantPatrimoine":this.state.montantPatrimoine,
            "experInv":this.state.experInv,
            "connaissInv":this.state.connaissInv,
            "luteContreBlanch":this.state.luteContreBlanch,
            "risqueEtResp":this.state.risqueEtResp

        }).then( ok => {

            setTimeout(() => {
                this.setState({loading:false});
                this.props.history.push("/categorie/caisse")
            },500);

        });
    };



    render() {
        return(

            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper" style={{padding: "72px 0px 0px", backgroundColor: "#fff"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row" style={{marginTop:100}}>

                                <div className="col-md-10" style={{backgroundColor:"#fff",paddingRight:"15%",paddingLeft:"5%"}}>
                                    <p style={{
                                        color: "#000",
                                        fontSize: "2.6rem",
                                        lineHeight: "2.75rem",
                                        textTransform: "uppercase",
                                        fontWeight:"bold"
                                    }}>Situation et expérience</p>
                                    <p className="font-18 text-dark" style={{lineHeight: 1.4,marginTop:40}}>
                                        Dans le cadre de notre mission de conseil en investissement participatif,
                                        nous vous prions de renseigner les informations sur votre situation personnelle,
                                        financière, et sur votre expérience en matière d’investissement. Nous agissons dans
                                        un but de prévention et de protection des intérêts de nos clients.<br/><br/>
                                        Ces informations restent strictement personnelles et confidentielles.
                                    </p>

                                    <p style={{
                                        color: "#000",
                                        fontSize: "1.4rem",
                                        lineHeight: "1.5rem",
                                        fontWeight:"bold",
                                        marginTop:60
                                    }}>Situation professionnelle, financière et origine des fonds apportés</p>

                                    <AvForm onValidSubmit={this.save}>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3 mt-2" style={{width:"70%"}}>
                                                    <Label className="text-dark font-17 font-weight-bold" for="password">Situation professionnelle</Label>
                                                    <AvInput type="select" name="situPro" id="situPro" style={{height:45,fontSize:"1.1rem"}} className="custom-select"
                                                             value={this.state.situationProf}>
                                                        {
                                                            situationProfArray.map((item,key) => (
                                                                <option value={item.name}>{item.name} </option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                </AvGroup>
                                            </div>

                                            <div className="col-md-6">
                                                <AvGroup className="mb-3 mt-2" style={{width:"70%"}}>
                                                    <Label className="text-dark font-17 font-weight-bold" for="password">Source principale de vos revenus</Label>
                                                    <AvInput type="select" name="revenueSource" id="revenueSource" style={{height:45,fontSize:"1.1rem"}} className="custom-select"
                                                             value={this.state.revenuSource}>
                                                        {
                                                            sourcePrincArray.map((item,key) => (
                                                                <option value={item.name}>{item.name} </option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3 mt-2" style={{width:"70%"}}>
                                                    <Label className="text-dark font-17 font-weight-bold" for="password">Montant de vos revenus annuels</Label>
                                                    <AvInput type="select" name="revenueAnn" id="revenueAnn" style={{height:45,fontSize:"1.1rem"}} className="custom-select"
                                                             value={this.state.revenuMontantAnnuel}>
                                                        {
                                                            montantsRevenuAnnuArray.map((item,key) => (
                                                                <option value={item.name}>{item.name} </option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                </AvGroup>
                                            </div>

                                            <div className="col-md-6">
                                                <AvGroup className="mb-3 mt-2" style={{width:"70%"}}>
                                                    <Label className="text-dark font-17 font-weight-bold" for="password">Montant de votre patrimoine</Label>
                                                    <AvInput type="select" name="patrimoine" id="patrimoine" style={{height:45,fontSize:"1.1rem"}} className="custom-select"
                                                             value={this.state.montantPatrimoine}>
                                                        {
                                                            montantsPatrimoine.map((item,key) => (
                                                                <option value={item.name}>{item.name} </option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <p style={{
                                            color: "#000",
                                            fontSize: "1.4rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",
                                            marginTop:60,

                                        }}>Expérience en matière d'investissement</p>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Avez-vous déjà investi sur les produits, services ou marchés suivants ?
                                            Si oui, combien d'opérations avez vous effectué lors des 24 derniers mois sur chacun de ces instruments ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.experInv.find(x => x === "Actions et obligations cotées") !== undefined}
                                                        onChange={(event) => {
                                                            let expInv = this.state.experInv;
                                                            let found = expInv.find(x => x === "Actions et obligations cotées");
                                                            if (found === undefined) {
                                                                expInv.push(event.target.value)
                                                            } else {
                                                                expInv.splice(expInv.indexOf(found), 1)
                                                            }
                                                            this.setState({experInv: expInv})
                                                        }}
                                                        value='Actions et obligations cotées'
                                                    />
                                                }
                                                label="Actions et obligations cotées"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.experInv.find(x => x === "OPCVM") !== undefined}
                                                        onChange={(event) => {
                                                            let expInv = this.state.experInv;
                                                            let found = expInv.find(x => x === "OPCVM");
                                                            if (found === undefined) {
                                                                expInv.push(event.target.value)
                                                            } else {
                                                                expInv.splice(expInv.indexOf(found), 1)
                                                            }
                                                            this.setState({experInv: expInv})
                                                        }}
                                                        value='OPCVM'
                                                    />
                                                }
                                                label="OPCVM"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.experInv.find(x => x === "Actions et obligations non cotées") !== undefined}
                                                        onChange={(event) => {
                                                            let expInv = this.state.experInv;
                                                            let found = expInv.find(x => x === "Actions et obligations non cotées");
                                                            if (found === undefined) {
                                                                expInv.push(event.target.value)
                                                            } else {
                                                                expInv.splice(expInv.indexOf(found), 1)
                                                            }
                                                            this.setState({experInv: expInv})
                                                        }}
                                                        value='Actions et obligations non cotées'
                                                    />
                                                }
                                                label="Actions et obligations non cotées"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.experInv.find(x => x === "Fonds d’investissement (FIP, FCPI, etc.)") !== undefined}
                                                        onChange={(event) => {
                                                            let expInv = this.state.experInv;
                                                            let found = expInv.find(x => x === "Fonds d’investissement (FIP, FCPI, etc.)");
                                                            if (found === undefined) {
                                                                expInv.push(event.target.value)
                                                            } else {
                                                                expInv.splice(expInv.indexOf(found), 1)
                                                            }
                                                            this.setState({experInv: expInv})
                                                        }}
                                                        value='Fonds d’investissement (FIP, FCPI, etc.)'
                                                    />
                                                }
                                                label="Fonds d’investissement (FIP, FCPI, etc.)"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.experInv.find(x => x === "Autre") !== undefined}
                                                        onChange={(event) => {
                                                            let expInv = this.state.experInv;
                                                            let found = expInv.find(x => x === "Autre");
                                                            if (found === undefined) {
                                                                expInv.push(event.target.value)
                                                            } else {
                                                                expInv.splice(expInv.indexOf(found), 1)
                                                            }
                                                            this.setState({experInv: expInv})
                                                        }}
                                                        value='Autre'
                                                    />
                                                }
                                                label="Autre"
                                            />
                                        </FormGroup>

                                        <p style={{
                                            color: "#000",
                                            fontSize: "1.4rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",
                                            marginTop:60
                                        }}>Connaissance en matière d'investissement</p>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Quelle offre comporte le plus de risque ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question1 === "Une émission d'obligations à 5%"}
                                                        onChange={this.handleObjectChange("connaissInv","question1")}
                                                        value="Une émission d'obligations à 5%"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Une émission d'obligations à 5%"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question1 === "Une émission d'obligations à 7%"}
                                                        onChange={this.handleObjectChange("connaissInv","question1")}
                                                        value="Une émission d'obligations à 7%"
                                                    />
                                                }
                                                label="Une émission d'obligations à 7%"
                                            />
                                        </FormGroup>


                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Quelle est la différence entre une obligation simple et une obligation convertible ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question2 === "L'obligation convertible donne droit à la souscription d'actions dans certains cas."}
                                                        onChange={this.handleObjectChange("connaissInv","question2")}
                                                        value="L'obligation convertible donne droit à la souscription d'actions dans certains cas."
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="L'obligation convertible donne droit à la souscription d'actions dans certains cas."
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question2 === "L'obligation convertible est une obligation simple cotée."}
                                                        onChange={this.handleObjectChange("connaissInv","question2")}
                                                        value="L'obligation convertible est une obligation simple cotée."
                                                    />
                                                }
                                                label="L'obligation convertible est une obligation simple cotée."
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Comment est rémunéré un minibon ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question3 === "Par des versements à taux fixe à échéance constante."}
                                                        onChange={this.handleObjectChange("connaissInv","question3")}
                                                        value="Par des versements à taux fixe à échéance constante."
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Par des versements à taux fixe à échéance constante."
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question3 === "Au terme du projet financé."}
                                                        onChange={this.handleObjectChange("connaissInv","question3")}
                                                        value="Au terme du projet financé."
                                                    />
                                                }
                                                label="Au terme du projet financé."
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Comment est rémunérée une action ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question4 === "Par des versements à taux fixe à échéance constante."}
                                                        onChange={this.handleObjectChange("connaissInv","question4")}
                                                        value="Par des versements à taux fixe à échéance constante."
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Par des versements à taux fixe à échéance constante."
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question4 === "Lorsque le détenteur vend les actions qu'il détient et/ou lorsque la société lui verse des dividendes."}
                                                        onChange={this.handleObjectChange("connaissInv","question4")}
                                                        value="Lorsque le détenteur vend les actions qu'il détient et/ou lorsque la société lui verse des dividendes."
                                                    />
                                                }
                                                label="Lorsque le détenteur vend les actions qu'il détient et/ou lorsque la société lui verse des dividendes."
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Quelle est la différence entre une action et une obligation ?
                                        </Label>

                                        <FormGroup row style={{display:"grid",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question5 === "Une obligation est un titre de créance et une action est un titre de capital."}
                                                        onChange={this.handleObjectChange("connaissInv","question5")}
                                                        value="Une obligation est un titre de créance et une action est un titre de capital."
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Une obligation est un titre de créance et une action est un titre de capital."
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.connaissInv.question5 === "Aucune, les deux produits donnent les mêmes droits et la même rémunération."}
                                                        onChange={this.handleObjectChange("connaissInv","question5")}
                                                        value="Aucune, les deux produits donnent les mêmes droits et la même rémunération."
                                                    />
                                                }
                                                label="Aucune, les deux produits donnent les mêmes droits et la même rémunération."
                                            />
                                        </FormGroup>

                                        <p style={{
                                            color: "#000",
                                            fontSize: "1.4rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",
                                            marginTop:60
                                        }}>Lutte contre le blanchiment de capitaux et de financement du terrorisme</p>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Vous, ou l'un des bénéficiaires ultimes de la société que vous représentez, est-il une personne politiquement exposée ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question1 === "Oui"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question1")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question1 === "Non"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question1")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Les fonds que vous souhaitez investir proviennent-ils de comptes bancaires ouverts auprès d’un
                                            établissement bancaire ayant son siège en France ou dans un autre Etat de la zone SEPA ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question2 === "Oui"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question2")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question2 === "Non"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question2")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Certifiez-vous que les fonds qui seront utilisés sur LePerray proviennent d’une activité légale
                                            et ne concourent pas au blanchiment de capitaux ou au financement du terrorisme ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question3 === "Oui"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question3")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.luteContreBlanch.question3 === "Non"}
                                                        onChange={this.handleObjectChange("luteContreBlanch","question3")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <p style={{
                                            color: "#000",
                                            fontSize: "1.4rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",
                                            marginTop:60
                                        }}>Risque et responsabilité</p>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Avez-vous conscience que vous pouvez perdre tout ou partie de votre investissement et de ses intérêts en cas de défaut de l'entreprise ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question1 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question1")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question1 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question1")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Avez-vous conscience que la revente de vos titres n’est pas garantie et peut être incertaine voire impossible ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question2 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question2")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question2 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question2")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Avez-vous conscience du risque pris à investir plus de 10 % de votre patrimoine ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question3 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question3")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question3 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question3")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Savez-vous que votre investissement est un investissement de moyen à long terme ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question4 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question4")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question4 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question4")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Avez-vous été bien informé·e du risque de perte totale en capital ?
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question5 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question5")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question5 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question5")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <Label className="text-dark font-17 font-weight-bold" style={{marginTop:25}} for="password">
                                            Je certifie l’exactitude des informations communiquées ci-dessus :
                                        </Label>

                                        <FormGroup row style={{display:"block",marginLeft:15,marginTop:5}}>
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question6 === "Oui"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question6")}
                                                        value="Oui"
                                                        classes={{
                                                            root:"customUICheckboxIcon"
                                                        }}
                                                    />
                                                }
                                                label="Oui"
                                            />
                                            <FormControlLabel
                                                classes={{
                                                    label:"customUILabelNotBold",
                                                }}
                                                control={
                                                    <Checkbox
                                                        checked={this.state.risqueEtResp.question6 === "Non"}
                                                        onChange={this.handleObjectChange("risqueEtResp","question6")}
                                                        value="Non"
                                                    />
                                                }
                                                label="Non"
                                            />
                                        </FormGroup>

                                        <formGroup>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                            onClick={() => this.props.history.push("/investisor/completer-profil/documents")}
                                                            style={{backgroundColor:"#fff",color:"#000",border:"3px solid #F0F0F0",width:"60%",height:60,marginTop:30,marginBottom:30}}>
                                                        Précédent
                                                    </button>
                                                </div>
                                                <div className="col-md-6">
                                                    <button className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                            onClick={this.saveSituatExp}
                                                            style={{width:"60%",height:60,marginTop:30,marginBottom:30}}>

                                                        {
                                                            this.state.loading ?
                                                                <div
                                                                    className="spinner-border avatar-xs spinnerColor m-1"
                                                                    role="status"></div> : 'Suivant'
                                                        }
                                                    </button>
                                                </div>

                                            </div>

                                        </formGroup>


                                    </AvForm>


                                </div>

                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default situationEtExp
