import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import { Card, CardBody, Container} from "reactstrap";
import user3 from "../../../../../assets/users/user-3.jpg"
import augmCapitalService from "../../../../../provider/augmCapitalService";
import pdfImage from "../../../../../assets/images/pdfimage.jpg"
const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class operationBSADetails extends Component {

    state = {
        loading: false,
        showInformations: true,
        showDocs: false,
        entreprise:""
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

    showDocument = (titrekey,opkey) => event => {

        this.setState({loading:true});
        let uid = this.state.entreprise.uniqueId;
        let typeActio = "";
        if(this.props.location.state.typeActio === "phy"){
            typeActio = "Personnephysique"
        }else{
            typeActio = "Personnemoral"
        }
        augmCapitalService.getBSADoc(uid,this.props.location.state.indexActio,typeActio,titrekey,opkey).then( res => {

            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading:false});

        },err => {
            console.log(err);
        })


    };

    render() {
        const entreprise = this.state.entreprise;
        const {indexActio, typeActio} = this.props.location.state;
        let actio = {};
        if (typeActio === "phy")
            actio = entreprise.sActionnairePhy[indexActio];
        else
            actio = entreprise.sActionnaireMoral[indexActio];

        let titreKey = actio.titresBSA.length - 1;
        let titresBSA = actio.titresBSA[titreKey];
        let operations = titresBSA.operations;

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

                            <div className="card" style={{marginTop: 25}}>
                                <div className="card-body ">
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()} className="float-right text-info">Retour</a>
                                    <div>
                                        <h4 className="header-title mt-0 mb-3">L'affectation de BSA est effectuée avec succès</h4>
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
                                            this.state.showInformations &&
                                            <div className="row" style={{marginTop: 10}}>
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
                                                                <h5 className="mb-1 mt-2 font-16">{actio.firstname + ' ' + actio.lastname}</h5>
                                                                <p className="mb-2 text-muted">{actio.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            this.state.showInformations && operations.map((item, key) => (

                                                <div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5>Type</h5>
                                                            <div className="">
                                                                <span className="badge bg-soft-success text-success p-1">EMISSION</span>
                                                                &nbsp;de&nbsp;&nbsp;
                                                                <span className="badge bg-soft-dark text-dark p-1">
                                                {item.nb}
                                            </span>
                                                                <span className="badge bg-soft-info text-info p-1"
                                                                      style={{marginLeft: 8}}>BSA</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5>Date de levée d'option</h5>
                                                            <div>
                                                  <span className="badge bg-soft-danger text-danger p-1">
                                                        {item.dateLeveeOption}
                                                  </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        marginLeft: '20%',
                                                        marginRight: '20%',
                                                        height: 1,
                                                        backgroundColor: "#C0C0C0",
                                                        marginTop: 25,
                                                        marginBottom:15
                                                    }}/>
                                                </div>
                                            ))
                                        }
                                        {
                                            this.state.showDocs &&
                                            <div>

                                                <h6>
                                                    <i className="fa fa-paperclip mb-2"></i> Documents <span>({operations.length})</span>
                                                </h6>

                                                <div className="row">
                                                    {
                                                        operations.map((item, opkey) => (
                                                            <div className="col-sm-2">
                                                                <a style={{cursor: 'pointer'}} onClick={this.showDocument(titreKey,opkey)}>
                                                                    <img src={pdfImage} style={{maxHeight: 100}} alt="attachment"
                                                                         className="img-thumbnail img-responsive"/>
                                                                </a>
                                                                <p>Emission-BSA-{item.dateLeveeOption}</p>
                                                            </div>
                                                        ))
                                                    }

                                                </div>

                                            </div>
                                        }

                                    </div>


                                </div>
                            </div>

                        </Suspense>
                    </Container>
                </div>
            </div>


        )
    }


}

export default operationBSADetails;