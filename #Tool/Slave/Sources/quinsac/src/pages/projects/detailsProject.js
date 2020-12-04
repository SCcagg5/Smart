import React, {Component, Suspense} from "react";
import Topbar from "../../components/Menu/Topbar";
import {Container} from "reactstrap";
import Loader from "../../components/Loader";
import firebase from "firebase/app";
import "firebase/database"
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const loading = () => <Loader/>;


class detailsProject extends Component{


    constructor(props){
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            project:{
                emprunteurFrais:{},
                developpeurs:{},
                empruntService: {},
                cantonList:[],
                societesPortant:[]
            },
            images:[]
        };
    }



    componentWillMount() {
        window.scrollTo(0, 0)
        firebase.database().ref('/projects/'+this.props.match.params.id).on('value', (snapshot) => {
            const project = snapshot.val() || [];
            const images = Object.values(project.gallery || {});
            this.setState({project:project,images:images})

        },err => {
            console.log(err)
        });
    }


    render() {
        return(
            <div className="app center-menu">
                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding:"72px 0px 0px"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row">

                                        <div className="col-xl-8">
                                            <img src={this.state.project.imageFonds} style={{maxWidth:"95%",maxHeight:"600px"}}/>
                                            <div className="card-box project-box" style={{marginTop:"-45px",marginLeft:"6%",position:"relative",padding:"2.5rem"}}>

                                                <strong  className="mt-0 font-weight-bold" style={{fontWeight:500,fontSize:"1rem",color:"#000"}}>
                                                    <i className="mdi mdi-earth text-info font-weight-bold"></i>&nbsp;
                                                    {this.state.project.localisation}
                                                </strong>
                                                <p className="text-muted text-uppercase">
                                                    <span className="font-weight-bold text-dark mt-2" style={{fontSize:"2.88rem",lineHeight:1.2}}>{this.state.project.nom} </span></p>

                                                <p className="mb-2 font-weight-bold text-dark mt-3">Progression:
                                                    <span className="float-right text-info font-15">{((parseInt(this.state.project.montantFinance) / parseInt(this.state.project.montantAfinancer)) * 100).toFixed(2) } %</span></p>
                                                <div className="progress mb-1" style={{height: "3px",backgroundColor:"#F0F0F0"}} >
                                                    <div className="progress-bar"
                                                         role="progressbar" aria-valuenow="68" aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width:(parseInt(this.state.project.montantFinance) / parseInt(this.state.project.montantAfinancer)) * 100+"%"  ,backgroundColor:"#19b4fa"}}>
                                                    </div>
                                                </div>

                                                <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>
                                                <div className="row mb-0">
                                                    <div className="col-md-4">
                                                        <h3 className="text-info font-weight-bolder text-center">{this.state.project.nb_investisor} </h3>
                                                        <h4 className="text-grey-1 text-center">Investisseurs</h4>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h3 className="text-info font-weight-bolder text-center">
                                                            {moment(this.state.project.date_deadline).diff(moment(),'days')} j</h3>
                                                        <h4 className="text-grey-1 text-center">restants</h4>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h3 className="text-info font-weight-bolder text-center">{this.state.project.montantFinance} €</h3>
                                                        <h4 className="text-grey-1 text-center">sur {this.state.project.montantAfinancer} €</h4>
                                                    </div>
                                                </div>

                                                <p className="mt-4 text-dark" style={{fontSize:"1.265rem",lineHeight:1.8,marginRight:"25px",textAlign:"justify"}}>
                                                    {this.state.project.description}
                                                </p>

                                                <div className="badge bg-soft-info text-info mb-3">Green</div>

                                            </div>

                                        </div>
                                <div className="col-xl-4 mt-4" >
                                    <div className="card-box project-box" style={{backgroundColor:"#f3fbff",padding:"2.9rem"}}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000"}}>Taux d'intérêt</p>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <p className="text-info" style={{fontSize:"1rem",lineHeight:1.6}}>{this.state.project.tauxInteret} % </p>
                                            </div>
                                        </div>
                                        <div style={{height:1,backgroundColor:"#19b4fa"}}/>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000"}}>Plafond d'investissement</p>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <p className="text-info" style={{fontSize:"1rem",lineHeight:1.6}}> ***</p>
                                            </div>
                                        </div>
                                        <div style={{height:1,backgroundColor:"#19b4fa"}}/>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000"}}>Instrument</p>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <p className="text-info" style={{fontSize:"1rem",lineHeight:1.6}}>***</p>
                                            </div>
                                        </div>
                                        <div style={{height:1,backgroundColor:"#19b4fa"}}/>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000"}}>Remboursement sur</p>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <p className="text-info" style={{fontSize:"1rem",lineHeight:1.6}}> ***</p>
                                            </div>
                                        </div>
                                        <div style={{height:1,backgroundColor:"#19b4fa"}}/>

                                        <div className="text-center">
                                            <button className="btn btn-info waves-effect waves-light font-weight-bolder mt-3" style={{fontSize:"1.02rem"}}>
                                                Investir sur ce projet
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row" style={{marginLeft:"5%",marginRight:"5%",marginTop:50}}>
                                <div className="col-md-4">
                                    <p style={{fontSize:"1.8rem",lineHeight:1.2,fontWeight:700,color:"#000"}}>Frais</p>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>Pour les investisseurs : aucun frais.</li>
                                    </ul>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>
                                            Pour l'emprunteur : jusqu’à {this.state.project.emprunteurFrais.montant} % HT du montant collecté + {this.state.project.emprunteurFrais.remboursement} % HT des remboursements.</li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <p style={{fontSize:"1.8rem",lineHeight:1.2,fontWeight:700,color:"#000"}}>Risque</p>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>Généraux : Perte partielle ou totale du capital et illiquidité.</li>
                                    </ul>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>Spécifiques : Production, réglementation, maîtrise des coûts, rang de remboursement, autres.</li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <p style={{fontSize:"1.8rem",lineHeight:1.2,fontWeight:700,color:"#000"}}>Fiscalité</p>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>Particulier : 12,8 % (Impôt sur le Revenu) + 17,2 % (prélèvements sociaux).</li>
                                    </ul>
                                    <ul>
                                        <li style={{fontSize:"1.0rem",color:"#000"}}>Personne morale : 15 % (Impôt sur le Revenu).</li>
                                    </ul>
                                </div>

                            </div>

                            <div className="row" style={{marginLeft:"20%",marginRight:"20%",marginTop:30}}>
                                <div className="col-md-12">

                                    <Tabs selectedTabClassName="custom-react-tabs__tab--selected" className="custom-react-tabs__tab">
                                        <TabList>
                                            <Tab>Résumé</Tab>
                                            <Tab>équipe / Forum</Tab>
                                            <Tab>Finances</Tab>
                                            <Tab>Documents</Tab>
                                            <Tab>échancier</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <h5 className="font-weight-bold text-dark mt-4 ml-2 mr-2">
                                                Cette collecte dispose de conditions d'accès spécifiques :
                                            </h5>

                                            <div className="table-responsive table-sm pr-3" style={{fontSize:"small",marginLeft:"2%",marginRight:"2px"}}>
                                                <table className="table mb-0">
                                                    <thead style={{backgroundColor:"#1A7FF1"}}>
                                                    <tr>
                                                        <th className="text-uppercase text-white">Phase</th>
                                                        <th className="text-uppercase text-white text-center">Investisseurs concernés</th>
                                                        <th className="text-uppercase text-white text-center">Date ouverture collecte</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.project.cantonList.map((item,key) => (
                                                            <tr>
                                                                <th className="text-center" scope="row" style={{backgroundColor:"#C8EDF3"}}>-</th>
                                                                <td style={{color:"#000"}}> Habitants du {item.name}</td>
                                                                <td className="text-center text-dark font-weight-bold" style={{backgroundColor:"#F2F2F2"}}>{moment(item.date).format("DD/MM/YYYY")} </td>
                                                            </tr>
                                                        ))
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>

                                            <div style={{height:"2px",backgroundColor:"#F0F0F0",marginTop:15}}/>

                                            <h5 className="font-weight-bolder text-dark mt-2 ml-2 mr-2" style={{lineHeight:1.8}}>
                                                Ce projet est porté par la société&nbsp;
                                                {
                                                    this.state.project.societesPortant.map((item,key) => (
                                                        key !== this.state.project.societesPortant.length -1 ?
                                                        item.nom + ", " : item.nom +"."
                                                    ))
                                                }
                                            </h5>

                                            <div style={{height:"2px",backgroundColor:"#F0F0F0",marginTop:15}}/>

                                            <h3 className="text-uppercase font-weight-bold mt-3 mr-2 ml-2">
                                                Les développeurs
                                            </h3>

                                            <p className="mt-2 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.developpeurs.desc}
                                            </p>

                                            <div className="mt-3 ml-2 mr-2">
                                            <img src={this.state.project.imageDev} style={{height:"initial",width:"auto",maxWidth:"670px"}}/>
                                            </div>

                                            <p className="mt-3 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.developpeurs.alliance}
                                            </p>

                                            <h3 className="text-uppercase font-weight-bold mt-3 mr-2 ml-2">
                                                À quoi servira l'emprunt ?
                                            </h3>

                                            <p className="mt-3 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.empruntService.desc}
                                            </p>

                                            <p className="mt-3 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.empruntService.presenteCollecte}
                                            </p>

                                            {/*<div className="mt-3 ml-2 mr-2">
                                                <img src={empruntimg} style={{height:"initial",width:"auto",maxWidth:"670px"}}/>
                                            </div>*/}

                                            <h3 className="text-uppercase font-weight-bold mt-3 mr-2 ml-2">
                                                CARACTÉRISTIQUES TECHNIQUES
                                            </h3>

                                            <div className="mt-3 ml-2 mr-2">
                                                <img src={this.state.project.imageCaracTeck} style={{height:"initial",width:"auto",maxWidth:"670px"}}/>
                                            </div>

                                            <h3 className="text-uppercase font-weight-bold mt-3 mr-2 ml-2">
                                                IMPACTS ENVIRONNEMENTAUX
                                            </h3>

                                            <p className="mt-3 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.impactEnv}
                                            </p>

                                            <h3 className="text-uppercase font-weight-bold mt-3 mr-2 ml-2">
                                                STRUCTURATION DE L'OPÉRATION
                                            </h3>

                                            <p className="mt-3 text-dark ml-2 mr-2" style={{fontSize:"16px"}}>
                                                {this.state.project.structureOperation}
                                            </p>

                                        </TabPanel>
                                        <TabPanel>

                                        </TabPanel>
                                        <TabPanel>

                                        </TabPanel>
                                        <TabPanel>

                                        </TabPanel>
                                        <TabPanel>

                                        </TabPanel>
                                    </Tabs>

                                </div>

                            </div>


                            {/*<div className="row">
                                {
                                    this.state.images.map((item,key) => (
                                        <div className="col-md-6">
                                            <img style={{border:"5px solid #FFF",maxHeight:"500px",maxWidth:"500px"}} src={item.url}/>
                                        </div>
                                    ))
                                }

                            </div>*/}



                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }


}

export default detailsProject