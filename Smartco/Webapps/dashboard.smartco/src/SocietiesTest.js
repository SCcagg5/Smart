import React, {Component, Suspense} from "react";
import Loader from "./components/Loader";
import france from "./assets/images/flags/france.png"
import suisse from "./assets/images/flags/suisse.png"
import tunisie from "./assets/images/flags/tunisie.png"
import firebase from "firebase/app";
import "firebase/database"
import {Line} from "react-chartjs-2";
import Chart from "react-apexcharts";
import ReactLoading from "react-loading"

const loading = () => <Loader/>;

class SocietiesTest extends Component {

    constructor() {
        super();
        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            loading: true,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            societies: [],
            investisors:[],

            data: {
                labels: ['Jan', 'Fév', 'Mars', 'Avr', 'May', 'juin', 'juill','Aout','Sep','Oct','Nov','Déc'],
                datasets: [
                    {
                        label: 'Progression',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [10, 25, 30,50,55,80,110,150,200,220,225,250]
                    }
                ]
            },

            invSearchFName: "",
            invSearchPhone: "",
            invSearchTag: "",
            invSearchState: ""
        };
    }



    componentDidMount() {
        let uid = localStorage.getItem('uid');
        if (uid === null || uid === undefined) {
            this.props.history.push('/login');
        }
        this.setState({loading: true});
        firebase.database().ref('/society').on('value', (snapshot) => {
            const societies = snapshot.val() || [];
            const societiesArray = Object.entries(societies).map((e) => ({[e[0]]: e[1]}));
            let userSocieties = [];
            for (let i = 0; i < societiesArray.length; i++) {
                if (Object.keys(societiesArray[i])[0] === uid + "France") {

                    societiesArray[i][uid + "France"].uniqueId = uid + 'France';
                    societiesArray[i][uid + "France"].paysOrigine = 'France';
                    userSocieties.push(societiesArray[i][uid + "France"])
                }
                if (Object.keys(societiesArray[i])[0] === uid + "Suisse") {

                    societiesArray[i][uid + "Suisse"].uniqueId = uid + 'Suisse';
                    societiesArray[i][uid + "Suisse"].paysOrigine = 'Suisse';
                    userSocieties.push(societiesArray[i][uid + "Suisse"])
                }
                if (Object.keys(societiesArray[i])[0] === uid + "tunisie") {

                    societiesArray[i][uid + "tunisie"].uniqueId = uid + 'tunisie';
                    societiesArray[i][uid + "tunisie"].paysOrigine = 'tunisie';
                    userSocieties.push(societiesArray[i][uid + "tunisie"])
                }
            }

            firebase.database().ref('/users').on('value', (snapshot) => {
                const users = snapshot.val() || [];
                const usersArray = Object.values(users);
                let investisors = [];
                usersArray.map((user,index) => {
                    if(usersArray[index].type &&usersArray[index].type === "investisor"){
                        investisors.push(usersArray[index]);
                    }
                });
                this.setState({societies: userSocieties, investisors:investisors, loading: false});
                this.setState({loading:false})
            });

        });
    }




    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    render() {

        let typeOfInvOptions= {
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '22px',
                                fontFamily: 'MyriadPro',
                                fontWeight: 600,
                                color: "#000",
                                offsetY: -10
                            },
                            value: {
                                show: true,
                                fontSize: '16px',
                                fontFamily: 'MyriadPro',
                                fontWeight: 400,
                                color: "#000",
                                offsetY: 16,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            total: {
                                show: true,
                                showAlways: true,
                                label: 'Total',
                                fontSize: '20px',
                                fontFamily: 'MyriadPro',
                                fontWeight: 700,
                                color: '#1F2B8D',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b
                                    }, 0)
                                }
                            }
                        }
                    },
                },
            },
            labels: ['Approuvé', 'En attente', 'Refusé'],
            colors: ['#28D3B6', '#FFCB06', "#F95B60"],
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                fontFamily: 'MyriadPro',
                fontWeight: 400,
                color: "#000",
            },
            dataLabels: {
                enabled: false
            },

        };
        let investisors = this.state.investisors; let approuvedCount=0; let pendingCount=0; let declinedCount=0;
        investisors.map((item,key) => {
            item.KYCstate === "approuved" ? approuvedCount++ : item.KYCstate === "pending" ? pendingCount++ : declinedCount++;
        });
        let typeOfInvSeries = [approuvedCount, pendingCount, declinedCount];

        return (
            <div>
                {
                    this.state.loading === true ?
                        <div  className="centered-text">
                            <ReactLoading type={"bars"} color={"red"} />
                        </div> :
                        <div>
                            <div className="row" style={{marginTop:50}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title mb-0">Mes entreprises</h4>

                                            <div id="cardCollpase4" className="collapse pt-3 show">
                                                <div className="table-responsive">
                                                    <table className="table table-centered table-borderless mb-0">
                                                        <thead style={{backgroundColor:"#2A348F",color:"#fff"}}>
                                                        <tr>
                                                            <th>Nom</th>
                                                            <th>But social</th>
                                                            <th>Date de création</th>
                                                            <th>Pays</th>
                                                            <th>Adresse</th>
                                                            <th>Gérants</th>
                                                            <th>Associés</th>
                                                            <th>Expert SmartCo</th>
                                                            <th>Capital</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            this.state.societies.map((item, key) => (
                                                                item.type_societe === "SARL" &&
                                                                <tr key={key}>
                                                                    <td style={{cursor:"pointer"}}
                                                                        onClick={() => this.props.history.push("/gestion/entreprises/Suisse/details",{entreprise:item})}>
                                                                        {item.sName}
                                                                    </td>
                                                                    <td>{item.sBut}</td>
                                                                    <td>
                                                                        <span className="badge bg-soft-secondary text-secondary p-1">{item.dateCreation}</span>
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            src={item.paysOrigine === "France" ? france : item.paysOrigine === "Suisse" ? suisse : tunisie}
                                                                            alt="society-flags" height="24"/>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item.sSiege.domiciliation === "true" ? "Adresse SmartCo" :
                                                                                item.sSiege.adress + ', ' + item.sSiege.postalCode + ' ,' + item.sSiege.pays
                                                                        }
                                                                    </td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-info text-info p-1">{item.nbGerant}</span>
                                                                    </td>
                                                                    <td className="text-center"><span
                                                                        className="badge bg-soft-info text-info p-1">{item.sAssociate.length}</span>
                                                                    </td>
                                                                    <td className="text-center">{item.expertSmartCo === "true" ? 'Oui' : 'Non'}</td>
                                                                    <td>
                                                                        <span className="badge bg-soft-danger text-danger p-1">{item.sCapital.totalCapital + " CHF"}</span>
                                                                    </td>
                                                                    <td className="text-center" style={{display:"flex",marginTop:15}}>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Effectuer une opération"
                                                                             onClick={() => this.props.history.push("/gestion/entreprises/operations",{entreprise:item})}>
                                                                            <i style={{color:'blue',fontSize:18}} className="fe-plus-square"/>
                                                                        </div>
                                                                        <div style={{cursor:'pointer'}} className="btn btn-xs btn-cancel"
                                                                             data-toggle="tooltip" title="Effectuer une modification"
                                                                             onClick={() => this.props.history.push("/gestion/entreprises/Suisse/update/"+localStorage.getItem("uid")+"Suisse")}>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: 25}}>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets"/>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h4 className="header-title mb-3" style={{color:"#C0C0C0"}}>KYC</h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4 className="header-title mb-2">Synthèse : volume</h4>
                                                    <Line data={this.state.data} legend={{position: 'bottom'}}/>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4 className="header-title mb-2">Synthèse : statut</h4>
                                                    <div className="donut">
                                                        <Chart options={typeOfInvOptions}
                                                               series={typeOfInvSeries}
                                                               type="donut" width="100%" height="280px"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-3">
                                                    <label htmlFor="search" style={{color: "#C0C0C0"}}>Chercher</label>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" id="search"
                                                                   placeholder="Par nom & prénom"
                                                                   value={this.state.invSearchFName}
                                                                   onChange={(event) => this.setState({invSearchFName:event.target.value})}
                                                            />
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text font-weight-bold"
                                                                      id="basic-addon1">
                                                                     <i className="fa fa-search"
                                                                        style={{color: "green"}}/>
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label htmlFor="dateCreation" style={{color: "#C0C0C0"}}>Numéro de téléphone</label>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control"
                                                                   id="numphone"
                                                                   placeholder="Numéro de téléphone"
                                                                   value={this.state.invSearchPhone}
                                                                   onChange={(event) => this.setState({invSearchPhone:event.target.value})}
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
                                                                   onChange={(event) => this.setState({invSearchTag:event.target.value})}
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
                                                                    onChange={(event) => this.setState({invSearchState:event.target.value})}
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
                                                                <thead style={{backgroundColor:"#2A348F",color:"#fff"}}>
                                                                <tr>
                                                                    {/*<th/>*/}
                                                                    <th style={{textAlign:"center"}}>Nom & Prénom</th>
                                                                    <th style={{textAlign:"center"}}>Nationalité</th>
                                                                    <th style={{textAlign:"center"}}>Email</th>
                                                                    <th style={{textAlign:"center"}}>Numéro de téléphone</th>
                                                                    <th style={{textAlign:"center"}}>Tag</th>
                                                                    <th style={{textAlign:"center"}}>Status</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody className="table-striped">

                                                                {
                                                                    this.state.investisors.map((item,key) => (
                                                                        ( (item.nom+" "+ item.prenom).trim().toLowerCase().includes(this.state.invSearchFName.toLowerCase()) || this.state.invSearchFName === "") &&
                                                                        ( (item.phone.code+item.phone.numero).trim().toLowerCase().includes(this.state.invSearchPhone.toLowerCase()) || this.state.invSearchPhone === "") &&
                                                                        ( (item.KYCtags || "").trim().toLowerCase().includes(this.state.invSearchTag.toLowerCase()) || this.state.invSearchTag === "") &&
                                                                        ( (item.KYCstate).trim().toLowerCase().includes(this.state.invSearchState.toLowerCase()) || this.state.invSearchState === "") &&
                                                                        <tr key={key}>
                                                                            {/*<td>
                                                                                <span className="badge bg-soft-success text-success p-1">
                                                                                    <i className="fa fa-angle-down text-success"/>
                                                                                </span>
                                                                            </td>*/}
                                                                            <td align="center">{item.nom+" "+item.prenom}</td>
                                                                            <td align="center">
                                                                                <img src={item.nationnalite === "France" ? france :
                                                                                    item.nationnalite === "Swizerland" ? suisse : item.nationnalite === "Tunisia" ? tunisie : france }
                                                                                     alt="society-flags" height="24"/>
                                                                            </td>
                                                                            <td align="center">{item.email}</td>
                                                                            <td className="text-center"><span
                                                                                className="badge bg-soft-info text-info p-1">{item.phone.code+item.phone.numero}</span>
                                                                            </td>
                                                                            <td align="center">
                                                                                <span className="badge bg-soft-danger text-danger p-1">{item.KYCtags}</span>
                                                                            </td>
                                                                            <td align="center">
                                                                                {
                                                                                    item.KYCstate === "pending" ?
                                                                                        <span className="badge bg-soft-warning text-warning p-1">En attente</span> :
                                                                                        item.KYCstate === "approuved" ?
                                                                                            <span className="badge bg-soft-success text-success p-1">Approuvé</span> :
                                                                                            item.KYCstate === "declined" ?
                                                                                                <span className="badge bg-soft-danger text-danger p-1">Refusé</span> : ""
                                                                                }

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
                            </div>
                        </div>
                }

            </div>
        )
    }

}

export default SocietiesTest;