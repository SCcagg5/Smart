import React, {Component, Suspense} from "react";
import firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';
import Loader from "../../components/Loader";
import {Container} from "reactstrap";
import pdfImage from "../../assets/images/pdfimage.jpg";
import moment from "moment";
import userService from "../../provider/userService"
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/data";
import SideBar from "../../components/SideBar/SideBar";



class UserCoffreFort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            loading: false,
            cessionActDocs: []
        }
    }

    componentDidMount() {
        this.setState({loading: true});
        firebase.database().ref("coffreFort/").on("value", (snapshot) => {
            let data = snapshot.val();
            let dataArray = Object.values(data);
            const coffreDocsArray = Object.entries(data).map((e) => ({[e[0]]: e[1]}));
            coffreDocsArray.map((item, key) => {
                dataArray[key].id = Object.keys(coffreDocsArray[key])[0];
            });
            let userDocs = [];
            dataArray.map((item, key) => {
                if (item.uidSender === localStorage.getItem("uid") || item.uidReciever === localStorage.getItem("uid")) {
                    userDocs.push(item);
                }
            });
            this.setState({loading: false, cessionActDocs: userDocs || []})
            //console.log(localStorage.getItem("uid"))
            //console.log(userDocs)
        });
    }

    showCessionActDocument = (doc) => event => {

        this.setState({loading: true});

        let toSend = {
            cedant: {fullname: doc.senderName, adress: doc.senderAdress},
            cessionnaire: {fullname: doc.recieverName, adress: doc.recieverAdress},
            banque: {name: "Carbone-Invest+", iban: "1248*****42***871"},
            place: "Suisse",
            datecreation: moment(doc.created).format("DD/MM/YYYY"),
            senderSignature: doc.senderSignature || "",
            recieverSignature: doc.recieverSignature || ""
        };
        userService.generateCesionActionSuisse(toSend).then(res => {
            console.log("ok");
            const file = new Blob(
                [res],
                {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            this.setState({loading: false});

        }, err => {
            console.log(err);
        })

    };

    render() {

        return (

            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}
                        onClickMyCf={ () => this.props.history.push("/user/coffre-fort")}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>
                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>
                    <div className="row" style={{marginTop: 20}}>

                        <div className="col-md-10">
                            <div className="card" style={{minHeight: '282px'}}>
                                <div className="card-body">
                                    <div className="tab-content pt-0">

                                        <div className={"tab-pane fade active show"}
                                             id={"cessionAction"}
                                             role="tabpanel" aria-labelledby={"v-pills-cessionBond"}>
                                            <div>
                                                <h5>Cession de créances</h5>
                                                <h6>
                                                    <i className="fa fa-paperclip mb-2"/> Documents <span>({this.state.cessionActDocs.length})</span>
                                                </h6>

                                                {
                                                    this.state.cessionActDocs.map((item, key) => (
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-sm-3 mt-2">
                                                                    <div align="center">
                                                                        <a style={{cursor: 'pointer'}}
                                                                           onClick={this.showCessionActDocument(item)}>
                                                                            <img src={pdfImage}
                                                                                 style={{maxHeight: 60}}
                                                                                 alt="attachment"
                                                                                 className="img-thumbnail img-responsive"/>

                                                                        </a>
                                                                        <p style={{
                                                                            fontSize: "x-small",
                                                                            marginBottom: "0.2rem"
                                                                        }}>{"CessionAction_" + moment(item.created).format("DD-MM-YYYY")} </p>

                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-9"
                                                                     style={{marginTop: 5}}>
                                                                    {
                                                                        item.uidSender === localStorage.getItem("uid") ?

                                                                            item.senderSignature && item.senderSignature !== "" &&
                                                                            item.recieverSignature && item.recieverSignature ?
                                                                                <div className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 25,
                                                                                                fontSize: "0.9rem"
                                                                                            }}>
                                                                                          Document Signé
                                                                                        </span>
                                                                                </div> :
                                                                                <div>
                                                                                    {
                                                                                        item.senderSignature === undefined || item.senderSignature === null ||
                                                                                        item.senderSignature === "" &&
                                                                                        <div>
                                                                                            <h4 style={{fontWeight: 'bold'}}
                                                                                                className="header-title mt-0 mb-1">
                                                                                                En attente de
                                                                                                votre
                                                                                                signature :
                                                                                            </h4>
                                                                                            <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                <li className="align-items-center d-flex justify-content-between">
                                                                                                    <div
                                                                                                        className="media">
                                                                                                        <div
                                                                                                            className="media-body align-self-center">
                                                                                                            <div
                                                                                                                className="transaction-data">
                                                                                                                <h3 className="m-0">Vous</h3>
                                                                                                                <p className="text-muted mb-0">{localStorage.getItem("email")} </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="transaction-icon">
                                                                                                        <button
                                                                                                            type="button"
                                                                                                            onClick={() => {
                                                                                                                window.open("http://51.15.229.251:89/sign/" + item.id + "/sender", "_blank")
                                                                                                            }}
                                                                                                            className="btn btn-micro btn-success waves-effect waves-light">
                                                                                                            Signer le document
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>

                                                                                    }
                                                                                    {
                                                                                        item.recieverSignature && item.recieverSignature !== "" ?
                                                                                            <div
                                                                                                className="text-center">
                                                                                        <span
                                                                                            className="badge bg-soft-success text-success p-1"
                                                                                            style={{
                                                                                                marginTop: 25,
                                                                                                fontSize: "0.9rem"
                                                                                            }}>
                                                                                          Signé par le cessionnaire
                                                                                        </span>
                                                                                            </div> :
                                                                                            <div>

                                                                                                <h4 style={{fontWeight: 'bold'}}
                                                                                                    className="header-title mt-0 mb-1 mt-3">
                                                                                                    En attente
                                                                                                    de signature
                                                                                                    de
                                                                                                    cessionnaire
                                                                                                    :
                                                                                                </h4>
                                                                                                <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                    <li className="align-items-center d-flex justify-content-between">
                                                                                                        <div
                                                                                                            className="media">
                                                                                                            <div
                                                                                                                className="media-body align-self-center">
                                                                                                                <div
                                                                                                                    className="transaction-data">
                                                                                                                    <h3 className="m-0">{item.recieverName} </h3>
                                                                                                                    <p className="text-muted mb-0">{item.recieverAdress} </p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="transaction-icon">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                className="btn btn-success waves-effect waves-light btn-micro">
                                                                                                                Demander
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </ul>

                                                                                            </div>
                                                                                    }
                                                                                </div> :






                                                                            <div>
                                                                                {
                                                                                    item.senderSignature && item.senderSignature !== "" &&
                                                                                    item.recieverSignature && item.recieverSignature ?
                                                                                        <div className="text-center">
                                                                                                  <span className="badge bg-soft-success text-success p-1"
                                                                                                        style={{marginTop: 25, fontSize: "0.9rem"}}>
                                                                                                        Document Signé
                                                                                                  </span>
                                                                                        </div> :
                                                                                        <div>
                                                                                            {
                                                                                                (item.recieverSignature === undefined || item.recieverSignature === null ||
                                                                                                    item.recieverSignature === "") &&
                                                                                                <div>
                                                                                                    <h4 style={{fontWeight: 'bold'}}
                                                                                                        className="header-title mt-0 mb-1">
                                                                                                        En attente de
                                                                                                        votre
                                                                                                        signature :
                                                                                                    </h4>
                                                                                                    <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                        <li className="align-items-center d-flex justify-content-between">
                                                                                                            <div
                                                                                                                className="media">
                                                                                                                <div
                                                                                                                    className="media-body align-self-center">
                                                                                                                    <div
                                                                                                                        className="transaction-data">
                                                                                                                        <h3 className="m-0">Vous</h3>
                                                                                                                        <p className="text-muted mb-0">{localStorage.getItem("email")} </p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="transaction-icon">
                                                                                                                <button
                                                                                                                    type="button"
                                                                                                                    onClick={() => {
                                                                                                                        window.open("http://51.15.229.251:89/sign/" + item.id + "/reciever", "_blank")
                                                                                                                    }}
                                                                                                                    className="btn btn-micro btn-success waves-effect waves-light">
                                                                                                                    Signer le document
                                                                                                                </button>
                                                                                                            </div>
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                </div>

                                                                                            }
                                                                                            {
                                                                                                item.senderSignature && item.senderSignature !== "" ?
                                                                                                    <div className="text-center">
                                                                                                               <span className="badge bg-soft-success text-success p-1"
                                                                                                                     style={{marginTop: 25, fontSize: "0.9rem"}}>
                                                                                                                  Signé par le cédant
                                                                                                               </span>
                                                                                                    </div> :
                                                                                                    <div>

                                                                                                        <h4 style={{fontWeight: 'bold'}}
                                                                                                            className="header-title mt-0 mb-1 mt-3">
                                                                                                            En attente de signature de cédant :
                                                                                                        </h4>
                                                                                                        <ul className="list-unsyled m-0 pl-0 transaction-history ml-3">
                                                                                                            <li className="align-items-center d-flex justify-content-between">
                                                                                                                <div
                                                                                                                    className="media">
                                                                                                                    <div
                                                                                                                        className="media-body align-self-center">
                                                                                                                        <div
                                                                                                                            className="transaction-data">
                                                                                                                            <h3 className="m-0">{item.senderName} </h3>
                                                                                                                            <p className="text-muted mb-0">{item.senderAdress} </p>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div
                                                                                                                    className="transaction-icon">
                                                                                                                    <button
                                                                                                                        type="button"
                                                                                                                        className="btn btn-success waves-effect waves-light btn-micro">
                                                                                                                        Demander
                                                                                                                    </button>
                                                                                                                </div>
                                                                                                            </li>
                                                                                                        </ul>

                                                                                                    </div>
                                                                                            }
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div style={{
                                                                height: 2,
                                                                backgroundColor: "#F0F0F0",
                                                                marginLeft: 10,
                                                                marginRight: 10,
                                                                marginTop: 20,
                                                                marginBottom: 20
                                                            }}/>
                                                        </div>

                                                    ))
                                                }


                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        )


    }

}

export default UserCoffreFort;