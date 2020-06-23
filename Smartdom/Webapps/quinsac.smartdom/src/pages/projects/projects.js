import React, {Component, Suspense} from "react";
import Topbar from "../../components/Menu/Topbar";
import {Button, Container} from "reactstrap";
import Loader from "../../components/Loader";
import coverImg from "../../assets/images/cover.jpg"
import firebase from "firebase/app";
import "firebase/database"
import moment from "moment";

const loading = () => <Loader/>;


class projects extends Component{


    constructor(props){
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            projectsSolaire: [],
            projectsImmo: [],
            showEnergie:true
        };
    }



    componentWillMount() {
        window.scrollTo(0, 0)
        firebase.database().ref('/projects').on('value', (snapshot) => {
            const projects = snapshot.val() || [];
            let arrayOfProjects = Object.values(projects);
            let projetSolaire = [];
            let projetImmo = [];
            arrayOfProjects.map((item,key) => {
                item.type === "solaire" ? projetSolaire.push(item) : projetImmo.push(item)
            });
            this.setState({projectsSolaire:projetSolaire,projectsImmo:projetImmo})

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
                            {this.state.loading && <Loader/>}
                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">

                                                </div>
                                                <div className="col-md-8 text-center">
                                                    <span className="font-weight-bold" onClick={() => this.setState({showEnergie:true})}
                                                          style={{fontSize:"1.75rem",fontWeight:600,color:this.state.showEnergie ? "#19b4fa" : "#000",cursor:"pointer",
                                                              textDecoration:this.state.showEnergie ? "underline" :"none"}}>Énergies renouvelables</span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <span className="font-weight-bold" onClick={() => this.setState({showEnergie:false})}
                                                          style={{fontSize:"1.75rem",fontWeight:600,color:this.state.showEnergie ? "#000" : "#19b4fa",cursor:"pointer",
                                                              textDecoration:this.state.showEnergie ? "none" :"underline"}}>Immobilier</span>
                                                </div>
                                                <div className="col-md-2">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    this.state.showEnergie &&
                                    this.state.projectsSolaire.map((item,key) => (
                                        <div className="col-xl-4">
                                            <div className="card-box project-box pointer" onClick={() => this.props.history.push("/projects/"+item.uid)}>

                                                <strong  className="mt-0 font-weight-bold" style={{fontWeight:500,fontSize:"1rem",color:"#000"}}>
                                                    <i className="mdi mdi-earth text-info font-weight-bold"></i>&nbsp;
                                                    {item.localisation}
                                                </strong>
                                                <p className="text-muted text-uppercase">
                                                    <small className="font-weight-bold text-dark font-18">{item.nom} </small></p>

                                                <img className="card-img-top img-fluid" src={item.imageFonds}/>

                                                <div className="badge bg-soft-info text-info mb-3">Green</div>

                                                <p className="mb-2 font-weight-bold text-dark">Progression:<span
                                                    className="float-right text-info">{((parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100).toFixed(2) } %</span></p>
                                                <div className="progress mb-1" style={{height: "3px",backgroundColor:"#F0F0F0"}} >
                                                    <div className="progress-bar"
                                                         role="progressbar" aria-valuenow="68" aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width:(parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100+"%"  ,backgroundColor:"#19b4fa"}}>
                                                    </div>
                                                </div>

                                                <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>
                                                <div className="row mb-0">
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">{item.nb_investisor} </h6>
                                                        <h6 className="text-grey-1 text-center">Investisseurs</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">
                                                            {moment(item.date_deadline).diff(moment(),'days')} j</h6>
                                                        <h6 className="text-grey-1 text-center">restants</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">{item.montantFinance} €</h6>
                                                        <h6 className="text-grey-1 text-center">sur {item.montantAfinancer} €</h6>
                                                    </div>
                                                </div>


                                                <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>

                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    ! this.state.showEnergie &&
                                    this.state.projectsImmo.map((item,key) => (
                                        <div className="col-xl-4">
                                            <div className="card-box project-box pointer"  onClick={() => this.props.history.push("projects/"+item.uid)}>

                                                <strong  className="mt-0 font-weight-bold" style={{fontWeight:500,fontSize:"1rem",color:"#000"}}>
                                                    <i className="mdi mdi-earth text-info font-weight-bold"></i>&nbsp;
                                                    {item.localisation}
                                                </strong>
                                                <p className="text-muted text-uppercase">
                                                    <small className="font-weight-bolder font-18 text-dark">{item.nom} </small></p>

                                                <img className="card-img-top img-fluid" src={item.imageFonds}/>

                                                <div className="badge bg-soft-info text-info mb-3">Green</div>

                                                <p className="mb-2 font-weight-bold text-dark">Progression:<span
                                                    className="float-right text-info">{((parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100).toFixed(2) } %</span></p>
                                                <div className="progress mb-1" style={{height: "3px",backgroundColor:"#F0F0F0"}} >
                                                    <div className="progress-bar"
                                                         role="progressbar" aria-valuenow="68" aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width:(parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100+"%"  ,backgroundColor:"#19b4fa"}}>
                                                    </div>
                                                </div>

                                                <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>
                                                <div className="row mb-0">
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">{item.nb_investisor} </h6>
                                                        <h6 className="text-grey-1 text-center">Investisseurs</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">
                                                            {moment(item.date_deadline).diff(moment(),'days')} j</h6>
                                                        <h6 className="text-grey-1 text-center">restants</h6>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <h6 className="text-info font-weight-bolder text-center">{item.montantFinance} €</h6>
                                                        <h6 className="text-grey-1 text-center">sur {item.montantAfinancer} €</h6>
                                                    </div>
                                                </div>

                                                <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>

                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }


}

export default projects