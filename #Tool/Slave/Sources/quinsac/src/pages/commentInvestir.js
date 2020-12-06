import React, {Component, Suspense} from "react";
import Topbar from "../components/Menu/Topbar";
import Loader from "../components/Loader";
import invListImg from "../assets/images/invList.PNG"
import grrenimg from "../assets/images/green.svg";
import estateimg from "../assets/images/estate.svg";


const loading = () => <Loader/>;


class commentInvestir extends Component {

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

    }



    render() {
        return(
            <div className="app center-menu" style={{backgroundColor:"#fff"}}>
                <header id="topnav" >
                    <Suspense fallback={loading()}>
                        <Topbar props={this.props} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper" style={{padding:"72px 0px 0px"}}>
                    <div className="row" style={{backgroundColor:"#FFF"}}>

                        <div className="col-lg-12">

                            <div className="customImageCommentInvCard">
                                <div className="text-center" style={{padding:"5rem 1.875rem"}}>
                                    <h1>
                                        Le financement participatif, comment ça marche ?
                                    </h1>
                                    <p style={{fontSize:"1.26rem",lineHeight:1.6,color:"#fff",marginTop:40}}>
                                        Retrouvez toutes les informations pour investir dans les projets sélectionnés par LePerray.
                                    </p>

                                    <a className="lendo_button mt-3 font-weight-bold" href="/login">Je m'inscris</a>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <div className="text-center" style={{padding:"2.5rem 2.6rem",marginTop:70}}>
                                <h1 className="font-weight-bold" style={{fontSize:"2.8rem"}}>
                                    Comment investir dans un projet ?
                                </h1>
                                <a className="lendo_button mt-3 font-weight-bold" href="">Je découvre les projets</a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img alt="" className="ml-5" src={invListImg} style={{width:"80%"}}/>
                        </div>
                    </div>

                    <div align="center">
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div align="center" className="invBlock" >
                                    <div style={{height:70,backgroundColor:"#000",width:7,marginTop:105}}/>
                                    <h2 className="mt-1 font-weight-bold text-center" style={{fontSize:"2.78rem",lineHeight:1.2}}>Investissez<br/>
                                        dans le secteur<br/>
                                        de l'économie réelle</h2>
                                    <div className="mt-3" style={{height:70,backgroundColor:"#000",width:7}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mt-3">
                                <img className="mt-3"   src={grrenimg} style={{background: "rgb(202, 244, 254) none repeat scroll 0% 0%",width:"80%"}}/>
                                <h3 className="mt-3 font-weight-bold">Énergies renouvelables</h3>
                                <p style={{fontSize:"0.988rem",lineHeight:1.6,color:"#000"}} className="mt-2">
                                    Prenez part à la transition énergétique en finançant des projets d'énergies renouvelables développés par des entreprises spécialistes du secteur.
                                </p>
                                <button type="button" onClick={() => this.props.history.push("/acceuil/energies-renouvelables")}
                                        className="btn btn-lg btn-outline-info btn-rounded waves-effect waves-light font-weight-bolder mb-2">
                                    Je découvre
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default commentInvestir;
