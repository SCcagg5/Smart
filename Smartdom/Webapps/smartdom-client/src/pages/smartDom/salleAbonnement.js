import React, {Component, Suspense} from "react";
import Loader from "../../components/Loader";

import logomap from "../../assets/images/courrier/map.PNG"
import subscriptions from "../../assets/images/courrier/subscriptions.svg"
import mailbox from "../../assets/images/domiciliation/mailbox.svg"
import visioconference from "../../assets/images/salles/visioconference.PNG"
import conferenceAudio from "../../assets/images/salles/conferenceAudio.PNG"








import Chart from "react-apexcharts";


import {Button, Container} from "reactstrap";
import { Checkbox,FormControl,FormControlLabel,FormGroup } from '@material-ui/core';
import Dropdown from "react-bootstrap/Dropdown";
import firebase from "firebase/app";
import "firebase/database"
import interview from "../../assets/images/courrier/interview.svg"
import mobileApplication from "../../assets/images/courrier/Mobile_application.svg"
import {AvForm} from "availity-reactstrap-validation";




const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));

const loading = () => <Loader/>;

class salleAbonnement extends Component {

    constructor() {
        super();
        this.paginate = this.paginate.bind(this);
        this.getUser= this.getUser.bind(this);


        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            id:"",
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            societies: [],
            investisors: [],
            user:{
                sName:"",
                firstName:"",
                lastName:"",
                courrier:[],
                reunion:{
                    reunionPassee:[],
                    reunionProchaine:[]
                }
            },
            currentPage:1,
            postsPerPage:6,
            nom:"",
            prenom:"",
            email:"",
            createdAT:"",
            sName:"",
            series: [100],
            options: {
                chart: {
                    height: 280,
                    type: "radialBar"
                },

                series: [67],
                colors: ["#71d5c6"],

                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 15,
                            size: "70%"
                        },

                        dataLabels: {
                            showOn: "always",
                            name: {
                                offsetY: -10,
                                show: false,
                                color: "#888",
                                fontSize: "13px"
                            },
                            value: {
                                color: "#111",
                                fontSize: "1.6vw",
                                show: true
                            }
                        }
                    }
                },

                stroke: {
                    lineCap: "round",
                },
                labels: ["Progress"]

            },
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom:11,




        };



    };






    componentWillMount() {

        let users

        firebase.database().ref('users/'+localStorage.getItem('uid')).on('value',  (snapshot)=> {
            const users = snapshot.val() ;
            const reunionpassé = Object.values(users.reunion.reunionPassee);
            const reunionProchaines=Object.values(users.reunion.reunionProchaines);

            let rPasseee = [];
            let rProchaines =[]

            reunionProchaines.map((item)=> (
                rProchaines.push(item)
            ))


            reunionpassé.map((item)=> (
                rPasseee.push(item)
            ))


            this.setState({user:{reunion:{
                        reunionPassee:rPasseee,
                        reunionProchaine:rProchaines
                    },
                    firstName:users.prenom,
                    lasName:users.nom,
                    sName:users.sName}})








        })




    }


    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

    getUser (nom,prenom,email,createdAt,sName){
        this.setState({nom:nom,
            prenom:prenom,
            email:email,
            createdAT:createdAt,
            sName:sName});

    }

    paginate (pageNumber){
        this.setState({currentPage:pageNumber});

    }
    render() {
        let rProchaine = this.state.user.reunion.reunionProchaine







        return (
            <div className="app center-menu bg-white">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper bg-white">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="row w-100  justify-content-end  " >
                                <div className="col-md-4 ">
                                    <div className="row align-items-center justify-content-end">
                                        <h2> {this.state.user.sName}</h2>
                                        <ul className="list-unstyled topnav-menu float-right mb-0" style={{display:"inline"}}>
                                            <li className="dropdown notification-list"style={{display:"inline"}}>
                                                <button
                                                    className="btn btn-link nav-link right-bar-toggle waves-effect waves-light">
                                                    <i className="fe-settings noti-icon" style={{color:"black"}}></i></button>
                                            </li>
                                            <li className="dropdown notification-list"style={{display:"inline"}}>
                                                <button
                                                    className="btn btn-link nav-link right-bar-toggle waves-effect waves-light">
                                                    <i className="fe-settings noti-icon" style={{color:"black"}}></i></button>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                           <div className="row justify-content-center">
                             <div className="col-md-2 text-center">

                                 <div>
                                     <img src={interview} style={{width:"100%"}}></img>
                                 </div>
                                 <div className="mt-3">
                                     <h>Salles  de reunion</h>
                                 </div>
                             </div>
                               <div className="col-md-10 ">

                                   <div>
                                       <h4>Votre société a souscrit aux services de salles de réunions»</h4>
                                   </div>

                                   <div className="row justify-content-around">
                                       <div>
                                           <FormGroup aria-label="position" row>
                                               <FormControlLabel
                                                   value="StartUp Visio"
                                                   control={<Checkbox color="primary" />}
                                                   label="Startup audio"
                                                   labelPlacement="start"/>
                                               <FormControlLabel
                                                   value=" StartUp Visio"
                                                   control={<Checkbox color="primary" />}
                                                   label=" StartUp Visio"
                                                   labelPlacement="start"/>
                                               <FormControlLabel
                                                   value="start"
                                                   control={<Checkbox color="primary" checked={true} />}
                                                   label="Entreprise"
                                                   labelPlacement="start"/>


                                           </FormGroup>
                                       </div>

                                       <div>
                                               <Button className="bg-danger">Changement d’abonnement </Button>
                                       </div>

                                   </div>

                                   <div className="text-start ml-3">
                                       <h4>Ce service de  89 € par mois comprend les fonctionnalités suivantes </h4>
                                   </div>

                                   <div className="row ">
                                       <div className="col-md">
                                       <h4 className="font-weight-bold">Conférence Vision :</h4>

                                           <div className="row ">
                                               <div className="col-md-4">
                                                   <img src={visioconference}style={{width:"100%"}}/>
                                               </div>
                                               <div className="col-md-8 ">
                                                   <div className="row align-items-center justify-content-around">
                                                       <div>
                                                           <h5>Nombre de participants max </h5>
                                                       </div>
                                                       <div>
                                                           <input value="16" style={{width:"25%",textAlign:"center",borderColor:"blue",borderRadius:"10%"}}/>

                                                       </div>

                                                   </div>
                                                   <div className="row align-items-center justify-content-around mt-3">
                                                       <div>
                                                           <h5>Nombre d’animateurs * max </h5>
                                                       </div>
                                                       <div>
                                                           <input value="14" style={{width:"25%",textAlign:"center",borderColor:"blue",borderRadius:"10%"}}/>

                                                       </div>

                                                   </div>
                                               </div>

                                           </div>

                                       </div>
                                       <div className="col">
                                           <h4 className="font-weight-bold">Webinaire</h4>
                                           <div className="col-md-4 ">
                                           <div className="row align-items-center justify-content-start">
                                               <h5 >Personnalisation</h5>
                                               <div className="col-md-1">
                                               <Checkbox style={{height:"100%"}} checked={true}/>
                                               </div>
                                           </div>
                                           </div>
                                           <div  className="col-md-4 ">
                                           <div className="row align-items-center justify-content-start ">
                                               <h5 >Planification </h5>
                                               <div className="col-md-1">
                                                   <Checkbox style={{height:"100%"}} checked={true}/>
                                               </div>
                                           </div>
                                           </div>







                                       </div>

                                   </div>


                                       <div className="col-md">
                                           <h4 className="font-weight-bold">Conférence Audio</h4>

                                           <div className="row ">
                                               <div className="col-md-2">
                                                   <img src={conferenceAudio}style={{width:"100%"}}/>
                                               </div>

                                               <div className="col">

                                                   <div className="row align-items-center justify-content-start">
                                                       <div>
                                                           <h5>Nombre de participants max </h5>
                                                       </div>
                                                       <div className="ml-2">
                                                           <input value="16" style={{width:"25%",textAlign:"center",borderColor:"blue",borderRadius:"10%"}}/>

                                                       </div>

                                                   </div>
                                                   <div className="row align-items-center justify-content-start">
                                                       <div>
                                                           <h5>Pays des points d’audioconf </h5>
                                                       </div>
                                                       <div className="ml-2">

                                                            flags

                                                       </div>

                                                   </div>
                                                   <div className="row align-items-center justify-content-start">

                                                          <div className="col-md-4">
                                                              <div className="row align-items-center w-100">
                                                                  <div>
                                                                      <h5>Partage de salon d’équipe </h5>
                                                                  </div>
                                                                  <div>
                                                                      <Checkbox checked={true}/>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                       <div className="col-md-5">
                                                           <div className="row align-items-center w-100">
                                                               <div>
                                                                   <h5>Partage de salon individuel ( Duo )  </h5>
                                                               </div>
                                                               <div>
                                                                   <Checkbox checked={true}/>
                                                               </div>
                                                           </div>
                                                       </div>



                                                   </div>

                                               </div>


                                           </div>

                                       </div>

                                   <hr style={{height:"1px" ,backgroundColor:"black",borderStyle:"solid"}}/>

                                   <div>
                                       <h4>Salons privés visiophonique  avec Marketplace de prestataires ** : </h4>
                                   </div>

                                   <div className="text-center">

                                   <div>
                                       <text>** Les services ci-dessous ne sont pas inclus dans les forfaits de base mais sont proposés via un marketplace Acces </text>

                                   </div>

                                       <div className="row justify-content-center align-items-center">
                                           <div className="col-md-4  ">

                                       <div>
                                       <FormGroup aria-label="position" className="justify-content-center"  row>
                                           <FormControlLabel

                                               control={<Checkbox color="primary" checked={true}  />}
                                               label="Fiduciaire "
                                               labelPlacement="start"/>
                                           <FormControlLabel

                                               control={<Checkbox color="primary"  />}
                                               label="Réviseur"
                                               labelPlacement="start"/>
                                           <FormControlLabel

                                               control={<Checkbox color="primary" checked={true} />}
                                               label="Avocat"
                                               labelPlacement="start"/>


                                       </FormGroup>

                                   </div>
                                       <div >
                                           <FormGroup aria-label="position" className="justify-content-center"  row>
                                               <FormControlLabel

                                                   control={<Checkbox color="primary"  />}
                                                   label="Administrateur"
                                                   labelPlacement="start"/>
                                               <FormControlLabel

                                                   control={<Checkbox color="primary" />}
                                                   label=" Notaire"
                                                   labelPlacement="start"/>
                                               <FormControlLabel

                                                   control={<Checkbox color="primary" />}
                                                   label="Fiscaliste"
                                                   labelPlacement="start"/>


                                           </FormGroup>



                                       </div>
                                           </div>
                                           <div className="col-md-4">
                                              <a href="/salles/abonnement/marketplace">
                                               <Button className="bg-danger w-75" > Acces au market place </Button>
                                              </a>

                                           </div>
                                       </div>

                                       <div>
                                           <text>*** Ces partenaires utilisent, via la plateforme SmartDom, une gestion électronique de document commune.</text>
                                       </div>
                                   </div>






                               </div>


                           </div>

                        </Suspense>

                        <div align="center" className="flex-column d-flex" style={{marginTop:"2%"}} >
                            <Button  style={{width:"15%", backgroundColor:"#007acc"}} disabled={this.state.prenom===""}  className="btn btn-primary" >Suivant</Button>
                            <small>ou appuyez sur <text className="font-weight-bold">Entrée</text></small>
                        </div>
                    </Container>
                </div>







            </div>


        )
    }

}

export default salleAbonnement;