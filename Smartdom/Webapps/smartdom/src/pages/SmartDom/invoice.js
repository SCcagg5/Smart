import React, {Component, Suspense} from "react";
import "firebase/database";
import 'firebase/storage';
import MySnackbarContentWrapper from "../../tools/customSnackBar";
import Snackbar from "@material-ui/core/Snackbar";
import moment from "moment";
import "moment/locale/fr"
import Loader from "../../components/Loader";
import firebase from 'firebase'




const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;


moment.locale('fr');






class  invoice extends Component {



    constructor(props) {
        super(props);



        this.state = {
            modalAssistance: false,
            modalWebCoferance: false,
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            openAlert: false,
            alertMessage: '',
            alertType: '',
            selectedPays: 'Suisse',

            showModal2: false,

            showModal: false,
            stoOperation: false,
            facture:""



        }

    }

    componentDidMount() {
        let key = localStorage.getItem("Fkey")
        firebase.database().ref("payment/"+key).on("value",(snapshot)=>{
            let facture = snapshot.val()

            console.log(facture)

            this.setState({facture:facture})
        })
    }

    render() {

        let facture=this.state.facture



        return (





            <div className="bg-dark" >


                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div  className="wrapper " style={{backgroundColor:"#ffffff"}} >

                    <Suspense fallback={loading()}>
                        {this.state.loading && <Loader/>}






                        <div className="wrapper mb-5">
                            <div className="container-fluid w-100 mt-5 px-4 ">

                                {(facture!=null && facture!=="")&&
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
                                                <p><b>Hello, {facture.token.email}</b></p>
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

                                                <br></br>
                                                <br></br>
                                                <abbr title="Phone">Phone:</abbr>
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
                                                        <th style={{width:"10%"}}></th>
                                                        <th style={{width:"10%"}}></th>
                                                        <th style={{width:"10%"}} className="text-right">Total</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            <b>{facture.token.forfait.data.nom}</b> <br/>

                                                        </td>
                                                        <td></td>
                                                        <td></td>
                                                        <td className="text-right">{facture.token.forfait.data.prix} CHF</td>
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
                                                <p><b>Sub-total:</b> <span className="float-right">CHF </span></p>
                                                <p><b>Discount (10%):</b> <span
                                                    className="float-right"> &nbsp;&nbsp;&nbsp; </span></p>
                                                <h3>CHF{facture.token.forfait.data.prix}</h3>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>

                                    <div className="mt-4 mb-1">
                                        <div className="text-right d-print-none">
                                            <a href="javascript:window.print()"
                                               className="btn btn-primary waves-effect waves-light"><i
                                                className="mdi mdi-printer mr-1"></i> Print</a>
                                            <a className="btn btn-info waves-effect waves-light">Submit</a>
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

                    </Suspense>

                </div>




            </div >



        )
    }


}


export default invoice;
