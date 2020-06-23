import React, {Component, Suspense} from "react";
import Topbar from "../../components/Menu/Topbar";
import Loader from "../../components/Loader";
import Slider from "react-slick";
import firebase from "firebase";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import riskimg from "../../assets/images/risk.svg";

const loading = () => <Loader/>;


class energieRenouvelables extends Component {


    slider = {};

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            projectsSolaire: [],
        };
    }


    componentWillMount() {
        window.scrollTo(0, 0)
        firebase.database().ref('/projects').on('value', (snapshot) => {
            const projects = snapshot.val() || [];
            let arrayOfProjects = Object.values(projects);
            let projetSolaire = [];
            arrayOfProjects.map((item,key) => {
                item.type === "solaire" && projetSolaire.push(item)
            });
            this.setState({projectsSolaire:projetSolaire})

        },err => {
            console.log(err)
        });

    }



    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 800,
                    settings: {
                        dots: false,
                        infinite: true,
                        speed: 500,
                        swipeToSlide: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        };
        return(
            <div className="app center-menu">
                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding:"72px 0px 0px"}}>
                    <div className="row" style={{backgroundColor:"#FFF"}}>

                        <div className="col-lg-6">

                            <div className="customImageCard">
                                <div style={{padding:"5rem 1.875rem"}}>
                                <h1 style={{fontSize:"2.88rem",lineHeight:1.2,fontWeight:900,letterSpacing:"0.01rem"}}>
                                    Investir dans les énergies renouvelables
                                </h1>
                                    <div style={{height:5,backgroundColor:"#000",width:30,marginTop:10}}/>
                                    <p style={{fontSize:"1.26rem",lineHeight:1.6,color:"#000",marginTop:40}}>
                                        Placez votre épargne dans des projets d’énergie renouvelables et percevez des intérêts compris entre 4 et 7 % bruts annuels*.
                                    </p>
                                    <a className="lendo_button mt-3" href="/login">S'identifier</a>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6" >

                            <div style={{marginLeft:"16%",marginTop:70,marginRight:"10%"}}>

                                <h2 style={{fontSize:"1.40rem",lineHeight:1.2}} className="font-weight-bold">
                                    Prenez part à la transition énergétique en investissant dans des projets proches de chez vous.
                                </h2>

                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000",marginTop:25}} >
                                    Sur LePerray, financez la construction et l’exploitation d’actifs d’énergie renouvelable (centrales solaires ,
                                    éoliennes, hydroélectrique) en prêtant une partie de votre épargne à des sociétés spécialistes du secteur et prenez part,
                                    à votre manière, à la transition énergétique.
                                </p>
                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000",marginTop:15}} >
                                    Sur notre plateforme, nous sélectionnons et accompagnons des acteurs de référence du marché
                                    dont le métier est la production d’énergie à partir de sources renouvelables (soleil, vent, eau…).
                                </p>

                                <h2 style={{fontSize:"1.40rem",lineHeight:1.2,marginTop:25}} className="font-weight-bold">
                                    Investir dans les énergies renouvelables en 4 points clés
                                </h2>
                                <ul style={{marginTop:15}}>
                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un placement à fort impact
                                        </h2>
                                        <p>
                                            Investissez dans des projets d’énergies renouvelables et prenez activement part à la transition énergétique.
                                        </p>
                                    </li>

                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un placement sécurisé
                                        </h2>
                                        <p>
                                            Optez pour un placement dans la croissance verte avec un rendement sécurisé grâce au
                                            tarif de rachat garanti par EDF sur une période longue (10 à 20 ans).
                                        </p>
                                    </li>

                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un investissement auprès d’acteurs sélectionnés par nos analystes
                                        </h2>
                                        <p>
                                            Accompagnez des développeurs soigneusement sélectionnés par notre équipe et financez
                                            des actifs utilisant des technologies matures dont les performances opérationnelles sont avérées.
                                        </p>
                                    </li>

                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un rendement attractif et diversifié
                                        </h2>
                                        <p>
                                            Choisissez un investissement dont les rendements peuvent varier entre 4 et 7 % bruts annuels*,
                                            et particulièrement indépendant de l’environnement économique.
                                        </p>
                                    </li>

                                </ul>
                                <div className="text-center mb-3">
                                <a className="lendo_button mt-3" href="#">En savoir plus</a>
                                </div>

                            </div>


                            <div className="card">
                                <div className="card-body">
                                    <div style={{textAlign:"center"}}>
                                        <button onClick={() => this.slider.slickPrev()}  type="button" className="btn btn-micro btn-info waves-effect waves-light"><i
                                            className="mdi mdi-arrow-left"/></button>
                                        <button onClick={() => this.slider.slickNext()} type="button" className="btn btn-micro btn-info waves-effect waves-light" style={{marginLeft:"0.2rem"}}><i
                                            className="mdi mdi-arrow-right"/></button>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <Slider ref={slider => (this.slider = slider)}  {...settings}>

                                                {
                                                    this.state.projectsSolaire.map((item,key) => (
                                                        <div className="card-box project-box pointer" onClick={() => this.props.history.push("/projects/"+item.uid)}>

                                                            <strong  className="mt-0 font-weight-bold" style={{fontWeight:500,fontSize:"1rem",color:"#000"}}>
                                                                <i className="mdi mdi-earth text-info font-weight-bold"></i>&nbsp;
                                                                {item.localisation}
                                                            </strong>
                                                            <p className="text-muted text-uppercase">
                                                                <small className="font-weight-bold text-dark font-18">{item.nom} </small></p>

                                                            <img className="card-img-top img-fluid" src={item.imageFonds}/>

                                                            <div className="badge bg-soft-info text-info mb-3">Green</div>

                                                            <p className="mb-2 font-weight-bold text-dark">Progression:<span
                                                                className="float-right text-info">{((parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100).toFixed(2) } %</span></p>
                                                            <div className="progress mb-1" style={{height: "3px",backgroundColor:"#F0F0F0"}} >
                                                                <div className="progress-bar"
                                                                     role="progressbar" aria-valuenow="68" aria-valuemin="0"
                                                                     aria-valuemax="100"
                                                                     style={{width:(parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100+"%"  ,backgroundColor:"#19b4fa"}}>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>
                                                            <div className="row mb-0">
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">{item.nb_investisor} </h6>
                                                                    <h6 className="text-grey-1 text-center">Investisseurs</h6>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">
                                                                        {moment(item.date_deadline).diff(moment(),'days')} j</h6>
                                                                    <h6 className="text-grey-1 text-center">restants</h6>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">{item.montantFinance} €</h6>
                                                                    <h6 className="text-grey-1 text-center">sur {item.montantAfinancer} €</h6>
                                                                </div>
                                                            </div>


                                                            <div className="mt-3" style={{height:1,backgroundColor:"#F0F0F0"}}/>

                                                        </div>
                                                    ))
                                                }

                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div align="center" style={{marginLeft:"10%",marginRight:"10%"}}>
                                <img className="mt-3" width={140} src={riskimg}/>
                                <p className="mt-2" style={{fontSize:"1.23rem",lineHeight:1.6,color:"#000"}}>* Investir présente un risque d'illiquidité et de perte partielle ou totale en capital.</p>
                                <p style={{fontSize:"1.23rem",lineHeight:1.6,color:"#000"}}>Vérifiez vos capacités financières avant d'investir.</p>
                                <div className="mt-3 mb-3" style={{height:"4px",backgroundColor:"#000",width:"60px"}}/>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

export default energieRenouvelables;