import React from "react";
import {Doughnut} from 'react-chartjs-2';
import france from "../../assets/images/flags/france.png";
import suisse from "../../assets/images/flags/suisse.png";
import tunisie from "../../assets/images/flags/tunisie.png";
import rethink from "../../controller/rethink";

const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;

export default class DetailsSoc extends React.Component{


    render() {

        let repCapital = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5']
            }]
        };
        let repActifs = {
            labels: ["Personnes physiques", "Investisseurs"],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#e91e63', '#9c27b0', '#00bcd4', '#607d8b', '#3f51b5']
            }]
        };
        let soc = this.props.soc;
        let p_physiques = soc.associes.filter(x => x.typeTmp === "Un particulier");
        let investisseurs = soc.associes.filter(x => x.typeTmp !== "Un particulier");

        (soc.associes || []).map( associe => {
            repCapital.labels.push(associe.typeTmp === "Un particulier" ? (associe.firstname + " " + associe.lastname) : associe.ej_name);
            repCapital.datasets[0].data.push(associe.nbActionsHistory && associe.nbActionsHistory.length > 0 ? (associe.nbActionsHistory[associe.nbActionsHistory.length -1].nbActions) : parseInt(associe.nbActions));
        })
        repActifs.datasets[0].data.push(p_physiques.length, investisseurs.length);

        let totalActions = soc.capitalHistory && soc.capitalHistory.length > 0 ?  (soc.capitalHistory[soc.capitalHistory.length -1].capital / parseFloat(soc.capitalHistory[soc.capitalHistory.length -1].valeurAction)) :
            (parseFloat(soc.capital.totalCapital) / parseFloat(soc.capital.valeurAction))
        let total_capital = totalActions * parseFloat(soc.capital.valeurAction)

        return(

            <div>
                <div style={{padding:5,backgroundColor:"#f1f5f7",display:"flex"}}>
                    <img alt="" src={require('../../assets/images/company.png')} style={{width:30,height:30,alignSelf:"center"}}/>
                    <h5 style={{alignSelf:"center",marginLeft:15}}>{this.props.soc.name}</h5>
                </div>

                <div style={{marginTop:25}}>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-box bg-pattern" style={{height: 160}}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="avatar-md bg-danger rounded-circle">
                                            <i className="fe-users avatar-title font-22 text-white"/>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="text-right">
                                            <h3 className="text-dark my-1 mb-3"><span
                                                data-plugin="counterup">{parseInt(soc.associes.length)} </span>
                                            </h3>
                                            <p className="text-muted mb-1 text-uppercase font-weight-bold">Associés</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-box bg-pattern" style={{height: 160}}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="avatar-md bg-soft-warning rounded-circle">
                                            <i className="fe-pie-chart avatar-title font-22 text-white"/>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="text-right">
                                            <h3 className="text-dark my-1 mb-3">
                                                <span data-plugin="counterup">{totalActions} </span>
                                            </h3>
                                            <p className="text-muted mb-1 text-uppercase font-weight-bold">Actions distribuées</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card-box bg-pattern" style={{height: 160}}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="avatar-md bg-pink rounded-circle">
                                            <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="text-right">
                                            <h3 className="text-dark my-1 mb-3"><span
                                                data-plugin="counterup">
                                                {
                                                    total_capital + (soc.pays === "France" ? " €" : soc.pays === "Switzerland" ? " CHF" : " TND")
                                                }
                                            </span>
                                            </h3>
                                            <p className="text-muted mb-1 text-uppercase font-weight-bold">Capital social</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-3">
                            <div className="card-box bg-pattern" style={{height: 160}}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="avatar-md bg-soft-blue rounded-circle">
                                            <i className="fe-dollar-sign avatar-title font-22 text-white"/>
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="text-right">
                                            <h3 className="text-dark my-1 mb-3">
                                                <span data-plugin="counterup">{soc.capital.valeurAction}&nbsp;{soc.pays === "France" ? " €" : soc.pays === "Switzerland" ? " CHF" : " TND"}</span>
                                            </h3>
                                            <p className="text-muted mb-1 font-weight-bold text-uppercase">Valeur action</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets"/>
                                    <h4 className="header-title mb-0">Signature des documents</h4>

                                    <div id="cardCollpase4" className="collapse pt-3 show">
                                        <div className="table-responsive">
                                            <table className="table table-centered table-borderless mb-0">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th style={{textAlign:"center"}}>Document</th>
                                                    <th style={{textAlign:"center"}}>Signé par tous les associés</th>
                                                    <th style={{textAlign:"center"}}>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                        <tr>
                                                            <td style={{textAlign:"center",display:"flex",cursor:"pointer"}}
                                                                onClick={() => {
                                                                    this.props.setLoading(true)
                                                                    rethink.getItemByUID(db_name,"documents",soc.statut_rethink_uid,"test").then( res => {
                                                                        console.log(res)
                                                                        this.props.openPdf(res[0].b64,res[0].name,"pdf")
                                                                        this.props.setLoading(false)
                                                                    })
                                                                }}
                                                            >
                                                                <i className="mdi mdi-file-pdf mr-1 text-danger"/>
                                                                Statut.pdf
                                                            </td>
                                                            <td style={{textAlign:"center"}}>
                                                                <span className="badge bg-soft-success text-success p-1">
                                                                    Oui
                                                                </span>
                                                            </td>
                                                            <td style={{textAlign:"center"}}>
                                                                <button className="btn btn-micro btn-info waves-effect waves-light">
                                                                    <i className="mdi mdi-mailbox-up mr-1"/> Demander une signature
                                                                </button>
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

                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets"/>
                                    <h4 className="header-title mb-0">Table de capitalisation</h4>

                                    <div id="cardCollpase4" className="collapse pt-3 show">
                                        <div className="table-responsive">
                                            <table className="table table-centered table-borderless mb-0">
                                                <thead className="thead-light">
                                                <tr>
                                                    <th>Associés</th>
                                                    <th>Type</th>
                                                    <th style={{textAlign: "center"}}>Nationnalité</th>
                                                    <th className="text-center">Actions détenues</th>
                                                    <th className="text-center">Actions détenues (%)</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    (soc.associes || []).map((item, key) => (
                                                        <tr>
                                                            <td>{item.typeTmp === "Un particulier" ? (item.firstname + " " + item.lastname) : item.ej_name}</td>
                                                            <td>
                                                                <span className="badge bg-soft-blue text-blue p-1">
                                                                    {item.typeTmp === "Un particulier" ? "Personne physique" : "Société"}
                                                                </span>
                                                            </td>
                                                            <td align="center">
                                                                <img
                                                                    src={(item.nationality === "France" || item.pays === "France") ?
                                                                        france : (item.nationality === "Switzerland" || item.pays === "Switzerland") ? suisse : tunisie}
                                                                    alt="society-flags" height="24"/>
                                                            </td>
                                                            <td className="text-center"><span
                                                                className="badge bg-soft-danger text-danger p-1">
                                                                {
                                                                    item.nbActionsHistory && item.nbActionsHistory.length > 0 ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions) : (item.nbActions)
                                                                }&nbsp;actions
                                                            </span>
                                                            </td>
                                                            <td className="text-center font-weight-bold"
                                                                style={{color: "#000"}}>
                                                                {
                                                                    ( ( (item.nbActionsHistory && item.nbActionsHistory.length > 0 ? (item.nbActionsHistory[item.nbActionsHistory.length -1].nbActions) : parseInt(item.nbActions)) / totalActions ) * 100).toFixed(2)
                                                                }&nbsp;%
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

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets">
                                    </div>
                                    <h4 className="header-title mb-3">Répartition du capital</h4>
                                    <Doughnut data={repCapital} options={{legend: {position: 'right'}}}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-widgets">
                                    </div>
                                    <h4 className="header-title mb-3">Répartition des actifs</h4>
                                    <Doughnut data={repActifs} options={{legend: {position: 'right'}}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}
