import React, {Component, Suspense} from "react";
import Loader from "../../../../../components/Loader";
import {Container} from "reactstrap";
const Topbar = React.lazy(() => import("../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../components/Navbar"));
const loading = () => <Loader/>;


class infoAfterChoise extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
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
        }
    }


    render() {

        const {selectedActios} = this.props.location.state ;
        let nbActPhy = 0;
        let nbActMorale = 0;

        selectedActios.map((item,key) => {
            if(item.type === "Personne physique")  nbActPhy+=1;
            else nbActMorale+=1;
        });

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

                            <div className="card" style={{marginTop:25}}>
                                <div className="card-body ">
                                    <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                       onClick={()=>this.props.history.goBack()} className="float-right text-info">Retour</a>

                                    <div className="row" style={{marginTop:25}}>
                                        <div className="col-md-4">
                                            <div className="card-box" style={{boxShadow:"0 0.75rem 6rem rgba(56, 65, 74, 0.2)"}}>
                                                <h4 className="mt-0 font-16">Nombre total personnes physiques</h4>
                                                <h2 className="text-primary my-1 text-center"><span data-plugin="counterup">{nbActPhy} </span>
                                                </h2>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="card-box" style={{boxShadow:"0 0.75rem 6rem rgba(56, 65, 74, 0.2)"}}>
                                                <h4 className="mt-0 font-16">Nombre total personnes morales</h4>
                                                <h2 className="text-primary my-1 text-center"><span data-plugin="counterup">{nbActMorale}</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card-box" style={{boxShadow:"0 0.75rem 6rem rgba(56, 65, 74, 0.2)"}}>
                                                <h4 className="mt-0 font-16">Prix nominal par action</h4>
                                                <h2 className="text-primary my-1 text-center"><span data-plugin="counterup">0.1</span>€</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card-box" style={{boxShadow:"0 0.75rem 6rem rgba(56, 65, 74, 0.2)"}}>
                                                <h4 className="mt-0 font-16">Prix d'émission par action</h4>
                                                <h2 className="text-primary my-1 text-center"><span data-plugin="counterup">10</span>€</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="float-right">
                                                {/*<button type="button"
                                                        className="btn btn-danger waves-effect waves-light"
                                                        onClick={goTo('affectationTitre')}>Affectation des titres&nbsp;&nbsp;
                                                    <i className="mdi mdi-arrow-right mr-1"></i>
                                                </button>*/}
                                                <button type="button" className="btn btn-danger waves-effect waves-light"
                                                        onClick={()=>{this.props.history.push("/gestion/entreprises/operations/emissionTitres/1/info/affectation",{
                                                            entreprise:this.props.location.state.entreprise,
                                                            selectedActios:this.props.location.state.selectedActios,
                                                            augmentationCapital:this.props.location.state.augmentationCapital
                                                        })}}>
                                                    Affectation des titres&nbsp;&nbsp;
                                                    <i className="mdi mdi-arrow-right mr-1"></i>
                                                </button>
                                            </div>
                                        </div>
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

export default infoAfterChoise;