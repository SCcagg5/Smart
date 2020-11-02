import React, {Component, Suspense} from "react";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Posts from "../../components/Posts";

import {Menu,MenuItem} from "@material-ui/core";


import {Button, Container} from "reactstrap";
import firebase from "firebase/app";
import "firebase/database"
import ReactNextPaging from "react-next-paging";

import {Line} from "react-chartjs-2";
import Chart from "react-apexcharts";
import 'react-summernote/dist/react-summernote.css'; // import styles
import ReactSummernote from 'react-summernote';
import 'react-summernote/lang/summernote-fr-FR'; // you can import any other locale
// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/src/modal';
import 'bootstrap/js/src/dropdown';
import 'bootstrap/js/src/tooltip';
import star from "../../assets/images/star.svg"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import defaultAvatar from "../../assets/images/users/default_avatar.jpg";
const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));


const loading = () => <Loader/>;

class crm extends Component {

    constructor() {
        super();

        this.toggle=this.toggle.bind(this)



        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            desciption:"",
            openmenu:false,

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


    onChange(content) {
        console.log('onChange', content);
    }

    accepted(uid,email){

        let body ={
            "emailReciver":email,
            "subject":"Smartdom : etat de votre profile",
            "linkUrl":"Cliquer ici pour completer votre profile",
            "url":"http://localhost:3000/avocat/infos",
            "msg":"bonjour ,<br> Votre processus d'enregistrement a ete accepté <br> ",
            "footerMsg":"<br>cordialement<br>"
        }
        firebase.database().ref("/users/"+uid).update({'statut':"accepted"}).then(()=>{
            window.location.reload()
        })

        this.sendMail(body)





    }


    async sendMail(body){

        console.log(JSON.stringify(body))

        fetch("http://149.202.172.15:3001/api/sendCustomMailWithUrl",{
            method:"POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res =>()=>{
            console.log("resultat"+" "+res)
        })
    }
    componentDidMount() {

        fetch("http://localhost:3001/api/getAvocats").then(data => data.json() ).then(data =>{
            const avocatArray = data.data
            let avocats =[]
            avocatArray.map((avocat,index)=>{

                avocats.push(avocatArray[index])

            })

            this.setState({avocats:avocats})
        })





    }

    toggle(){
        this.setState({menuopen:!this.state.menuopen})
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


    render() {





        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">

                                        <h4 className="page-title">Contacts</h4>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-xl-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-2">
                                                <div className="col-sm-4">
                                                    <form className="form-inline">
                                                        <div className="form-group mb-2">
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

                                            <div className="table-responsive">
                                                <table className="table table-centered table-hover mb-0 ">
                                                    <thead>
                                                    <tr>
                                                        <th>Basic Info</th>
                                                        <th>Phone</th>
                                                        <th>Email</th>
                                                        <th>Company</th>
                                                        <th>Date OnBoarding</th>
                                                        <th style={{width:"82px"}}>Action</th>
                                                    </tr>
                                                    </thead>









                                                    <tbody>


                                                    </tbody>




                                                </table>



                                            </div>



                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="page-title-box">
                                                <div className="row ">
                                                    <div className="col-md-2 bg-danger text-center " style={{width:"10%"}}>
                                                        <h4 style={{color:"white"}}>Avocat</h4>


                                                    </div>
                                                    <hr style={{backgroundColor:"#a6a6a6",height:"2px" ,borderStyle:"solid",color:"red" ,width:"80%"}}/>
                                                </div>

                                            </div>
                                        </div>
                                    </div>




                                        <div className="card  mt-1"  >
                                            <div className="card-body">

                                                <div className="table-responsive ">

                                                     <table className=" table table-centered  mb-0  " >

                                                        <tbody >

                                                        {this.state.avocats.map((avocat,key)=>

                                                            <tr>
                                                                <td>
                                                                    <div className="media align-items-center   ">
                                                                        <img className=" rounded-circle text-center"
                                                                             src={avocat.imageUrl || defaultAvatar }
                                                                             alt="" height="15"/>

                                                                        <text className="ml-1">{avocat.nom} {avocat.prenom} </text>



                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {avocat.phone}
                                                                </td>
                                                                <td>
                                                                    {avocat.email}
                                                                </td>
                                                                <td>
                                                                    <text>pas encore </text>
                                                                </td>
                                                                <td>
                                                                    {avocat.date_naiss}
                                                                </td>
                                                                <td>
                                                                    <i style={{cursor:"pointer"}} onClick={()=>this.setState({ desciption:avocat})} className=" m-2 mdi mdi-square-edit-outline"></i>
                                                                    <i className=" m-2  mdi mdi-delete"></i>


                                                                </td>
                                                                {avocat.statut ==="nouveau"  &&

                                                                <td>



                                                                            <img src={star} style={{width:20}}/>

                                                                </td>

                                                                }
                                                            </tr>

                                                        )}







                                                        </tbody>
                                                     </table>








                                                </div>



                                            </div>


                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="page-title-box">
                                                <div className="row ">
                                                    <div className="col-md-2  text-center " style={{width:"10%",backgroundColor:"#f79605"}}>
                                                        <h4 style={{color:"white"}}>Notaire</h4>


                                                    </div>
                                                    <hr style={{backgroundColor:"#a6a6a6",height:"2px" ,borderStyle:"solid",color:"red" ,width:"80%"}}/>
                                                </div>

                                            </div>
                                        </div>
                                    </div>




                                    <div className="card  mt-1"  >
                                        <div className="card-body">

                                            <div className="table-responsive ">

                                                <table className=" table table-centered  mb-0  " >

                                                    <tbody >


                                                        <tr>
                                                            <td>
                                                                <div className="media align-items-center   ">
                                                                    <img className=" rounded-circle text-center"
                                                                         src={ defaultAvatar }
                                                                         alt="" height="15"/>

                                                                    <text className="ml-1">Edward Resoby </text>



                                                                </div>
                                                            </td>
                                                            <td>
                                                                078 6013 3850
                                                            </td>
                                                            <td>
                                                                edward@armypsy.com
                                                            </td>
                                                            <td>
                                                                <text>pas encore </text>
                                                            </td>
                                                            <td>
                                                               02/13/2018
                                                            </td>
                                                            <td>
                                                                <i style={{cursor:"pointer"}}  className=" m-2 mdi mdi-square-edit-outline"></i>
                                                                <i className=" m-2  mdi mdi-delete"></i>
                                                            </td>
                                                        </tr>









                                                    </tbody>
                                                </table>








                                            </div>



                                        </div>


                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <div className="page-title-box">
                                                <div className="row ">
                                                    <div className="col-md-2 bg-danger text-center " style={{width:"10%", backgroundColor:"#f705d7"}}>
                                                        <h4 style={{color:"white"}}>Fiducaire</h4>


                                                    </div>
                                                    <hr style={{backgroundColor:"#a6a6a6",height:"2px" ,borderStyle:"solid",color:"red" ,width:"80%"}}/>
                                                </div>

                                            </div>
                                        </div>
                                    </div>




                                    <div className="card  mt-1"  >
                                        <div className="card-body">

                                            <div className="table-responsive ">

                                                <table className=" table table-centered  mb-0  " >

                                                    <tbody >

                                                    <tr>
                                                        <td>
                                                            <div className="media align-items-center   ">
                                                                <img className=" rounded-circle text-center"
                                                                     src={ defaultAvatar }
                                                                     alt="" height="15"/>

                                                                <text className="ml-1">Thymothy Comper </text>



                                                            </div>
                                                        </td>
                                                        <td>
                                                            078 6013 3850
                                                        </td>
                                                        <td>
                                                            edward@armypsy.com
                                                        </td>
                                                        <td>
                                                            <text>pas encore </text>
                                                        </td>
                                                        <td>
                                                            02/13/2018
                                                        </td>
                                                        <td>
                                                            <i style={{cursor:"pointer"}}  className=" m-2 mdi mdi-square-edit-outline"></i>
                                                            <i className=" m-2  mdi mdi-delete"></i>
                                                        </td>
                                                    </tr>









                                                    </tbody>
                                                </table>








                                            </div>



                                        </div>


                                    </div>


                                </div>


                                {this.state.desciption != "" &&

                                <div className="col-xl-4">
                                    <div className="card-box">
                                        <div className="media mb-3">


                                            <div className="media-body text-center ">

                                             <div className="row">
                                             <div className="col-8">
                                                <div className="media justify-content-center   ">
                                                    <img className=" rounded-circle "
                                                         src={this.state.desciption.imageUrl || defaultAvatar }
                                                         alt="" height="60"/>





                                                </div>
                                                <div className="mt-1">
                                                    <text  className="ml-1 font-weight-bold">{this.state.desciption.nom} {this.state.desciption.prenom} </text>
                                                </div>

                                                 <div className="mt-1">
                                                     <small>{this.state.desciption.specialite}</small>
                                                 </div>

                                                <a className="btn- btn-xs btn-info m-1" style={{color:"white"}}>Send
                                                    Email</a>
                                                <a
                                                    className="btn- btn-xs btn-secondary m-1" style={{color:"white"}}>Call</a>
                                                <a
                                                    className="btn- btn-xs btn-secondary m-1" style={{color:"white"}}>Edit</a>
                                             </div>
                                                 <div className="col-4 text-left">
                                                     <div>
                                                         <small style={{fontSize:9}}>DATE OF BIRTH:</small>

                                                     </div>
                                                     <div>
                                                         <small style={{fontSize:9}}>{this.state.desciption.date_naiss}</small>
                                                     </div>
                                                     <div className="mt-1">
                                                         <small style={{fontSize:9}}>CAMPANY : </small>
                                                     </div>
                                                     <div>
                                                         <small style={{fontSize:9}}>//</small>
                                                     </div>

                                                     <div className="mt-1">
                                                         <small style={{fontSize:9}}>ADDED</small>
                                                     </div>
                                                     <div>
                                                         <small style={{fontSize:9}}>april , 2019</small>

                                                     </div>

                                                 </div>
                                             </div>
                                            </div>
                                        </div>

                                        <h5 className="mb-3 mt-4 text-uppercase bg-light p-2"><i
                                            className="mdi mdi-account-circle mr-1"></i> Personal Information</h5>
                                        <div className="">
                                            <h4 className="font-13 text-muted text-uppercase">APARTÉ :</h4>
                                            <p className="mb-3">
                                                {this.state.desciption.aparte}
                                            </p>

                                            <h4 className="font-13 text-muted text-uppercase mb-1">Langues</h4>
                                            <p className="mb-3"> {this.state.desciption.langues}</p>

                                            <h4 className="font-13 text-muted text-uppercase mb-1">Numéro de téléphone</h4>
                                            <p className="mb-3">{this.state.desciption.phone}</p>

                                            <h4 className="font-13 text-muted text-uppercase mb-1">Email</h4>
                                            <p className="mb-3"> {this.state.desciption.email}</p>

                                            <h4 className="font-13 text-muted text-uppercase mb-1">Pays</h4>
                                            <p className="mb-0"> France</p>

                                        </div>

                                        {this.state.desciption.statut === "nouveau" &&

                                        <div className="row mt-3 justify-content-around">


                                            <div className="col-md-5">
                                                <Button onClick={() => this.accepted(this.state.desciption.uid,this.state.desciption.email)}
                                                        variant="contained" color="primary" style={{width: "100%"}}>
                                                    Accepter
                                                </Button>

                                            </div>
                                            <div className="col-md-5">
                                                <Button variant="contained" color="danger" style={{width: "100%"}}>
                                                    refuser
                                                </Button>

                                            </div>


                                        </div>

                                        }

                                    </div>

                                </div>
                                }
                            </div>


                            <ReactSummernote
                                className="bg-success"
                                value="Default value"
                                options={{
                                    lang: 'ru-RU',
                                    height: 350,
                                    dialogsInBody: true,
                                    codemirror: { // codemirror options
                                        theme: 'monokai'
                                    },
                                    toolbar: [
                                        ['style', ['style']],
                                        ['font', ['bold', 'underline', 'clear']],
                                        ['fontname', ['fontname']],
                                        ['para', ['ul', 'ol', 'paragraph']],
                                        ['table', ['table']],
                                        ['insert', ['link', 'picture', 'video']],
                                        ['view', ['fullscreen', 'codeview']]
                                    ]
                                }}
                                onChange={this.onChange}
                            />




                        </Suspense>

                    </Container>
                </div>



            </div>


        )
    }

}

export default crm;