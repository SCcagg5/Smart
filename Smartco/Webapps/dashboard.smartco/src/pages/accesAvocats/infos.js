import React, {Component, Suspense} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import CalendarForm from "../../components/calendar/calendar";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import * as firebase from 'firebase';
import DefaultAvatar from "../../assets/images/users/default_avatar.jpg"
import uploadgif from "../../assets/images/upload.gif";
import Modal from 'react-responsive-modal';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";

moment.locale('fr');

const Topbar = React.lazy(() => import("../../components/TopBarAvocat"));
const Navbar = React.lazy(() => import("../../components/NavBarAvocat"));
const loading = () => <Loader/>;

class infos extends Component {

    constructor(props) {
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
    }

    state = {
        loading:false,
        openAlert: false,
        alertMessage: '',
        alertType: '',

        showDetail: false,
        events: [],
        avocat: JSON.parse(localStorage.getItem('user')),
        error: '',
        isMenuOpened: false,
        activeMenuItem: 'item-infos',

        add: '',
        showModalAdd: false,
        showModalAddEvent: false,
        eventTitle: '',
        eventStartFormat: '',
        eventEndFormat: '',
        eventStart: '',
        eventEnd: '',
        formationTmp: '',
        fonctionTmp: '',
        affiliationTmp: '',
        btnSaveSpinner: false,
        btnSaveEventSpinner: false,
        userImage: '',


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

    componentWillMount() {
        console.log("INFO AVOCAT PAGE")
    }


    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({isMenuOpened: !this.state.isMenuOpened});
    };

    toggleRightSidebar = () => {
        document.body.classList.toggle("right-bar-enabled");
    };


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };


    imageUpload = {};

    handleChange = (object, name) => event => {
        let obj = this.state[object];
        obj[name] = event.target.value;
        this.setState({
            [object]: obj
        });
    };

    openAddModal = (type) => event => {

        this.setState({
            add: type,
            showModalAdd: true,
        })
    };

    addItem = (type) => event => {
        if (type === 'formation') {
            let avocat = this.state.avocat;
            avocat.formations.push(this.state.formationTmp);

            this.setState({
                avocat: avocat,
                formationTmp: '',
                showModalAdd: false,
            })
        }
        if (type === 'fonction') {
            let avocat = this.state.avocat;
            avocat.fonctions.push(this.state.fonctionTmp);

            this.setState({
                avocat: avocat,
                fonctionTmp: '',
                showModalAdd: false,
            })
        }
        if (type === 'affiliation') {
            let avocat = this.state.avocat;
            avocat.affiliations.push(this.state.affiliationTmp);

            this.setState({
                avocat: avocat,
                affiliationTmp: '',
                showModalAdd: false,
            })
        }
    };

    removeItem = (type, index) => event => {

        if (type === 'formation') {
            let avocat = this.state.avocat;
            avocat.formations.splice(index, 1);
            this.setState({
                avocat: avocat
            })
        }
        if (type === 'fonction') {
            let avocat = this.state.avocat;
            avocat.fonctions.splice(index, 1);
            this.setState({
                avocat: avocat
            })
        }
        if (type === 'affiliation') {
            let avocat = this.state.avocat;
            avocat.affiliations.splice(index, 1);
            this.setState({
                avocat: avocat
            })
        }
    };

    saveChanges = () => {

        firebase.database().ref('users').update({
            [localStorage.getItem('uid')] : this.state.avocat
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(this.state.avocat));
            this.openSnackbar('success', "Modification effectuée avec succès");
        });
    };

    async uploadImage(image) {

        this.setState({loading:true});
        var storageRef = firebase.storage().ref().child('/avocats/images/' + image.target.files[0].name);
        var file = image.target.files[0];
        var uploadTask = storageRef.put(file);


        uploadTask.on('state_changed', snapshot => {

            //this.uploadPercent = progress.toFixed(2) + ' %';
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, error => {
            console.log(error);
        }, () => {

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL);
                let avocat = this.state.avocat;
                avocat.imageUrl = downloadURL;
                this.setState({
                    avocat: avocat
                });
                this.setState({loading:false});
                firebase.database().ref('users').update({
                    [localStorage.getItem('uid')] : this.state.avocat
                }).then(res => {
                    localStorage.setItem('user', JSON.stringify(this.state.avocat));
                    this.openSnackbar('success', "Votre photo de profil est changé avec succès");
                });
            });
        });

    };

    render() {

        return (

            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu}
                                changeActivePage={this.changeActivePage}
                                isMenuOpened={this.state.isMenuOpened}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {
                                this.state.avocat !== "" &&
                                <div className="">

                                    <Modal open={this.state.showModalAdd} onClose={()=> this.setState({showModalAdd:false})} closeIconSize={18} center
                                           classNames={{
                                               overlay: "rgba(0, 0, 0, 0.15)",
                                           }}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title" id="myCenterModalLabel">
                                                    {
                                                        this.state.add === "formation" ? "Ajouter une formation" :
                                                            this.state.add === "fonction" ? "Ajouter une fonction" :
                                                                this.state.add === "affiliation" ? "Ajouter une affiliation" : null
                                                    }
                                                </h4>
                                            </div>
                                            <div className="modal-body">
                                                <p style={{marginBottom: 10}}>
                                                    {
                                                        this.state.add === "formation" ? "Formation" :
                                                            this.state.add === "fonction" ? "Fonction" :
                                                                this.state.add === "affiliation" ? "Affiliation" : null

                                                    }
                                                </p>
                                                <textarea className="form-control" type="text" id="inputText" name="inputText"
                                                          style={{width:400}}
                                                          value={
                                                              this.state.add === "formation" ? this.state.formationTmp :
                                                                  this.state.add === "fonction" ? this.state.fonctionTmp :
                                                                      this.state.add === "affiliation" ? this.state.affiliationTmp : null

                                                          }
                                                          onChange={(event) =>
                                                              this.state.add === 'formation' ?
                                                                  this.setState({formationTmp: event.target.value}) :
                                                                  this.state.add === "fonction" ?
                                                                      this.setState({fonctionTmp: event.target.value}) :
                                                                      this.state.add === "affiliation" ?
                                                                          this.setState({affiliationTmp: event.target.value}) : null
                                                          }
                                                />
                                                <div className="text-center" style={{marginTop:10}}>
                                                    <button type="button" onClick={
                                                        this.state.add === "formation" ? this.addItem('formation') :
                                                            this.state.add === "fonction" ? this.addItem('fonction') :
                                                                this.state.add === "affiliation" ? this.addItem('affiliation') : null
                                                    }
                                                            className="btn btn-success btn waves-effect mb-2 waves-light">
                                                        Valider
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>

                                    <div className="row">
                                        <div className="col-lg-3 col-xl-3">
                                            <div className="card-box text-center" style={{marginTop: 15}}>
                                                <img onClick={() => this.imageUpload.click()}
                                                     src={this.state.loading ? uploadgif :  this.state.avocat.imageUrl || DefaultAvatar}
                                                     className="rounded-circle avatar-lg img-thumbnail"
                                                     alt="" style={{cursor: "pointer"}}/>
                                                <input style={{visibility: 'hidden', width: 0, height: 0}}
                                                       type='file' label='Upload' accept='.png,.jpeg,.jpg'
                                                       onChange={this.uploadImage}
                                                       ref={(ref) => this.imageUpload = ref}
                                                />

                                                <h4 className="mb-0">{this.state.avocat.prenom + ' ' + this.state.avocat.nom}</h4>
                                                <p className="text-muted">{this.state.avocat.specialite} </p>

                                                <button type="button" onClick={this.saveChanges}
                                                        className="btn btn-success btn-xs waves-effect mb-2 waves-light">
                                                    <i className="fe-edit"></i>&nbsp;&nbsp;
                                                    Enregistrer
                                                </button>
                                                <div className="text-left mt-3">
                                                    <h4 className="font-13 text-uppercase">Aparté :</h4>
                                                    <p className="text-muted font-13 mb-3">
                                                        {this.state.avocat.aparte}
                                                    </p>
                                                    <p className="text-muted mb-2 font-13"><strong>Langues :</strong>
                                                        <span className="ml-2">{this.state.avocat.langues} </span></p>

                                                    <p className="text-muted mb-2 font-13"><strong>Numéro de téléphone
                                                        :</strong><span
                                                        className="ml-2">{this.state.avocat.phone}</span></p>

                                                    <p className="text-muted mb-2 font-13"><strong>Email :</strong>
                                                        <span className="ml-2 ">{this.state.avocat.email}</span></p>

                                                    <p className="text-muted mb-1 font-13"><strong>Pays :</strong>
                                                        <span className="ml-2">France</span></p>
                                                </div>

                                                <ul className="social-list list-inline mt-3 mb-0">
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-primary text-primary"><i
                                                            className="mdi mdi-facebook"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-danger text-danger"><i
                                                            className="mdi mdi-google"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-info text-info"><i
                                                            className="mdi mdi-twitter"></i></a>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <a href="javascript: void(0);"
                                                           className="social-list-item border-secondary text-secondary"><i
                                                            className="mdi mdi-github-circle"></i></a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="col-lg-9 col-xl-9">
                                            <div className="card" style={{marginTop: 15}}>
                                                <div className="card-body">
                                                    <section style={{
                                                        marginTop: '25px',
                                                        marginLeft: '20px',
                                                        marginRight: '20px'
                                                    }}>

                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <div>
                                                                    <div className="row" style={{marginTop: 20}}>
                                                                        <div className="col-sm-4">
                                                                            <div className="feature-box">
                                                                                <h3>Informations personnelles</h3>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Nom</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="nom"
                                                                                               name="nom"
                                                                                               value={this.state.avocat.nom}
                                                                                               onChange={this.handleChange('avocat', 'nom')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Prénom</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="prenom"
                                                                                               name="prenom"
                                                                                               value={this.state.avocat.prenom}
                                                                                               onChange={this.handleChange('avocat', 'prenom')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Email</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="email"
                                                                                               name="email"
                                                                                               readOnly={true}
                                                                                               value={this.state.avocat.email}
                                                                                               onChange={this.handleChange('avocat', 'email')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Téléphone</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="phone"
                                                                                               name="phone"
                                                                                               value={this.state.avocat.phone}
                                                                                               onChange={this.handleChange('avocat', 'phone')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Fax</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="fax"
                                                                                               name="fax"
                                                                                               placeholder="Fax"
                                                                                               value={this.state.avocat.fax}
                                                                                               onChange={this.handleChange('avocat', 'fax')}/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">
                                                                                        <p style={{marginBottom: 10}}>Tarif(€/h)</p>
                                                                                        <input className="form-control"
                                                                                               type="text" id="tarif"
                                                                                               name="tarif"
                                                                                               value={this.state.avocat.tarif}
                                                                                               onChange={this.handleChange('avocat', 'tarif')}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <div className="feature-box">
                                                                                <h3>Langues</h3>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-8">

                                                                                        <input className="form-control"
                                                                                               type="text" id="langues"
                                                                                               name="langues"
                                                                                               value={this.state.avocat.langues}
                                                                                               onChange={this.handleChange('avocat', 'langues')}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{marginTop: 30}}
                                                                                 className="feature-box">
                                                                                <h3>Formation</h3>
                                                                                {
                                                                                    (this.state.avocat.formations || []).map((item, key) => (
                                                                                        <div>
                                                                                            <p style={{marginTop: 10}}>• {item}</p>

                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="col-sm-7">
                                                                                                    <div
                                                                                                        className="text--right">
                                                                                                        <a className="color--primary-2"
                                                                                                           onClick={this.removeItem('formation', key)}
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "red"
                                                                                                           }}>
                                                                                   <span className="btn__text"
                                                                                         id={'btn-remove-child' + key}>
                                                                                      <i className="fe-minus"></i> Enlever cet formation
                                                                                   </span>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>


                                                                                    ))
                                                                                }
                                                                                <div className="row"
                                                                                     style={{marginTop: 10}}>
                                                                                    <div className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('formation')}>
                                                                                      <span className="btn__text"
                                                                                            id="btn-add-child">
                                                                                    <i className="fe-plus-square"></i> Ajouter une formation
                                                                                        </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{marginTop: 30}}
                                                                                 className="feature-box">
                                                                                <h3>En aparté</h3>
                                                                                <div className="row"
                                                                                     style={{marginTop: 20}}>
                                                                                    <div className="col-sm-10">
                                                                         <textarea className="form-control" type="text"
                                                                                   id="aparte" name="aparte" rows={6}
                                                                                   value={this.state.avocat.aparte}
                                                                                   onChange={this.handleChange('avocat', 'aparte')}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <div className="feature-box">
                                                                                <h3>Fonctions</h3>
                                                                                {
                                                                                    (this.state.avocat.fonctions || []).map((item, key) => (
                                                                                        <div>
                                                                                            <p style={{marginTop: 10}}>• {item}</p>

                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="col-sm-7">
                                                                                                    <div
                                                                                                        className="text--right">
                                                                                                        <a className="color--primary-2"
                                                                                                           onClick={this.removeItem('fonction', key)}
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "red"
                                                                                                           }}>
                                                                                   <span className="btn__text"
                                                                                         id={'btn-remove-child' + key}>
                                                                                      <i className="fe-minus"></i> Enlever cette fonction
                                                                                   </span>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }

                                                                                <div className="row"
                                                                                     style={{marginTop: 10}}>
                                                                                    <div className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('fonction')}>
                                                                  <span className="btn__text" id="btn-add-child">
                                                                      <i className="fe-plus-square"></i> Ajouter une fonction
                                                                  </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                            <div style={{marginTop: 30}}
                                                                                 className="feature-box">
                                                                                <h3>Affiliations</h3>
                                                                                {
                                                                                    (this.state.avocat.affiliations || []).map((item, key) => (
                                                                                        <div>
                                                                                            <p style={{marginTop: 10}}>• {item}</p>

                                                                                            <div className="row">
                                                                                                <div
                                                                                                    className="col-sm-7">
                                                                                                    <div
                                                                                                        className="text--right">
                                                                                                        <a className="color--primary-2"
                                                                                                           onClick={this.removeItem('affiliation', key)}
                                                                                                           style={{
                                                                                                               cursor: 'pointer',
                                                                                                               color: "red"
                                                                                                           }}>
                                                                                   <span className="btn__text"
                                                                                         id={'btn-remove-child' + key}>
                                                                                      <i className="fe-minus"></i> Enlever cette affiliation
                                                                                   </span>
                                                                                                        </a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }
                                                                                <div className="row"
                                                                                     style={{marginTop: 10}}>
                                                                                    <div className="col-sm-12">
                                                                                        <a style={{
                                                                                            cursor: 'pointer',
                                                                                            fontSize: "medium",
                                                                                            fontWeight: "bold"
                                                                                        }}
                                                                                           onClick={this.openAddModal('affiliation')}>
                                                                  <span className="btn__text" id="btn-add-child">
                                                                      <i className="fe-plus-square"></i> Ajouter une affiliation
                                                                  </span>
                                                                                        </a>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/*<div className="row" style={{marginTop: 20}}>
                                                                        <div className="col-sm-3 mt--2 text-right float-right">
                                                                            <button
                                                                                style={{backgroundColor: 'rgb(235, 0, 141)'}}
                                                                                className="btn btn--primary type--uppercase btn__loader"
                                                                                onClick={this.saveChanges}>
                                                                                {
                                                                                    this.state.btnSaveSpinner ?
                                                                                        <div
                                                                                            className="subscription-loader"></div> :
                                                                                        <span
                                                                                            className="btn__text">Valider →</span>
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    </div>*/}
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </section>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            }

                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openAlert}
                                autoHideDuration={5000}
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

export default infos;
