import React, {Component, Suspense} from "react";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Posts from "../../components/Posts";
import {Button} from 'primereact/button';




import { Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import ReactNextPaging from "react-next-paging";
import fidu from "../../assets/images/salles/logo_enfin_fidu.jpg"
import aO from "../../assets/images/salles/a&o.png"

import  {Checkbox} from "@material-ui/core";


import {Line} from "react-chartjs-2";
import Chart from "react-apexcharts";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));

const loading = () => <Loader/>;

class societes extends Component {

    constructor() {
        super();
        this.paginate = this.paginate.bind(this);
        this.getUser= this.getUser.bind(this);


        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            avocats:[],
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            societies: [],
            investisors: [],
            users:[],
            currentPage:1,
            postsPerPage:6,
            nom:"",
            prenom:"",
            email:"",
            createdAT:"",
            sName:""



        };
    }





    componentDidMount() {



        fetch("http://localhost:3001/api/getAvocats").then(data => data.json() ).then(data =>{
            const avocatArray = data.data
            let avocats =[]
            avocatArray.map((avocat,index)=>{

                avocat.select=false

                avocats.push(avocatArray[index])

            })

            this.setState({avocats:avocats})
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

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.users.slice(indexOfFirstPost, indexOfLastPost);





        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper ">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">

                                        <h4 className="page-title">Opportunities</h4>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row ">
                                            <div className="col-sm-4">
                                                <form className="form-inline">
                                                    <div className="form-group ">
                                                        <label htmlFor="inputPassword2" className="sr-only">Search</label>
                                                        <input type="search" className="form-control" id="inputPassword2"
                                                               placeholder="Search..."/>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="text-sm-right">
                                                    <button type="button"
                                                            className="btn btn-success waves-effect waves-light mb-2 mr-1">
                                                        <i className="mdi mdi-settings"></i></button>
                                                    <a href="#custom-modal"
                                                       className="btn btn-danger waves-effect waves-light mb-2"
                                                       data-animation="fadein" data-plugin="custommodal"
                                                       data-overlayColor="#38414a"><i
                                                        className="mdi mdi-plus-circle mr-1"></i> Add Contact</a>
                                                </div>
                                            </div>

                                        </div>



                                    </div>
                                </div>
                            </div>

                            <div className="row " >
                                <div className="col-xl-8   ">



                                    <div className="card" >
                                        <div className="card-body">
                                            <div className="row ">
                                                <div className="col-md-4 ">
                                                    <div className="row">
                                                        <div className="col-md-4 align-self-center  ">
                                                        <img  src={fidu} style={{width:"100%"}}/>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="row justify-content-between">
                                                               <h5>Amazon Inc.</h5>

                                                                <i className="mdi mdi-help-rhombus"></i>

                                                            </div>
                                                            <div className="row align-items-center">

                                                                    <h6>Location: </h6>


                                                                    <small className="ml-1">Seattle , Washingnton</small>


                                                            </div>
                                                            <div className="row align-items-center">

                                                                <h6>Category :</h6>


                                                                <small className="ml-1">Fiduciaire</small>


                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col-md-4  align-self-center">
                                                    <div  >
                                                    <div className="row w-75   m-auto   " >
                                                    <i className="mdi mdi-email"/>
                                                        <small className="ml-1">collier@jourrapide.com</small>
                                                    </div>

                                                    <div className="row w-75   m-auto  ">
                                                        <i className=" mdi mdi-phone-classic"/>
                                                        <small className="ml-1">828-216-2190</small>
                                                    </div>
                                                    </div>


                                                </div>

                                                <div className="col-md-2 align-self-center">
                                                   <div className="container w-75 bg-danger text-center">
                                                       <text style={{color:"white"}}>Fiduciare</text>


                                                   </div>


                                                </div>
                                               <div className="col-md-2 align-self-center text-right">
                                                   <i className=" m-2 mdi mdi-square-edit-outline"></i>
                                                   <i className=" m-2  mdi mdi-delete"></i>

                                               </div>

                                            </div>



                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-4    " >

                                    <div className="card ">
                                        <div className="card-body  align-items-center ">
                                            <div className="row  justify-content-between   ">
                                                <div className=" " >
                                                   <div className="media  justify-content-center ">
                                                    <img className=" rounded-circle text-center"
                                                         src={ defaultAvatar }
                                                         alt="" height="30"/>



                                                     </div>
                                                    <div>
                                                        <Checkbox checked={true}/>
                                                    </div>

                                                </div>

                                                <div className="col-md-7">

                                                    <Button label="Sélectionner pour la prochaine réunion "  className="p-button-rounded "></Button>


                                                </div>

                                            </div>




                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="row " >
                                <div className="col-xl-8   ">



                                    <div className="card" >
                                        <div className="card-body">
                                            <div className="row ">
                                                <div className="col-md-4 ">
                                                    <div className="row">
                                                        <div className="col-md-4 align-self-center  ">
                                                            <img  src={aO} style={{width:"100%"}}/>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="row justify-content-between">
                                                                <h5>Apple Inc.</h5>

                                                                <i className="mdi mdi-help-rhombus"></i>

                                                            </div>
                                                            <div className="row align-items-center">

                                                                <h6>Location: </h6>


                                                                <small className="ml-1">Cupertino , California</small>


                                                            </div>
                                                            <div className="row align-items-center">

                                                                <h6>Category :</h6>


                                                                <small className="ml-1">Avocat</small>


                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col-md-4  align-self-center">
                                                    <div  >
                                                        <div className="row w-75   m-auto   " >
                                                            <i className="mdi mdi-email"/>
                                                            <small className="ml-1">deanes@dayrep.com</small>
                                                        </div>

                                                        <div className="row w-75   m-auto  ">
                                                            <i className=" mdi mdi-phone-classic"/>
                                                            <small className="ml-1">077 6157 4248</small>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="col-md-2 align-self-center">
                                                    <div className="container w-75  text-center" style={{backgroundColor:"#f75205"}}>
                                                        <text style={{color:"white"}}>Avocat</text>


                                                    </div>


                                                </div>
                                                <div className="col-md-2 align-self-center text-right">
                                                    <i className=" m-2 mdi mdi-square-edit-outline"></i>
                                                    <i className=" m-2  mdi mdi-delete"></i>

                                                </div>

                                            </div>



                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-4    " >

                                    <div className="card ">
                                        <div className="card-body  align-items-center ">
                                            <div className="row    ">
                                                <div className="col-md-5">
                                                    <div className="row">
                                                {this.state.avocats.map((item,key)=>(
                                                    ((item.statut != "nouveau" && item.statut != "refuse") &&
                                                    <div>
                                                        <div className="media justify-content-center">
                                                            <img className=" rounded-circle"
                                                                 src={item.imageUrl || defaultAvatar}
                                                                 alt="" height="30"/>


                                                        </div>
                                                        <div>
                                                            <Checkbox checked={item.select} onChange={() => {
                                                                let avocat = this.state.avocats
                                                                avocat[key].select = !avocat[key].select
                                                                this.setState({avocats: avocat})
                                                            }}/>
                                                        </div>

                                                    </div>)

                                                ))

                                                }
                                                    </div>
                                                </div>

                                                <div className="col-md-7">

                                                    <Button label="Sélectionner pour la prochaine réunion "  className="p-button-rounded "></Button>


                                                </div>

                                            </div>




                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row " >
                                <div className="col-xl-8   ">



                                    <div className="card" >
                                        <div className="card-body">
                                            <div className="row ">
                                                <div className="col-md-4 ">
                                                    <div className="row">
                                                        <div className="col-md-4 align-self-center  ">
                                                            <img  src={aO} style={{width:"100%"}}/>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="row justify-content-between">
                                                                <h5>Google LLC.</h5>

                                                                <i className="mdi mdi-help-rhombus"></i>

                                                            </div>
                                                            <div className="row align-items-center">

                                                                <h6>Location: </h6>


                                                                <small className="ml-1">Menlo Park, California</small>


                                                            </div>
                                                            <div className="row align-items-center">

                                                                <h6>Category :</h6>


                                                                <small className="ml-1">Notaire</small>


                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col-md-4  align-self-center">
                                                    <div  >
                                                        <div className="row w-75   m-auto   " >
                                                            <i className="mdi mdi-email"/>
                                                            <small className="ml-1">nnac@hotmail.us</small>
                                                        </div>

                                                        <div className="row w-75   m-auto  ">
                                                            <i className=" mdi mdi-phone-classic"/>
                                                            <small className="ml-1">(216) 76 298 896</small>
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className="col-md-2 align-self-center">
                                                    <div className="container w-75 bg-danger text-center">
                                                        <text style={{color:"white"}}>Fiduciare</text>


                                                    </div>


                                                </div>
                                                <div className="col-md-2 align-self-center text-right">
                                                    <i className=" m-2 mdi mdi-square-edit-outline"></i>
                                                    <i className=" m-2  mdi mdi-delete"></i>

                                                </div>

                                            </div>



                                        </div>
                                    </div>

                                </div>
                                <div className="col-xl-4    " >

                                    <div className="card ">
                                        <div className="card-body  align-items-center ">
                                            <div className="row  justify-content-between   ">
                                                <div>
                                                    <div className="media justify-content-center">
                                                        <img className=" rounded-circle"
                                                             src={ defaultAvatar }
                                                             alt="" height="30"/>



                                                    </div>
                                                    <div>
                                                        <Checkbox checked={true}/>
                                                    </div>

                                                </div>

                                                <div className="col-md-7">

                                                    <Button label="Sélectionner pour la prochaine réunion "  className="p-button-rounded "></Button>


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

export default societes;