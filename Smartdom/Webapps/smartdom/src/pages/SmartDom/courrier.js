import React, {Component, Suspense} from "react";
import Loader from "../../components/Loader";
import logomap from "../../assets/images/courrier/map.PNG"
import subscriptions from "../../assets/images/courrier/subscriptions.svg"





import Chart from "react-apexcharts";


import {Button, Container} from "reactstrap";
import Dropdown from "react-bootstrap/Dropdown";
import firebase from "firebase/app";
import "firebase/database"
import interview from "../../assets/images/courrier/interview.svg"
import mobileApplication from "../../assets/images/courrier/Mobile_application.svg"




const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));

const loading = () => <Loader/>;

class courrier extends Component {

    constructor() {
        super();
        this.paginate = this.paginate.bind(this);
        this.getUser= this.getUser.bind(this);


        this.viewer = React.createRef();

        this.instance = null;
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            societies: [],
            investisors: [],
            user:{
                sName:"",
                firstName:"",
                lastName:"",
                courrier:[]
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
            zoom:11


        };



    };






    componentWillMount() {

        let users

        firebase.database().ref('users/'+localStorage.getItem('uid')).on('value',  (snapshot)=> {
            const users = snapshot.val() ;
            const usersArray = Object.values(users.courrier);
            let courrier = [];

            usersArray.map((item)=> (
                courrier.push(item)
            ))

            console.log(users.prenom)

            this.setState({user:{courrier:courrier,
                    firstName:users.prenom,
                    lasName:users.nom,
                    sName:users.sName}})

            console.log(this.state.user.courrier)






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
        let courrier = this.state.user.courrier







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
                                        <ul class="list-unstyled topnav-menu float-right mb-0" style={{display:"inline"}}>
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
                            <div className="row w-100 align-self-start " >
                                <div className="col-auto">
                                    <h2 style={{fontWeight:"bold"}}>Accueil</h2>
                                </div>

                            </div>

                            <div className="row w-100   mt-3">
                                <div className="col-md-4 ">
                                    <div>
                                        <h5 className="font-weight-bold">Profil</h5>
                                    </div>
                                    <div>
                                        <h2 style={{fontFamily:"Georgia, serif;"}} className="font-weight-bold">{this.state.user.lasName} {this.state.user.firstName} </h2>
                                    </div>

                                    <div className="row mt-4 justify-content-start align-items-center">

                                        <div className="col-md-5  ">
                                            <Chart
                                                options={this.state.options}
                                                series={this.state.series}
                                                type="radialBar"
                                                width="100%"

                                            />
                                        </div>
                                        <div className="col-md-auto">
                                            <div>
                                                <small style={{fontWeight:"bold",color:"#a6a6a6"}}><text style={{fontWeight:"bold" ,fontSize:"1.2vw",color:"#619cdb"}}>5</text>/5 étapes validée</small>
                                            </div>
                                            <div>
                                                <a href="#"><u>
                                                    <small style={{fontWeight:"bold",color:"#a6a6a6"}}>Compléter mon profil</small></u>
                                                </a>
                                            </div>
                                        </div>




                                    </div>

                                    <div className="mt-4">
                                        <h5 style={ {fontWeight:"bold"}}>MES SERVICES</h5>
                                    </div>
                                    <div className="row justify-content-around mt-2">
                                        <div className="col-md-5  border p-2 text-center">
                                            <div>

                                                <img src={mobileApplication} style={{width:"60%"}}/>
                                            </div>
                                            <div className="mt-3">
                                                <h6>Solution téléphonqiue</h6>
                                            </div>


                                        </div>

                                        <div className="col-md-5 border text-center p-2 ">
                                            <div>

                                                <img src={interview} style={{width:"60%"}}/>
                                            </div>

                                            <div className="mt-3">
                                                <h6>Salles de réunions</h6>
                                            </div>


                                        </div>

                                    </div>



                                </div>
                                <div className="col-md-8 ">

                                    <div>
                                        <h5 style={{fontWeight:"bold"}}>MES NOUVEAUX COURRIERS </h5>
                                    </div>
                                    <div className="row justify-content-end">
                                        <button className="btn btn-primary  ">Voir tous mes courriers</button>

                                    </div>
                                    <div className="container " style={{maxheight:"43%",height:"43%"}}>
                                        {courrier.map((item)=>(

                                                <div className="row align-items-center mt-3" style={{borderBottomWidth:"0.5px", borderBottomStyle:"solid"}}>
                                                    <div className="col-md-2">
                                                        <h6 className="font-weight-bold">{item.id}</h6>

                                                    </div>
                                                    <div className="col-md-3 ">
                                                        <small>Réception le {item.dateRecep}</small>
                                                    </div>
                                                    <div className="col-md-2 text-right">

                                                        <small>-</small>

                                                    </div>
                                                    <div className="col-md-3">
                                                        <small>{item.etat}</small>
                                                    </div>
                                                    <div className="col-md text-right ">

                                                        <Dropdown>
                                                            <Dropdown.Toggle as="a"  id="dropdown-custom-components">

                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item href="#/action-1">collecté par nos service</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-2">Réexpedié</Dropdown.Item>
                                                                <Dropdown.Item href="#/action-3">Collecté et mise en GED</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>



                                                    </div>

                                                </div>

                                            )

                                        )}
                                    </div>



                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <div>
                                                <h6 className="font-weight-bold">MON ADRESSE DE DOMICILIATION</h6>
                                            </div>
                                            <div>
                                                <img src={logomap} style={{width:"100%"}}/>
                                            </div>
                                            <div className="mt-2">
                                                <small style={{color:"#a6a6a6"}}><u>Voir les horaires</u></small>
                                            </div>

                                        </div>
                                        <div className="col-md-2 text-center">
                                            <div>
                                                <h6 className="font-weight-bold">MON ABONNEMENT</h6>
                                            </div>
                                            <div>
                                                <img src={subscriptions} style={{width:"80%"}}/>
                                            </div>
                                            <div>
                                                <small style={{fontSize:"0.6vw",color:"#66a3e3"}}><mark style={{backgroundColor:"#e1f6ff",color:"#66a3e3"}}>ABONNEMENT ACTUEL</mark></small>
                                            </div>

                                            <div className="row justify-content-center">

                                                <div>
                                                    <i className="fe-mail"></i>
                                                </div>
                                                <div className="ml-2">
                                                    <small style={{fontSize:"0.6vw"}}> 298.00 € HT / an</small>
                                                </div>




                                            </div>
                                            <div className="row justify-content-center">
                                                <div>
                                                    <i className=" mdi mdi-office-building"></i>
                                                </div>
                                                <div className="ml-2">
                                                    <small style={{fontSize:"0.6vw"}}> 298.00 € HT / an</small>
                                                </div>

                                            </div>


                                        </div>
                                        <div className="col-md-2">
                                            <hr align="center"
                                                style={{
                                                    color: "#a6a6a6",
                                                    backgroundColor: "#a6a6a6",
                                                    height: "80%",
                                                    width: "1%",
                                                    align: "left"


                                                }}
                                            />

                                        </div>

                                        <div className="col-md-4 text-left">
                                            <div>
                                                <h6 className="font-weight-bold">MES FACTURES</h6>

                                            </div>
                                            <div className="row justify-content-start mt-2">
                                                <div className="col-md-6 text-left">
                                                    <div>
                                                        <small>Option courrier</small>
                                                    </div>
                                                    <div>
                                                        <small>1 juil 2019</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <small className="font-weight-bold"> 232.20 €</small>
                                                </div>
                                                <div className="col-md-2">

                                                    <i className=" mdi mdi-file-pdf"></i>

                                                </div>

                                            </div>
                                            <div className="row justify-content-start mt-2">
                                                <div className="col-md-6 text-left">
                                                    <div>
                                                        <small>Option courrier</small>
                                                    </div>
                                                    <div>
                                                        <small>1 juil 2019</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <small className="font-weight-bold"> 232.20 €</small>
                                                </div>
                                                <div className="col-md-2">

                                                    <i className=" mdi mdi-file-pdf"></i>

                                                </div>

                                            </div>

                                        </div>


                                    </div>






                                </div>


                            </div>

                        </Suspense>

                    </Container>
                </div>



            </div>


        )
    }

}

export default courrier;
