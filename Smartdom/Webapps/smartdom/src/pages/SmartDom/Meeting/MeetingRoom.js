import React from 'react';
import {Modal, ModalBody, ModalHeader, Collapse} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment';
import augmCapitalService from '../../../provider/augmCapitalService';
import entrepriseSARLService from '../../../provider/entrepriseSARLService';
import MySnackbarContentWrapper from '../../../tools/customSnackBar';
import Snackbar from '@material-ui/core/Snackbar';
import Loader from '../../../components/Loader';
import PDFViewer from '../../../customComponents/pdf-viewer-reactjs';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import DocSearchService from '../../../provider/DocSearchService';
import TreeView from 'deni-react-treeview';
import SearchResults from '../../../components/SearchResults';
import {ReactMultiEmail, isEmail} from 'react-multi-email';
import 'react-multi-email/style.css';
import emailService from '../../../provider/emailService';

const endpoint = 'http://51.158.97.220:3001/api';


const styles = {
    position: 'relative',
    padding: '7px 12px',
    fontWeight: 'bold',
    fontSize: '10px',
    border: '1px solid #f9fafa',
    background: '#f9fafa',
    cursor: 'pointer',
};

function arrangeIntoTree(paths, urls) {
    // Adapted from http://brandonclapp.com/arranging-an-array-of-flat-paths-into-a-json-tree-like-structure/
    var tree = [];

    for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var currentLevel = tree;
        for (var j = 0; j < path.length; j++) {
            var part = path[j];

            var existingPath = findWhere(currentLevel, 'text', part);

            if (existingPath) {
                currentLevel = existingPath.children;
            } else {
                var newPart = {
                    text: part,
                    url: j === path.length - 1 ? urls[i] : '',
                    isLeaf: j === path.length - 1,
                    children: [],
                }
                currentLevel.push(newPart);
                currentLevel = newPart.children;
            }
        }
    }
    return tree;

    function findWhere(array, key, value) {
        // Adapted from https://stackoverflow.com/questions/32932994/findwhere-from-underscorejs-to-jquery
        let t = 0; // t is used as a counter
        while (t < array.length && array[t][key] !== value) {
            t++;
        }
        ; // find the index where the id is the as the aValue

        if (t < array.length) {
            return array[t]
        } else {
            return false;
        }
    }
}



class MeetingRoom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            showPDFModal: false,
            pdfURL: '',
            showCFModal: false,
            CfModalContent: 'MvTitres',
            showPwdModal: true,
            meetingId: this.props.match.params.idMeeting,
            meeting: '',
            society: '',
            cessionActionsArray: [],
            password: '',

            openAlert: false,
            alertMessage: '',
            alertType: '',

            checked: [],
            expanded: [],

            ocrDocs: {},

            showTeamCard: true,
            showComptaDocs: true,
            showCoffreFort: true,

            showSearchModal: false,
            resultData: '',

            showInvitationModal: false,
            invitationEmails: [],

            showLeftMenu:true
        }
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg,
            alertType: type,
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };

    componentDidMount() {

        firebase.database().ref('/meetings/' + this.props.match.params.idMeeting).on('value', (snapshot) => {
            let data = snapshot.val();

            firebase.database().ref('/society/' + data.uidS).on('value', (snapshot) => {
                let society = snapshot.val();
                society.uniqueId = data.uidS;

                let gerants = [];
                let associes = [];
                let avocats = [];
                let fiduciaires = [];
                let notaires = [];
                let comptables = [];
                let autres = [];

                let team = [];

                data.gerants && data.gerants.length > 0 && data.gerants.map((item, key) => {
                    gerants.push({text: item.name, isLeaf: true})
                });
                data.associes && data.associes.length > 0 && data.associes.map((item, key) => {
                    associes.push({text: item.name, isLeaf: true})
                });
                data.avocats && data.avocats.length > 0 && data.avocats.map((item, key) => {
                    avocats.push({text: item.name, isLeaf: true})
                });
                data.fiduciaires && data.fiduciaires.length > 0 && data.fiduciaires.map((item, key) => {
                    fiduciaires.push({text: item.name, isLeaf: true})
                });
                data.notaires && data.notaires.length > 0 && data.notaires.map((item, key) => {
                    notaires.push({text: item.name, isLeaf: true})
                });
                data.comptables && data.comptables.length > 0 && data.comptables.map((item, key) => {
                    comptables.push({text: item.name, isLeaf: true})
                });
                data.autres && data.autres.length > 0 && data.autres.map((item, key) => {
                    autres.push({text: item.name, isLeaf: true})
                });
                data.team && data.team.length > 0 && data.team.map((item, key) => {
                    team.push({text: item.name, isLeaf: true})
                });
                let items = [];
                let itemsTeam = [];

                data.gerants && data.gerants.length > 0 && items.push({
                    id: 0, text: 'Gérants',
                    children: gerants,
                });
                data.associes && data.associes.length > 0 && items.push({
                    id: 1, text: 'Associes',
                    children: associes,
                });
                data.avocats && data.avocats.length > 0 && items.push({
                    id: 2, text: 'Avocats',
                    children: avocats,
                });
                data.fiduciaires && data.fiduciaires.length > 0 && items.push({
                    id: 3, text: 'Fiduciaires',
                    children: fiduciaires,
                });
                data.notaires && data.notaires.length > 0 && items.push({
                    id: 4, text: 'Notaires',
                    children: notaires,
                });
                data.comptables && data.comptables.length > 0 && items.push({
                    id: 5, text: 'Comptables',
                    children: comptables,
                });
                data.autres && data.autres.length > 0 && items.push({
                    id: 6, text: 'Autres',
                    children: autres,
                });

                itemsTeam.push({
                    id: 7, text: 'Team',
                    children: team,
                });

                this.setState({
                    society: society,
                    cessionActionsArray: society.cessionAction || [],
                    meeting: data,
                    items: items,
                    itemsTeam: itemsTeam,
                    loading: false,
                });

            });

            DocSearchService.login().then(ok => {

                DocSearchService.getDocs({email: 'jhlauret@gmail.com'}, ok.data.token).then(res => {
                    let paths = [];
                    let filesUrl = [];
                    let results = res.data.data;
                    results.map((item, key) => {
                        paths.push(item.title);
                        filesUrl.push(item.url);
                    });
                    let pathTexts = [];
                    paths.forEach(path => {
                        let levels = path.split('/');
                        pathTexts.push(levels)
                    });
                    var tree = arrangeIntoTree(pathTexts, filesUrl);

                    this.setState({ocrDocs: tree})

                }).catch(err => console.log(err))

            }).catch(err => console.log(err))

        });


    }


    renderItem = ({item, collapseIcon, handler}) => {
        return (
            <div style={styles}>
                {handler}
                {collapseIcon}
                {item.name}
            </div>
        );
    };


    showStatutDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.society.statutDocUrl && this.state.society.statutDocUrl !== '') {
            window.open(this.state.society.statutDocUrl);
            this.setState({loading: false});
        } else {


            let isAllgerantSignDoc = true;
            let isAllassocieSignDoc = true;

            var gerants = this.state.society.sAdministrator || [];
            var associes = this.state.society.sAssociate || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === '') isAllgerantSignDoc = false;
            }
            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === '') isAllassocieSignDoc = false;
            }


            if (isAllgerantSignDoc === true && isAllassocieSignDoc === true) {
                augmCapitalService.getEntrepriseStatut(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref('/Suisse/docs').child('Statut' + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref('/society/' + uid).update({
                                'statutDocUrl': url,
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });


                }, err => {
                    console.log(err);
                })

            } else {
                augmCapitalService.getEntrepriseStatut(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }
    };

    showProcurationDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.society.procurationDocUrl && this.state.society.procurationDocUrl !== '') {
            window.open(this.state.society.procurationDocUrl);
            this.setState({loading: false});
        } else {

            let isAllassocieSignDoc = true;
            var associes = this.state.society.sAssociate || [];

            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === '') isAllassocieSignDoc = false;
            }


            if (isAllassocieSignDoc === true) {
                entrepriseSARLService.GenerateProcuration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref('/Suisse/docs').child('Procuration' + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref('/society/' + uid).update({
                                'procurationDocUrl': url,
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });


                }, err => {
                    console.log(err);
                })

            } else {
                entrepriseSARLService.GenerateProcuration(uid, pays).then(res => {

                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showDeclarationDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.society.declarationDocUrl && this.state.society.declarationDocUrl !== '') {
            window.open(this.state.society.declarationDocUrl);
            this.setState({loading: false});
        } else {

            let isAllassocieSignDoc = true;
            var associes = this.state.society.sAssociate || [];


            for (let i = 0; i < associes.length; i++) {
                if (associes[i].signatureStatut === '') isAllassocieSignDoc = false;
            }


            if (isAllassocieSignDoc === true) {
                entrepriseSARLService.GenerateDeclaration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref('/Suisse/docs').child('Declaration' + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref('/society/' + uid).update({
                                'declarationDocUrl': url,
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });
                }, err => {
                    console.log(err);
                })

            } else {
                entrepriseSARLService.GenerateDeclaration(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }
    };

    showOptingOutGerantDocument = (uid, pays) => event => {

        this.setState({loading: true});

        if (this.state.society.optingOutGerantDocUrl && this.state.society.optingOutGerantDocUrl !== '') {
            window.open(this.state.society.optingOutGerantDocUrl);
            this.setState({loading: false});
        } else {

            let isAllgerantSignDoc = true;
            var gerants = this.state.society.sAdministrator || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === '') isAllgerantSignDoc = false;
            }

            if (isAllgerantSignDoc === true) {
                entrepriseSARLService.GenerateOptingOutGerant(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref('/Suisse/docs').child('OptingOutGerant' + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref('/society/' + uid).update({
                                'optingOutGerantDocUrl': url,
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });

                }, err => {
                    console.log(err);
                })

            } else {

                entrepriseSARLService.GenerateOptingOutGerant(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showRequisitionDocument = (uid, pays) => event => {

        this.setState({loading: true});


        if (this.state.society.requisitionDocUrl && this.state.society.requisitionDocUrl !== '') {
            window.open(this.state.society.requisitionDocUrl);
            this.setState({loading: false});
        } else {

            let isAllgerantSignDoc = true;
            var gerants = this.state.society.sAdministrator || [];

            for (let i = 0; i < gerants.length; i++) {
                if (gerants[i].signatureStatut === '') isAllgerantSignDoc = false;
            }

            if (isAllgerantSignDoc === true) {
                entrepriseSARLService.GenerateRequisition(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});

                    firebase.storage().ref('/Suisse/docs').child('Requisition' + uid).put(file).then((snapshot) => {
                        snapshot.ref.getDownloadURL().then(url => {
                            firebase.database().ref('/society/' + uid).update({
                                'requisitionDocUrl': url,
                            }).then(ok => {
                                window.open(url);
                                this.setState({loading: false});
                            }).catch(err => console.log(err))
                        })
                    });

                }, err => {
                    console.log(err);
                })

            } else {

                entrepriseSARLService.GenerateRequisition(uid, pays).then(res => {
                    const file = new Blob(
                        [res],
                        {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.setState({loading: false});

                }, err => {
                    console.log(err);
                })

            }

        }

    };

    showActeConstitutifDocument = (uid, pays) => event => {

        this.setState({loading: true});

        entrepriseSARLService.GenerateActeConstitutif(uid, pays).then(res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});

        }, err => {
            console.log(err);
        })
    };

    showStockoptionDocument = (titrekey, opkey) => event => {

        this.setState({loading: true});
        augmCapitalService.getBSASuisseDoc(this.state.meeting.uidS, titrekey, opkey).then(res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});

        }, err => {
            console.log(err);
        })
    };

    showCessionActionDoc = (idCession) => event => {

        this.setState({
            showPDFModal: true,
            pdfURL: 'http://51.158.97.220:3001/api/generateContrat/' + this.state.meeting.uidS + '/' + idCession,
        });
    };

    showDocInPdfModal = (url) => event => {

        this.setState({
            showPDFModal: true,
            pdfURL: url,
        });
    };

    showSARLStatutAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.society.uniqueId;
        augmCapitalService.getSARLStatut_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRapportAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.society.uniqueId;
        augmCapitalService.getSARLrapport_Augm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };


    showSARLDeclarationAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.society.uniqueId;
        augmCapitalService.getSARLDeclarationAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLRequisistionAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.society.uniqueId;
        augmCapitalService.getSARLrequisitionAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    showSARLPvAGEAugmDocument = (key) => event => {
        this.setState({loading: true});
        let uid = this.state.society.uniqueId;
        augmCapitalService.getSARLPvAGEAugm(uid, key).then(res => {
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});
        }, err => {
            console.log(err);
        })
    };

    searchOCR = (text) => event => {

        if (text !== '') {
            this.setState({textSearch: text});
            DocSearchService.login().then(ok => {

                DocSearchService.search({word: text}, ok.data.token).then(res => {

                    this.setState({showSearchModal: true, resultData: res})

                }).catch(err => console.log(err))

            }).catch(err => console.log(err))

        }
    };


    render() {

        let uid = this.state.meeting.uidS;
        let nbSO_docs = 0;
        (this.state.society.titresBSA || []).map((titreBSA, titreKey) => {
            (titreBSA.operations || []).map((op, opKey) => {
                nbSO_docs = nbSO_docs + 1;
            })
        });

        return (
            <div>

                {this.state.loading && <Loader/>}

                <div className="row">
                    <div className="col-md-12">
                        <div className="card" style={{marginBottom:1}}>
                            <div className="card-body">
                                <div className="input-group">
                                    <input type="search" className="form-control"
                                           placeholder="Chercher des documents..."
                                           autoComplete="false"
                                           style={{width: 400, fontWeight: 'bold'}} value={this.state.textSearch}
                                           onChange={(event) => this.setState({textSearch: event.target.value})}/>
                                    <div className="input-group-append">
                                        <button className="btn" onClick={this.searchOCR(this.state.textSearch)}>
                                            <i className="fe-search"
                                               style={{fontSize: 17, fontWeight: 'bold', color: 'blue'}}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div style={{display:"flex"}}>

                    {
                        this.state.meeting.IdJitsi !== '' && (this.state.password === this.state.meeting.password) &&

                        <div style={{width:"auto"}}>

                            <div className="card" style={{backgroundColor:"lightgray",display:"block",marginBottom:1,minHeight:600,minWidth:50}}>
                                <div>
                                    <a onClick={() => this.setState({showLeftMenu: !this.state.showLeftMenu})}
                                       style={{cursor: 'pointer',float:"right",marginRight:5}}>
                                        <i style={{color:"blue",fontWeight:"bold",fontSize:30}}
                                           className={this.state.showLeftMenu === true ? 'mdi mdi-chevron-left' : 'mdi mdi-chevron-right'}/>
                                    </a>
                                </div>
                                <div className="card-body">
                                    {
                                        this.state.showLeftMenu === true &&
                                            <div>
                                                <div style={{display:"block",marginBottom:1}} className="card mt-1">
                                                    <div className="card-body">
                                                        <div className="card-widgets" style={{marginLeft: 18}}>
                                                            <a onClick={() => this.setState({showTeamCard: !this.state.showTeamCard})}
                                                               style={{cursor: 'pointer'}}>
                                                                <i className={this.state.showTeamCard === true ? 'mdi mdi-arrow-collapse-up' : 'mdi mdi-arrow-collapse-down'}/>
                                                            </a>
                                                        </div>
                                                        <h5>Compétences présentes & Team</h5>
                                                        <Collapse isOpen={this.state.showTeamCard}>

                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <div className="theme-customization-users">
                                                                        <TreeView items={this.state.items}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <div className="theme-customization-users">
                                                                        <TreeView items={this.state.itemsTeam}/>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <button className="btn btn-sm btn-light mt-1"
                                                                    onClick={() => this.setState({showInvitationModal: true})}>
                                                                <i className="mdi mdi-email-plus" style={{color: '#C0C0C0'}}/>&nbsp;&nbsp;
                                                                Ajouter des invités
                                                            </button>
                                                        </Collapse>

                                                    </div>
                                                </div>

                                                <div style={{display:"block",marginBottom:1}} className="card mt-1">
                                                    <div className="card-body">
                                                        <div className="card-widgets" style={{marginLeft: 18}}>
                                                            <a onClick={() => this.setState({showComptaDocs: !this.state.showComptaDocs})}
                                                               style={{cursor: 'pointer'}}>
                                                                <i className={this.state.showComptaDocs === true ? 'mdi mdi-arrow-collapse-up' : 'mdi mdi-arrow-collapse-down'}/>
                                                            </a>
                                                        </div>
                                                        <h5>Documents Compta</h5>
                                                        <Collapse isOpen={this.state.showComptaDocs}>
                                                            <div className="theme-customization">
                                                                <TreeView items={this.state.ocrDocs}/>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>

                                                <div style={{display:"block",marginBottom:1}} className="card mt-1">
                                                    <div className="card-body">
                                                        <div className="card-widgets" style={{marginLeft: 18}}>
                                                            <a onClick={() => this.setState({showCoffreFort: !this.state.showCoffreFort})}
                                                               style={{cursor: 'pointer'}}>
                                                                <i className={this.state.showCoffreFort === true ? 'mdi mdi-arrow-collapse-up' : 'mdi mdi-arrow-collapse-down'}/>
                                                            </a>
                                                        </div>
                                                        <h5>Documents partagée</h5>
                                                        <h6 className="mt-0 mb-3">Coffre-fort</h6>
                                                        <Collapse isOpen={this.state.showCoffreFort}>
                                                            <div className="files-nav">
                                                                <div className="nav flex-column nav-pills" id="files-tab"
                                                                     aria-orientation="vertical">
                                                                    <a className="nav-link active mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       onClick={() => this.setState({
                                                                           showCFModal: true,
                                                                           CfModalContent: 'MvTitres',
                                                                       })}
                                                                       data-toggle="pill" href="#files-MvTitres" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">Mouvements de titres</h5>
                                                                        </div>
                                                                    </a>
                                                                    <a className="nav-link mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       data-toggle="pill" href="#files-Contrats" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">Contrats & Justificatifs</h5>
                                                                        </div>
                                                                    </a>
                                                                    <a className="nav-link mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       onClick={() => this.setState({
                                                                           showCFModal: true,
                                                                           CfModalContent: 'DocumCons',
                                                                       })}
                                                                       data-toggle="pill" href="#files-DocumCons" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">Documents constitutifs</h5>
                                                                        </div>
                                                                    </a>
                                                                    <a className="nav-link mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       onClick={() => this.setState({
                                                                           showCFModal: true,
                                                                           CfModalContent: 'AG',
                                                                       })}
                                                                       data-toggle="pill" href="#files-AG" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">AG</h5>
                                                                        </div>
                                                                    </a>
                                                                    <a className="nav-link mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       data-toggle="pill" href="#files-AutrDocs" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">Autres documents</h5>
                                                                        </div>
                                                                    </a>
                                                                    <a className="nav-link mb-1" id="files-projects-tab"
                                                                       style={{display: 'flex', padding: '0.6rem'}}
                                                                       data-toggle="pill" href="#files-PV" aria-selected="true">
                                                                        <span className="mr-2 text-warning d-inline-block">📁</span>
                                                                        <div className="d-inline-block align-self-center">
                                                                            <h5 className="m-0">PV</h5>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </Collapse>
                                                    </div>
                                                </div>
                                            </div>
                                    }


                                </div>

                            </div>



                        </div>
                    }

                    <div style={{maxHeight:680,width:"77%"}} >

                        {
                            this.state.meeting.IdJitsi !== "" && (this.state.password === this.state.meeting.password) &&

                            <iframe
                                src={"https://meet.smartdom.ch/" + this.state.meeting.IdJitsi }
                                height={680}
                                width="100%"
                                allowFullScreen={true}
                                allow="camera;microphone"
                                frameBorder="0"/>
                        }

                    </div>

                </div>


                <Modal isOpen={this.state.showCFModal} size="lg">
                    <ModalHeader toggle={() => this.setState({showCFModal: !this.state.showCFModal})}>
                        <h5>GED</h5>
                    </ModalHeader>
                    <ModalBody>

                        {
                            this.state.society.sName !== '' &&
                            <div className="">
                                <div className="tab-content" id="files-tabContent">

                                    {
                                        this.state.CfModalContent === 'MvTitres' &&
                                        <div className="tab-pane fade show active" id="files-MvTitres">
                                            <h4 className="header-title mt-0 mb-1">Stock Option</h4>
                                            <h6><i
                                                className="fa fa-paperclip mb-1"/> Documents <span>({nbSO_docs})</span>
                                            </h6>
                                            <div className="file-box-content">

                                                {
                                                    (this.state.society.titresBSA || []).map((titreBSA, titreKey) => (

                                                        (titreBSA.operations || []).map((op, opKey) => (

                                                            titreBSA.bfname = titreBSA.beneficiaire.ej_name === '' ?
                                                                titreBSA.beneficiaire.firstname + ' ' + titreBSA.beneficiaire.lastname : titreBSA.beneficiaire.ej_name,


                                                                <div className="file-box" key={opKey}>
                                                                    <a className="download-icon-link">
                                                                        <i className="dripicons-download file-download-icon"
                                                                           onClick={this.showStockoptionDocument(titreKey, opKey)}
                                                                           style={{cursor: 'pointer'}}/>
                                                                    </a>
                                                                    <div className="text-center">
                                                                        <i className="far fa-file-pdf text-danger"
                                                                           style={{cursor: 'pointer'}}
                                                                           onClick={this.showDocInPdfModal(endpoint + '/creationBSASuisseGET/' + uid + '/' + titreKey + '/' + opKey)}
                                                                            //onClick={() => this.props.history.push("/coffre-fort/stockOption/" + titreKey + "/" + opKey + "/" + titreBSA.bfname)}
                                                                        />
                                                                        <h6 className="text-truncate">SO_{titreBSA.bfname}.pdf</h6>
                                                                        <small
                                                                            className="text-muted">{moment(op.dateMAJ).format('DD MMM YYYY')} /
                                                                            4MB</small>
                                                                    </div>
                                                                </div>

                                                        ))
                                                    ))
                                                }


                                            </div>

                                            <div className="row">
                                                <div className="col-12">
                                                    <h4 className="header-title mb-1 mt-3">Cession d'action</h4>
                                                    <h6><i
                                                        className="fa fa-paperclip mb-1"/> Documents <span>({this.state.cessionActionsArray.length})</span>
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="file-box-content">
                                                {
                                                    this.state.cessionActionsArray.map((item, key) => (
                                                        <div className="file-box" key={key}>
                                                            <a className="download-icon-link"
                                                               download={'CessionAction_' + item.cedant.nomPrenom + '_' + item.cessionnaire.nomPrenom + '.pdf'}
                                                               href={'http://51.158.97.220:3001/api/generateContrat/' + this.state.meeting.uidS + '/' + key}>
                                                                <i className="dripicons-download file-download-icon"
                                                                   style={{cursor: 'pointer'}}/>
                                                            </a>
                                                            <div className="text-center">
                                                                <i className="far fa-file-pdf text-danger"
                                                                   style={{cursor: 'pointer'}}
                                                                   onClick={this.showCessionActionDoc(key)}/>
                                                                <h6 className="text-truncate">
                                                                    CessionAction_{item.cedant.nomPrenom + '_' + item.cessionnaire.nomPrenom}
                                                                </h6>
                                                                <small
                                                                    className="text-muted">{moment(item.basetaxable.date).format('DD MMM YYYY')} /
                                                                    2.5MB</small>
                                                            </div>
                                                        </div>

                                                    ))
                                                }
                                            </div>

                                        </div>
                                    }
                                    {
                                        this.state.CfModalContent === 'AG' &&
                                        <div className="tab-pane fade show active" id="files-AG">
                                            <h4 className="mt-0 header-title mb-3">Augmentation Capital</h4>

                                            <div className="file-box-content">
                                                {
                                                    (this.state.society.augmCapital || []).map((item, key) => (

                                                        <div key={key}>
                                                            <div className="row mb-1">
                                                                <div className="col-md-12">
                                                                    <h6>Augmentation de capital
                                                                        du {moment(item.dateCreation).format('DD MMMM YYYY')}</h6>
                                                                    <span style={{color: 'grey'}}>Agio d'émission: <span
                                                                        style={{color: '#000'}}>{item.agio}</span></span><br/>
                                                                </div>
                                                            </div>

                                                            <div className="file-box">
                                                                <a className="download-icon-link"
                                                                    /*onClick={() => this.props.history.push("/detailsDoc",
                                                                        {
                                                                            societe: this.state.society,
                                                                            typeDoc: "StatutAugm",
                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                        })}*/
                                                                >
                                                                    <i className="dripicons-export file-download-icon1"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <a className="download-icon-link"
                                                                   onClick={this.showSARLStatutAugmDocument(key)}>
                                                                    <i className="dripicons-download file-download-icon2"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <div className="text-center">
                                                                    <i className="far fa-file-pdf text-danger"
                                                                       onClick={this.showDocInPdfModal(endpoint + '/generateSARLStatusAfterAugmCapital/' + uid + '/' + key)}
                                                                       style={{cursor: 'pointer'}}
                                                                    />
                                                                    <h6 className="text-truncate">
                                                                        Statut_Augm
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted">{moment(item.date_ass_genrale).format('DD MMM YYYY')} /
                                                                        2.1MB</small>
                                                                </div>
                                                            </div>
                                                            <div className="file-box">
                                                                <a className="download-icon-link"
                                                                    /*onClick={() => this.props.history.push("/detailsDoc",
                                                                        {
                                                                            societe: this.state.society,
                                                                            typeDoc: "RapportAugm",
                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                        })}*/
                                                                >
                                                                    <i className="dripicons-export file-download-icon1"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <a className="download-icon-link"
                                                                   onClick={this.showSARLRapportAugmDocument(key)}>
                                                                    <i className="dripicons-download file-download-icon2"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <div className="text-center">
                                                                    <i className="far fa-file-pdf text-danger"
                                                                       style={{cursor: 'pointer'}}
                                                                       onClick={this.showDocInPdfModal(endpoint + '/generateRapportAugmCapital/' + uid + '/' + key)}
                                                                    />
                                                                    <h6 className="text-truncate">
                                                                        Rapport_Augm
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted">{moment(item.date_ass_genrale).format('DD MMM YYYY')} /
                                                                        2.2MB</small>
                                                                </div>
                                                            </div>
                                                            <div className="file-box">
                                                                <a className="download-icon-link"
                                                                    /*onClick={() => this.props.history.push("/detailsDoc",
                                                                        {
                                                                            societe: this.state.society,
                                                                            typeDoc: "DeclAugm",
                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                        })}*/
                                                                >
                                                                    <i className="dripicons-export file-download-icon1"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <a className="download-icon-link"
                                                                   onClick={this.showSARLDeclarationAugmDocument(key)}>
                                                                    <i className="dripicons-download file-download-icon2"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <div className="text-center">
                                                                    <i className="far fa-file-pdf text-danger"
                                                                       style={{cursor: 'pointer'}}
                                                                       onClick={this.showDocInPdfModal(endpoint + '/generateDeclarationAfterAugmCapital/' + uid + '/' + key)}
                                                                    />
                                                                    <h6 className="text-truncate">
                                                                        Déclaration I,II
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted">{moment(item.date_ass_genrale).format('DD MMM YYYY')} /
                                                                        1.9MB</small>
                                                                </div>
                                                            </div>
                                                            <div className="file-box">
                                                                <a className="download-icon-link"
                                                                    /*onClick={() => this.props.history.push("/detailsDoc",
                                                                        {
                                                                            societe: this.state.society,
                                                                            typeDoc: "RequisitionAugm",
                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                        })}*/
                                                                >
                                                                    <i className="dripicons-export file-download-icon1"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <a className="download-icon-link">
                                                                    <i className="dripicons-download file-download-icon2"
                                                                       onClick={this.showSARLRequisistionAugmDocument(key)}
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <div className="text-center">
                                                                    <i className="far fa-file-pdf text-danger"
                                                                       style={{cursor: 'pointer'}}
                                                                       onClick={this.showDocInPdfModal(endpoint + '/generateAgeSARLRequis/' + uid + '/' + key)}
                                                                    />
                                                                    <h6 className="text-truncate">
                                                                        Réquisition
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted">{moment(item.date_ass_genrale).format('DD MMM YYYY')} /
                                                                        1.7MB</small>
                                                                </div>
                                                            </div>
                                                            <div className="file-box">
                                                                <a className="download-icon-link"
                                                                    /*onClick={() => this.props.history.push("/detailsDoc",
                                                                        {
                                                                            societe: this.state.society,
                                                                            typeDoc: "PvAgeAugm",
                                                                            isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                            isSignedByAllAssocies: this.state.isAllAssociesSign
                                                                        })}*/
                                                                >
                                                                    <i className="dripicons-export file-download-icon1"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <a className="download-icon-link"
                                                                   onClick={this.showSARLPvAGEAugmDocument(key)}>
                                                                    <i className="dripicons-download file-download-icon2"
                                                                       style={{cursor: 'pointer'}}/>
                                                                </a>
                                                                <div className="text-center">
                                                                    <i className="far fa-file-pdf text-danger"
                                                                       style={{cursor: 'pointer'}}
                                                                       onClick={this.showDocInPdfModal(endpoint + '/generatePvAGEAugmCapital/' + uid + '/' + key)}
                                                                    />
                                                                    <h6 className="text-truncate">
                                                                        PV_AGE
                                                                    </h6>
                                                                    <small
                                                                        className="text-muted">{moment(item.date_ass_genrale).format('DD MMM YYYY')} /
                                                                        1.4MB</small>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))
                                                }
                                            </div>

                                        </div>
                                    }
                                    {
                                        this.state.CfModalContent === 'DocumCons' &&
                                        <div className="tab-pane fade show active" id="files-DocumCons">
                                            <h4 className="header-title mt-0 mb-1">Statut...</h4>
                                            <h6><i className="fa fa-paperclip mb-1"/> Documents <span>(7)</span>
                                            </h6>

                                            <div className="file-box-content">

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "Statut",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showStatutDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/getword/' + this.state.meeting.uidS + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Statut_Société
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            3.5MB</small>
                                                    </div>
                                                </div>

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "Procuration",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showProcurationDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/GenerateProcuration/' + this.state.meeting.uidS + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Procuration
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            3.5MB</small>
                                                    </div>
                                                </div>

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "Déclaration.i.ii",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showDeclarationDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/GenerateDeclaration/' + uid + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Déclaration I,II
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            3.5MB</small>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row ml-4 mt-2">

                                                <div className="col-sm-9 mt-2" style={{marginTop: 15}}>

                                                    <div className="card">
                                                        <div className="card-body">
                                                            {
                                                                this.state.isAllAssociesSign === true ?
                                                                    <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 15,
                                                                                                fontSize: '0.7rem',
                                                                                            }}>
                                                                                          les documents sont bien signés par tous les associés
                                                                                        </span>
                                                                    </div> :
                                                                    <h4 style={{fontWeight: 'bold'}}
                                                                        className="header-title mt-0 mb-3">
                                                                        En attente de signature des
                                                                        associés :
                                                                    </h4>
                                                            }
                                                            <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                {
                                                                    (this.state.society.sAssociate || []).map((actio, key) => (

                                                                        actio.fullname = actio.firstname + ' ' + actio.lastname,
                                                                        actio.signatureStatut === '' &&
                                                                        <li className="align-items-center d-flex justify-content-between">
                                                                            <div className="media">
                                                                                <div
                                                                                    className="media-body align-self-center">
                                                                                    <div
                                                                                        className="transaction-data">
                                                                                        <h3 className="m-0">{actio.ej_name && actio.ej_name !== '' ? actio.ej_name : actio.fullname} </h3>
                                                                                        <p className="text-muted mb-0">{actio.email} </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div  //888
                                                                                className="transaction-icon">
                                                                                <i className="mdi mdi-contact-mail"
                                                                                   style={{
                                                                                       cursor: 'pointer',
                                                                                       color: 'crimson',
                                                                                   }}>
                                                                                </i>&nbsp;&nbsp;
                                                                                <i className="mdi mdi-message-reply-text"
                                                                                   style={{
                                                                                       cursor: 'pointer',
                                                                                       color: 'cornflowerblue',
                                                                                   }}>
                                                                                </i>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>


                                            <div className="file-box-content">

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "Statut",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showStatutDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/getword/' + uid + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Statut_Société
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            3.5MB</small>
                                                    </div>
                                                </div>

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "OptingOutGerant",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showOptingOutGerantDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/GenerateOptingOutGerant/' + uid + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            OptingOutGérant
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            2.7MB</small>
                                                    </div>
                                                </div>

                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                        /*onClick={() => this.props.history.push("/detailsDoc",
                                                            {
                                                                societe: this.state.society,
                                                                typeDoc: "Requisition",
                                                                isSignedByAllGerants: this.state.isAllGerantsSign,
                                                                isSignedByAllAssocies: this.state.isAllAssociesSign
                                                            })}*/
                                                    >
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showRequisitionDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/GenerateRequisition/' + uid + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Requisition
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            2.2MB</small>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row ml-4 mt-2">

                                                <div className="col-sm-9 mt-2" style={{marginTop: 15}}>

                                                    <div className="card">
                                                        <div className="card-body">
                                                            {
                                                                this.state.isAllGerantsSign === true ?
                                                                    <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 10,
                                                                                                fontSize: '0.7rem',
                                                                                            }}>
                                                                                          Les documents sont signés par tous les gérants
                                                                                        </span>
                                                                    </div> :
                                                                    <h4 style={{fontWeight: 'bold'}}
                                                                        className="header-title mt-0 mb-3">
                                                                        En attente de signature des gérants :
                                                                    </h4>
                                                            }
                                                            <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                {
                                                                    (this.state.society.sAdministrator || []).map((actio, key) => (

                                                                        actio.fullname = actio.firstname + ' ' + actio.lastname,
                                                                        actio.signatureStatut === '' &&
                                                                        <li className="align-items-center d-flex justify-content-between">
                                                                            <div className="media">
                                                                                <div
                                                                                    className="media-body align-self-center">
                                                                                    <div
                                                                                        className="transaction-data">
                                                                                        <h3 className="m-0">{actio.ej_name && actio.ej_name !== '' ? actio.ej_name : actio.fullname} </h3>
                                                                                        <p className="text-muted mb-0">{actio.email} </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div  //888
                                                                                className="transaction-icon">
                                                                                <i className="mdi mdi-contact-mail"
                                                                                   style={{
                                                                                       cursor: 'pointer',
                                                                                       color: 'crimson',
                                                                                   }}>
                                                                                </i>&nbsp;&nbsp;
                                                                                <i className="mdi mdi-message-reply-text"
                                                                                   style={{
                                                                                       cursor: 'pointer',
                                                                                       color: 'cornflowerblue',
                                                                                   }}>
                                                                                </i>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>


                                            <div className="file-box-content">
                                                <div className="file-box">
                                                    <a className="download-icon-link"
                                                       onClick={() => {
                                                       }}>
                                                        <i className="dripicons-export file-download-icon1"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <a className="download-icon-link"
                                                       onClick={this.showActeConstitutifDocument(this.state.society.uniqueId, 'Suisse')}>
                                                        <i className="dripicons-download file-download-icon2"
                                                           style={{cursor: 'pointer'}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"
                                                           onClick={this.showDocInPdfModal('http://51.158.97.220:3001/api/GenerateActeConstitutif/' + uid + '/Suisse')}
                                                           style={{cursor: 'pointer'}}
                                                        />
                                                        <h6 className="text-truncate">
                                                            Acte_Constitutif
                                                        </h6>
                                                        <small
                                                            className="text-muted">{moment(this.state.society.dateCreation).format('DD MMM YYYY')} /
                                                            1.9MB</small>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    }

                                </div>
                            </div>
                        }

                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.showPwdModal} size="md">
                    <ModalBody>
                        <div align="center" className="mt-3">
                            <h5>Bonjour, Merci d'entrer le mot de passe reçu par email pour rejoindre à la réunion</h5>
                            <input type="password" className="form-control mt-3" style={{width: 250}}
                                   placeholder="Mot de passe"
                                   onChange={(event) => this.setState({password: event.target.value})}/>
                            <button className="btn btn-primary mt-3" disabled={this.state.password === ''}
                                    onClick={() => {
                                        if (this.state.password === this.state.meeting.password) {
                                            this.setState({showPwdModal: false})
                                        } else {
                                            this.openSnackbar('error', 'Mot de passe incorrect !')
                                        }
                                    }}>
                                Accéder à la réunion
                            </button>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.showPDFModal} size="lg"
                       toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                    <ModalHeader toggle={() => this.setState({showPDFModal: !this.state.showPDFModal})}>
                        <h4>Document</h4>
                    </ModalHeader>
                    <ModalBody>
                        <PDFViewer
                            document={{
                                url: this.state.pdfURL,
                            }}
                            minScale={0.25}
                            scaleStep={0.25}
                            navbarOnTop
                            loader={
                                <h5 style={{color: '#fa5b35'}}>Chargement...</h5>
                            }
                        />
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.showSearchModal} size="lg">
                    <ModalHeader toggle={() => this.setState({showSearchModal: !this.state.showSearchModal})}>
                        <h5>Résultat</h5>
                    </ModalHeader>
                    <ModalBody>
                        {
                            this.state.resultData !== '' &&
                            <SearchResults data={this.state.resultData} textSearch={this.state.textSearch}/>
                        }
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.showInvitationModal} size="md">
                    <ModalHeader toggle={() => this.setState({showInvitationModal: !this.state.showInvitationModal})}>
                        <h5>Nouvelle invitation</h5>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Ajouter les personnes que vous voulez rejoindre cette réunion</h5>
                        <p>Taper sur "Entée" pour valider un mail</p>
                        <div align="center" className="mt-2">
                            <ReactMultiEmail
                                placeholder="Liste des mails"
                                emails={this.state.invitationEmails}
                                onChange={(_emails) => {
                                    this.setState({invitationEmails: _emails});
                                    console.log(_emails)
                                }}
                                validateEmail={email => {
                                    return isEmail(email); // return boolean
                                }}
                                getLabel={(
                                    email,
                                    index,
                                    removeEmail) => {
                                    return (
                                        <div data-tag key={index}>
                                            {email}
                                            <span data-tag-handle onClick={() => removeEmail(index)}>
                                                 ×
                                            </span>
                                        </div>)
                                }}
                            />
                            <button className="btn btn-primary mt-3"
                                    disabled={this.state.invitationEmails.length === 0}
                                    onClick={() => {
                                        this.setState({loading: true})
                                        emailService.sendmMails({
                                            'recipients': this.state.invitationEmails,
                                            'subject': 'Invitation pour réjoindre une réunion',

                                            'linkUrl': 'Cliquer ici pour réjoindre la réunion',
                                            'url': 'https://smartdom.ch/SmartDom/Meeting/Room/' + this.props.match.params.idMeeting,

                                            'msg': 'Bonjour, <br> Vous etes invité à réjoindre une réunion par le gérant de la société SmartCo.' +
                                                ' <br> Cliquer sur ce lien pour accéder directement à la réunion. <br> Mot de passe de la réunion:  <b>123456<b> <br><br>',

                                            'footerMsg': '<br><br> Cordialement',
                                        }).then(ok => {
                                            let team = [];
                                            let mails = this.state.invitationEmails;
                                            mails.map((item, key) => {
                                                team.push({name: item, email: item, new: true})
                                            });
                                            firebase.database().ref('/meetings/' + this.props.match.params.idMeeting).update({
                                                'team': team,
                                            }).then(ok => {
                                                this.openSnackbar('success', 'Les invitations sont envoyées avec succès');
                                                this.setState({showInvitationModal: false, invitationEmails: []})
                                            }).catch(err => console.log(err));


                                        }).catch(err => console.log(err))
                                    }}>
                                Envoyer les invitations
                            </button>
                        </div>
                    </ModalBody>
                </Modal>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={8000}
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

export default MeetingRoom;
