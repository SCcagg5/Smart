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






class immobilier extends Component {


    slider = {};

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            projectsImmo: [],
        };
    }


    componentWillMount() {
        window.scrollTo(0, 0)
        firebase.database().ref('/projects').on('value', (snapshot) => {
            const projects = snapshot.val() || [];
            let arrayOfProjects = Object.values(projects);
            let projectsImmo = [];
            arrayOfProjects.map((item,key) => {
                item.type === "immobilier" && projectsImmo.push(item)
            });
            this.setState({projectsImmo:projectsImmo})

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
                    breakpoint: 1000,
                    settings: {
                        dots: false,
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

                            <div className="customImageCardImmo">
                                <div style={{padding:"5rem 1.875rem"}}>
                                    <h1 style={{fontSize:"2.88rem",lineHeight:1.2,fontWeight:900,letterSpacing:"0.01rem",color:"#fff"}}>
                                        Investissez dans l’immobilier en quelques clics
                                    </h1>
                                    <div style={{height:5,backgroundColor:"#fff",width:30,marginTop:10}}/>
                                    <p style={{fontSize:"1.26rem",lineHeight:1.6,color:"#fff",marginTop:40}}>
                                        Placez votre épargne aux côtés d’opérateurs immobiliers pour développer leurs projets et percevez des intérêts compris entre 6 % et 11 % bruts annuels*.
                                    </p>
                                    <a className="lendo_button mt-3" href="/login">S'identifier</a>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6" >

                            <div style={{marginLeft:"16%",marginTop:70,marginRight:"10%"}}>

                                <h2 style={{fontSize:"1.40rem",lineHeight:1.2}} className="font-weight-bold">
                                    Découvrez les projets Immobilier dans lesquels vous pouvez investir.
                                </h2>

                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000",marginTop:25}} >
                                    L’offre immobilier de LePerray permet à des particuliers de participer aux tours de table d’opérations
                                    immobilières (promotion, lotissement, marchands de biens) à partir de seulement 100 €. Ce marché, auparavant
                                    réservé aux investisseurs institutionnels et aux particuliers fortunés, est désormais accessible à tous grâce
                                    au crowdfunding immobilier.
                                </p>
                                <p style={{fontSize:"1rem",lineHeight:1.6,color:"#000",marginTop:15}} >
                                    Sur notre plateforme, vous choisissez les opérateurs auprès desquels vous souhaitez
                                    placer votre épargne ainsi que la typologie de l’opération (résidentiel, bureau, commercial, hôtellerie…).
                                </p>

                                <h2 style={{fontSize:"1.40rem",lineHeight:1.2,marginTop:25}} className="font-weight-bold">
                                    Investir dans l’immobilier : les 3 points clés
                                </h2>
                                <ul style={{marginTop:15}}>
                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un investissement concret
                                        </h2>
                                        <p>
                                            Ce n’est pas par hasard si 70 % des Français ont déclaré privilégier l’immobilier
                                            pour le placement de leur épargne. En effet, son caractère tangible et concret séduit les investisseurs.
                                        </p>
                                    </li>

                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Un marché français en pleine croissance
                                        </h2>
                                        <p>
                                            Afin de combler la pénurie qui existe en France, le gouvernement a fixé l’objectif
                                            de produire 500 000 logements par an. Le crowdfunding permet d’accompagner les promoteurs
                                            immobiliers qui vont mobiliser de plus en plus de fonds propres pour atteindre ces volumes.
                                        </p>
                                        <p>
                                            Le marché des bureaux n’est pas en reste avec une croissance soutenue ces dernières années et
                                            des besoins des entreprises de plus en plus importants (notamment en lien avec le développement des grandes métropoles et le Brexit).
                                        </p>
                                        <p>
                                            Enfin, les nouveaux usages (coworking, coliving…) entraînent le renouvellement d’une partie du parc immobilier français qui est porté par les promoteurs.
                                        </p>
                                    </li>

                                    <li>
                                        <h2 style={{fontSize:"1.0rem",lineHeight:1.2}} className="font-weight-bold">
                                            Une source de diversification pour les investisseurs particuliers
                                        </h2>
                                        <p>
                                            LePerray a intégré l’immobilier à sa gamme de projets d’investissement participatif pour donner l’opportunité à
                                            la communauté d’investisseurs de se constituer un portefeuille le plus large possible.
                                        </p>
                                        <p>
                                            Au sein même de cette catégorie, la diversité des sous-jacents est également présente : différentes localisations,
                                            typologies de projet (logements, bureaux, commerces, logistique) et nature de projet (promotion, restructuration, aménagement, lotissement).
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
                                                    this.state.projectsImmo.map((item,key) => (
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

export default immobilier;