import React, {Component, Suspense} from "react";
import { AvForm, AvGroup, AvInput} from "availity-reactstrap-validation";
import {Button, Container, FormGroup, Label} from "reactstrap";
import Loader from "../../../components/Loader";
const Topbar = React.lazy(() => import("../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../components/Navbar"));
const loading = () => <Loader/>;


class choixCreationSociete extends Component{


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




    render() {
        return(

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
                            <div className="card" style={{marginTop: 25}}>
                                <div className="card-body ">
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()}
                                       className="float-right text-info">Retour</a>
                                    <h4 className="header-title mt-0 mb-3">
                                        Choisir le type d'entreprise à créer
                                    </h4>
                                    <div className="row" style={{marginTop: 15}}>
                                        <div className="col-lg-12">

                                            <AvForm onValidSubmit={(event, values) => {

                                                if(values.pays === "Suisse" && values.type === "SARL"){
                                                    this.props.history.push('/gestion/creation/1');
                                                }else{
                                                    this.props.history.push('/gestion/creation/2');
                                                }
                                            }}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <AvGroup className="mb-3">
                                                            <Label for="forme">Pays</Label>
                                                            <AvInput type="select" name="pays" id="pays"
                                                                     value={"Suisse"}>
                                                                <option value="Suisse">
                                                                    Suisse
                                                                </option>
                                                                <option value="France">
                                                                    France
                                                                </option>
                                                                <option value="tunisie">
                                                                    Tunisie
                                                                </option>
                                                            </AvInput>
                                                        </AvGroup>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-lg-12">
                                                        <AvGroup className="mb-3">
                                                            <Label for="forme">Type</Label>
                                                            <AvInput type="select" name="type" id="type"
                                                                     value={"SARL"}>
                                                                <option value="SARL">
                                                                    SARL
                                                                </option>
                                                                <option value="SA">
                                                                    SA
                                                                </option>
                                                                <option value="Autre">
                                                                    Autre
                                                                </option>
                                                            </AvInput>
                                                        </AvGroup>
                                                    </div>

                                                </div>
                                                <FormGroup>
                                                    <div className="text-center">
                                                        <Button color="primary" className="btn btn-danger waves-effect waves-light">
                                                            Suivant
                                                        </Button>
                                                    </div>
                                                </FormGroup>
                                            </AvForm>
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

export default choixCreationSociete;