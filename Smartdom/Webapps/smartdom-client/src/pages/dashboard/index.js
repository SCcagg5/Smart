import React, {Component, Suspense} from 'react';
import {Container} from "reactstrap";
import profilePic from '../../assets/images/users/user-1.jpg';
import Entreprises from './entreprises/redirect'
import EntrepriseDetail from './entreprises/entrepriseDetail'
import TransactionDetail from "./entreprises/transactionDetail";
import EntrepriseDashboard from "./entreprises/entrepriseDashboard";
import Operations from "./entreprises/operations/operations";
import EmissionTitre from "./entreprises/operations/emissionTitre/emissionTitre";
import ChoixActionnaires from "./entreprises/operations/emissionTitre/choixActionnaires";
import InfoAfterChoise from "./entreprises/operations/emissionTitre/infoAfterChoise";
import AffectationTitre from "./entreprises/operations/emissionTitre/affectationTitre";
import AffectationBSA from "./entreprises/operations/emissionTitre/affectationBSA";
import DetailActionnaire from "./entreprises/detailActionnaire";
import OperationDetails from "./entreprises/operations/emissionTitre/operationDetails";
import OperationBSADetails from "./entreprises/operations/emissionTitre/operationBSADetails";
import ChoixCreationSociete from "./entreprises/choixCreationSociete";
import NewSuisseSARLEntreprise from "./entreprises/newSuisseSARLEntreprise";
import NewEntreprise from "./entreprises/newEntreprise";

import Loader from "../../components/Loader";

const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));
const RightSidebar = React.lazy(() => import("../../components/RightSidebar"));
const Footer = React.lazy(() => import("../../components/Footer"));
const loading = () => <div className="text-center"></div>;

const RightSidebarContent = (props) => {
    return <div className="user-box">
        <div className="user-img">
            <img src={profilePic} alt="user-img" title="Nik Patel"
                 className="rounded-circle img-fluid"/>
            <a href="/" className="user-edit"><i className="mdi mdi-pencil"></i></a>
        </div>

        <h5><a href="/">Babba Amine</a></h5>
        <p className="text-muted mb-0"><small>Founder</small></p>
    </div>
};


class DefaultDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            loading: false,
            activePage: 'entreprises',
            entreprise: '',
            transaction: '',
            selectedActios: [],
            augmentationcapital: '',
            actionnaire: '',
            operation: '',
            type: '',
            affectedBSAActio: '',
            typeActio: '',
            typeEntreprise: '',
            indexBSAActio: ''
        };
        this.returnTo = this.returnTo.bind(this);
        this.returnToBSAAffected = this.returnToBSAAffected.bind(this);
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

    returnTo(e, page) {
        if (page !== '') {
            this.setState({
                activePage: page,
            })
        }
    };

    returnToBSAAffected(e, page, indexActio, typeActio) {
        if (page !== '') {
            this.setState({
                activePage: page,
                indexBSAActio: indexActio,
                typeActio: typeActio
            })
        }
    };

    showEntrepriseDashboard = (item) => event => {
        this.setState({
            entreprise: item,
            activePage: 'entrepriseDashboard'
        })
    };

    showDetail = (item) => event => {
        this.setState({
            entreprise: item,
            activePage: 'entrepriseDetail'
        })
    };
    showOperations = (item) => event => {
        this.setState({
            entreprise: item,
            activePage: 'operations'
        })
    };
    showTransaction = (item) => event => {
        this.setState({
            transaction: item,
            activePage: 'transactionDetail'
        })
    };

    goToInfoAfterChoise = (selectedActios, augmCapital) => event => {
        this.setState({
            activePage: 'infoAfterChoise',
            selectedActios: selectedActios,
            augmentationcapital: augmCapital
        })
    };

    showDetailActionnaire = (actio) => event => {
        this.setState({
            activePage: "detailActionnaire",
            actionnaire: actio
        })
    };

    goToNewEntreprise = (page, type) => event => {
        if (page !== '') {
            this.setState({
                activePage: page,
                typeEntreprise: type
            })
        }
    };


    render() {
        return (

            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu}
                                changeActivePage={this.changeActivePage}
                                isMenuOpened={this.state.isMenuOpened}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened} activeItem={this.state.activeMenuItem}
                                changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>

                            {
                                this.state.loading ?
                                    <Loader/> :
                                    this.state.activePage === 'entreprises' ?
                                        <Entreprises showDetail={this.showEntrepriseDashboard}
                                                     goTo={this.changeActivePage}
                                                     showOperations={this.showOperations}/> :
                                        this.state.activePage === 'choixTypeEntreprise' ?
                                            <ChoixCreationSociete returnTo={this.returnTo}
                                                                  goBack={this.changeActivePage}
                                                                  goTo={this.returnTo}/> :
                                            this.state.activePage === 'newEntreprise' ?
                                                <NewEntreprise returnTo={this.returnTo} goBack={this.changeActivePage}
                                                               entreprise={this.state.entreprise}
                                                               typeEntreprise={this.state.typeEntreprise}/> :
                                                this.state.activePage === 'newSuisseSARLEntreprise' ?
                                                    <NewSuisseSARLEntreprise returnTo={this.returnTo}
                                                                             goBack={this.changeActivePage}
                                                                             entreprise={this.state.entreprise}/> :
                                                    this.state.activePage === 'entrepriseDashboard' ?
                                                        <EntrepriseDashboard entreprise={this.state.entreprise}
                                                                             showDetail={this.showDetail}
                                                                             goBack={this.changeActivePage}
                                                                             showTransaction={this.showTransaction}
                                                                             showDetailActionnaire={this.showDetailActionnaire}/> :
                                                        this.state.activePage === 'detailActionnaire' ?
                                                            <DetailActionnaire actionnaire={this.state.actionnaire}
                                                                               goBack={this.changeActivePage}/> :
                                                            this.state.activePage === 'operations' ?
                                                                <Operations goBack={this.changeActivePage}
                                                                            goTo={this.changeActivePage}
                                                                            goToEntreprise={this.goToNewEntreprise}/> :
                                                                this.state.activePage === 'op_emmisionTitres' ?
                                                                    <EmissionTitre goBack={this.changeActivePage}
                                                                                   goTo={this.changeActivePage}/> :
                                                                    this.state.activePage === 'choixActionnaires' ?
                                                                        <ChoixActionnaires
                                                                            entreprise={this.state.entreprise}
                                                                            goBack={this.changeActivePage}
                                                                            goToInfoAfterChoise={this.goToInfoAfterChoise}/> :
                                                                        this.state.activePage === 'infoAfterChoise' ?
                                                                            <InfoAfterChoise
                                                                                entreprise={this.state.entreprise}
                                                                                goBack={this.changeActivePage}
                                                                                goTo={this.changeActivePage}
                                                                                selectedActios={this.state.selectedActios}/> :
                                                                            this.state.activePage === 'affectationTitre' ?
                                                                                <AffectationTitre
                                                                                    selectedActios={this.state.selectedActios}
                                                                                    augmentationCapital={this.state.augmentationcapital}
                                                                                    entreprise={this.state.entreprise}
                                                                                    goBack={this.changeActivePage}
                                                                                    returnTo={this.returnTo}/> :
                                                                                this.state.activePage === 'affectationBSA' ?
                                                                                    <AffectationBSA
                                                                                        entreprise={this.state.entreprise}
                                                                                        goBack={this.changeActivePage}
                                                                                        returnTo={this.returnToBSAAffected}/> :
                                                                                    this.state.activePage === 'operationDetails' ?
                                                                                        <OperationDetails
                                                                                            entreprise={this.state.entreprise}
                                                                                            goBack={this.changeActivePage}/> :
                                                                                        this.state.activePage === 'operationBSADetails' ?
                                                                                            <OperationBSADetails
                                                                                                entreprise={this.state.entreprise}
                                                                                                indexActio={this.state.indexBSAActio}
                                                                                                typeActio={this.state.typeActio}
                                                                                                goBack={this.changeActivePage}/> :
                                                                                            this.state.activePage === 'entrepriseDetail' ?
                                                                                                <EntrepriseDetail
                                                                                                    entreprise={this.state.entreprise}
                                                                                                    showTransaction={this.showTransaction}
                                                                                                    goBack={this.changeActivePage}/> :
                                                                                                this.state.activePage === 'transactionDetail' ?
                                                                                                    <TransactionDetail
                                                                                                        transaction={this.state.transaction}
                                                                                                        goBack={this.changeActivePage}/> : null
                            }


                        </Suspense>
                    </Container>
                </div>
                <Suspense fallback={loading()}>
                    <Footer/>
                </Suspense>

                <Suspense fallback={loading()}>
                    <RightSidebar title={"Settings"}>
                        <RightSidebarContent/>
                    </RightSidebar>
                </Suspense>
            </div>

        )
    }
}


export default DefaultDashboard;