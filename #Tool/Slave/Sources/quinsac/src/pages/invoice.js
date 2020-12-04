import React, {Component, Suspense} from 'react';
import Topbar from "../components/TopbarRecettes";
import Navbar from "../components/Navbar";

import firebase from 'firebase'

import "video-react/dist/video-react.css"; // import css
import MySnackbarContentWrapper from "../tools/customSnackBar";








import Snackbar from "@material-ui/core/Snackbar"
import moment from "moment";



const loading = () => <div className="text-center"></div>;


class invoice extends Component {
    constructor(props){
        super(props);
        this.changeActivePage=this.changeActivePage.bind(this)
        this.state={
            test:45,

            openAlert: false,
            alertMessage: "",
            alertType: "",
            loading :false,
            percentage:"",
            dataLength:"",
            showAcceuil:true,
            showVille:false,
            showVtc:false,
            showCompact:false,
            showVE:false,
            user:"",
            invoiceData:"",
            factures:[],

            ville:[]

        }
    }

    componentDidMount() {
        firebase.database().ref("facture/"+localStorage.getItem("uid")).on("value",(snapshot)=>{
            let factures=snapshot.val()

            let facs =[]

            if (factures!=null){

                factures.map((item,key)=>{
                    facs.push(item)
                })

                this.setState({factures:facs})
            }


        })

        let invoiceData =JSON.parse(localStorage.getItem("invoiceData"))
         this.setState({invoiceData:invoiceData})
        firebase.database().ref("users/"+localStorage.getItem('uid')).on("value",(snapshot)=>{
          let user = snapshot.val()

          this.setState({user:user})

      })
    }



    changeActivePage(name){
        this.setState({ showAcceuil:false,
            showVille:false,
            showVtc:false,
            showCompact:false,
            showVE:false})

        this.setState({[name]:true})
    }


gotoSignature(){
        let facture={
            userUid:localStorage.getItem("uid"),
            produit:this.state.invoiceData,
            date:moment().format('MMMM Do YYYY, h:mm:ss a')
        }

        this.state.factures.push(facture)
        firebase.database().ref("facture/"+localStorage.getItem("uid")).set(
            this.state.factures
        )
        this.props.history.push("/investisor/completer-profil/signature")
}


    render() {



        let user = this.state.user
        let invoice =this.state.invoiceData


        return (
            <div >
                <header id="topnav" style={{backgroundColor:"#ffffff"}}>
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>



                <div className="wrapper">
                    <div className="container-fluid w-100 mt-5
                ">
                        {user != ""&&

                        <div className="card-box">
                            <div className="clearfix">
                                <div className="float-left">
                                    <div className="auth-logo">
                                        <div className="logo logo-dark">
                                                    <span className="logo-lg">
                                                        <img  alt="" height="22"/>
                                                    </span>
                                        </div>

                                        <div className="logo logo-light">
                                                    <span className="logo-lg">
                                                        <img  alt="" height="22"/>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="float-right">
                                    <h4 className="m-0 d-print-none">Invoice</h4>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mt-3">
                                        <p><b>Hello, {user.nom + " "+ user.prenom}</b></p>
                                        <p className="text-muted">Thanks a lot because you keep purchasing our products.
                                            Our company
                                            promises to provide high quality products for you as well as outstanding
                                            customer service for every transaction. </p>
                                    </div>

                                </div>
                                <div className="col-md-4 offset-md-2">
                                    <div className="mt-3 float-right">
                                        <p className="m-b-10"><strong>Order Date : </strong> <span
                                            className="float-right"> &nbsp;&nbsp;&nbsp;&nbsp; {moment().format("MMM Do , YYYY")    } </span></p>
                                        <p className="m-b-10"><strong>Order Status : </strong> <span
                                            className="float-right"><span
                                            className="badge badge-danger">Unpaid</span></span></p>
                                        <p className="m-b-10"><strong>Order No. : </strong> <span
                                            className="float-right">000028 </span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <h6>Billing Address</h6>
                                    <address>

                                        {user.adress.adress+", "+user.adress.ville+", "+user.adress.codepostal}<br></br>
                                      <br></br>
                                        <abbr title="Phone">Phone:</abbr> ({user.phone.code}) {" "+user.phone.numero}
                                    </address>
                                </div>

                                <div className="col-sm-6">
                                    <h6>Shipping Address</h6>
                                    <address>
                                        Stanley Jones<br/>
                                        795 Folsom Ave, Suite 600<br/>
                                        San Francisco, CA 94107<br/>
                                        <abbr title="Phone">P:</abbr> (123) 456-7890
                                    </address>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table className="table mt-4 table-centered">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Item</th>
                                                <th style={{width:"10%"}}>Hours</th>
                                                <th style={{width:"10%"}}>Hours Rate</th>
                                                <th style={{width:"10%"}} className="text-right">Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <b>{invoice.nom}</b> <br/>
                                                    {invoice.description}
                                                </td>
                                                <td>22</td>
                                                <td>$30</td>
                                                <td className="text-right">{invoice.investissement}</td>
                                            </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="clearfix pt-5">
                                        <h6 className="text-muted">Notes:</h6>

                                        <small className="text-muted">
                                            All accounts are to be paid within 7 days from receipt of
                                            invoice. To be paid by cheque or credit card or direct payment
                                            online. If account is not paid within 7 days the credits details
                                            supplied as confirmation of work undertaken will be charged the
                                            agreed quoted fee noted above.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="float-right">
                                        <p><b>Sub-total:</b> <span className="float-right">€{invoice.investissement}</span></p>
                                        <p><b>Discount (10%):</b> <span
                                            className="float-right"> &nbsp;&nbsp;&nbsp; $459.75</span></p>
                                        <h3>€{invoice.investissement}</h3>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>

                            <div className="mt-4 mb-1">
                                <div className="text-right d-print-none">
                                    <a href="javascript:window.print()"
                                       className="btn btn-primary waves-effect waves-light"><i
                                        className="mdi mdi-printer mr-1"></i> Print</a>
                                    <a onClick={()=>{this.gotoSignature()}} className="btn btn-info waves-effect waves-light">Submit</a>
                                </div>
                            </div>
                        </div>
                        }

                    </div>






                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>
            </div>


        );
    }
}

export default invoice;
