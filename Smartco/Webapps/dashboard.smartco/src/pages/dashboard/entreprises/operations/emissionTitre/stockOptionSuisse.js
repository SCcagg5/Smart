import React, {Component, Suspense} from "react";
import user3 from "../../../../../assets/images/users/default_avatar.jpg";
import enIcon from "../../../../../assets/images/entreprise-icon.png";
import {Button as ButtonR, Container, FormGroup, Label} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import MySnackbarContentWrapper from "../../../../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import fabienImg from "../../../../../assets/images/avocats/fabian.png"
import alexImg from "../../../../../assets/images/avocats/alex.jpg"
import keplerImg from "../../../../../assets/images/avocats/aKapeller.jpg"
import Loader from "../../../../../components/Loader";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AvFeedback, AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import countryList from "../../../../../tools/countryList";
import {Line} from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../../../../../components/TopBar/TopBar";
import logo from "../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../components/SideMenu/SideMenu";
import data from "../../../../../data/data";
import SideBar from "../../../../../components/SideBar/SideBar";



class stockOptionSuisse extends Component {

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
            operations: []
        }],
    };

    state = {
        openAlert: false,
        alertMessage: '',
        alertType: '',
        selectedSieMenuItem: "soc",
        openSideMenu: false,
        showSecondSideBar: false,
        loading: false,
        entreprise: "",
        beneficaire:"",
        beneficaireNonActio: {
            id: '_' + Math.random().toString(36).substr(2, 9),
            email: '',
            pwd: Math.random().toString(36).substr(2, 5),
            phone: '',
            type: 'Un particulier',
            civility: 'M.',
            firstname: '',
            lastname: '',
            adress: '',
            postalCode: '',
            pays: 'Suisse',
            ville: '',
            birthday: '',
            nationality: '',
            representant: [{
                rep_firstname: '',
                rep_lastname: '',
            }],
            ej_name: '',
            formeSocial: 'SARL',
            typeTmp: 'Un particulier'
        },
        nbBSA: '',
        dateLeveeOption: '',
        emissionBSA: [],
        models: [],

        openModalGroupe: false,
        selectedGroupe: "",

        showModalNewPerson:false,
        isActioSelected:false,
        choixActio:"old",

        data: {
            labels: ['Jan', 'Fév', 'Mars', 'Avr', 'May', 'juin', 'juill','Aout','Sep','Oct','Nov','Déc'],
            datasets: [
                {
                    label: 'Répartition au cours du temps',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [10,15, 15, 20,20,25,25,30,30,35,35,40,40,45,45,50,50,90,95,100]
                }
            ]
        },

        vestingNbMonths:6,
        dateDebVesting:new Date(),
        firstDebNbMonth:4,
        selectedFirstRatio:5,
        selectedImmRatio:5,

        vestingArrayLineMonths:[
            moment(new Date()).format("DD MMM YYYY"),
            moment(new Date()).add(4,'month').format("DD MMM YYYY"),
            moment(new Date()).add(5,'month').format("DD MMM YYYY"),
            moment(new Date()).add(6,'month').format("DD MMM YYYY"),
            moment(new Date()).add(7,'month').format("DD MMM YYYY"),
            moment(new Date()).add(8,'month').format("DD MMM YYYY"),
            moment(new Date()).add(9,'month').format("DD MMM YYYY"),
        ],

        vestingArrayLineSeries:[
            5,5,10,15,20,25,30
        ]




    };


    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            firebase.database().ref("/society/"+this.props.location.state.entreprise.uniqueId).on("value",(snapshot) => {
                const societie = snapshot.val();
                console.log(societie)
                this.setState({
                    entreprise: societie,
                    models: societie.modelesSO || [],
                })
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

    showActio = (actioEmail) => {
        let allActios = (this.state.entreprise.sAssociate || []);
        let actio = allActios.find(x => x.email === actioEmail);
        this.setState({
            beneficaire: actio
        })
    };

    saveBSA = () => {

        this.setState({loading: true});

        const entreprise = this.state.entreprise;
        let sAssociate = entreprise.sAssociate || [];
        let beneficiaire;

        if(this.state.beneficaire.email !== ""){
            beneficiaire = sAssociate.find(x => x.email === this.state.beneficaire.email);
        }
        if(this.state.beneficaireNonActio.email !== ""){
            beneficiaire = this.state.beneficaireNonActio;
        }

            let titresBSA = this.state.entreprise.titresBSA || [];
            titresBSA.push({'operations': this.state.emissionBSA,'beneficiaire':beneficiaire});

            firebase.database().ref('society/' + localStorage.getItem("uid")+"Suisse").update({
                'titresBSA': titresBSA
            }).then(res => {
                this.openSnackbar('success', "Opération effectué avec succès");
                this.setState({
                    beneficaire: "",
                    loading: false
                });
                setTimeout(() => {
                    this.props.history.push("/gestion/entreprises/operations/emissionTitres/stockOption/Details", {
                        entreprise: this.state.entreprise,
                        beneficiaire: beneficiaire,
                        typeActio: "associate"
                    })
                }, 500);

            }).catch(err => {
                console.log(err);
            })



    };

    handleArrayObjectChange = (object, name, key) => event => {
        let objCopy = this.state[object];
        objCopy[key][name] = event.target.value;
        this.setState({
            [object]: objCopy
        })
    };

    addBSA = () => {
        let copyOfBSA = this.state.emissionBSA;
        copyOfBSA.push({
            dateMAJ: new Date(),
            nb: '',
            dateLeveeOption: '',

            ordinaryShares: "0.1", //manuel
            preferredShares: "0.1", //manuel
            startExerciseMonth: moment(this.state.selectedGroupe.dateDV).format("MMMM"),

            nbMonthsAfterDeath: "6",  //manuel

            nbMonthsAfterEndOfExercise: this.state.selectedGroupe.nbMonthsAfterEndContrat,
            nbDaysAfterEndContrat: "10",  //manuel
            canton: this.state.entreprise.sSiege.canton,
            Currency: this.state.selectedGroupe.currency,
            strikePrice:(parseInt(this.state.selectedGroupe.prixUnitaire)+ parseInt(this.state.selectedGroupe.prixEmission)).toString()
        });
        this.setState({
            emissionBSA: copyOfBSA
        })
    };

    verifEmissionBSA() {
        let test = false;
        if (this.state.beneficaire === "") return true;
        for (let i = 0; i < this.state.emissionBSA.length; i++) {
            let item = this.state.emissionBSA[i];
            if (item.nb === "" || item.dateLeveeOption === "") test = true;
        }
        return test;
    }


    saveGroupe = () => {

        this.setState({openModalGroupe: false});
    };

    addModele = (event, values) => {
        let models = this.state.models;
        models.push({
            nom: values.nonM,
            typeAction: values.typeM,
            prixnominal: values.prixNominal,
            prixEmission: values.primeE,
            dateDV: this.state.dateDebVesting,
            nbVestingMonths: values.nbVestingMonths,
            firstDebloc: values.firstDebloc,
            ratioFirstDebloc: values.ratioFirstDebloc,
            ratioDeblocImm: values.ratioDebloc,
            deblocTimes: values.deblocTimes,
            nbMonthsAfterEndContrat:values.nbMonthsAfterEndContrat,
            currency:values.currency,
            prixUnitaire:values.prixUnitaire
        });
        firebase.database().ref("/society/" + this.props.location.state.entreprise.uniqueId).update({
            'modelesSO': models
        }).then(ok => {
            this.setState({openModalGroupe: false});
            this.openSnackbar('success', "modéle ajouté avec succès");
        })
    };

    addNewPerson = (event, values) => {

        let beneficiaire = this.state.beneficaireNonActio;
        beneficiaire.type = values['formeBen'] || "";
        beneficiaire.gender = values['civiliteBen'] || "";
        beneficiaire.firstname = values['firstnameBen'] || "";
        beneficiaire.lastname = values['lastnameBen'] || "";
        beneficiaire.email = values['emailBen'];
        beneficiaire.birthday = values['birthdayBen'] || "";
        beneficiaire.nationality = values['nationalityBen'] || "";
        beneficiaire.adress = values['adressBen'];
        beneficiaire.ville = values['villeBen'];
        beneficiaire.postalCode = values['postalCodeBen'];
        beneficiaire.pays = values['paysBen'];
        beneficiaire.formeSocial = values['formeBen'] || "";
        beneficiaire.ej_name = values['ejname'] || "";

        let repCopy = this.state.beneficaireNonActio.representant || [];
        repCopy.map((rep, repkey) => {
            beneficiaire.representant[repkey].rep_firstname = values['repnom' + "_" + repkey] || "";
            beneficiaire.representant[repkey].rep_lastname = values['repprenom' + "_" + repkey] || "";
        });

        this.setState({beneficaireNonActio:beneficiaire,showModalNewPerson:false})

    };

    handleTypeTmpChange = ( value)  => {
        let actiosCopy = this.state.beneficaireNonActio;
        actiosCopy.typeTmp = value;
        this.setState({beneficaireNonActio: actiosCopy})
    };

    addRepresentant = () => event => {
        let objCopy = this.state.beneficaireNonActio;
        objCopy.representant.push({
            rep_firstname: '',
            rep_lastname: '',
        });
        this.setState({
            beneficaireNonActio: objCopy
        })

    };


    handleOnChangePhone = (value) => {
            let objCopy = this.state.beneficaireNonActio;
            objCopy.phone = value;
            this.setState({beneficaireNonActio: objCopy});
    };

    render() {
        const entreprise = this.state.entreprise;
        const actios = (entreprise.sAssociate || []);
        const models = this.state.models;

        return (
            <div>

                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>
                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>

                    <div className="card" style={{marginTop: 25}}>
                        <div className="card-body ">
                            <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                               onClick={() => this.props.history.goBack()}
                               className="float-right text-info">Retour</a>
                            <h4 className=" mt-0 mb-1">Stock option</h4>
                            <div>

                                {
                                    this.state.isActioSelected === false ?
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <div className="form-group mb-2">
                                                    <label htmlFor="example-select" className="font-weight-bold" >Si le bénéficiaires est déjà actionnaire de la société</label>
                                                    <div className="radio radio-pink mt-2 mb-2">
                                                        <input type="radio" name="rChoixActio" id="rChoixActio1"
                                                               style={{marginLeft: 10}} checked={this.state.choixActio === "old"}
                                                               value={this.state.choixActio}
                                                               onClick={() => this.setState({choixActio:"old"})}/>
                                                        <label htmlFor="rChoixActio1">Choisir un actionnaire de la société</label>
                                                    </div>
                                                    <select className="form-control custom-select"
                                                            disabled={this.state.choixActio === "new"}
                                                            id="example-select"
                                                            onChange={(event) => this.showActio(event.target.value)}>
                                                        <option
                                                            selected={this.state.beneficaire === ""}>Sélectionner un actionnaire
                                                        </option>
                                                        {
                                                            actios.map((item, key) => (
                                                                <option
                                                                    value={item.email}>{item.ej_name === "" ? item.firstname + ' ' + item.lastname : item.ej_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mt-2">
                                                        <div className="form-group mb-2">
                                                            <label htmlFor="example-select" className="font-weight-bold" >Si c’est une personne non actionnaire</label>
                                                            <div className="radio radio-pink mt-2 mb-2">
                                                                <input type="radio" name="rChoixActio" id="rChoixActio2"
                                                                       style={{marginLeft: 10}} checked={this.state.choixActio === "new"}
                                                                       value={this.state.choixActio}
                                                                       onClick={() => this.setState({choixActio:"new"})}/>
                                                                <label htmlFor="rChoixActio2">Indiquer les informations du bénéficiaire</label>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   readOnly={true}
                                                                   disabled={this.state.choixActio === "old"}
                                                                   value={this.state.beneficaireNonActio.ej_name === "" ? this.state.beneficaireNonActio.firstname + " " + this.state.beneficaireNonActio.lastname : this.state.beneficaireNonActio.ej_name}
                                                                   placeholder="Nom & prénom... du bénéficiaire"
                                                                   onClick={() => this.setState({showModalNewPerson:true})}/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-2">
                                            </div>
                                            {
                                                this.state.beneficaire !== "" &&
                                                <div className="col-md-3">
                                                    <li className="task-info" id="task7" onClick={() => {
                                                        window.open("http://www.smartcoagenda.com/SmartCo/avocats", "_blank");
                                                    }}
                                                        style={{
                                                            border: "1px solid #dee2e6",
                                                            padding: 20,
                                                            marginBottom: 15,
                                                            borderRadius: 3,
                                                            cursor: "pointer"
                                                        }}>
                                                            <span
                                                                className="badge bg-soft-danger text-danger float-right"> -> </span>
                                                        <h5 className="mt-0">
                                                            <a href="" className="text-dark">Vous avez des questions
                                                                ?</a>
                                                        </h5>
                                                        <p>Vous pouvez prendre rendez-vous avec l'un de nos
                                                            avocats </p>
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
                                        </div> :

                                        <div>
                                            <div className="row mt-2">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <label htmlFor="example-select" className="font-weight-bold" >Le bénéficiaire est</label>

                                                        <input type="text" readOnly={true} className="form-control"
                                                               value={this.state.choixActio === "old" ? this.state.beneficaire.ej_name === "" ?
                                                                   this.state.beneficaire.firstname + " " + this.state.beneficaire.lastname :
                                                                   this.state.beneficaire.ej_name : this.state.beneficaireNonActio.ej_name === "" ?
                                                                   this.state.beneficaireNonActio.firstname + " " +this.state.beneficaireNonActio.lastname :
                                                                   this.state.beneficaireNonActio.ej_name
                                                               }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="row mt-2">
                                                    <div className="col-md-6">
                                                        <div className="form-group mb-3">
                                                            <label htmlFor="example-select">Choisir un modéle de groupe</label>
                                                            <select className="form-control custom-select"
                                                                    id="example-select"
                                                                    onChange={(event) => {
                                                                        let groupe = this.state.models.find(x => x.nom === event.target.value);
                                                                        let copyOfBSA = this.state.emissionBSA;
                                                                        copyOfBSA.push({
                                                                            dateMAJ: new Date(),
                                                                            nb: '',
                                                                            dateLeveeOption: '',

                                                                            ordinaryShares: "0.1", //manuel
                                                                            preferredShares: "0.1", //manuel
                                                                            startExerciseMonth: moment(groupe.dateDV).format("MMMM"),

                                                                            nbMonthsAfterDeath: "6",  //manuel

                                                                            nbMonthsAfterEndOfExercise: groupe.nbMonthsAfterEndContrat,
                                                                            nbDaysAfterEndContrat: "10",  //manuel
                                                                            canton: this.state.entreprise.sSiege.canton,
                                                                            Currency: groupe.currency,
                                                                            strikePrice:(parseInt(groupe.prixUnitaire)+ parseInt(groupe.prixEmission)).toString()
                                                                        });
                                                                        this.setState({selectedGroupe:groupe,emissionBSA: copyOfBSA})
                                                                    } }>
                                                                <option
                                                                    selected={this.state.selectedGroupe === ""}>Sélectionner
                                                                    un modéle
                                                                </option>
                                                                {
                                                                    models.map((item, key) => (
                                                                        <option value={item.nom}>{item.nom}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ButtonR color="primary"
                                                         className="btn btn-info waves-effect waves-light"
                                                         onClick={() => this.setState({openModalGroupe: true})}>
                                                    Ajouter un modéle
                                                </ButtonR>
                                            </div>
                                        </div>
                                }


                                {
                                    this.state.selectedGroupe !== "" &&
                                    <div>

                                        <div className="row" style={{marginTop: 25}}>
                                            <div className="col-md-6 ">
                                                <h5>Entre :</h5>
                                                <div
                                                    className="widget-rounded-circle card-box background-gainboro">
                                                    <div className="row align-items-center">
                                                        <div className="col-auto">
                                                            <div className="avatar-lg">
                                                                <img src={enIcon}
                                                                     className="img-fluid rounded-circle"
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
                                                (this.state.beneficaire !== "" || this.state.beneficaireNonActio !== "") &&
                                                <div className="col-md-6 ">
                                                    <h5>Et :(Bénéficaire)</h5>
                                                    <div
                                                        className="widget-rounded-circle card-box background-gainboro">
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
                                                                    {
                                                                        this.state.choixActio === "old" ? this.state.beneficaire.ej_name === "" ?
                                                                            this.state.beneficaire.firstname+" "+this.state.beneficaire.lastname : this.state.beneficaire.ej_name :
                                                                            this.state.beneficaireNonActio.ej_name === "" ? this.state.beneficaireNonActio.firstname+" "+this.state.beneficaireNonActio.lastname : this.state.beneficaireNonActio.ej_name
                                                                    }
                                                                </h5>
                                                                <p className="mb-2 text-muted">
                                                                    {this.state.beneficaire.adress + ', ' + this.state.beneficaire.postalCode + ', ' + this.state.beneficaire.pays}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                        {
                                            this.state.emissionBSA.map((item, key) => (
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <h5>Type</h5>
                                                        <div className="">
                                                                        <span
                                                                            className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                            &nbsp;de&nbsp;&nbsp;
                                                            <span>
                                                                       <input className="form-control"
                                                                              value={this.state.emissionBSA[key].nb}
                                                                              onChange={this.handleArrayObjectChange("emissionBSA", "nb", key)}
                                                                              style={{width: "30%", display: "inherit", height: 35}}
                                                                              type="text" id="nbaction"/>
                                                                       </span>
                                                            <span
                                                                className="badge bg-soft-info text-info p-1"
                                                                style={{marginLeft: 8}}>{this.state.selectedGroupe.typeAction} </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <h5>Date de levée d'option :</h5>
                                                        <div className="">
                                                <span>
                                                 <input className="form-control"
                                                        onChange={this.handleArrayObjectChange("emissionBSA", "dateLeveeOption", key)}
                                                        style={{width: "60%", display: "inherit", height: 35}}
                                                        type="date" id="nbaction"/>
                                                </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-1">
                                                        <i className="fa fa-minus-circle font-20 text-danger" style={{marginTop:"45px",cursor:"pointer"}} onClick={() =>{
                                                            let tab = this.state.emissionBSA;
                                                            if(key !== 0){
                                                                tab.splice(key,1);
                                                                this.setState({emissionBSA:tab})
                                                            }

                                                        }}/>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className="row" style={{marginTop: 15}}>
                                            <div className="col-md-12">
                                                <div className="text-center">
                                                    <ButtonR
                                                        className="btn waves-effect btn-primary waves-light"
                                                        onClick={this.addBSA}>
                                                        BSA suivant pour le meme actionnaire
                                                    </ButtonR>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="mt-3 mb-3">Groupe</h5>
                                        <div style={{padding:"2%",border:"2px solid #C0C0C0",marginLeft:"2%",marginRight:"7%"}}>
                                            <AvForm>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="nonM" className="text-dark font-17 font-weight-bold">Non du groupe</Label>
                                                            <AvInput type="text" name="nonM" id="NonM" disabled
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     placeholder="Ex: Serie AA-21, Ex: BSA-2019"
                                                                     value={this.state.selectedGroupe.nom}/>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="type" className="text-dark font-17 font-weight-bold">Titre
                                                                sous-jacent</Label>
                                                            <AvInput type="text" name="typeM" id="typeM" disabled
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.typeAction}/>
                                                        </AvGroup>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Dans quelle devise les options seront-elles exercées ?</Label>
                                                        <AvInput type="text" name="currency" id="currency"
                                                                 style={{height: 45, fontSize: "1.1rem"}}
                                                                 disabled
                                                                 value={this.state.selectedGroupe.currency}/>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="prixUnitaire" className="text-dark font-17 font-weight-bold">Quel est le prix unitaire d'exercice des options accordé ?</Label>
                                                            <AvInput type="numtextber" name="prixUnitaire" id="prixUnitaire"
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.prixUnitaire} disabled/>
                                                        </AvGroup>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="prixNominal" className="text-dark font-17 font-weight-bold">Prix
                                                                nominal par tittre</Label>
                                                            <AvInput type="text" name="prixNominal" id="prixNominal"
                                                                     style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                     value={this.state.selectedGroupe.prixnominal}/>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="type" className="text-dark font-17 font-weight-bold">Prime
                                                                d'émission par titre</Label>
                                                            <AvInput type="text" name="primeE" id="primeE" disabled
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.prixEmission}/>
                                                        </AvGroup>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="dateDV" className="text-dark font-17 font-weight-bold datepicker-dropdown">Date de début
                                                                du vesting</Label>
                                                            <AvInput type="date" name="dateDV" id="dateDV" disabled
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.dateDV}/>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="nbVestingMonths" className="text-dark font-17 font-weight-bold">Durée
                                                                total en mois du vesting</Label>
                                                            <AvInput type="text" name="nbVestingMonths" id="nbVestingMonths"
                                                                     style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                     value={this.state.selectedGroupe.nbVestingMonths}/>
                                                        </AvGroup>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="firstDebloc" className="text-dark font-17 font-weight-bold">Premier
                                                                débloquage au bout de </Label>
                                                            <AvInput type="text" name="firstDebloc" id="firstDebloc"
                                                                     style={{height: 45, fontSize: "1.1rem"}} disabled
                                                                     value={this.state.selectedGroupe.firstDebloc}/>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="ratioFirstDebloc" className="text-dark font-17 font-weight-bold">Ratio
                                                                à débloquer la première fois (%) </Label>
                                                            <AvInput type="text" name="ratioFirstDebloc" id="ratioFirstDebloc"
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.ratioFirstDebloc} disabled/>
                                                        </AvGroup>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="ratioDebloc" className="text-dark font-17 font-weight-bold">Ratio à
                                                                débloquer immédiatement (%) </Label>
                                                            <AvInput type="text" name="ratioDebloc" id="ratioDebloc"
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.ratioDeblocImm} disabled/>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="deblocTimes" className="text-dark font-17 font-weight-bold">Débloquage
                                                                tous les</Label>
                                                            <AvInput type="text" name="deblocTimes" id="deblocTimes" disabled
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.deblocTimes}/>
                                                        </AvGroup>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="nbDaysAfterEndContrat" className="text-dark font-17 font-weight-bold">Pendant combien de mois après la fin de la relation contractuelle, les options peuvent-elles etre exercées ?</Label>
                                                            <AvInput type="text" name="nbMonthsAfterEndContrat" id="nbMonthsAfterEndContrat"
                                                                     style={{height: 45, fontSize: "1.1rem"}}
                                                                     value={this.state.selectedGroupe.nbMonthsAfterEndContrat} disabled/>
                                                        </AvGroup>
                                                    </div>
                                                </div>
                                            </AvForm>
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
                                        <ButtonR className="btn btn-light waves-effect waves-light"
                                                 onClick={() => {
                                                     this.setState({isActioSelected:false,selectedGroupe:""})
                                                 }}>
                                            Précedent
                                        </ButtonR>
                                        <ButtonR color="primary"
                                                 className="btn btn-danger waves-effect waves-light ml-2"
                                                 disabled={(this.state.beneficaire === "" && this.state.choixActio === "old" ) || (this.state.beneficaireNonActio.email === "" && this.state.choixActio === "new" ) || (this.state.selectedGroupe === "" && this.state.isActioSelected === true)}
                                                 onClick={() => {
                                                     this.state.isActioSelected === false ? this.setState({isActioSelected:true})   :  this.saveBSA()
                                                 }}>
                                            {
                                                this.state.loading ?
                                                    <div className="spinner-border avatar-xs text-white m-1"
                                                         role="status"/> :
                                                    this.state.isActioSelected === true ? "Confirmer l'émission" : "Suivant"
                                            }
                                        </ButtonR>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>





                <Dialog open={this.state.openModalGroupe} onClose={() => this.setState({openModalGroupe: false})}
                        fullWidth={false}
                        maxWidth={"60%"}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{color:"red"}}>Créer un modéle</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Un modéle est un groupe de titres avec des caractéristiques communes, que vous pourez
                            attribuer à plusieurs acteurs
                        </DialogContentText>

                        {
                            this.state.entreprise.sCapital &&

                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <AvForm onValidSubmit={this.addModele}>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="nonM" className="text-dark">Non donné à ce groupe de titres</Label>
                                                    <AvInput type="text" name="nonM" id="NonM"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             placeholder="Ex: Serie AA-21, Ex: BSA-2019"
                                                             value={""} required/>
                                                    <AvFeedback><p
                                                        style={{color: "#ff0046", fontSize: "0.9rem", fontWeight: 700}}>Veuillez
                                                        renseigner le nom de modéle</p></AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="type" className="text-dark">Titre sous-jacent</Label>
                                                    <AvInput type="select" name="typeM" id="typeM"
                                                             style={{height: 40, fontSize: "0.9rem"}} className="custom-select"
                                                             value={""}>
                                                        <option value="Action simple">Action simple</option>
                                                        <option value="BSPCE">BSPCE</option>
                                                        <option value="BSA">BSA</option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <Label for="prixNominal" className="text-dark">Dans quelle devise les options seront-elles exercées ?</Label>
                                                <AvInput type="select" name="currency" id="currency"  className="custom-select"
                                                         style={{height: 40, fontSize: "0.9rem"}}
                                                         placeholder=""
                                                         value={""}>
                                                    <option value="CHF">CHF</option>
                                                    <option value="EURO">€</option>
                                                </AvInput>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="prixUnitaire" className="text-dark">Quel est le prix unitaire d'exercice des options accordé ?</Label>
                                                    <AvInput type="number" name="prixUnitaire" id="prixUnitaire"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             placeholder=""
                                                             value={""} required/>
                                                    <AvFeedback><p
                                                        style={{color: "#ff0046", fontSize: "0.9rem", fontWeight: 700}}>Format
                                                        invalide</p></AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="prixNominal" className="text-dark">Prix nominal par tittre</Label>
                                                    <AvInput type="text" name="prixNominal" id="prixNominal"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             placeholder="" disabled
                                                             value={this.state.entreprise.sCapital.defaultNominalValue + " CHF" } />
                                                    <AvFeedback>
                                                        <p style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format invalide</p></AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="type" className="text-dark">Prime
                                                        d'émission par titre</Label>
                                                    <AvInput type="number" name="primeE" id="primeE"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             value={""}/>
                                                    <AvFeedback><p
                                                        style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                                        invalide</p></AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <Label for="dateDV" className="text-dark">Date de début du vesting</Label>
                                                    <DatePicker
                                                        selected={this.state.dateDebVesting}
                                                        onChange={ date => {
                                                            let vestingArrMonths = [];
                                                            let vestingArraySeries = [];
                                                            vestingArrMonths.push(moment(date).format("DD MMM YYYY"));
                                                            vestingArraySeries.push(this.state.selectedFirstRatio);
                                                            vestingArraySeries.push(this.state.selectedFirstRatio);
                                                            let somme = this.state.selectedFirstRatio;
                                                            for(let i = 0 ; i < this.state.vestingNbMonths; i++){
                                                                somme = somme + this.state.selectedImmRatio;
                                                                vestingArrMonths.push(moment(date).add(i+1,"month").format("DD MMM YYYY"));
                                                                vestingArraySeries.push(somme);
                                                            }
                                                            this.setState({
                                                                dateDebVesting:date,
                                                                vestingArrayLineMonths:vestingArrMonths,
                                                                vestingArrayLineSeries:vestingArraySeries
                                                            })
                                                        }}
                                                        inline
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="nbVestingMonths" className="text-dark">Durée total en mois du vesting</Label>
                                                    <AvInput type="select" name="nbVestingMonths" id="nbVestingMonths"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             onChange={(event) => {

                                                                 let vestingArrMonths = [];
                                                                 let vestingArraySeries = [];
                                                                 vestingArraySeries.push(this.state.selectedFirstRatio);
                                                                 vestingArraySeries.push(this.state.selectedFirstRatio);
                                                                 vestingArrMonths.push(moment(this.state.dateDebVesting).format("DD MMM YYYY"));
                                                                 let somme = this.state.selectedFirstRatio;
                                                                 for(let i = 0 ; i < event.target.value; i++){
                                                                     somme = somme + this.state.selectedImmRatio;
                                                                     vestingArrMonths.push(moment(this.state.dateDebVesting).add(i+1,"month").format("DD MMM YYYY"));
                                                                     vestingArraySeries.push(somme);
                                                                 }
                                                                 this.setState({vestingNbMonths:event.target.value,
                                                                     vestingArrayLineMonths:vestingArrMonths,
                                                                     vestingArrayLineSeries:vestingArraySeries})
                                                             }}
                                                             value={this.state.vestingNbMonths} >
                                                        <option value={4}>4 mois</option>
                                                        <option value={6}>6 mois</option>
                                                        <option value={12}>12 mois</option>
                                                        <option value={24}>24 mois</option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="firstDebloc" className="text-dark">Premier
                                                        débloquage au bout de </Label>
                                                    <AvInput type="select" name="firstDebloc" id="firstDebloc"
                                                             value={this.state.firstDebNbMonth}
                                                             onChange={(event) => this.setState({firstDebNbMonth:event.target.value})}
                                                             style={{height: 40, fontSize: "0.9rem"}} className="custom-select"
                                                    >
                                                        <option value={0}>0 mois</option>
                                                        <option value={4}>4 mois</option>
                                                        <option value={6}>6 mois</option>
                                                        <option value={12}>12 mois</option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="ratioFirstDebloc" className="text-dark">Ratio
                                                        à débloquer la première fois (%) </Label>
                                                    <AvInput type="select" name="ratioFirstDebloc" id="ratioFirstDebloc"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             value={this.state.selectedFirstRatio}
                                                             onChange={(event) => this.setState({selectedFirstRatio:event.target.value})} >
                                                        <option value={5}>5 %</option>
                                                        <option value={6}>6 %</option>
                                                        <option value={7}>7 %</option>
                                                        <option value={8}>8 %</option>
                                                        <option value={9}>9 %</option>
                                                        <option value={10}>10 %</option>
                                                        <option value={15}>15 %</option>
                                                        <option value={20}>20 %</option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="ratioDebloc" className="text-dark">Ratio à
                                                        débloquer immédiatement (%) </Label>
                                                    <AvInput type="select" name="ratioDebloc" id="ratioDebloc"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             value={this.state.selectedImmRatio}
                                                             onChange={(event) => {
                                                                 let vestingArraySeries = [];
                                                                 vestingArraySeries.push(this.state.selectedFirstRatio);
                                                                 vestingArraySeries.push(this.state.selectedFirstRatio);
                                                                 let somme = this.state.selectedFirstRatio;
                                                                 for(let i = 0 ; i < this.state.vestingNbMonths; i++){
                                                                     somme = somme + parseInt(event.target.value);
                                                                     console.log(somme);
                                                                     vestingArraySeries.push(somme);
                                                                 }
                                                                 console.log(vestingArraySeries);
                                                                 this.setState({selectedImmRatio:event.target.value,vestingArrayLineSeries:vestingArraySeries})
                                                             }}>
                                                        <option value={5}>5 %</option>
                                                        <option value={6}>6 %</option>
                                                        <option value={7}>7 %</option>
                                                        <option value={8}>8 %</option>
                                                        <option value={9}>9 %</option>
                                                        <option value={10}>10 %</option>
                                                        <option value={15}>15 %</option>
                                                        <option value={20}>20 %</option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="deblocTimes" className="text-dark">Débloquage
                                                        tous les</Label>
                                                    <AvInput type="text" name="deblocTimes" id="deblocTimes" disabled
                                                             style={{height: 40, fontSize: "0.9rem"}} className="form-control"
                                                             value={ ((100 - this.state.selectedImmRatio) / (this.state.firstDebNbMonth ? this.state.firstDebNbMonth : 1)).toFixed(2)  }/>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="nbDaysAfterEndContrat" className="text-dark">Pendant combien de mois après la fin de la relation contractuelle, les options peuvent-elles etre exercées ?</Label>
                                                    <AvInput type="number" name="nbMonthsAfterEndContrat" id="nbMonthsAfterEndContrat"
                                                             style={{height: 40, fontSize: "0.9rem"}}
                                                             value={""} required/>
                                                    <AvFeedback>
                                                        <p style={{color: "#ff0046", fontSize: "0.99rem", fontWeight: 700}}>Format
                                                            invalide</p></AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>


                                        <div className="text-right">
                                            <FormGroup>
                                                <ButtonR className="btn btn-danger">Créer</ButtonR>
                                            </FormGroup>
                                        </div>

                                    </AvForm>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="header-title mb-2">Répartition au cours du temps (%) </h4>
                                    <Line data={{
                                        labels: this.state.vestingArrayLineMonths,
                                        datasets: [
                                            {
                                                label: 'Répartition au cours du temps',
                                                fill: false,
                                                lineTension: 0.1,
                                                backgroundColor: 'rgba(75,192,192,0.4)',
                                                borderColor: 'rgba(75,192,192,1)',
                                                borderCapStyle: 'butt',
                                                borderDash: [],
                                                borderDashOffset: 0.0,
                                                borderJoinStyle: 'miter',
                                                pointBorderColor: 'rgba(75,192,192,1)',
                                                pointBackgroundColor: '#fff',
                                                pointBorderWidth: 1,
                                                pointHoverRadius: 5,
                                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                                pointHoverBorderWidth: 2,
                                                pointRadius: 1,
                                                pointHitRadius: 10,
                                                data: this.state.vestingArrayLineSeries
                                            }
                                        ]
                                    }}
                                          options={{bezierCurve : false}}
                                          legend={{position: 'bottom'}}/>
                                </div>
                            </div>


                        }


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openModalGroupe: false})} color="primary">
                            Fermer
                        </Button>
                    </DialogActions>
                </Dialog>


                {/*Modal New Person*/}

                <Dialog open={this.state.showModalNewPerson} onClose={() => this.setState({showModalNewPerson: false})}
                        fullWidth={false}
                        maxWidth={"60%"}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Détails du bénéficiaire</DialogTitle>
                    <DialogContent>
                        <AvForm onValidSubmit={(event, values) => this.addNewPerson(event, values)}>

                                    <div>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="forme">Le bénéficiaire est</Label>
                                                    <AvInput type="select"
                                                             name={"formeBen"}
                                                             id={"formeBen"}
                                                             onChange={(event) => this.handleTypeTmpChange(event.target.value)}>
                                                        <option
                                                            value="Un particulier">Un particulier
                                                        </option>
                                                        <option
                                                            value="Une entité juridique">Une entité juridique
                                                        </option>
                                                    </AvInput>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                {
                                                    this.state.beneficaireNonActio.typeTmp === "Un particulier" ?
                                                        <AvGroup className="mb-3">
                                                            <Label
                                                                for="role">Civilité</Label>
                                                            <AvInput type="select"
                                                                     name={"civiliteBen"}
                                                                     id={"civiliteBen"}
                                                                     value={this.state.beneficaireNonActio.gender}>
                                                                <option value="M.">M.
                                                                </option>
                                                                <option value="Mme">Mme
                                                                </option>
                                                            </AvInput>
                                                        </AvGroup> :
                                                        <AvGroup className="mb-3">
                                                            <Label for="role">Forme social</Label>
                                                            <AvInput type="select"
                                                                     name={"formeBen"}
                                                                     id={"formeBen"}
                                                                     value={this.state.beneficaireNonActio.formeSocial}>
                                                                <option value="SARL">SARL</option>
                                                                <option value="SA">SA</option>
                                                            </AvInput>
                                                        </AvGroup>
                                                }

                                            </div>
                                        </div>
                                        {
                                            this.state.beneficaireNonActio.typeTmp !== "Un particulier" &&
                                            [(this.state.beneficaireNonActio.representant || []).map((rep, keyrep) => (
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="email">Nom du représentant</Label>
                                                            <AvInput type="text"
                                                                     name={"repnom" + "_" + keyrep}
                                                                     id={"repnom" + "_" + keyrep}
                                                                     value={this.state.beneficaireNonActio.representant[keyrep].rep_firstname}
                                                                     required/>
                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                        </AvGroup>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <AvGroup className="mb-3">
                                                            <Label for="email">Prénom du représentant</Label>
                                                            <AvInput type="text"
                                                                     name={"repprenom" + "_" + keyrep}
                                                                     id={"repprenom" + "_" + keyrep}
                                                                     value={this.state.beneficaireNonActio.representant[keyrep].rep_lastname}
                                                                     required/>
                                                            <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                        </AvGroup>
                                                    </div>
                                                </div>
                                            )),

                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div
                                                            className="float-right">
                                                            <ButtonR onClick={this.addRepresentant()}
                                                                    className="btn btn-danger waves-effect waves-light">
                                                                Ajouter un autre représentant
                                                            </ButtonR>
                                                        </div>
                                                    </div>
                                                </div>
                                            ]
                                        }
                                        <div className="row">
                                            {
                                                this.state.beneficaireNonActio.typeTmp === "Un particulier" ?
                                                    [
                                                        <div className="col-lg-6">
                                                            <AvGroup
                                                                className="mb-3">
                                                                <Label for="nom">Nom</Label>
                                                                <AvInput type="text"
                                                                         name={"firstnameBen"}
                                                                         id={"firstnameBen"}
                                                                         value={this.state.beneficaireNonActio.firstname}
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
                                                                         name={"lastnameBen"}
                                                                         id={"lastnameBen"}
                                                                         value={this.state.beneficaireNonActio.lastname}
                                                                         required/>
                                                                <AvFeedback>Ce
                                                                    champs est
                                                                    obligatoire</AvFeedback>
                                                            </AvGroup>
                                                        </div>

                                                    ] :

                                                    <div className="col-lg-12">
                                                        <AvGroup className="mb-3">
                                                            <Label for="prenom">Nom de l'entité juridique</Label>
                                                            <AvInput type="text"
                                                                     name={"ejname"}
                                                                     id={"ejname"}
                                                                     value={this.state.beneficaireNonActio.ej_name}
                                                                     required/>
                                                            <AvFeedback>Ce champs est
                                                                obligatoire</AvFeedback>
                                                        </AvGroup>
                                                    </div>

                                            }


                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="email">Email</Label>
                                                    <AvInput type="email"
                                                             name={"emailBen" }
                                                             id={"emailBen"}
                                                             value={this.state.beneficaireNonActio.email}
                                                             required/>
                                                    <AvFeedback>Email invalide</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="password">Numéro de téléphone</Label>
                                                    <PhoneInput
                                                        defaultCountry={'fr'}
                                                        value={this.state.beneficaireNonActio.phone}
                                                        onChange={(value) => this.handleOnChangePhone(value)}
                                                        inputStyle={{
                                                            width: "inherit",
                                                            height: 37
                                                        }}/>
                                                </AvGroup>
                                            </div>
                                        </div>

                                        {
                                            this.state.beneficaireNonActio.typeTmp === "Un particulier" &&
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label for="datnaiss">Date de naissance</Label>
                                                        <AvInput type="date"
                                                                 name={"birthdayBen"}
                                                                 id={"birthdayBen"}
                                                                 value={this.state.beneficaireNonActio.birthday}
                                                                 required/>
                                                        <AvFeedback>Date invalide</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                                <div className="col-lg-6">
                                                    <AvGroup className="mb-3">
                                                        <Label
                                                            for="nationality">Nationnalité</Label>
                                                        <AvInput type="text"
                                                                 placeholder="origine (Si Suisse)"
                                                                 name={"nationalityBen"}
                                                                 id={"nationalityBen"}
                                                                 value={this.state.beneficaireNonActio.nationality}
                                                                 required/>
                                                        <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                    </AvGroup>
                                                </div>
                                            </div>
                                        }

                                        <h4 className="mb-3">
                                            {
                                                this.state.beneficaireNonActio.typeTmp === "Un particulier" ? "Adresse du bénéficiaire" : "Adresse du siège social"
                                            }
                                        </h4>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label
                                                        for="adress">Adresse</Label>
                                                    <AvInput type="text"
                                                             name={"adressBen"}
                                                             id={"adressBen"}
                                                             value={this.state.beneficaireNonActio.adress}
                                                             required/>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label
                                                        for="adress">Ville</Label>
                                                    <AvInput type="text"
                                                             name={"villeBen"}
                                                             id={"villeBen"}
                                                             value={this.state.beneficaireNonActio.ville}
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
                                                             name={"postalCodeBen"}
                                                             id={"postalCodeBen"}
                                                             value={this.state.beneficaireNonActio.postalCode}
                                                             required/>
                                                    <AvFeedback>Code postal invalide</AvFeedback>
                                                </AvGroup>
                                            </div>
                                            <div className="col-lg-6">
                                                <AvGroup className="mb-3">
                                                    <Label for="pays">Pays</Label>
                                                    <AvInput type="select"
                                                             name={"paysBen"}
                                                             id={"paysBen"}
                                                             value={this.state.beneficaireNonActio.pays}
                                                             required>
                                                        {
                                                            countryList.map((item, key) => (
                                                                <option
                                                                    value={item.Name}>{item.Name}</option>
                                                            ))
                                                        }
                                                    </AvInput>
                                                    <AvFeedback>Ce champs est obligatoire</AvFeedback>
                                                </AvGroup>
                                            </div>
                                        </div>
                                    </div>
                            <FormGroup style={{marginTop: 20}}>
                                <div className="float-right">
                                    <ButtonR className="btn btn-danger waves-effect waves-light">
                                        Valider
                                    </ButtonR>
                                </div>
                            </FormGroup>

                        </AvForm>
                    </DialogContent>
                </Dialog>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={6000}
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

export default stockOptionSuisse;