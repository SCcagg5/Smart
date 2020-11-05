import React, {Component, Suspense} from "react";
import user3 from "../../../../../assets/users/user-5.jpg";
import enIcon from "../../../../../assets/images/entreprise-icon.png";
import {Button, Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import fabienImg from "../../../../../assets/images/avocats/fabian.png"
import alexImg from "../../../../../assets/images/avocats/alex.jpg"
import keplerImg from "../../../../../assets/images/avocats/aKapeller.jpg"
import Loader from "../../../../../components/Loader";
const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;

class affectationBSA extends Component {

    constructor(props) {
        super(props);
    }

    actionnaire = {
        id: '',
        pwd: '',
        email: '',
        phone: '',
        type: 'Personne physique',
        gender: '',
        firstname: '',
        lastname: '',
        adress: '',
        postalCode: '',
        pays: '',
        birthday: '',
        nationality: '',
        nbActions: '',
        isAdministrator: 'false',
        isHaveSuisseId: 'true',
        signatures: [],
        role: '',
        titresBSA: [{
            operations:[]
        }]
    };

    state = {
        openAlert: false,
        alertMessage: '',
        alertType: '',

        loading: false,
        entreprise: "",
        beneficaire: '',
        nbBSA: '',
        dateLeveeOption: '',
        emissionBSA:[
            {
                dateMAJ: new Date(),
                nb:'',
                dateLeveeOption:'',
            }
        ]
    };


    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({
                entreprise: this.props.location.state.entreprise,
            });
        }
    }

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    handleNbTitres = (key) => event => {
        let affectedValuesCopie = this.state.affectedvalues;
        affectedValuesCopie[key].nb = event.target.value;
        this.setState({
            affectedvalues: affectedValuesCopie,
        });
        this.calculeTotalAffectedActions(this.state.affectedvalues);
    };

    calculeTotalAffectedActions = (array) => {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += parseInt(array[i].nb)
        }
        this.setState({
            totalAffected: total
        })
    };

    showActio = (actioEmail)  => {
        let allActios = (this.state.entreprise.sActionnairePhy || []).concat(this.state.entreprise.sActionnaireMoral || []);
        let actio = allActios.find(x => x.email === actioEmail);
        this.setState({
            beneficaire: actio
        })
    };

    saveBSA = () => {

        this.setState({loading: true});

        const entreprise = this.state.entreprise;
        let actionnairesPhy = entreprise.sActionnairePhy || [];
        let actionnairesMoral = entreprise.sActionnaireMoral || [];

        if (this.state.beneficaire.type === "Personne physique") {


            let actio = actionnairesPhy.find(x => x.email === this.state.beneficaire.email);


            let index = actionnairesPhy.indexOf(actio);

            this.actionnaire.firstname = actio.firstname;
            this.actionnaire.lastname = actio.lastname;
            this.actionnaire.birthday = actio.birthday;
            this.actionnaire.id = actio.id;
            this.actionnaire.pwd = actio.pwd;
            this.actionnaire.email = actio.email;
            this.actionnaire.phone = actio.phone;
            this.actionnaire.type = actio.type;
            this.actionnaire.gender = actio.gender;
            this.actionnaire.adress = actio.adress;
            this.actionnaire.postalCode = actio.postalCode;
            this.actionnaire.pays = actio.pays;
            this.actionnaire.nationality = actio.nationality;
            this.actionnaire.nbActions = actio.nbActions;
            this.actionnaire.isAdministrator = actio.isAdministrator;
            this.actionnaire.signatures = actio.signatures || [];
            this.actionnaire.role = actio.role || "";

            let titresBSA = actio.titresBSA || [];
            titresBSA.push({'operations':this.state.emissionBSA});
            this.actionnaire.titresBSA = titresBSA;

            actionnairesPhy[index] = this.actionnaire;

            firebase.database().ref('society/' + this.state.entreprise.uniqueId).update({
                'sActionnairePhy': actionnairesPhy
            }).then(res => {
                this.openSnackbar('success', "Opération effectué avec succès");
                this.setState({
                    beneficaire: "",
                    emissionBSA:[{
                        dateMAJ: new Date(),
                        nb:'',
                        dateLeveeOption:'',
                    }],
                    loading: false
                });
                setTimeout(() => {
                    this.props.history.push("/gestion/entreprises/operations/emissionTitres/3/Details",{entreprise: this.state.entreprise,indexActio:index,typeActio:"phy"})
                    //this.props.returnTo(this, "operationBSADetails",index,'phy');
                }, 500);

            }).catch(err => {
                console.log(err);
            })

        } else {


            let actio = actionnairesMoral.find(x => x.email === this.state.beneficaire.email);

            let index = actionnairesMoral.indexOf(actio);

            this.actionnaire.firstname = actio.firstname;
            this.actionnaire.lastname = actio.lastname;
            this.actionnaire.birthday = actio.birthday;
            this.actionnaire.id = actio.id;
            this.actionnaire.email = actio.email;
            this.actionnaire.phone = actio.phone;
            this.actionnaire.type = actio.type;
            this.actionnaire.gender = actio.gender;
            this.actionnaire.adress = actio.adress;
            this.actionnaire.postalCode = actio.postalCode;
            this.actionnaire.pays = actio.pays;
            this.actionnaire.nationality = actio.nationality;
            this.actionnaire.nbActions = actio.nbActions;
            this.actionnaire.isAdministrator = actio.isAdministrator;
            this.actionnaire.signatures = actio.signatures || [];
            this.actionnaire.role = actio.role || "";

            let titresBSA = actio.titresBSA || [];
            titresBSA.push({'operations':this.state.emissionBSA});
            this.actionnaire.titresBSA = titresBSA;


            actionnairesMoral[index] = this.actionnaire;

            firebase.database().ref('society/' + this.state.entreprise.uniqueId).update({
                'sActionnaireMoral': actionnairesMoral
            }).then(res => {
                this.openSnackbar('success', "Opération effectué avec succès");
                this.setState({
                    beneficaire: "",
                    emissionBSA:[{
                        dateMAJ: new Date(),
                        nb:'',
                        dateLeveeOption:'',
                    }],
                    loading: false
                });
                setTimeout(() => {
                    //this.props.returnTo(this, "operationBSADetails",index,'moral');
                    this.props.history.push("/gestion/entreprises/operations/emissionTitres/3/Details",{entreprise: this.state.entreprise,indexActio:index,typeActio:"moral"})
                }, 500);
            }).catch(err => {
                console.log(err);
            })


        }
    };

    handleArrayObjectChange = (object,name,key) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = event.target.value;
        this.setState({
            [object]:objCopy
        })
    };

    addBSA =() => {
        let copyOfBSA = this.state.emissionBSA;
        copyOfBSA.push({
            dateMAJ: new Date(),
            nb:'',
            dateLeveeOption:'',
        });
        this.setState({
            emissionBSA:copyOfBSA
        })
    };

    verifEmissionBSA(){
        let test = false;
        if(this.state.beneficaire === "") return true;
        for(let i=0 ; i < this.state.emissionBSA.length ; i++){
            let item = this.state.emissionBSA[i];
            if(item.nb === "" || item.dateLeveeOption === "")  test =true;
        }
        return test;
    }

    render() {
        const entreprise = this.state.entreprise;
        const actios = (entreprise.sActionnairePhy || []).concat(entreprise.sActionnaireMoral || []);


        return (
            <div>

                <div className="app center-menu">
                    <header id="topnav">
                        <Suspense fallback={loading()}>
                            <Topbar changeActivePage={this.changeActivePage}/>
                            <Navbar isMenuOpened={this.state.isMenuOpened}
                                    activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                        </Suspense>
                    </header>

                    <div className="wrapper">
                        <Container fluid>
                            <Suspense fallback={loading()}>

                                <div className="card" style={{marginTop: 25}}>
                                    <div className="card-body ">
                                        <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                           onClick={() => this.props.history.goBack()} className="float-right text-info">Retour</a>
                                        <h4 className="header-title mt-0 mb-3">Affectation de BSA Entre</h4>
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="example-select">Choisir un actionnaire de la société</label>
                                                        <select className="form-control" id="example-select"
                                                                onChange={(event) => this.showActio(event.target.value)}>
                                                            <option selected={this.state.beneficaire === ""}>Sélectionner un
                                                                actionnaire
                                                            </option>
                                                            {
                                                                actios.map((item, key) => (
                                                                    <option
                                                                        value={item.email}>{item.firstname + ' ' + item.lastname}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                </div>
                                                {
                                                    this.state.beneficaire !== "" &&
                                                    <div className="col-md-3">
                                                        <li className="task-info" id="task7" onClick={()=>{
                                                            window.open("http://www.smartcoagenda.com/SmartCo/avocats","_blank");
                                                        }}
                                                            style={{
                                                                border: "1px solid #dee2e6",
                                                                padding: 20,
                                                                marginBottom: 15,
                                                                borderRadius: 3,
                                                                cursor: "pointer"
                                                            }}>
                                                            <span className="badge bg-soft-danger text-danger float-right"> -> </span>
                                                            <h5 className="mt-0">
                                                                <a href="" className="text-dark">Vous avez des questions ?</a>
                                                            </h5>
                                                            <p>Vous pouvez prendre rendez-vous avec l'un de nos avocats </p>
                                                            <div className="clearfix"></div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className="font-13 mt-2 mb-0">
                                                    <span
                                                        className="badge bg-soft-success text-success">Disponnible</span>
                                                                    </p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="text-right">
                                                                        <a href="" className="text-muted">
                                                                            <img src={fabienImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                        <a href="" className="text-muted">
                                                                            <img src={alexImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                        <a href="" className="text-muted">
                                                                            <img src={keplerImg}
                                                                                 alt="task-user"
                                                                                 className="avatar-sm img-thumbnail rounded-circle"/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </div>
                                                }
                                            </div>
                                            {
                                                this.state.beneficaire !== "" &&
                                                <div>

                                                    <div className="row" style={{marginTop: 25}}>
                                                        <div className="col-md-6 ">
                                                            <h5>Entre :</h5>
                                                            <div className="widget-rounded-circle card-box background-gainboro">
                                                                <div className="row align-items-center">
                                                                    <div className="col-auto">
                                                                        <div className="avatar-lg">
                                                                            <img src={enIcon} className="img-fluid rounded-circle"
                                                                                 alt="user-img"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <h5 className="mb-1 mt-2 font-16">{this.state.entreprise.sName}</h5>
                                                                        <p className="mb-2 text-muted">
                                                                            {this.state.entreprise.sSiege.adress + ', ' + this.state.entreprise.sSiege.postalCode + ', ' + this.state.entreprise.sSiege.pays}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.state.beneficaire !== "" &&
                                                            <div className="col-md-6 ">
                                                                <h5>Et :(Bénéficaire)</h5>
                                                                <div className="widget-rounded-circle card-box background-gainboro">
                                                                    <div className="row align-items-center">
                                                                        <div className="col-auto">
                                                                            <div className="avatar-lg">
                                                                                <img src={user3}
                                                                                     className="img-fluid rounded-circle"
                                                                                     alt="user-img"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <h5 className="mb-1 mt-2 font-16">
                                                                                {this.state.beneficaire.firstname + " " + this.state.beneficaire.lastname}</h5>
                                                                            <p className="mb-2 text-muted">
                                                                                {this.state.beneficaire.adress + ', ' + this.state.beneficaire.postalCode + ', ' + this.state.beneficaire.pays}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                    {
                                                        this.state.emissionBSA.map((item,key)=>(
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <h5>Type</h5>
                                                                    <div className="">
                                                                        <span className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                                        &nbsp;de&nbsp;&nbsp;
                                                                        <span>
                                                 <input className="form-control"
                                                        value={this.state.emissionBSA[key].nb}
                                                        onChange={this.handleArrayObjectChange("emissionBSA","nb",key)}
                                                        style={{width: "30%", display: "inherit", height: 35}}
                                                        type="text" id="nbaction"/>
                                                </span>
                                                                        <span className="badge bg-soft-info text-info p-1"
                                                                              style={{marginLeft: 8}}>BSA</span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <h5>Date de levée d'option :</h5>
                                                                    <div className="">
                                                <span>
                                                 <input className="form-control"
                                                        onChange={this.handleArrayObjectChange("emissionBSA","dateLeveeOption",key)}
                                                        style={{width: "60%", display: "inherit", height: 35}}
                                                        type="date" id="nbaction"/>
                                                </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="row" style={{marginTop: 15}}>
                                                        <div className="col-md-12">
                                                            <div className="text-center">
                                                                <Button className="btn waves-effect btn-primary waves-light"
                                                                        onClick={this.addBSA}>
                                                                    BSA suivant pour le meme actionnaire
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            }


                                            <div style={{
                                                marginLeft: '20%',
                                                marginRight: '20%',
                                                height: 1,
                                                backgroundColor: "#C0C0C0",
                                                marginTop: 45
                                            }}/>
                                        </div>

                                        <div className="row" style={{marginTop: 15}}>
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <Button color="primary" className="btn btn-danger waves-effect waves-light"
                                                            disabled={this.verifEmissionBSA()}
                                                            onClick={() => {
                                                                this.saveBSA();
                                                            }}>
                                                        {this.state.loading ?
                                                            <div className="spinner-border avatar-xs text-white m-1"
                                                                 role="status"></div> : "Confirmer l'émission"
                                                        }
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </Suspense>
                        </Container>
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

            </div>
        )
    }

}

export default affectationBSA;