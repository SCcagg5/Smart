import React, {Component} from "react";
import moment from "moment";

class detailActionnaire extends Component {




    state = {};

    render() {
        const {actionnaire, goBack} = this.props;
        let nbBSA =0;
        let dateMAJ = "";
        if(actionnaire.titresBSA !== undefined) {
            nbBSA = actionnaire.titresBSA.nb;
            dateMAJ = moment(actionnaire.titresBSA.dateMAJ).format("DD-MM-YYYY HH:mm")
        }
        return (
            <div>
                <div className="row" style={{marginTop: 20}}>
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <i className="mdi mdi-arrow-left-circle" onClick={goBack('entrepriseDashboard')}
                           style={{color: "cornflowerblue", fontSize: 28, cursor: "pointer"}}>
                            <h5 style={{cursor: 'auto'}}>Actionnaire: {actionnaire.firstname+" "+actionnaire.lastname}</h5>
                        </i>
                    </div>
                </div>


                <div className="row" style={{marginTop: 35}}>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-widgets">
                                    {/*<div style={{cursor:'pointer'}}  onClick={this.refrech} data-toggle="reload"><i className="mdi mdi-refresh"></i></div>*/}
                                </div>
                                <h4 className="header-title mb-0">Titres détenues par {actionnaire.firstname+" "+actionnaire.lastname}</h4>

                                <div id="cardCollpase4" className="collapse pt-3 show">
                                    <div className="table-responsive">
                                        <table className="table table-centered table-borderless mb-0">
                                            <thead className="thead-light">
                                            <tr>
                                                <th>Classe</th>
                                                <th>Groupe de titre</th>
                                                <th>Dernière MAJ </th>
                                                <th className="text-center">Quantité</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                                    <tr>
                                                        <td>
                                                            <span className="badge bg-soft-info text-info p-1">{"BSA"} </span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-soft-info text-info p-1">{"BSA"} </span>
                                                        </td>
                                                        <td>{dateMAJ}</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-soft-dark text-dark p-1">{nbBSA} </span>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <span className="badge bg-soft-blue text-blue p-1">{"Action Simple"} </span>
                                                        </td>
                                                        <td>
                                                            <span className="badge bg-soft-blue text-blue p-1">{"Action Simple"} </span>
                                                        </td>
                                                        <td>{dateMAJ}</td>
                                                        <td className="text-center">
                                                            <span className="badge bg-soft-dark text-dark p-1">{actionnaire.nbActions} </span>
                                                        </td>
                                                    </tr>
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

export default detailActionnaire;