import React, {Suspense} from "react";
import france from "../../assets/images/flags/france.png";
import suisse from "../../assets/images/flags/suisse.png";
import tunisie from "../../assets/images/flags/tunisie.png";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import firebase from "firebase";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import pdfImage from "../../assets/images/pdfimage.jpg";
import augmCapitalService from "../../provider/augmCapitalService";

const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const loading = () => <Loader/>;

class StockOptionDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',

            invSearchFName: "",
            invSearchPhone: "",
            invSearchTag: "",
            invSearchState: ""
        }
    }


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    showStockoptionDocument = (titrekey, opkey) => event => {

        this.setState({loading: true});
        augmCapitalService.getBSASuisseDoc(localStorage.getItem("uid") + "Suisse", titrekey, opkey).then(res => {

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

    componentDidMount() {
        firebase.database().ref('/society/' + localStorage.getItem("uid") + "Suisse").on('value', (snapshot) => {
            let society = snapshot.val();
            console.log(society)
            this.setState({actios: society.sAssociate || [], society: society})
        });
    }


    render() {
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
                                {this.state.loading && <Loader/>}

                                <div className="row mt-4">
                                    <div className="col-md-7">
                                        <h5 style={{color: "#000"}}>Documents relatifs à l'attribution d'un plan de
                                            stock option...</h5>

                                        <div style={{border: "2px solid #F0F0F0", padding: 20}}>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <a style={{cursor: 'pointer'}}>
                                                        <img src={pdfImage}
                                                             style={{maxHeight: 60}}
                                                             alt="attachment"
                                                             onClick={this.showStockoptionDocument(this.props.match.params.id1, this.props.match.params.id2)}
                                                             className="img-thumbnail img-responsive"/>
                                                    </a>
                                                    <p style={{fontSize: "small", marginTop: 10}}>
                                                        Proposition de stocke option
                                                        pour {this.props.match.params.beneficiaire} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <h5 style={{color:"#49A4DD",marginTop:15}}>Document à diffuser auprès des personnes suivants: </h5>

                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-3">
                                        <label htmlFor="search" style={{color: "#C0C0C0"}}>Chercher</label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="search"
                                                       placeholder="Par nom & prénom"
                                                       value={this.state.invSearchFName}
                                                       onChange={(event) => this.setState({invSearchFName: event.target.value})}
                                                />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text font-weight-bold" id="basic-addon1">
                                                        <i className="fa fa-search" style={{color: "green"}}/>
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="dateCreation" style={{color: "#C0C0C0"}}>Numéro de
                                            téléphone</label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control"
                                                       id="numphone"
                                                       placeholder="Numéro de téléphone"
                                                       value={this.state.invSearchPhone}
                                                       onChange={(event) => this.setState({invSearchPhone: event.target.value})}
                                                />
                                                <div className="input-group-prepend">
                                                                <span className="input-group-text font-weight-bold"
                                                                      id="basic-addon1">
                                                                     <i className="fa fa-phone"
                                                                        style={{color: "green"}}/>
                                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="tag" style={{color: "#C0C0C0"}}>Tag</label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="tag"
                                                       placeholder="Chercher Par Tag"
                                                       value={this.state.invSearchTag}
                                                       onChange={(event) => this.setState({invSearchTag: event.target.value})}
                                                />
                                                <div className="input-group-prepend">
                                                                <span className="input-group-text font-weight-bold"
                                                                      id="basic-addon1">
                                                                     <i className="fa fa-tag" style={{color: "green"}}/>
                                                                </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="statut" style={{color: "#C0C0C0"}}>Status</label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select className="form-control custom-select" id="statut"
                                                        placeholder=""
                                                        value={this.state.invSearchState}
                                                        onChange={(event) => this.setState({invSearchState: event.target.value})}
                                                >
                                                    <option value=""/>
                                                    <option value="approuved">Approuvé</option>
                                                    <option value="pending">En attente</option>
                                                    <option value="declined">Réfusé</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">

                                        <div id="cardCollpase4" className="collapse pt-3 show">
                                            <div className="table-responsive">
                                                <table className="table table-centered table-borderless mb-0">
                                                    <thead style={{
                                                        backgroundColor: "#2A348F",
                                                        color: "#fff",
                                                        fontSize: 11,
                                                        fontFamily: "MyriadPro"
                                                    }}>
                                                    <tr>
                                                        <th style={{textAlign: "center"}}>Nom & Prénom</th>
                                                        <th style={{textAlign: "center"}}>Nationalité</th>
                                                        <th style={{textAlign: "center"}}>Email</th>
                                                        <th style={{textAlign: "center"}}>% Capital</th>
                                                        <th style={{textAlign: "center"}}>Envoi</th>
                                                        <th style={{textAlign: "center"}}>Status</th>
                                                        <th style={{textAlign: "center"}}>Date premier envoi de docs
                                                        </th>
                                                        <th style={{textAlign: "center"}}>VisioConf/Demande</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="table-striped">

                                                    {
                                                        (this.state.actios || []).map((item, key) => (
                                                            ((item.firstname + " " + item.lastname).trim().toLowerCase().includes(this.state.invSearchFName.toLowerCase()) || this.state.invSearchFName === "") &&
                                                            ((item.phone).trim().toLowerCase().includes(this.state.invSearchPhone.toLowerCase()) || this.state.invSearchPhone === "") &&
                                                            ((item.KYCtags || "").trim().toLowerCase().includes(this.state.invSearchTag.toLowerCase()) || this.state.invSearchTag === "") &&
                                                            ((item.KYCstate || "").trim().toLowerCase().includes(this.state.invSearchState.toLowerCase()) || this.state.invSearchState === "") &&
                                                            <tr key={key}>
                                                                <td align="center">{item.ej_name === "" ? item.firstname + " " + item.lastname : item.ej_name}</td>
                                                                <td align="center">
                                                                    <img src={item.nationality === "France" ? france :
                                                                        item.nationality === "Switzerland" ? suisse : item.nationality === "Tunisia" ? tunisie : france}
                                                                         alt="society-flags" height="24"/>
                                                                </td>

                                                                <td align="center">{item.email}</td>

                                                                <td className="text-center font-weight-bold"
                                                                    style={{color: "#000"}}>
                                                                    {((parseInt(item.nbActions) / parseInt(this.state.society.sCapital.totalNbActions)) * 100).toFixed(2)}&nbsp;%
                                                                </td>
                                                                <td align="center">
                                                                    <Checkbox
                                                                        checked={key === 1 || key === 3}
                                                                        onChange={(event) => this.setState({type: event.target.value})}
                                                                        value='particulier'
                                                                        classes={{
                                                                            root: "customUICheckboxIcon"
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td align="center">
                                                                    {
                                                                        item.KYCstate === "pending" ?
                                                                            <span
                                                                                className="badge bg-soft-warning text-warning p-1">En attente</span> :
                                                                            item.KYCstate === "approuved" ?
                                                                                <span
                                                                                    className="badge bg-soft-success text-success p-1">Approuvé</span> :
                                                                                item.KYCstate === "declined" ?
                                                                                    <span
                                                                                        className="badge bg-soft-danger text-danger p-1">Refusé</span> : ""
                                                                    }

                                                                </td>

                                                                <td>
                                                                    {moment().subtract(5, "day").format("DD MMM YYYY HH:mm")}
                                                                </td>

                                                                <td className="text-center">

                                                                    <Checkbox
                                                                        checked={key === 2}
                                                                        onChange={(event) => this.setState({type: event.target.value})}
                                                                        value='particulier'
                                                                        classes={{
                                                                            root: "customUICheckboxIcon"
                                                                        }}
                                                                    />

                                                                </td>

                                                            </tr>
                                                        ))
                                                    }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>

                                </div>


                            </Suspense>
                        </Container>
                    </div>
                </div>


            </div>

        )
    }

}

export default StockOptionDetails;
