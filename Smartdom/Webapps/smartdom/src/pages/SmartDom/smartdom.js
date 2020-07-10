import React, {Component, Suspense} from "react";
import {AvFeedback, AvForm, AvGroup, AvInput } from "availity-reactstrap-validation";
import {Button, FormGroup} from "reactstrap";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Radio} from "@material-ui/core";
import moment from "moment";
import Loader from "../../components/Loader";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import creationProcess from"../../assets/images/smartDom/CreationProcess.svg"
import developement from"../../assets/images/smartDom/development.svg"
import happyFeeling from"../../assets/images/smartDom/happyFeeling.svg"
import onlineCalendar from"../../assets/images/smartDom/onlineCalendar.svg"
import schedule from"../../assets/images/smartDom/schedule.svg"
import caution from"../../assets/images/smartDom/caution.svg"
import posed from "react-pose";
import switzerland from "../../assets/images/domiciliation/switzerland.svg";

const Topbar = React.lazy(() => import("../../components/Topbar"));
const loading = () => <Loader/>;

const Box = posed.div({
    hoverable: true,
    pressable: true,
    init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
    },
    hover: {
        scale: 1,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
    },
    press: {
        scale: 1.05,
        boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
    }
});
class smartdom extends Component{


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            typeProjet:"",
            quand:"",
            prenom:"",
            nom:"",
            email:"",
            sName:"",
            telephone:"",
            domicilierType:"",
            residentSuisse:"false",
            besoinAdministrateur:"false",
            besoinAvocat:"false",
            avoirFiliales:"false",
            showStep1:true,
            showStep2:false,
            showStep3:false,
            showStep4:false,
            showStep5:false,
            showStep6:false,
            showStep7:false,
            showStep8:false,
            showStep9:false,

        };
    }

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };
    validateSubmit = (event,values,showstep1,showstep2)  => {

        if (showstep1!=="showStep9") {

            this.setState({

                [showstep1]: false,
                [showstep2]: true
            });
        }else{
            this.setState({

                [showstep1]: false,

            });
            this.savaData()
            this.props.history.push("/smartDom/forfait")
        }



    };
    handleChange = (name) => event => {
        this.setState({
            [name]:event.target.value
        })
    };

    handleChangeButton = (name,value,showstep1,showstep2) => {
        this.setState({
            [name]:value,
            [showstep1]:false,
            [showstep2]:true
        })
    };
    handleOnChangePhone = (value) => {



            this.setState({ telephone: value });

    };

    savaData(){



        firebase.auth().createUserWithEmailAndPassword(this.state.email, "123456").then(res => {
            // The user is registred ==> Save other user informations in a data base = firebase in /users
            firebase.database().ref('users/' + res.user.uid).set({
                typeProjet:this.state.typeProjet,
                quand:this.state.quand,
                prenom:this.state.prenom,
                nom:this.state.nom,
                email:this.state.email,
                sName:this.state.sName,
                telephone:this.state.telephone,
                domicilierType:this.state.domicilierType,
                residentSuisse:this.state.residentSuisse,
                besoinAdministrateur:this.state.besoinAdministrateur,
                besoinAvocat:this.state.besoinAvocat,
                avoirFiliales:this.state.avoirFiliales,
                dateCreation: moment(new Date()).format("DD/MM/YYYY"),
            }).then(data => {
                // OK ==> Redirect user to login page
                this.openSnackbar('success', 'Votre inscription est effectuée avec succès');
                this.setState({
                    isSignUp: false
                })
            }).catch(function (error) {
                alert(error);
            });

        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                this.openSnackbar('warning', 'Adresse mail est déja utilisé.');
            } else {
                this.openSnackbar('error', error.message);
            }
        });






    }




    render() {
        return(

            <div className="app center-menu  ">

                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper " >
                    {this.state.showStep1 === true &&
                    <div className="container w-50   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Bienvenue chez SmartDom</h2>
                        </div>
                        <div className="mt-3">
                            <h6 style={{color: "#448ee6"}}>Nous allons vous accompagner dans votre domiciliation</h6>
                        </div>
                        <div className="mt-1">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "1%",
                                    align: "left"


                                }}
                            />

                        </div>
                        <div className="mt-5">
                            <h6 style={{fontWeight: "bold"}}>Pour commencer, quel est votre projet ?</h6>

                        </div>

                        <div className="row justify-content-around mt-5">
                            <Box onClick={()=>{this.handleChangeButton("typeProjet","creation","showStep1","showStep2")}} className="col-md-4     text-center p-3" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid"
                            }}>
                                <img src={creationProcess} style={{width: "50%"}}/>

                                <h5 className="mt-3" style={{fontWeight: "bold", color: "#808080"}}>Création</h5>


                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("typeProjet","Transfert de siége","showStep1","showStep2")}} className="col-md-4     text-center p-3" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid"
                            }}>

                                <img src={developement} style={{width: "50%"}}/>

                                <h5 className="mt-3" style={{fontWeight: "bold", color: "#808080"}}>Transfert de
                                    siège</h5>

                            </Box>

                        </div>


                    </div>
                    }
                    {this.state.showStep2 === true &&
                    <div className="container w-50   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quand ?</h2>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>


                        <div className="row justify-content-around mt-5">
                            <Box onClick={()=>{this.handleChangeButton("quand","Moins d'une semaine","showStep2","showStep3")}} className="col-md-3    text-center p-3" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid"
                            }}>
                                <img src={onlineCalendar} style={{width: "60%"}}/>

                                <h6 className="mt-3" style={{fontWeight: "bold", color: "#808080"}}>Moins d'une semaine</h6>


                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("quand","Moins d'un mois","showStep2","showStep3")}} className="col-md-3  mr-2 ml-2   text-center p-3" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid"
                            }}>

                                <img src={schedule} style={{width: "60%"}}/>

                                <h6 className="mt-3" style={{fontWeight: "bold", color: "#808080"}}>Moins d'un mois</h6>

                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("quand","Je ne sais pas","showStep2","showStep3")}} className="col-md-3     text-center p-3" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid"
                            }}>

                                <img src={happyFeeling} style={{width: "50%"}}/>

                                <h6 className="mt-3" style={{fontWeight: "bold", color: "#808080"}}>Je ne sais pas</h6>

                            </Box>


                        </div>


                    </div>
                    }
                    {this.state.showStep3 === true &&
                    <div className="container w-50  justify-content-center   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quel est votre prénom ?</h2>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>

                        <AvForm onValidSubmit={(event,values) => this.validateSubmit(event,values,"showStep3","showStep4")} >
                        <div className="mt-5">
                            <AvGroup>

                                <AvInput onChange={this.handleChange("prenom")} name="prenom"  id="prenom"  type="text" required value={this.state.prenom} />
                            <AvFeedback>Donnez-moi votre prénom s'il vous plait</AvFeedback>

                            </AvGroup>


                        </div>

                        <div align="center" className="flex-column d-flex" style={{marginTop:"30%"}} >
                            <Button  style={{width:"30%", backgroundColor:"#007acc"}} disabled={this.state.prenom===""}  className="btn btn-primary" >Suivant</Button>
                            <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                        </div>
                        </AvForm>


                    </div>
                    }
                    {this.state.showStep4 === true &&
                    <div className="container w-50  justify-content-center   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quel est votre nom de famille, {this.state.prenom} ?</h2>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>

                        <AvForm onValidSubmit={(event,values) => this.validateSubmit(event,values,"showStep4","showStep5")} >
                            <div className="mt-5">
                                <AvGroup>

                                    <AvInput onChange={this.handleChange("nom")} name="nom"  id="nom"  type="text" required value={this.state.nom} />
                                    <AvFeedback>Donnez-moi votre nom s'il vous plait</AvFeedback>

                                </AvGroup>


                            </div>

                            <div align="center" className="flex-column d-flex" style={{marginTop:"30%"}} >
                                <Button  style={{width:"30%", backgroundColor:"#007acc"}} disabled={this.state.nom===""}  className="btn btn-primary" >Suivant</Button>
                                <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                            </div>
                        </AvForm>


                    </div>
                    }
                    {this.state.showStep5 === true &&
                    <div className="container w-50  justify-content-center   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quel est votre adresse email ?</h2>
                        </div>
                        <div>
                            <h5 style={{color:"#2a7fe3"}}>Utile pour envoyer votre attestation</h5>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>

                        <AvForm onValidSubmit={(event,values) => this.validateSubmit(event,values,"showStep5","showStep6")} >
                            <div className="mt-5">
                                <AvGroup>

                                    <AvInput onChange={this.handleChange("email")} name="email"  id="email"  type="email" required value={this.state.email} />
                                    <AvFeedback>Adresse email invalid</AvFeedback>

                                </AvGroup>


                            </div>

                            <div align="center" className="flex-column d-flex" style={{marginTop:"30%"}} >
                                <Button  style={{width:"30%", backgroundColor:"#007acc"}} disabled={this.state.email===""}  className="btn btn-primary" >Suivant</Button>
                                <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                            </div>
                        </AvForm>


                    </div>
                    }
                    {this.state.showStep6 === true &&
                    <div className="container w-50  justify-content-center   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quel est votre numéro de mobile</h2>
                        </div>
                        <div>
                            <h5 style={{color:"#2a7fe3"}}>Utile pour envoyer des notifications SMS</h5>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>

                        <AvForm onValidSubmit={(event,values) => this.validateSubmit(event,values,"showStep6","showStep7")} >
                            <div className="mt-5">
                                <AvGroup className="mb-3">

                                    <PhoneInput country={'ch'} value={this.state.telephone}
                                                onChange={(value) => this.handleOnChangePhone(value)} inputStyle={{
                                        width:"inherit",height:37
                                    }}/>
                                </AvGroup>

                            </div>

                            <div align="center" className="flex-column d-flex" style={{marginTop:"30%"}} >
                                <Button  style={{width:"30%", backgroundColor:"#007acc"}} disabled={this.state.telephone===""}  className="btn btn-primary" >Suivant</Button>
                                <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                            </div>
                        </AvForm>


                    </div>
                    }
                    {this.state.showStep7 === true &&
                    <div className="container w-50  justify-content-center   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Quel est le nom de votre société ?</h2>
                        </div>

                        <div className="mt-4">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>

                        <AvForm onValidSubmit={(event,values) => this.validateSubmit(event,values,"showStep7","showStep8")} >
                            <div className="mt-5">
                                <AvGroup>

                                    <AvInput onChange={this.handleChange("sName")} name="sName"  id="sName"  type="text" required value={this.state.sName} />
                                    <AvFeedback>Donnez-moi le nom de votre societé s'il vous plait</AvFeedback>

                                </AvGroup>


                            </div>

                            <div align="center" className="flex-column d-flex" style={{marginTop:"30%"}} >
                                <Button  style={{width:"30%", backgroundColor:"#007acc"}} disabled={this.state.sName===""}  className="btn btn-primary" >Suivant</Button>
                                <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                            </div>
                        </AvForm>


                    </div>
                    }
                    {this.state.showStep8 === true &&
                    <div className="container w-50   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Vous souhaitez vous domicilier en tant que ...</h2>
                        </div>

                        <div className="mt-1">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                        </div>


                        <div className="row justify-content-around mt-5">
                            <Box onClick={()=>{this.handleChangeButton("domicilierType","SARL unipersonnelle","showStep8","showStep9")}} className="col-md-3  text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer"
                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>SARL unipersonnelle </label>


                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("domicilierType","SARL","showStep8","showStep9")}} className="col-md-3 text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer"
                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>SARL </label>


                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("domicilierType","SA","showStep8","showStep9")}} className="col-md-3  text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer",
                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>SA </label>


                            </Box>




                        </div>
                        <div className="row justify-content-around mt-5">
                            <Box onClick={()=>{this.handleChangeButton("domicilierType","Association","showStep8","showStep9")}} className="col-md-3  text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer"
                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>Association </label>


                            </Box>
                            <Box onClick={()=>{this.handleChangeButton("domicilierType","Fondation","showStep8","showStep9")}} className="col-md-3 text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer"
                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>Fondation </label>


                            </Box>
                            <div  className="col-md-3  text-center p-2 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",
                                cursor:"pointer"
                            }}>


                                <small  style={{ color: "#808080"}}>PLUS DE CHOIX </small>


                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#"></a>
                                    <a className="dropdown-item" href="#"></a>
                                    <a className="dropdown-item" href="#"></a>
                                </div>


                            </div>




                        </div>


                    </div>
                    }
                    {this.state.showStep9 === true &&
                    <div className="container w-50   ">
                        <div>
                            <h2 style={{fontFamily: "Georgia, serif"}}>Vous êtes en création de société en suisse <img src={switzerland} style={{width:"3%"}}/> </h2>

                        </div>

                        <div className="mt-1">
                            <hr align="left"
                                style={{
                                    color: "#2a7fe3",
                                    backgroundColor: "blue",
                                    height: 2,
                                    width: "5%",
                                    align: "left"


                                }}
                            />

                            <div className="mt-5">
                                <h5>Quelques questions pour finaliser : </h5>
                            </div>

                        </div>


                        <div className="row justify-content-around mt-5">
                            <div className="col-md-4 text-center">
                            <div  className="col h-50 text-center p-2" style={{
                                borderColor: "#cccccc",
                                borderWidth: "1px",
                                borderRadius: "3%",
                                borderStyle: "solid",

                            }}>


                                <label  style={{fontWeight: "bold", color: "#808080"}}>Etes vous résident suisse ?
                                </label>


                            </div>
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-2%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.residentSuisse==="true"}
                                                onChange={this.handleChange('residentSuisse')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.residentSuisse==="false"}
                                                onChange={this.handleChange('residentSuisse')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>

                            <div className="col-md-4 text-center">
                                <div  className="col h-50 text-center p-2" style={{
                                    borderColor: "#cccccc",
                                    borderWidth: "1px",
                                    borderRadius: "3%",
                                    borderStyle: "solid",
                                    cursor:"pointer"
                                }}>


                                    <label  style={{fontWeight: "bold", color: "#808080"}}>Besoin d'un administrateur?
                                    </label>


                                </div>
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-2%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.besoinAdministrateur==="true"}
                                                onChange={this.handleChange('besoinAdministrateur')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.besoinAdministrateur==="false"}
                                                onChange={this.handleChange('besoinAdministrateur')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-4 text-center">
                                <div  className="col h-50 text-center p-2" style={{
                                    borderColor: "#cccccc",
                                    borderWidth: "1px",
                                    borderRadius: "3%",
                                    borderStyle: "solid",
                                    cursor:"pointer"
                                }}>


                                    <label  style={{fontWeight: "bold", color: "#808080"}}>Besoin d'un Avocat ?
                                    </label>


                                </div>
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-2%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.besoinAvocat==="true"}
                                                onChange={this.handleChange('besoinAvocat')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.besoinAvocat==="false"}
                                                onChange={this.handleChange('besoinAvocat')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>

                        </div>
                        <div className="row justify-content-around mt-5 ">
                            <div className="col-md-4 text-center">
                                <div  className="col h-50 text-center p-2" style={{
                                    borderColor: "#cccccc",
                                    borderWidth: "1px",
                                    borderRadius: "3%",
                                    borderStyle: "solid",

                                }}>


                                    <label  style={{fontWeight: "bold", color: "#808080"}}>Vous aurez des filiales ?
                                    </label>


                                </div>
                                <FormGroup className="justify-content-center"
                                           style={{marginTop: "-2%"}}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.avoirFiliales==="true"}
                                                onChange={this.handleChange('avoirFiliales')}
                                                value="true"
                                            />
                                        }
                                        label="Oui"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={this.state.avoirFiliales==="false"}
                                                onChange={this.handleChange('avoirFiliales')}
                                                value="false"
                                            />
                                        }
                                        label="Non"
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-8">
                                <div className="row">

                                    <div className="col-md-2">
                                        <img src={caution} style={{width:"100%"}}/>

                                    </div>
                                    <div className="col-md-8">
                                        <small style={{color:"#999999"}}>* Si vous n’êtes pas résident suisse, vous devez avec un résident qui soit administrateur de votre société parmi vos dirigeants ou actionnaire de votre société. Si ce n’est pas le cas, il est nécessaire de mandater un administrateur.</small>

                                    </div>


                                </div>

                            </div>



                        </div>

                        <div  align="center" className="flex-column d-flex" style={{marginTop:"5%"}} >
                            <Button onClick={()=>this.validateSubmit("","","showStep9","")}style={{width:"30%", backgroundColor:"#007acc"}}  className="btn btn-primary" >Suivant</Button>
                            <small>ou appuyez sur <label className="font-weight-bold">Entrée</label></small>
                        </div>



                    </div>
                    }
                </div>



            </div>
        )
    }


}

export default smartdom;
