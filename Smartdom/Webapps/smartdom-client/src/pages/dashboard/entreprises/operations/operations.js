import React, {Component, Suspense} from "react";
import fabienImg from "../../../../assets/images/avocats/fabian.png";
import alexImg from "../../../../assets/images/avocats/alex.jpg";
import keplerImg from "../../../../assets/images/avocats/aKapeller.jpg";
import Loader from "../../../../components/Loader";
import {Container} from "reactstrap";

const Topbar = React.lazy(() => import("../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../components/Navbar"));
const loading = () => <Loader/>;
const operationsList = [
    {
        title: 'Transfert de titre',
        desc: 'Inscrire une transaction dans le registre (échange, donations, apport,...)',
        name: 'op_transTitres',
        id: 1
    },
    {
        title: 'Emission de titre',
        desc: 'Création de minibons (BSA, BSPCE, Bonds obligations, Bonds HSE,...)',
        name: 'op_emmisionTitres',
        id: 2
    },
    {
        title: 'Augmentation de capital',
        desc: 'PV AGE, PV gérant, Bulletins souscription ,...',
        name: 'op_emmisionTitres',
        id: 8
    },
    {
        title: 'Transformation société',
        desc: 'SARL vers SA ,...',
        name: 'op_emmisionTitres',
        id: 9
    },
    {
        title: "Création d'une société filiale",
        desc: "Création d'une société filiale controlée par la société mère",
        name: 'newEntreprise',
        id: 0
    },
    {
        title: 'Convertir / Exercer un titre',
        desc: 'Exercer les droits relatifs à une action, un bon.',
        name: '',
        id: 3
    },
    {
        title: 'Nantissement de titre',
        desc: 'Inscription / modification des titres nantis.',
        name: '',
        id: 4
    },
    {
        title: 'Réduction de capital',
        desc: 'réduire manuellement les titres de la société.',
        name: '',
        id: 5
    },
    {
        title: 'Prêt de titre',
        desc: 'Prêt de titre entre actionnaires',
        name: '',
        id: 6
    },
    {
        title: 'Annuler une transaction',
        desc: 'Inscrire une annulation dans le registre',
        name: '',
        id: 7
    },

];

class operations extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            entreprise: ""
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
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({entreprise: this.props.location.state.entreprise})
        }
    }


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
                            {this.state.loading && <Loader/>}

                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body ">
                                            <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                               onClick={() => this.props.history.goBack()}
                                               className="float-right text-info">Retour</a>
                                            <h4 className="header-title mt-0 mb-3">Sélectionner une opération</h4>
                                            <ul className="list-unsyled m-0 pl-0 transaction-history">
                                                {
                                                    operationsList.map((item, key) => (
                                                        <li className="align-items-center d-flex justify-content-between">
                                                            <div className="media">
                                                                <div className="media-body align-self-center">
                                                                    <div className="transaction-data">
                                                                        <h3 className="m-0">{item.title} </h3>
                                                                        <p className="text-muted mb-0">{item.desc} </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="transaction-icon">
                                                                <i className="mdi mdi-arrow-right-thick"
                                                                   style={{cursor: 'pointer'}}
                                                                   onClick={
                                                                       item.id === 0 ? () => this.props.history.push('/gestion/creation/2', {typeEntreprise: "filiale"}) :
                                                                           item.id === 2 ? () => this.props.history.push('/gestion/entreprises/operations/emissionTitres', {entreprise: this.state.entreprise}) :
                                                                               item.id === 1 ? () => this.props.history.push('/gestion/entreprises/operations/transfertTitres', {entreprise: this.state.entreprise}) :
                                                                                   item.id === 8 && this.state.entreprise.paysOrigine === "Suisse" ?
                                                                                       () => this.props.history.push('/gestion/entreprises/Suisse/AugmCapital', {entreprise: this.state.entreprise}) :
                                                                                       item.id === 9 ? () => this.props.history.push("/gestion/entreprises/operations/transformation",{entreprise: this.state.entreprise}): () => {}}>
                                                                </i>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-3">
                                    <li className="task-info" id="task7" onClick={() => {
                                        this.props.history.push("/avocats")
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
                            </div>

                        </Suspense>
                    </Container>
                </div>


            </div>
        )
    }

}

export default operations;