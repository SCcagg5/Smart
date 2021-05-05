import React, {Component} from 'react';
import NavBarNlManager from "../../components/NavBar/NavBarNLManager";

class Accueil extends Component {
    render() {
        return (
            <div>
                <NavBarNlManager nav={"accueil"}></NavBarNlManager>
                <div className="wrapper mt-5">
                    <div className="row header-page">
                        <div className="col-md-8">
                            <h4 className="mt-0">Votre espace manager</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-border">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="card-title mt-0">Notifications</h4>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="alert alert-outline-success" role="alert">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <b>Nouveau produit ENERGY 3AROMA en précommande !</b>
                                                        <br/>
                                                            Précommandez dès maintenant la référence ENERGY 3AROMA ! En
                                                            savoir plus
                                                    </div>
                                                    <div className="col-md-4 text-right">
                                                        <a className="btn btn-sm btn-round btn-green"
                                                           href="/shop/preorder">Précommande</a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="alert alert-outline-success padding-alert" role="alert">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <b>Vos prospects</b>
                                                        <br/>Vous avez un nouveau prospect en attente dans le département
                                                            : 75104
                                                    </div>
                                                    <div className="col-md-4 text-right">
                                                        <a className="btn btn-sm btn-round btn-outline-success"
                                                           href="/crm/leads">Consulter</a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="row header-page">
                    <div className="col-md-8">
                        <h4 className="mt-0 ml-3">Accueil</h4>
                    </div>
                </div>


            </div>
        );
    }
}

export default Accueil;
