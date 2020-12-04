import React, {Component, Suspense} from "react";
import Topbar from "../../../components/Menu/Topbar";
import {Container, FormGroup as formGroup} from "reactstrap";
import Loader from "../../../components/Loader";
import firebase from "firebase/app";
import "firebase/database"

const loading = () => <Loader/>;

class documents extends Component{

    CINUpload = {};
    JustDomicileUpload = {};


    constructor(props){
        super(props);
        this.addCIN = this.addCIN.bind(this);
        this.addJustifDom = this.addJustifDom.bind(this);

        this.state={
            loading:false,
            cin: {
                url:"",
                name:"",
                size:""
            },
            justifDomicile:{
                url:"",
                name:"",
                size:""
            },
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0)
        if(localStorage.getItem("uid") !== undefined && localStorage.getItem("uid") !== null){
            firebase.database().ref('/users/'+localStorage.getItem("uid")).on('value', (snapshot) => {
                let user = snapshot.val();
                this.setState({
                    cin:user.CINFile || this.state.cin,
                    justifDomicile:user.justifDomicile || this.state.justifDomicile,
                })
            })
        }else{
            this.props.history.push("/comment-investir")
        }
    }


    async addCIN(image) {
        let file = image.target.files[0];

        firebase.storage().ref("/users/files/").child(file.name).put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url => {

                    firebase.database().ref('users/' + localStorage.getItem("uid")).update({
                        'CINFile': {
                            "url":url,
                            "name":file.name,
                            "size":file.size
                        },
                    }).then(res => {
                        this.setState({
                            cin: {
                                url:url,
                                name:file.name,
                                size:file.size
                            }
                        })
                    }).catch(err => {
                        console.log(err);
                    });
                })

            }).catch((error) => {
            console.log('One failed:', file.name, error.message)
        });

    }

    async addJustifDom(image) {
        let file = image.target.files[0];

        firebase.storage().ref("/users/files/").child(file.name).put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url => {

                    firebase.database().ref('users/' + localStorage.getItem("uid")).update({
                        'justifDomicile': {
                            "url":url,
                            "name":file.name,
                            "size":file.size
                        },
                    }).then(res => {
                        this.setState({
                            justifDomicile: {
                                url:url,
                                name:file.name,
                                size:file.size
                            }
                        })
                    }).catch(err => {
                        console.log(err);
                    });
                })

            }).catch((error) => {
            console.log('One failed:', file.name, error.message)
        });

    }


    render() {
        return(
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>
                <div className="wrapper" style={{padding: "72px 0px 0px", backgroundColor: "#fff"}}>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            <div className="row" style={{marginTop:100}}>

                                    <div className="col-md-8" style={{backgroundColor:"#fff",paddingRight:"15%",paddingLeft:"5%"}}>
                                        <p style={{
                                            color: "#000",
                                            fontSize: "2.6rem",
                                            lineHeight: "2.75rem",
                                            textTransform: "uppercase",
                                            fontWeight:"bold"
                                        }}>Pièces justificatives</p>
                                        <p className="font-18 text-dark" style={{lineHeight: 1.4,marginTop:40}}>
                                            Conformément à la réglementation européenne de lutte contre le blanchiment de capitaux et le financement du terrorisme,
                                            nous vous demandons de fournir les documents permettant de vérifier votre identité.<br/><br/>
                                            <p className="font-weight-bold">
                                                Si vous n'avez pas vos pièces justificatives à portée de main, vous pouvez passer à l'étape suivante et nous les fournir plus tard.</p>
                                        </p>

                                        <p style={{
                                            color: "#000",
                                            fontSize: "2.1rem",
                                            lineHeight: "2.75rem",
                                            textTransform: "uppercase",
                                            fontWeight:"bold"
                                        }}>Documents</p>

                                        <p className="font-18 text-dark" style={{lineHeight: 1.4,marginTop:40}}>
                                            Tous les documents doivent être au format .pdf, .jpg, .jpeg, .gif ou .png et ne pas dépasser 7 Mo.
                                        </p>

                                        <p style={{
                                            color: "#0d1e28",
                                            fontSize: "1.0rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",marginTop:25,
                                        }}>Pièce d'identité (recto-verso sur le même document)</p>

                                        <div className="custom-input-file" style={{marginTop:15}}
                                             onClick={() => this.state.cin.name === "" ? this.CINUpload.click() : window.open(this.state.cin.url)}>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <i style={{fontSize: 20, color: "#ddd"}}
                                                       className="fa fa-file-pdf"/>&nbsp;&nbsp;
                                                    <i style={{fontSize: 20, color: "#ddd"}}
                                                       className="fa fa-image"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <p style={{fontSize:"1.1rem",lineHeight:"1.6rem"}}>Ma pièce d'identité<br/>
                                                        {this.state.cin.name === "" ? "Votre document" : this.state.cin.name } <br/>
                                                        {this.state.cin.size === "" ? "Format .pdf, .jpg ou .png" : this.state.cin.size +" Kb" }
                                                    </p>
                                                </div>
                                                <div className="col-md-3 ">
                                                    <div className="mt-3 text-center">
                                                        {
                                                            this.state.cin.name === "" ?
                                                                <i className="fa fa-upload" style={{fontSize:"36px",color:"#ddd"}}/> :
                                                                <i className="fa fa-angle-down" style={{fontSize:"45px",color:"darkseagreen"}}/>
                                                        }

                                                    </div>
                                                </div>
                                                <input style={{visibility: 'hidden', width: 0, height: 0}}
                                                       type='file' label='Upload' accept='.png,.jpeg,.jpg, .pdf'
                                                       onChange={this.addCIN}
                                                       ref={(ref) => this.CINUpload = ref}
                                                />
                                            </div>
                                        </div>

                                        <p style={{
                                            color: "#0d1e28",
                                            fontSize: "1.0rem",
                                            lineHeight: "1.5rem",
                                            fontWeight:"bold",marginTop:25,
                                        }}>Justificatif de domicile (de moins de 3 mois)</p>

                                        <div className="custom-input-file mt-1 mb-5"
                                             onClick={() => this.state.justifDomicile.name === "" ? this.JustDomicileUpload.click() : window.open(this.state.justifDomicile.url)}>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <i style={{fontSize: 20, color: "#ddd"}}
                                                       className="fa fa-file-pdf"/>&nbsp;&nbsp;
                                                    <i style={{fontSize: 20, color: "#ddd"}}
                                                       className="fa fa-image"/>
                                                </div>
                                                <div className="col-md-7">
                                                    <p style={{fontSize:"1.1rem",lineHeight:"1.6rem"}}>Mon justificatif de domicile<br/>
                                                        {this.state.justifDomicile.name === "" ? "Votre document" : this.state.justifDomicile.name } <br/>
                                                        {this.state.justifDomicile.size === "" ? "Format .pdf, .jpg ou .png" : this.state.justifDomicile.size +" Kb" }
                                                    </p>

                                                </div>
                                                <div className="col-md-3 ">
                                                    <div className="mt-3 text-center">
                                                        {
                                                            this.state.justifDomicile.name === "" ?
                                                                <i className="fa fa-upload" style={{fontSize:"36px",color:"#ddd"}}/> :
                                                                <i className="fa fa-angle-down" style={{fontSize:"45px",color:"darkseagreen"}}/>
                                                        }

                                                    </div>
                                                </div>
                                                <input style={{visibility: 'hidden', width: 0, height: 0}}
                                                       type='file' label='Upload' accept='.png,.jpeg,.jpg, .pdf'
                                                       onChange={this.addJustifDom}
                                                       ref={(ref) => this.JustDomicileUpload = ref}
                                                />
                                            </div>
                                        </div>

                                        <formGroup>
                                            <div className="text-center">
                                                <button className="btn btn-info waves-effect waves-light font-weight-bolder custombtn"
                                                        onClick={() => this.props.history.push("/investisor/completer-profil/situationEtExperiences")}
                                                        style={{width:"50%",height:60,marginTop:20,marginBottom:30}}>

                                                    {
                                                        this.state.loading ?
                                                            <div className="spinner-border avatar-xs spinnerColor m-1"
                                                                role="status"/> : 'Suivant'
                                                    }
                                                </button>
                                            </div>

                                        </formGroup>

                                    </div>


                            </div>
                        </Suspense>
                    </Container>
                </div>
            </div>
        )
    }

}

export default documents