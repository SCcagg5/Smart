import React from "react";
import tunisImg from "../../assets/images/flags/tunisie.png"
import franceImg from "../../assets/images/flags/france.png"
import suisseImg from "../../assets/images/flags/suisse.png"
import moment from "moment";


export default class Dash extends React.Component{

    state={

    }

    componentDidMount() {
        console.log(this.props.societies)
    }

    render() {

        return(
            <div>
                <div className="row" style={{marginTop:20}}>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-0">Mes sociétés</h4>

                                {
                                    this.props.societies.length === 0 ?
                                        <div style={{marginTop:30}}>
                                            <h6>Aucune société encore ajoutée</h6>
                                        </div> :

                                        <div id="cardCollpase4" className="collapse pt-3 show">
                                            <div className="table-responsive">
                                                <table className="table table-centered table-borderless mb-0">
                                                    <thead style={{backgroundColor:"#2A348F",color:"#fff",fontWeight:"normal"}}>
                                                    <tr>
                                                        <th>Nom</th>
                                                        <th>Date de création</th>
                                                        <th>Pays</th>
                                                        <th>Adresse</th>
                                                        <th>Gérant de la société</th>
                                                        <th>Associés</th>
                                                        <th>Nb actions</th>
                                                        <th>Valeur action</th>
                                                        <th>Capital</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        (this.props.societies || []).map((item, key) => (
                                                            <tr key={key}>
                                                                <td style={{cursor:"pointer"}} onClick={() => this.props.onSelectSoc(item)}>
                                                                    {item.name}
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-soft-secondary text-secondary p-1">{moment(item.created_at).format("DD-MM-YYYY")}</span>
                                                                </td>
                                                                <td>
                                                                    <img src={item.pays === "France" ? franceImg : item.pays === "Switzerland" ? suisseImg :tunisImg} alt="society-flags" height="24"/>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.siege.adress + ', ' + item.siege.ville + ' ' + item.siege.codePostal + ' ' + item.pays
                                                                    }
                                                                </td>
                                                                <td className="text-center"><span
                                                                    className="badge bg-soft-info text-info p-1">{item.gerants[0].firstname + " " + item.gerants[0].lastname}</span>
                                                                </td>
                                                                <td className="text-center"><span
                                                                    className="badge bg-soft-info text-info p-1">{item.associes.length}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-soft-warning text-warning p-1">
                                                                        {
                                                                        (item.capitalHistory && item.capitalHistory.length > 0 ? (item.capitalHistory[item.capitalHistory.length -1].nbActions) :
                                                                            parseInt(item.capital.totalCapital) / parseFloat(item.capital.valeurAction) )
                                                                        }&nbsp;actions
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-soft-warning text-warning p-1">{item.capital.valeurAction + (item.pays === "France" ? " €" : item.pays === "Switzerland" ? " CHF" : " TND")}</span>
                                                                </td>
                                                                <td>
                                                                    <span className="badge bg-soft-danger text-danger p-1">
                                                                        {
                                                                            item.capitalHistory && item.capitalHistory.length > 0 ? (item.capitalHistory[item.capitalHistory.length -1].capital) :
                                                                            item.capital.totalCapital
                                                                        }&nbsp;{item.pays === "France" ? " €" : item.pays === "Switzerland" ? " CHF" : " TND"}
                                                                    </span>
                                                                </td>
                                                                <td className="text-center" style={{display:"flex",marginTop:15}}>
                                                                    <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                         data-toggle="tooltip" title="Effectuer une opération">
                                                                        <i style={{color:'blue',fontSize:18}} className="fe-plus-square"/>
                                                                    </div>
                                                                    <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                         data-toggle="tooltip" title="Effectuer une modification">
                                                                        <i style={{color:'blue',fontSize:18}} className="fe-edit"/>
                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}
