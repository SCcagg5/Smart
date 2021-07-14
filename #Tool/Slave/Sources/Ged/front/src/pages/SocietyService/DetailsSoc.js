import React from "react";
import {Doughnut} from 'react-chartjs-2';
import france from "../../assets/images/flags/france.png";
import suisse from "../../assets/images/flags/suisse.png";
import tunisie from "../../assets/images/flags/tunisie.png";
import rethink from "../../controller/rethink";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import moment from "moment";
import DocGenerationService from "../../provider/DocGenerationService";
import {IconButton} from "@material-ui/core";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const db_name = process.env.REACT_APP_RETHINKDB_BEGIN_NAME;

export default class DetailsSoc extends React.Component{


    generate_reg_actionnaires(id_augm){
        this.props.setLoading(true)
        let augm_capital = this.props.soc.augmCapital[id_augm];
        let new_parts = augm_capital.details_new_parts || [];
        let reg_actios = [];

        let total_nb_parts_before = 0;
        let total_nb_parts_after = 0;
        let total_prime = 0;
        let total_capital_libere = 0;

        new_parts.map((item,key) => {
            let actio = this.getActioByID(item.actio_id)
            reg_actios.push({
                actio_desc:actio.typeTmp === "Un particulier" ? actio.civility + " " + actio.firstname + " " + actio.lastname : "Société " + actio.ej_name,
                nationality: actio.typeTmp === "Un particulier" ? actio.nationality : (actio.pays === "Tunisia" ? "tunisienne" : actio.pays === "France" ? "française" : "suisse"),
                v_action:parseFloat(this.props.soc.capital.valeurAction),
                nb_parts_before:item.nb_actions_before,
                nb_parts_after:item.nb_actions_after,
                new_parts:item.nb_actions_after - item.nb_actions_before,
                prime:item.primeEmission ? item.primeEmission : 0,
                capital_libere:item.nb_actions_after * parseFloat(this.props.soc.capital.valeurAction),
                percent:(((item.nb_actions_after * parseFloat(this.props.soc.capital.valeurAction)) / this.props.soc.capitalHistory[id_augm].capital) * 100).toFixed(3) + " %"
            })
            total_nb_parts_before = total_nb_parts_before + item.nb_actions_before;
            total_nb_parts_after = total_nb_parts_after + item.nb_actions_after;
            total_prime = total_prime + (item.primeEmission ? parseFloat(item.primeEmission) : 0)
            total_capital_libere = total_capital_libere + (item.nb_actions_after * parseFloat(this.props.soc.capital.valeurAction))
        })

        let data = {
            "data":{
                actios:reg_actios,
                v_action:this.props.soc.capital.valeurAction,
                total_nb_parts_before:total_nb_parts_before,
                total_nb_parts_after:total_nb_parts_after,
                total_prime:total_prime,
                total_new_parts:augm_capital.nbNewActionsEmis,
                total_capital_libere:total_capital_libere
            }
        }

        DocGenerationService.generate_TN_RegActios(data).then( res => {
            if(res && res.data){
                this.props.setLoading(false)
                this.props.openPdf(res.data,"Registre_actionnaires","pdf")
            }else{
                this.props.setLoading(false)
                this.props.openSnackbar("error","Une erreur est survenue !")
            }
        }).catch( err => {
            this.props.setLoading(false)
            console.log(err)
            this.props.openSnackbar("error","Une erreur est survenue !")
        })
    }

    remove_AugmCapital(augm,key){
        this.props.setLoading(true)

        let item = this.props.soc;
        (item.augmCapital || []).splice(key,1);
        let capital_history = item.capitalHistory || [];
        let find_cap_hist_index = capital_history.findIndex(x => x.augmCapital_uid === augm.uid);
        (item.capitalHistory || []).splice(find_cap_hist_index,1);
        let cession_actions = item.cessionActions || [];
        let find_cession_actions_hist_index = cession_actions.findIndex(x => x.augmCapital_uid === augm.uid);
        (item.cessionActions || []).splice(find_cession_actions_hist_index,1);

        let associes = item.associes || [];
        associes.map((assoc,i) => {
            let assoc_nb_actions_hist = assoc.nbActionsHistory || [];
            let find_assoc_nb_actions_hist_index = assoc_nb_actions_hist.findIndex(x => x.augmCapital_uid === augm.uid);
            (assoc.nbActionsHistory || []).splice(find_assoc_nb_actions_hist_index,1);
        });
        item.associes = associes

        setTimeout(() => {

            rethink.update("test",'table("societies").get('+JSON.stringify(item.id)+').update('+ JSON.stringify(item) + ')',db_name,false).then( updateRes => {
                if (updateRes && updateRes === true) {
                    this.props.setLoading(false)
                    this.props.openSnackbar("success","L'opération d'augmentation de capital est supprimée avec succès")
                }else{
                    this.props.setLoading(false)
                    this.props.openSnackbar("error","Une erreur est survenue !")
                }
            }).catch( err => {
                this.props.setLoading(false)
                this.props.openSnackbar("error","Une erreur est survenue !")
            } )

        },1000);
    }

    getActioByID(id){
        return this.props.soc.associes.find(x => x.id === id)
    }


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

                <div  style={{marginTop:25}}>
                    <Tabs>
                        <TabList>
                            <Tab>Dashboard</Tab>
                            <Tab>Augmentation de capital</Tab>
                            <Tab>Convertible Loan</Tab>
                        </TabList>

                        <TabPanel>
                            <div style={{marginTop:25,padding:20}}>

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
                        </TabPanel>

                        <TabPanel>
                            <div style={{marginTop:25,padding:20}}>

                                <div className="row" style={{marginTop: 10}}>
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-widgets"/>
                                                <h4 className="header-title mb-0">Historique des augmentations de capital effectués</h4>

                                                <div id="cardCollpase4" className="collapse pt-3 show">
                                                    <div className="table-responsive">
                                                        <table className="table table-centered table-borderless mb-0">
                                                            <thead className="thead-light">
                                                            <tr>
                                                                <th/>
                                                                <th>Assemblé générale</th>
                                                                <th style={{textAlign: "center"}}>Nb nouveaux parts </th>
                                                                <th className="text-center">Valeur action</th>
                                                                <th className="text-center">Prime d'émission</th>
                                                                <th>Documents</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                (soc.augmCapital || []).map((item, key) => (
                                                                    <tr>
                                                                        <td>
                                                                            <i className="mdi mdi-chevron-right text-black-50" style={{fontSize:25,cursor:"pointer"}}/>
                                                                        </td>
                                                                        <td>{moment(item.date_ass).format("DD MMMM YYYY")}</td>
                                                                        <td align="center">
                                                                            <span className="badge bg-soft-blue text-blue p-1">
                                                                                {item.nbNewActionsEmis}&nbsp;actions
                                                                            </span>
                                                                        </td>
                                                                        <td align="center">
                                                                            <span className="badge bg-soft-blue text-blue p-1">
                                                                                {item.valeurAction + (soc.pays === "France" ? " €" : soc.pays === "Tunisia" ? "TND" : "CHF") }
                                                                            </span>
                                                                        </td>
                                                                        <td className="text-center">
                                                                            <span className="badge bg-soft-danger text-danger p-1">
                                                                                {item.typeAugCapital === "normal" ? "sans prime" : item.primeEmission + (soc.pays === "France" ? " €" : soc.pays === "Tunisia" ? "TND" : "CHF") }
                                                                            </span>
                                                                        </td>
                                                                        <td style={{textAlign:"center"}}
                                                                            onClick={() => {}}>
                                                                            <div style={{display:"flex",cursor:"pointer",margin:5}}
                                                                                 onClick={() => {
                                                                                     this.props.setLoading(true)
                                                                                     rethink.getItemByUID(db_name,"documents",item.idDoc,"test").then( res => {
                                                                                         this.props.openPdf(res[0].b64,res[0].name,"pdf")
                                                                                         this.props.setLoading(false)
                                                                                     })
                                                                                 }}
                                                                            >
                                                                                <i className="mdi mdi-file-pdf mr-1 text-danger" style={{fontSize:20}}/>
                                                                                <div style={{alignSelf:"center"}}>PvAugm.pdf</div>
                                                                            </div>
                                                                            <div style={{display:"flex",cursor:"pointer",margin:5}}
                                                                                 onClick={() => {
                                                                                     this.generate_reg_actionnaires(key)
                                                                                 }}
                                                                            >
                                                                                <i className="mdi mdi-file-pdf mr-1 text-danger" style={{fontSize:20}}/>
                                                                                <div style={{alignSelf:"center"}}>Registre_Act.pdf</div>
                                                                            </div>
                                                                        </td>
                                                                        {
                                                                            key === soc.augmCapital.length -1 &&
                                                                            <td align="center">
                                                                                <IconButton size="small"
                                                                                            onClick={() => {
                                                                                                this.remove_AugmCapital(item,key)
                                                                                            }}
                                                                                >
                                                                                    <DeleteOutlineIcon color="error" fontSize="small"/>
                                                                                </IconButton>
                                                                            </td>
                                                                        }

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
                        </TabPanel>

                        <TabPanel>
                        </TabPanel>
                    </Tabs>
                </div>



            </div>
        )
    }


}
