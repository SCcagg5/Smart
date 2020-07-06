import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import {Button as ButtonR, Card, CardBody, Container} from "reactstrap";
import user3 from "../../../../../assets/images/users/default_avatar.jpg"
import entrepriseIcon from "../../../../../assets/images/entreprise-icon.png"
import augmCapitalService from "../../../../../provider/augmCapitalService";
import pdfImage from "../../../../../assets/images/pdfimage.jpg"
import {Line} from "react-chartjs-2";
const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class stockOptionSuissedetails extends Component {

    state = {
        loading: false,
        showInformations: true,
        showDocs: false,
        entreprise:"",
        radioStock1:"true",
        radioStock2:"true"

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
        augmCapitalService.getBSASuisseDoc(localStorage.getItem("uid")+"Suisse",titrekey,opkey).then( res => {

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

    confirmer(){


        if (this.state.radioStock2==="true") {


            let doc = ""
            let actio = this.props.location.state.beneficiaire;

            let titreKey = this.state.entreprise.titresBSA.length - 1;
            let titresBSA = this.state.entreprise.titresBSA[titreKey];
            let operations = titresBSA.operations;

            operations.map((item, opkey) => {
                doc = doc + " " + "http://51.158.97.220:3002/api/creationBSASuisseGET/" + localStorage.getItem("uid") + "Suisse/" + titreKey + "/" + opkey

            })

            console.log(doc)

            localStorage.setItem('FNbeneficaire', actio.firstname)
            localStorage.setItem('LNbeneficaire', actio.lastname)


            localStorage.setItem('docURL', doc)
            this.props.history.push("/avocats")




        }






    }


    render() {
        const entreprise = this.state.entreprise;
        let actio = this.props.location.state.beneficiaire;

        let titreKey =entreprise.titresBSA.length - 1;
        let titresBSA = entreprise.titresBSA[titreKey];
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
                                        <h4 className="header-title mt-0 mb-3">Stock option validé avec succès</h4>
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
                                                                    <img src={actio.ej_name === "" ? user3 : entrepriseIcon}
                                                                         className="img-fluid rounded-circle"
                                                                         alt="user-img"/>
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <h5 className="mb-1 mt-2 font-16">{ actio.ej_name === "" ? actio.firstname + ' ' + actio.lastname : actio.ej_name}</h5>
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
                                            this.state.showInformations &&
                                                <div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-12">
                                                            <label>Est ce que la proposition de contrat est envoyé directement au bénéficiaire et au gérant ?</label>
                                                            <div className="radio radio-pink mb-1">
                                                                <input type="radio" name="radioStockPropContrat" id="radioStockPropContrat1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={() => this.setState({radioStock1:"true"})}
                                                                       checked={this.state.radioStock1 === "true"}
                                                                       value={this.state.radioStock1}
                                                                />
                                                                <label htmlFor="radioStockPropContrat1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioStockPropContrat" id="radioStockPropContrat2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={() => this.setState({radioStock1:"false"})}
                                                                       checked={this.state.radioStock1 === "false"}
                                                                       value={this.state.radioStock1}
                                                                />
                                                                <label htmlFor="radioStockPropContrat2">
                                                                    Non
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row mt-2">
                                                        <div className="col-md-12">
                                                            <label>Souhaitez vous au préalable envoyer ce projet de stock option au service conseil juridique de Smart Co ?</label>
                                                            <div className="radio radio-pink mb-1">
                                                                <input type="radio" name="radioStockSend" id="radioStockSend1"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={() => this.setState({radioStock2:"true"})}
                                                                       checked={this.state.radioStock2 === "true"}
                                                                       value={this.state.radioStock2}
                                                                />
                                                                <label htmlFor="radioStockSend1">
                                                                    Oui
                                                                </label>
                                                            </div>
                                                            <div className="radio radio-pink mb-2">
                                                                <input type="radio" name="radioStockSend" id="radioStockSend2"
                                                                       style={{marginLeft: 10}}
                                                                       onClick={() => this.setState({radioStock2:"false"})}
                                                                       checked={this.state.radioStock2 === "false"}
                                                                       value={this.state.radioStock2}
                                                                />
                                                                <label htmlFor="radioStockSend2">
                                                                    Non
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-2">
                                                        <div className="col-md-12 text-center">
                                                            <ButtonR onClick={()=>{this.confirmer()}} className="btn btn-danger">Confirmer</ButtonR>
                                                        </div>
                                                    </div>
                                                </div>

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
                                                            <div className="col-sm-3 text-center">
                                                                <a style={{cursor: 'pointer'}} onClick={this.showDocument(titreKey,opkey)}>
                                                                    <img src={pdfImage} style={{maxHeight: 80}} alt="attachment"
                                                                         className="img-thumbnail img-responsive"/>
                                                                </a>
                                                                <p>Stock-Option-{item.dateLeveeOption}</p>
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

export default stockOptionSuissedetails;