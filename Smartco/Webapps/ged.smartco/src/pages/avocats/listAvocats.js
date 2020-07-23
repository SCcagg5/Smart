import React, {Component} from "react";
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import {Link} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/database"
import TopBar from "../../components/TopBar/TopBar";
import logo from "../../assets/images/logos/logo-OA-dark.png";
import SideMenu from "../../components/SideMenu/SideMenu";
import data from "../../data/data";
import SideBar from "../../components/SideBar/SideBar";
import ReactLoading from "react-loading";

class listAvocats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "avocat",
            openSideMenu: false,
            showSecondSideBar: false,
            listAvocats: []
        };
    }

    componentDidMount() {
        this.setState({loading: true})
        firebase.database().ref('/users').on('value', (snapshot) => {
            const users = snapshot.val() || [];
            let usersArray = Object.keys(users).map(i => users[i])
            let avocats = [];
            for (let i = 0; i < usersArray.length; i++) {
                if (usersArray[i].role === "avocat") avocats.push(usersArray[i]);
            }
            this.setState({listAvocats: avocats, loading: false})
        });
    }


    render() {
        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu:true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>

                {
                    this.state.loading === true ?
                        <div className="centered-text">
                            <ReactLoading type={"bars"} color={"red"}/>
                        </div> :
                        <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>
                            <h4 className="mb-3" style={{marginTop: 20}}>Avocats</h4>
                            <div className="row">
                                <div className="col-xl-10 order-xl-1 order-2">
                                    {
                                        this.state.listAvocats.map((item, key) => (

                                            <div className="card-box mb-2" key={key}>
                                                <div className="row align-items-center">
                                                    <div className="col-sm-5">
                                                        <div className="media">
                                                            <img
                                                                className="d-flex align-self-center mr-3 rounded-circle"
                                                                src={item.imageUrl || defaultAvatar}
                                                                alt="" height="64"/>
                                                            <div className="media-body">
                                                                <h4 className="mt-0 mb-2 font-16">{item.nom + " " + item.prenom} </h4>
                                                                <p className="mb-1"><b>Langues:</b>{item.langues} </p>
                                                                <p className="mb-0"><b>Spécialité:</b>{item.specialite}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <p className="mb-1 mt-3 mt-sm-0"><i
                                                            className="mdi mdi-email mr-1"/> {item.email}
                                                        </p>
                                                        <p className="mb-0"><i
                                                            className="mdi mdi-phone-classic mr-1"/> {item.phone}</p>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <div className="text-center mt-3 mt-sm-0">
                                                            <div
                                                                className="badge font-13 bg-soft-success text-success p-1">
                                                                Tarif:&nbsp;{item.tarif + "€/h"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-1">
                                                        <div className="text-sm-right text-center mt-2 mt-sm-0">
                                                            <Link
                                                                to={{pathname: "/detailAvocats", state: {avocat: item}}}
                                                                className="actiondetails-icon" aria-expanded="true">
                                                                <i className="mdi mdi-arrow-right-bold-circle"
                                                                   style={{fontSize: 35}}/>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }


                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }

}

export default listAvocats;