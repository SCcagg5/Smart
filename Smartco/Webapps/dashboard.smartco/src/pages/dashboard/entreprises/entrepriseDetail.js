import React, {Component} from "react";
import Loader from "../../../components/Loader";

class entrepriseDetail extends Component {

    state = {};

    render() {
        const {entreprise, goBack, showTransaction} = this.props;
        const transactions =entreprise.cessionAction || [];
        return (
            <div>

                <div className="row" style={{marginTop: 20}}>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <i className="mdi mdi-arrow-left-circle" onClick={goBack('entreprises')}
                           style={{color:"cornflowerblue",fontSize:28,cursor:"pointer"}}>
                            <h5 style={{cursor:'auto'}}>Entreprise:  {entreprise.sName}</h5>
                        </i>

                    </div>
                </div>

                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-6 col-xl-3">
                        <div className="widget-rounded-circle card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-lg rounded bg-soft-danger">
                                        <i className="dripicons-wallet font-24 avatar-title text-danger"></i>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{entreprise.sCapital.montant}</span></h3>
                                        <p className="text-muted mb-1 text-truncate">Capital</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="widget-rounded-circle card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-lg rounded bg-soft-success">
                                        <i className="dripicons-user font-24 avatar-title text-success"></i>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{entreprise.representant} </span></h3>
                                        <p className="text-muted mb-1 text-truncate">Représentant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="widget-rounded-circle card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-lg rounded bg-soft-info">
                                        <i className="dripicons-user-group font-24 avatar-title text-info"></i>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{entreprise.nbActPhys} </span></h3>
                                        <p className="text-muted mb-1 text-truncate">Actionnaires physiques</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-xl-3">
                        <div className="widget-rounded-circle card-box">
                            <div className="row">
                                <div className="col-6">
                                    <div className="avatar-lg rounded bg-soft-warning">
                                        <i className="dripicons-user-group font-24 avatar-title text-warning"></i>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-right">
                                        <h3 className="text-dark mt-1"><span data-plugin="counterup">{entreprise.nbActMorales}</span></h3>
                                        <p className="text-muted mb-1 text-truncate">Actionnaire morales</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginTop:35}}>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-widgets">
                                    {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                </div>
                                <h4 className="header-title mb-0">Registre et mouvement de titres</h4>

                                <div id="cardCollpase4" className="collapse pt-3 show">
                                    <div className="table-responsive">
                                        <table className="table table-centered table-borderless mb-0">
                                            <thead className="thead-light">
                                            <tr>
                                                <th>Numéro</th>
                                                <th>Status</th>
                                                <th>Type de titre</th>
                                                <th>Date</th>
                                                <th>Quantité</th>
                                                <th>De</th>
                                                <th>A</th>
                                                <th>Détail</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                transactions.map((item,key) => (
                                                    item.numero = Math.floor(Math.random() * 100),
                                                    item.dateCreation = '22 septembre 2019',
                                                    <tr>
                                                        <td>{item.numero}</td>
                                                        <td><span className="badge bg-soft-danger text-danger p-1">{'Cession'}</span></td>
                                                        <td ><span className="badge bg-soft-info text-info p-1">{'Action simple'}</span></td>
                                                        <td>{item.dateCreation}</td>
                                                        <td>{'+'+item.droitSociauxCedes.nbActionCedes}</td>
                                                        <td>{item.cedant.nomPrenom}</td>
                                                        <td>{item.cessionnaire.nomPrenom}</td>
                                                        <td className="text-center">
                                                            <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                 data-toggle="tooltip" title="Détails" onClick={showTransaction(item)}>
                                                                <i style={{color:'red',fontSize:18}} className="fe-zoom-in"></i>
                                                            </div>
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
                    </div>
                </div>
            </div>
        )
    }

}

export default entrepriseDetail;