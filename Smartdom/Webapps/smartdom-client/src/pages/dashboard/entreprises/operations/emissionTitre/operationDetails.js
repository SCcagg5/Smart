import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import {Card, CardBody, Container,} from "reactstrap";
import user3 from "../../../../../assets/users/user-5.jpg"
import augmCapitalService from "../../../../../provider/augmCapitalService";
import pdfImage from "../../../../../assets/images/pdfimage.jpg"
import moment from "moment";
import firebase from "firebase/app";
import "firebase/database"

const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class operationDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            showInformations: true,
            showDocs: false,
            entreprise:'',
            augmCapital:''
        };
    }


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    componentWillMount() {

        this.setState({loading:true});
        let uid = localStorage.getItem('uid');
        firebase.database().ref('/society/' + uid + 'tunisie').on('value', (snapshot) => {
            const entreprise = snapshot.val();

            this.setState({
                entreprise:entreprise,
                augmCapital : entreprise.augmentationcapital[entreprise.augmentationcapital.length - 1] || {},
                loading:false
            })
        });
    }

    showDocument = () => {

        this.setState({loading: true});
        let key = this.state.entreprise.augmentationcapital.length - 1;
        let uid = localStorage.getItem('uid')+'tunisie';

        augmCapitalService.getDocAugmCapitalTunisie(uid, key).then(res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false})

        }, err => {
            console.log(err);
        })
    };

    render() {

        return (

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
                            {

                                this.state.loading ? <Loader/>  :

                                    <div className="card" style={{marginTop: 25}}>
                                        <div className="card-body ">
                                            <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                               onClick={()=> this.props.history.back(6)} className="float-right text-info">Retour</a>
                                            <div>

                                                <h4 className="header-title mt-0 mb-3">L'affectation de titre
                                                    pour {this.state.augmCapital.To.length} actionnaire(s) est effectuée avec succès</h4>
                                                {this.state.loading && <Loader/>}
                                                <div className="row" style={{marginTop: 20}}>
                                                    <div className="col-lg-6">
                                                        <Card className={this.state.showInformations ? 'selectedItem' : ''} onClick={() => {
                                                            this.setState({
                                                                showInformations: true,
                                                                showDocs: false
                                                            })
                                                        }}>
                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                <div className="text-center">Informations</div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <Card className={this.state.showDocs ? 'selectedItem' : ''} onClick={() => {
                                                            this.setState({
                                                                showInformations: false,
                                                                showDocs: true
                                                            })
                                                        }}>
                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                <div className="text-center">Documents liés</div>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                </div>
                                                {
                                                    this.state.showInformations && this.state.augmCapital.To.map((item, key) => (
                                                        item.fullname = (this.state.entreprise.sActionnairePhy || []).concat(this.state.entreprise.sActionnaireMoral || []).find(x => x.email === item.actioMail).firstname +
                                                            " " + (this.state.entreprise.sActionnairePhy || []).concat(this.state.entreprise.sActionnaireMoral || []).find(x => x.email === item.actioMail).lastname,

                                                            <div>
                                                                <div className="row" style={{marginTop: 25}}>
                                                                    <div className="col-md-6 ">
                                                                        <h5>Pour :</h5>
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
                                                                                    <h5 className="mb-1 mt-2 font-16">{item.fullname}</h5>
                                                                                    <p className="mb-2 text-muted">{item.actioMail}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <h5>Type</h5>
                                                                        <div className="">
                                                        <span
                                                            className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                                            &nbsp;de&nbsp;&nbsp;
                                                                            <span className="badge bg-soft-dark text-dark p-1">
                                                         {item.nbAction}
                                                        </span>
                                                                            <span className="badge bg-soft-info text-info p-1"
                                                                                  style={{marginLeft: 8}}>Action simple</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row" style={{marginTop: 25}}>
                                                                    <div className="col-md-4">
                                                                        <Card style={{boxShadow: "0 0.75rem 6rem rgba(56, 65, 74, 0.13)"}}>
                                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                                <h5>Prix nominal par action</h5>
                                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">0.1 €</span>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <Card style={{boxShadow: "0 0.75rem 6rem rgba(56, 65, 74, 0.13)"}}>
                                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                                <h5>Prix d'émission par action</h5>
                                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">10 €</span>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <Card style={{boxShadow: "0 0.75rem 6rem rgba(56, 65, 74, 0.13)"}}>
                                                                            <CardBody style={{padding: '0.5rem', cursor: 'pointer'}}>
                                                                                <h5>Montant total</h5>
                                                                                <div className="text-center">
                                                        <span
                                                            className="badge bg-soft-danger text-danger p-1">1010 €</span>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </div>
                                                                </div>
                                                                <div style={{
                                                                    marginLeft: '20%',
                                                                    marginRight: '20%',
                                                                    height: 1,
                                                                    backgroundColor: "#C0C0C0",
                                                                    marginTop: 20
                                                                }}/>
                                                            </div>
                                                    ))
                                                }
                                                {
                                                    this.state.showDocs &&
                                                    <div>

                                                        <h6><i className="fa fa-paperclip mb-2"></i> Documents <span>(1)</span></h6>

                                                        <div className="row">
                                                            <div className="col-sm-2">
                                                                <a style={{cursor: 'pointer'}} onClick={this.showDocument}>
                                                                    <img src={pdfImage} style={{maxHeight: 100}} alt="attachment"
                                                                         className="img-thumbnail img-responsive"/>
                                                                </a>
                                                                <p>AGE-{moment(new Date()).format("DD/MM/YYYY")}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    </div>

                            }




                        </Suspense>
                    </Container>
                </div>

            </div>


        )
    }


}

export default operationDetails;