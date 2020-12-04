import React, {Component, Suspense} from "react";
import Topbar from "../../components/Menu/Topbar";
import {Button, Container} from "reactstrap";
import Loader from "../../components/Loader";
import coverImg from "../../assets/images/cover.jpg"
import firebase from "firebase/app";
import "firebase/database"
import moment from "moment";
import riskimg from "../../assets/images/risk.svg"
import grrenimg from "../../assets/images/green.svg"
import estateimg from "../../assets/images/estate.svg"
import Slider from "react-slick";
import Marker from '../../components/Marker';
import GoogleMap from '../../components/GoogleMaps';
/*import { Widget, addResponseMessage  } from '../../customComponents/chat-widget/index';
import 'react-chat-widget/lib/styles.css';*/
import bot from "../../assets/images/bot.jpg"

const loading = () => <Loader/>;




class lastProjects extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showAlert: true,
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            projects: [],
            lastFiveProjects: [],
            places: [],
            clickedMarker:"",

            messageSended:"",
            messageResponse:""
        };
        this.marker={}
    }


    componentWillMount() {
        window.scrollTo(0, 0);
        firebase.database().ref('/projects').on('value', (snapshot) => {
            const projects = snapshot.val() || [];
            let arrayOfProjects = Object.values(projects);
            this.setState({projects: Object.values(projects), lastFiveProjects: arrayOfProjects})
        }, err => {
            console.log(err)
        });

       /* setTimeout(() => {
            addResponseMessage("Bonjour, je suis Paul");
            this.setState({messageResponse: "Bonjour, je suis Paul"});

            setTimeout(() => {
                addResponseMessage("Je vais vous aider à trouver un installateur en quelques secondes");
                this.setState({messageResponse: "Je vais vous aider à trouver un installateur en quelques secondes"})

                setTimeout(() => {
                    addResponseMessage("Vous êtes prêt ?");
                    this.setState({messageResponse: "Vous êtes prêt ?"})
                },500);

            },500);

        },1000);*/
    }

    /*handleNewUserMessage = (newMessage) => {
        //console.log(newMessage);
        this.setState({messageSended:newMessage});
        // Now send the message throught the backend API
        setTimeout(() => {
            addResponseMessage("Bonjour");
        },500);

    }*/



    getMapBounds = (map, maps, places) => {
        const bounds = new maps.LatLngBounds();

        this.state.projects.forEach((place) => {
            bounds.extend(new maps.LatLng(
                place.lat,
                place.lng,
            ));
        });
        return bounds;
    };
    bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

    apiIsLoaded = (map, maps, places) => event => {
        // Get bounds by our places
        const bounds = this.getMapBounds(map, maps, places);
        // Fit map to bounds
        map.fitBounds(bounds);
        // Bind the resize listener
        this.bindResizeListener(map, maps, bounds);
    };


    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            swipeToSlide: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        dots: false,
                        infinite: true,
                        speed: 500,
                        swipeToSlide: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        dots: false,
                        speed: 500,
                        swipeToSlide: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        dots: false,
                        speed: 500,
                        swipeToSlide: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        };
        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding: "72px 0px 0px"}}>
                    {
                        this.state.showAlert && localStorage.getItem("isProfilCompleted") === "false" &&
                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                            <button type="button" className="close" style={{top: "auto"}} data-dismiss="alert"
                                    aria-label="Close" onClick={() => this.setState({showAlert: false})}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="text-center">
                                <p className="customAlert">Pour investir dans l'ensemble des projets,
                                    <a onClick={() => this.props.history.push("/signup/investisor/step1")} style={{
                                        color: "#19b4fa",
                                        textDecoration: "underline",
                                        cursor: "pointer"
                                    }}> complétez votre profil.</a></p>
                            </div>
                        </div>
                    }
                    <div className="card card-inverse text-white">
                        <img className="card-img img-fluid" style={{backgroundSize: "cover", minHeight: 500}}
                             src={coverImg}/>
                        <div className="card-img-overlay">
                            <div className="ml-lg-5 mr-lg-5">
                                <div className="text-center">
                                    <h1 className="text-white font-weight-bolder img-header-title"
                                        style={{marginTop: "4%"}}>
                                        Investissez dans l'économie réelle grâce au financement participatif.</h1>
                                    <p className="card-text mr-lg-5 ml-lg-5 img-header-subtitle"
                                       style={{marginTop: "3%"}}>Investissez dans les projets de votre choix.
                                        Suivez vos placements en toute transparence et recevez entre 3 % et 10,5 %
                                        d'intérêts bruts par an*.</p>
                                    <p className="card-text">
                                        <button type="button" style={{padding: "1.1rem 1.5rem", marginTop: "2%"}}
                                                onClick={() => this.props.history.push("/projects")}
                                                className="btn btn-info btn-lg waves-effect waves-light font-weight-bolder">Je
                                            découvre les projets
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-widgets">
                                            </div>
                                            <div className="row mt-4">
                                                <div className="col-md-2">
                                                    <h3 className="header-title mb-0">- Les projets du moment</h3>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="mb-2 mt-2"
                                                         style={{height: 3, backgroundColor: "#000"}}/>
                                                </div>
                                                <div className="col-md-2">
                                                    <button type="button"
                                                            onClick={() => this.props.history.push("/projects")}
                                                            className="btn btn-info btn-sm waves-effect waves-light font-weight-bolder mb-0">Voir
                                                        tous les projets
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div style={{textAlign: "center"}}>
                                        <button onClick={() => this.slider.slickPrev()} type="button"
                                                className="btn btn-micro btn-info waves-effect waves-light"><i
                                            className="mdi mdi-arrow-left"/></button>
                                        <button onClick={() => this.slider.slickNext()} type="button"
                                                className="btn btn-micro btn-info waves-effect waves-light"
                                                style={{marginLeft: "0.2rem"}}><i
                                            className="mdi mdi-arrow-right"/></button>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Slider ref={slider => (this.slider = slider)}  {...settings}>

                                                {
                                                    (this.state.lastFiveProjects || []).map((item, key) => (
                                                        <div className="card-box project-box pointer"
                                                             onClick={() => this.props.history.push("/projects/" + item.uid)}>

                                                            <strong className="mt-0 font-weight-bold" style={{
                                                                fontWeight: 500,
                                                                fontSize: "1rem",
                                                                color: "#000"
                                                            }}>
                                                                <i className="mdi mdi-earth text-info font-weight-bold"></i>&nbsp;
                                                                {item.localisation}
                                                            </strong>
                                                            <p className="text-muted text-uppercase">
                                                                <small
                                                                    className="font-weight-bold text-dark font-18">{item.nom} </small>
                                                            </p>

                                                            <img className="card-img-top img-fluid"
                                                                 src={item.imageFonds}/>

                                                            <div className="badge bg-soft-info text-info mb-3">Green
                                                            </div>

                                                            <p className="mb-2 font-weight-bold text-dark">Progression:<span
                                                                className="float-right text-info">{((parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100).toFixed(2)} %</span>
                                                            </p>
                                                            <div className="progress mb-1"
                                                                 style={{height: "3px", backgroundColor: "#F0F0F0"}}>
                                                                <div className="progress-bar"
                                                                     role="progressbar" aria-valuenow="68"
                                                                     aria-valuemin="0"
                                                                     aria-valuemax="100"
                                                                     style={{
                                                                         width: (parseInt(item.montantFinance) / parseInt(item.montantAfinancer)) * 100 + "%",
                                                                         backgroundColor: "#19b4fa"
                                                                     }}>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3"
                                                                 style={{height: 1, backgroundColor: "#F0F0F0"}}/>
                                                            <div className="row mb-0">
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">{item.nb_investisor} </h6>
                                                                    <h6 className="text-grey-1 text-center">Investisseurs</h6>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">
                                                                        {moment(item.date_deadline).diff(moment(), 'days')} j</h6>
                                                                    <h6 className="text-grey-1 text-center">restants</h6>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h6 className="text-info font-weight-bolder text-center">{item.montantFinance} €</h6>
                                                                    <h6 className="text-grey-1 text-center">sur {item.montantAfinancer} €</h6>
                                                                </div>
                                                            </div>


                                                            <div className="mt-3"
                                                                 style={{height: 1, backgroundColor: "#F0F0F0"}}/>

                                                        </div>
                                                    ))
                                                }

                                            </Slider>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div style={{ height: '80vh', width: '100%' }}>
                                                <GoogleMap
                                                    defaultZoom={13}
                                                    defaultCenter={[48.694250, 1.853910]}
                                                    yesIWantToUseGoogleMapApiInternals={true}
                                                    onGoogleApiLoaded={({map, maps}) => this.apiIsLoaded(map, maps, this.state.projects)}
                                                >
                                                    {this.state.projects.map(place => (
                                                        <Marker
                                                            onClick={() => {
                                                                if(this.state.clickedMarker === ""){
                                                                    this.setState({clickedMarker:place.uid})
                                                                }else{
                                                                    this.setState({clickedMarker:""})
                                                                }
                                                            }}
                                                            image={place.imageFonds}
                                                            key={place.uid}
                                                            text={place.nom}
                                                            lat={place.lat}
                                                            lng={place.lng}
                                                            show={place.uid === this.state.clickedMarker}
                                                            infoTitle={place.nom}
                                                            infoDesc={"Montant d'investissement: "+place.montantAfinancer+" €"}
                                                        />
                                                    ))}
                                                </GoogleMap>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{backgroundColor: "#FFF", width: "100%"}}>
                                <div style={{textAlign: "center"}}>
                                    <img className="mt-3" width={140} src={riskimg}/>
                                    <p className="mt-2" style={{fontSize: "1.23rem", lineHeight: 1.6, color: "#000"}}>*
                                        Investir présente un risque d'illiquidité et de perte partielle ou totale en
                                        capital.</p>
                                    <p style={{fontSize: "1.23rem", lineHeight: 1.6, color: "#000"}}>Vérifiez vos
                                        capacités financières avant d'investir.</p>
                                    <div className="mt-3" style={{
                                        height: "4px",
                                        backgroundColor: "#000",
                                        width: "60px",
                                        marginLeft: "50%",
                                        marginRight: "50%"
                                    }}/>
                                </div>
                                <div align="center">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img className="mt-3" src={grrenimg}
                                                 style={{background: "rgb(202, 244, 254) none repeat scroll 0% 0%"}}/>
                                            <h3 className="mt-3 font-weight-bold">Énergies renouvelables</h3>
                                            <p style={{fontSize: "0.988rem", lineHeight: 1.6, color: "#000"}}
                                               className="mt-2">
                                                Prenez part à la transition énergétique en finançant des projets
                                                d'énergies renouvelables développés par des entreprises spécialistes du
                                                secteur.
                                            </p>
                                            <button type="button"
                                                    onClick={() => this.props.history.push("/acceuil/energies-renouvelables")}
                                                    className="btn btn-lg btn-outline-info btn-rounded waves-effect waves-light font-weight-bolder mb-2">
                                                Je découvre
                                            </button>
                                        </div>
                                        <div className="col-md-4">
                                            <div align="center">
                                                <div style={{
                                                    height: 70,
                                                    backgroundColor: "#000",
                                                    width: 7,
                                                    marginTop: 105
                                                }}/>
                                                <h2 className="mt-1 font-weight-bold text-center"
                                                    style={{fontSize: "2.78rem", lineHeight: 1.2}}>Investissez<br/>
                                                    dans 2 secteurs<br/>
                                                    de l'économie réelle</h2>
                                                <div className="mt-3"
                                                     style={{height: 70, backgroundColor: "#000", width: 7}}/>
                                            </div>

                                        </div>
                                        <div className="col-md-4">
                                            <img className="mt-3" src={estateimg}
                                                 style={{background: "rgb(202, 244, 254) none repeat scroll 0% 0%"}}/>
                                            <h3 className="mt-3 font-weight-bold">Immobilier</h3>
                                            <p className="mt-2"
                                               style={{fontSize: "0.988rem", lineHeight: 1.6, color: "#000"}}>
                                                Accompagnez la création de logements en France, en investissant aux
                                                côtés de promoteurs immobiliers.
                                            </p>
                                            <button type="button"
                                                    onClick={() => this.props.history.push("/acceuil/immobilier")}
                                                    className="btn btn-lg btn-outline-info btn-rounded waves-effect waves-light font-weight-bolder mb-3">
                                                Je découvre
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Suspense>
                    </Container>
                </div>

                {/*<Widget handleNewUserMessage={this.handleNewUserMessage}
                        profileAvatar={bot}
                        title="LePerray Energie"
                        subtitle="Notre service de chatBot"
                        senderPlaceHolder="Taper votre message ici..."
                        messageSended={this.state.messageSended}
                        messageResponse={this.state.messageResponse}
                        handleQuickButtonClicked={(data) => console.log(data)}
                >
                </Widget>*/}

            </div>
        )
    }


}

export default lastProjects