import React, {Component, Suspense} from "react";
import Loader from "../../components/Loader";

import logomap from "../../assets/images/courrier/map.PNG"
import subscriptions from "../../assets/images/courrier/subscriptions.svg"
import mailbox from "../../assets/images/domiciliation/mailbox.svg"
import visioconference from "../../assets/images/salles/visioconference.PNG"
import conferenceAudio from "../../assets/images/salles/conferenceAudio.PNG"
import avocat from "../../assets/images/domiciliation/personnalisationService/judgeKaterina.svg"
import finance from "../../assets/images/salles/financee.svg"











import Chart from "react-apexcharts";


import {Button, Container} from "reactstrap";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    InputLabel,
    Menu,
    Input,Chip
} from '@material-ui/core';
import Dropdown from "react-bootstrap/Dropdown";
import firebase from "firebase/app";
import "firebase/database"
import interview from "../../assets/images/courrier/interview.svg"
import mobileApplication from "../../assets/images/courrier/Mobile_application.svg"
import {AvForm} from "availity-reactstrap-validation";




const Topbar = React.lazy(() => import("../../components/Topbar"));
const Navbar = React.lazy(() => import("../../components/Navbar"));

const loading = () => <Loader/>;

class sallesMarketplace extends Component {

    constructor() {
        super();
        this.paginate = this.paginate.bind(this);
        this.getUser= this.getUser.bind(this);


        this.viewer = React.createRef();
        this.docViewer = null;
        this.annotManager = null;
        this.instance = null;
        this.state = {
            step1:true,
            step2:false,
            avocat:{
                domaine1:"",
                domaine2:"",
                domaine3:"",
                specialite1:[],
                specialite2:[],
                specialite3:[],
            },
            fiduciaire  :{
                domaine1:"",
                domaine2:"",
                domaine3:"",
                specialite1:[],
                specialite2:[],
                specialite3:[],
            },
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

    handleChange = (event,name,nameS) => {
        let avocat = this.state.avocat
        avocat[name]=event.target.value
        avocat[nameS]=[]

        this.setState({avocat:avocat});
        console.log(this.state.avocat.domaine1)
    };
    handleChangeSpecialité = (event,name) => {
        let avocat = this.state.avocat
        avocat[name]=event.target.value
        this.setState({avocat:avocat});
    };

    handleChangeFiduciaire = (event,name,nameS) => {
        let fiduciaire = this.state.fiduciaire
        fiduciaire[name]=event.target.value
        fiduciaire[nameS]=[]

        this.setState({fiduciaire:fiduciaire});
        console.log(this.state.fiduciaire.domaine1)
    };
    handleChangeSpecialitéFiduciaire = (event,name) => {
        let fiduciaire = this.state.fiduciaire
        fiduciaire[name]=event.target.value
        this.setState({fiduciaire:fiduciaire});
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
          let domaine1= this.state.avocat.domaine1

        const travailSocial = [
            'Contrat de travail',
            ]
        const droitFiscal=[
            'TVA',
            'ISF',
            'Déclaration IRPP',
            'Redressement'


        ];
        const comptabilite=[
            'Tenue de la comptabilité financiére',
            'Bouclement des comptes',
            'Tenue de la comptabilité des debiteurs',
            'Tenue de la comptabilité des salaires',
            'Tenue de la comptabilité des titres',
            'Tenue de la comptabilité des immobilisations',
            'Comptabilisation augumentation de capital',
            'Budgétisation , plan de trésorerie',
            'Plan financier',
            'Reporting et controlling',
            'preparation compte annuels',
            'Consolidation',
            'IFRS'


        ];
        const salaire=[
            'Fiche de salaires',
            'Souscription assurances sociales',
            'Entrées / sorties employées',
            'Impôt à la source',
            'Décomptes assurances sociales',
            'Certificats de salaire',
            'Choix / analyse de régime TVA',
            'Asujettisement',
            'Décomptes TVA'



        ];
        const impot=[
            'Déclaration impôt entreprise',
            'Déclaration impôt privé (pas sur que ça doit faire)',
            'Implémentation régimes fiscal ',
            'Déclaration impôt anticipé divident',
            'Déclaration droit de timbre augumentation capital'




        ];

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };







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
                            <div className="row w-100  justify-content-between  " >
                                <div className="col-md-8">
                                    <h2>Définition des demandes de services d’expertise</h2>
                                </div>
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
                                         <h5> Vous avez sollicité des demandes d’expertise dans les domaines suivant </h5>
                                    </div>
                                    <div className="text-center">
                                        <text>** Les services ci-dessous ne sont pas inclus dans les forfaits de base mais sont proposés via un marketplace </text>
                                    </div>
                                    <div className="text-center">
                                        <div className="row justify-content-center align-items-center">
                                            <div className="col-md-4  ">

                                                <div>
                                                    <FormGroup aria-label="position" className="justify-content-center"  row>
                                                        <FormControlLabel

                                                            control={<Checkbox color="primary"  checked={true} />}
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

                                                            control={<Checkbox color="primary" checked={true} />}
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
                                    </div>


                                    <hr style={{height:"1px" ,backgroundColor:"black",borderStyle:"solid"}}/>
                                    {this.state.step1===true &&

                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={avocat} style={{width:"100%"}}/>
                                        </div>

                                        <div className="col-md-10">
                                            <div className="col-md-10 text-center">
                                                <h4> Pour les services « avocat », pourriez vous nous préciser le(s) domaine(s) d’ expertise(s) recherchée(s) :
                                                </h4>
                                            </div>
                                            <div className="mt-2">
                                                <text>** Vous pouvez  sollicité jusqu’à 3 grappes d’expertise </text>
                                            </div>
                                            <div className="row justify-content-around mt-3">
                                                <div className="w-25">
                                                    <div>
                                                        <FormControl style={{width:"100%"}}>
                                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                    Domaine n°1
                                                </InputLabel>
                                            <Select
                                                style={{width:"100%"}}
                                                labelId="demo-simple-select-placeholder-label-label"
                                                id="demo-simple-select-placeholder-label"
                                                value={this.state.avocat.domaine1}
                                                onChange={(e)=>{this.handleChange(e,'domaine1','specialite1')}}
                                                displayEmpty
                                            >

                                                <MenuItem value="">
                                                    <em>VIDE</em>
                                                </MenuItem>
                                                <MenuItem value={1}>COMMERCIAL-SOCIÉTÉ</MenuItem>
                                                <MenuItem value={2}>TRAVAIL-SOCIAL</MenuItem>
                                                <MenuItem value={3}>DROIT FISCAL</MenuItem>
                                                <MenuItem value={4}>AUTEUR-MARQUES</MenuItem>
                                                <MenuItem value={5}>CONSOMMATION-ABONNEMENT</MenuItem>
                                                <MenuItem value={6}>IMMOBILIER-APPARTEMENT</MenuItem>
                                                <MenuItem value={7}>DROIT PUBLIC-ADMINISTRATIF</MenuItem>
                                                <MenuItem value={8}>ASSURANCE-SANTÉ</MenuItem>
                                                <MenuItem value={9}>INFORMATIQUE-TECHNOLOGIES</MenuItem>
                                                <MenuItem value={10}>DROIT INTERNATIONAL</MenuItem>
                                                <MenuItem value={11}>PÉNAL</MenuItem>
                                                <MenuItem value={12}>FAMILLE</MenuItem>
                                                <MenuItem value={13}>ROUTE-VOITURE</MenuItem>
                                                <MenuItem value={14}>DROIT DU SPORT </MenuItem>
                                                <MenuItem value={15}>ÉTRANGER</MenuItem>


                                            </Select>
                                        </FormControl>
                                                    </div>

                                                        <FormControl className="w-100" >
                                                            <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-1 </InputLabel>
                                                            <Select

                                                                labelId="demo-mutiple-chip-label"
                                                                id="demo-mutiple-chip"
                                                                multiple

                                                                value={this.state.avocat.specialite1}
                                                                onChange={(e)=>{this.handleChangeSpecialité(e,"specialite1")}}
                                                                input={<Input id="select-multiple-chip" />}
                                                                renderValue={(selected) => (
                                                                    <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                        {selected.map((value) => (
                                                                            <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            >
                                                                 { this.state.avocat.domaine1===2 &&

                                                                travailSocial.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                 }
                                                                { this.state.avocat.domaine1===3 &&

                                                                droitFiscal.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                            </Select>
                                                        </FormControl>




                                                </div>
                                                <div className="w-25">

                                                        <FormControl style={{width:"100%"}}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Domaine n°2
                                                            </InputLabel>
                                                            <Select
                                                                style={{width:"100%"}}
                                                                labelId="demo-simple-select-placeholder-label-label"
                                                                id="demo-simple-select-placeholder-label"
                                                                value={this.state.avocat.domaine2}
                                                                onChange={(e)=>{this.handleChange(e,'domaine2','specialite2')}}
                                                                displayEmpty
                                                            >

                                                                <MenuItem value="">
                                                                    <em>VIDE</em>
                                                                </MenuItem>
                                                                <MenuItem value={1}>COMMERCIAL-SOCIÉTÉ</MenuItem>
                                                                <MenuItem value={2}>TRAVAIL-SOCIAL</MenuItem>
                                                                <MenuItem value={3}>DROIT FISCAL</MenuItem>
                                                                <MenuItem value={4}>AUTEUR-MARQUES</MenuItem>
                                                                <MenuItem value={5}>CONSOMMATION-ABONNEMENT</MenuItem>
                                                                <MenuItem value={6}>IMMOBILIER-APPARTEMENT</MenuItem>
                                                                <MenuItem value={7}>DROIT PUBLIC-ADMINISTRATIF</MenuItem>
                                                                <MenuItem value={8}>ASSURANCE-SANTÉ</MenuItem>
                                                                <MenuItem value={9}>INFORMATIQUE-TECHNOLOGIES</MenuItem>
                                                                <MenuItem value={10}>DROIT INTERNATIONAL</MenuItem>
                                                                <MenuItem value={11}>PÉNAL</MenuItem>
                                                                <MenuItem value={12}>FAMILLE</MenuItem>
                                                                <MenuItem value={13}>ROUTE-VOITURE</MenuItem>
                                                                <MenuItem value={14}>DROIT DU SPORT </MenuItem>
                                                                <MenuItem value={15}>ÉTRANGER</MenuItem>


                                                            </Select>
                                                        </FormControl>

                                                    <div>
                                                        <FormControl className="w-100" >
                                                            <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-2 </InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-chip-label"
                                                                id="demo-mutiple-chip"
                                                                multiple
                                                                value={this.state.avocat.specialite2}
                                                                onChange={(e)=>{this.handleChangeSpecialité(e,"specialite2")}}
                                                                input={<Input id="select-multiple-chip" />}
                                                                renderValue={(selected) => (
                                                                    <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                        {selected.map((value) => (
                                                                            <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            >
                                                                { this.state.avocat.domaine2===2 &&

                                                                travailSocial.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                                { this.state.avocat.domaine2===3 &&

                                                                droitFiscal.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </div>



                                                </div>
                                                <div className="w-25">
                                                    <div>
                                                        <FormControl style={{width:"100%"}}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Domaine n°3
                                                            </InputLabel>
                                                            <Select
                                                                style={{width:"100%"}}
                                                                labelId="demo-simple-select-placeholder-label-label"
                                                                id="demo-simple-select-placeholder-label"
                                                                value={this.state.avocat.domaine3}
                                                                onChange={(e)=>{this.handleChange(e,'domaine3')}}
                                                                displayEmpty
                                                            >

                                                                <MenuItem value="">
                                                                    <em>VIDE</em>
                                                                </MenuItem>
                                                                <MenuItem value={1}>COMMERCIAL-SOCIÉTÉ</MenuItem>
                                                                <MenuItem value={2}>TRAVAIL-SOCIAL</MenuItem>
                                                                <MenuItem value={3}>DROIT FISCAL</MenuItem>
                                                                <MenuItem value={4}>AUTEUR-MARQUES</MenuItem>
                                                                <MenuItem value={5}>CONSOMMATION-ABONNEMENT</MenuItem>
                                                                <MenuItem value={6}>IMMOBILIER-APPARTEMENT</MenuItem>
                                                                <MenuItem value={7}>DROIT PUBLIC-ADMINISTRATIF</MenuItem>
                                                                <MenuItem value={8}>ASSURANCE-SANTÉ</MenuItem>
                                                                <MenuItem value={9}>INFORMATIQUE-TECHNOLOGIES</MenuItem>
                                                                <MenuItem value={10}>DROIT INTERNATIONAL</MenuItem>
                                                                <MenuItem value={11}>PÉNAL</MenuItem>
                                                                <MenuItem value={12}>FAMILLE</MenuItem>
                                                                <MenuItem value={13}>ROUTE-VOITURE</MenuItem>
                                                                <MenuItem value={14}>DROIT DU SPORT </MenuItem>
                                                                <MenuItem value={15}>ÉTRANGER</MenuItem>


                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div>
                                                        <FormControl className="w-100" >
                                                            <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-3 </InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-chip-label"
                                                                id="demo-mutiple-chip"
                                                                multiple
                                                                value={this.state.avocat.specialite3}
                                                                onChange={(e)=>{this.handleChangeSpecialité(e,"specialite3")}}
                                                                input={<Input id="select-multiple-chip" />}
                                                                renderValue={(selected) => (
                                                                    <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                        {selected.map((value) => (
                                                                            <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            >

                                                            </Select>
                                                        </FormControl>
                                                    </div>



                                                </div>


                                            </div>
                                            <div align="center" style={{marginTop:"2%"}} >
                                                <Button onClick={()=>this.setState({step1:false,step2:true})}  style={{width:"15%", backgroundColor:"#007acc"}} disabled={this.state.avocat.domaine1===""}  className="btn btn-primary" >Suivant</Button>
                                                <div>
                                                <small>ou appuyez sur <text className="font-weight-bold">Entrée</text></small>
                                            </div>
                                            </div>

                                        </div>



                                    </div>
                                        }
                                    {this.state.step2===true&&

                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={finance} style={{width:"100%"}}/>
                                        </div>

                                        <div className="col-md-10">
                                            <div className="col-md-10 text-center">
                                                <h4>Pour les services «Fiduciaire  », pourriez vous nous préciser le(s) domaine(s) d’ expertise(s) recherchée(s) :

                                                </h4>
                                            </div>
                                            <div className="mt-2">
                                                <text>*** Vous pouvez  sollicité jusqu’à 3 grappes d’expertise </text>
                                            </div>
                                            <div className="row justify-content-around mt-3">
                                                <div className="w-25">
                                                    <div >
                                                        <FormControl style={{width:"100%"}}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Domaine n°1
                                                            </InputLabel>
                                                            <Select
                                                                style={{width:"100%"}}
                                                                labelId="demo-simple-select-placeholder-label-label"
                                                                id="demo-simple-select-placeholder-label"
                                                                value={this.state.fiduciaire.domaine1}
                                                                onChange={(e)=>{this.handleChangeFiduciaire(e,'domaine1','specialite1')}}
                                                                displayEmpty
                                                            >

                                                                <MenuItem value="">
                                                                    <em>VIDE</em>
                                                                </MenuItem>
                                                                <MenuItem value={1}>COMPTABILITÉ</MenuItem>
                                                                <MenuItem value={2}>SALAIRES</MenuItem>
                                                                <MenuItem value={3}>TVA</MenuItem>
                                                                <MenuItem value={4}>IMPOTS</MenuItem>




                                                            </Select>
                                                        </FormControl>
                                                    </div>

                                                    <FormControl className="w-100" >
                                                        <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-1 </InputLabel>
                                                        <Select

                                                            labelId="demo-mutiple-chip-label"
                                                            id="demo-mutiple-chip"
                                                            multiple

                                                            value={this.state.fiduciaire.specialite1}
                                                            onChange={(e)=>{this.handleChangeSpecialitéFiduciaire(e,"specialite1")}}
                                                            input={<Input id="select-multiple-chip" />}
                                                            renderValue={(selected) => (
                                                                <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                    {selected.map((value) => (
                                                                        <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                    ))}
                                                                </div>
                                                            )}

                                                        >
                                                            { this.state.fiduciaire.domaine1===1 &&

                                                            comptabilite.map((name) => (
                                                                <MenuItem  key={name} value={name} >
                                                                    {name}
                                                                </MenuItem>
                                                            ))
                                                            }
                                                            { this.state.fiduciaire.domaine1===2 &&

                                                            salaire.map((name) => (
                                                                <MenuItem  key={name} value={name} >
                                                                    {name}
                                                                </MenuItem>
                                                            ))
                                                            }
                                                            { this.state.fiduciaire.domaine1===4 &&

                                                            impot.map((name) => (
                                                                <MenuItem  key={name} value={name} >
                                                                    {name}
                                                                </MenuItem>
                                                            ))
                                                            }
                                                        </Select>
                                                    </FormControl>




                                                </div>
                                                <div className="w-25">

                                                    <FormControl style={{width:"100%"}}>
                                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                            Domaine n°2
                                                        </InputLabel>
                                                        <Select
                                                            style={{width:"100%"}}
                                                            labelId="demo-simple-select-placeholder-label-label"
                                                            id="demo-simple-select-placeholder-label"
                                                            value={this.state.fiduciaire.domaine2}
                                                            onChange={(e)=>{this.handleChangeFiduciaire(e,'domaine2','specialite2')}}
                                                            displayEmpty
                                                        >

                                                            <MenuItem value="">
                                                                <em>VIDE</em>
                                                            </MenuItem>
                                                            <MenuItem value={1}>COMPTABILITÉ</MenuItem>
                                                            <MenuItem value={2}>SALAIRES</MenuItem>
                                                            <MenuItem value={3}>TVA</MenuItem>
                                                            <MenuItem value={4}>IMPOTS</MenuItem>


                                                        </Select>
                                                    </FormControl>

                                                    <div>
                                                        <FormControl className="w-100" >
                                                            <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-2 </InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-chip-label"
                                                                id="demo-mutiple-chip"
                                                                multiple
                                                                value={this.state.fiduciaire.specialite2}
                                                                onChange={(e)=>{this.handleChangeSpecialitéFiduciaire(e,"specialite2")}}
                                                                input={<Input id="select-multiple-chip" />}
                                                                renderValue={(selected) => (
                                                                    <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                        {selected.map((value) => (
                                                                            <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            >
                                                                { this.state.fiduciaire.domaine2===1 &&

                                                                comptabilite.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                                { this.state.fiduciaire.domaine2===2 &&

                                                                salaire.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                                { this.state.fiduciaire.domaine2===4 &&

                                                                impot.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </div>



                                                </div>
                                                <div className="w-25">
                                                    <div>
                                                        <FormControl style={{width:"100%"}}>
                                                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                                Domaine n°3
                                                            </InputLabel>
                                                            <Select
                                                                style={{width:"100%"}}
                                                                labelId="demo-simple-select-placeholder-label-label"
                                                                id="demo-simple-select-placeholder-label"
                                                                value={this.state.fiduciaire.domaine3}
                                                                onChange={(e)=>{this.handleChangeFiduciaire(e,'domaine3')}}
                                                                displayEmpty
                                                            >

                                                                <MenuItem value="">
                                                                    <em>VIDE</em>
                                                                </MenuItem>
                                                                <MenuItem value={1}>COMPTABILITÉ</MenuItem>
                                                                <MenuItem value={2}>SALAIRES</MenuItem>
                                                                <MenuItem value={3}>TVA</MenuItem>
                                                                <MenuItem value={4}>IMPOTS</MenuItem>


                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div>
                                                        <FormControl className="w-100" >
                                                            <InputLabel style={{fontSize:"100%"}} id="demo-mutiple-chip-label">Les spécialités recherchées-3 </InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-chip-label"
                                                                id="demo-mutiple-chip"
                                                                multiple
                                                                value={this.state.fiduciaire.specialite3}
                                                                onChange={(e)=>{this.handleChangeSpecialitéFiduciaire(e,"specialite3")}}
                                                                input={<Input id="select-multiple-chip" />}
                                                                renderValue={(selected) => (
                                                                    <div style={{display: 'flex',flexWrap: 'wrap'}} >
                                                                        {selected.map((value) => (
                                                                            <Chip style={{margin:"2%"}}  key={value} label={value}  />
                                                                        ))}
                                                                    </div>
                                                                )}

                                                            >
                                                                { this.state.fiduciaire.domaine3===1 &&

                                                                comptabilite.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                                { this.state.fiduciaire.domaine3===2 &&

                                                                salaire.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }
                                                                { this.state.fiduciaire.domaine3===4 &&

                                                                impot.map((name) => (
                                                                    <MenuItem  key={name} value={name} >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))
                                                                }

                                                            </Select>
                                                        </FormControl>
                                                    </div>



                                                </div>


                                            </div>
                                            <div align="center" style={{marginTop:"2%"}} >
                                                <a href="/salles/abonnement/marketplace/societes">
                                                <Button onClick={()=>this.setState({step1:false,step2:true})}  style={{width:"15%", backgroundColor:"#007acc"}} disabled={this.state.fiduciaire.domaine1===""}  className="btn btn-primary" >Suivant</Button>
                                                </a>
                                                <div>
                                                    <small>ou appuyez sur <text className="font-weight-bold">Entrée</text></small>
                                                </div>
                                            </div>

                                        </div>



                                    </div>


                                    }








                                </div>


                            </div>

                        </Suspense>


                    </Container>
                </div>







            </div>


        )
    }

}

export default sallesMarketplace;