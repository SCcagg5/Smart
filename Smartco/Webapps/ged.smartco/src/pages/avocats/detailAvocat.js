import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/fr'
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import SideBar from "../../components/SideBar/SideBar";
import dataC from "../../data/data";
moment.locale('fr');


class detailAvocat extends Component {



    state = {
        showDetail: false,
        events: [],
        avocat: "",
        error: '',
        selectedSieMenuItem: "avocat",
        openSideMenu: false,
        showSecondSideBar: false,
    };


    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.push('/avocats');
        } else {
            this.setState({avocat: this.props.location.state.avocat})
        }
    }

    render() {


        /*let data="https://calendly.com/jawher-zairi?name=" +
            localStorage.getItem('username')+"&email=" +
            localStorage.getItem('email')+"&a1=RDV téléphonique pour la finalisation d’un plan de stock option pour Monsieur "+
            localStorage.getItem('FNbeneficaire')+
            " "+localStorage.getItem('LNbeneficaire') +
            ". Ci-dessous le lien du document à discuter" +
            "  "+localStorage.getItem('docURL');*/

        /*let data = "https://calendly.com/smartco_calendar?full_name=JeanHuguesLauret&email=jhlauret@yopmail.com&a1=" +
            "Réunion avec Zoom pour la finalisation d’un plan de stock option pour " +
            "Monsieur Babba Amine\r" + " Lien du document:\r "+" http://51.158.97.220:3002/api/creationBSASuisseGET/DBP60xIusEcul000TBtXlpG9wX93Suisse/0/0"*/

        /*let data = "https://www.vyte.in/smartCo/30?embed";*/


        return (

            <div>

                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={dataC.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={dataC.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>
                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>

                    <a href="" style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                       onClick={() => this.props.history.goBack()}
                       className="float-right text-info">Retour</a>
                    <h4 className="mt-0 mb-2">
                        Détails
                    </h4>

                    {
                        this.state.avocat !== "" &&
                        <div className="row">

                            <div className="col-lg-3 col-xl-3">
                                <div className="card-box text-center">
                                    <img src={this.state.avocat.imageUrl || defaultAvatar }
                                         className="rounded-circle avatar-lg img-thumbnail"
                                         alt="profile-image"/>

                                    <h4 className="mb-0">{this.state.avocat.prenom + ' ' + this.state.avocat.nom}</h4>
                                    <p className="text-muted">{this.state.avocat.specialite} </p>

                                    <div className="text-left mt-3">
                                        <h4 className="font-13 text-uppercase">Aparté :</h4>
                                        <p className="text-muted font-13 mb-3">
                                            {this.state.avocat.aparte}
                                        </p>
                                        <p className="text-muted mb-2 font-13"><strong>Langues :</strong>
                                            <span className="ml-2">{this.state.avocat.langues} </span></p>

                                        <p className="text-muted mb-2 font-13"><strong>Numéro de téléphone
                                            :</strong><span className="ml-2">{this.state.avocat.phone}</span></p>

                                        <p className="text-muted mb-2 font-13"><strong>Email :</strong>
                                            <span className="ml-2 ">{this.state.avocat.email}</span></p>

                                        <p className="text-muted mb-1 font-13"><strong>Pays :</strong>
                                            <span className="ml-2">France</span></p>
                                    </div>

                                    <ul className="social-list list-inline mt-3 mb-0">
                                        <li className="list-inline-item">
                                            <a href=""
                                               className="social-list-item border-primary text-primary"><i
                                                className="mdi mdi-facebook"/></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href=""
                                               className="social-list-item border-danger text-danger"><i
                                                className="mdi mdi-google"/></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href=""
                                               className="social-list-item border-info text-info"><i
                                                className="mdi mdi-twitter"/></a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href=""
                                               className="social-list-item border-secondary text-secondary"><i
                                                className="mdi mdi-github-circle"/></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-9 col-xl-9" style={{minHeight:1000,height:1000}}>
                                    {/*<iframe
                                        src={data}
                                        height="100%"
                                        width="100%"
                                        frameBorder="0"/>*/}
                            </div>
                        </div>

                    }

                </div>



            </div>


        )
    }

}

export default detailAvocat;
