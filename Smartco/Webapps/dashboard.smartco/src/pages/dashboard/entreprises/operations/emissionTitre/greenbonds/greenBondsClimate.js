import React, {Component, Suspense} from "react";
import "firebase/database"
import fabienImg from "../../../../../../assets/images/avocats/fabian.png";
import alexImg from "../../../../../../assets/images/avocats/alex.jpg";
import keplerImg from "../../../../../../assets/images/avocats/aKapeller.jpg";
import Loader from "../../../../../../components/Loader";
import {Container} from "reactstrap";
import TopBar from "../../../../../../components/TopBar/TopBar";
import logo from "../../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import data from "../../../../../../data/data";
import SideBar from "../../../../../../components/SideBar/SideBar";

const Topbar = React.lazy(() => import("../../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../../components/Navbar"));
const loading = () => <Loader/>;
const operationsList = [
    {
        title:"Energy Type of Bond issuance ",
        desc:'',
        name:'',
        id:1
    },
    {
        title:"Transport  Type of Bond issuance",
        desc:'',
        name:'',
        id:2
    },
    {
        title:"Water type of Bond Issuance",
        desc:'',
        name:'',
        id:3
    },
    {
        title:"Building  type of Bond Issuance",
        desc:'',
        name:'',
        id:4
    },
    {
        title:"Land & Marine use type of issuance",
        desc:'',
        name:'',
        id:5
    },
    {
        title:"Industry type of green Bond issuance",
        desc:'',
        name:'',
        id:6
    },
    {
        title:"Waste and pollution control",
        desc:'',
        name:'',
        id:7
    },
    {
        title:"Information & Communication technology type of bond issuance",
        desc:'',
        name:'',
        id:8
    },



];

class greenBondsClimate extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            entreprise:""
        };
    }

    componentDidMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({entreprise: this.props.location.state.entreprise})
        }
    }


    render() {
        return (
            <div>
                <TopBar logo={logo} height={90} onClickMenuIcon={() => this.setState({openSideMenu: true})}/>
                <SideMenu logo={logo} items={data.sideBarItems} iconColor={"blue"} textColor={"#65728E"}
                          history={this.props.history}
                          opened={this.state.openSideMenu} onClose={() => this.setState({openSideMenu: false})}/>
                <SideBar items={data.sideBarItems} width={100} selectedItem={this.state.selectedSieMenuItem}
                         activeColor={"blue"} disabledColor={"#65728E"}
                         updateSelected={(item) => this.setState({selectedSieMenuItem: item})}
                         history={this.props.history}/>
                <div style={{paddingLeft:"10%",marginRight:50,marginTop:50}}>
                    <div className="row" style={{marginTop: 35}}>
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-body ">
                                    <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                       onClick={()=>this.props.history.goBack()} className="float-right text-info">Retour</a>
                                    <h4 className=" mt-0 mb-3">Green Bonds CLIMATE BONDS (CB )taxonomy</h4>
                                    <ul className="list-unsyled m-0 pl-0 transaction-history">
                                        {
                                            operationsList.map((item,key) => (
                                                <li className="align-items-center d-flex justify-content-between itemOp">
                                                    <div className="media">
                                                        <div className="media-body align-self-center">
                                                            <div className="transaction-data">
                                                                <h5 style={{color:"#000",lineHeight:"1.8rem"}} className="m-0">{item.title} </h5>
                                                                <p className="text-muted mb-0">{item.desc} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*<div className="transaction-icon">
                                                                <i className="mdi mdi-arrow-right-thick" style={{cursor:'pointer'}} onClick={goTo(item.name)}></i>
                                                            </div>*/}
                                                    <div className="transaction-icon">
                                                        <i className="mdi mdi-arrow-right-thick" style={{cursor:'pointer'}}
                                                           onClick={
                                                               item.id === 1 ? () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Energy", {entreprise: this.state.entreprise}) :
                                                                   item.id === 2 ? () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Transport", {entreprise: this.state.entreprise}) :
                                                                       item.id === 4 ? () => this.props.history.push("/gestion/entreprises/operations/emissionTitres/CreationGreenBonds/GreenBondsCLimate/Building", {entreprise: this.state.entreprise}) : () => {}
                                                           }
                                                        />
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-3">
                            <li className="task-info" id="task7" onClick={()=>{
                                this.props.history.push("/avocats")
                            }}
                                style={{
                                    border: "1px solid #dee2e6",
                                    padding: 20,
                                    marginBottom: 15,
                                    borderRadius: 3,
                                    cursor: "pointer"
                                }}>
                                <span className="badge bg-soft-danger text-danger float-right"> -> </span>
                                <h5 className="mt-0">
                                    <a href="" className="text-dark">Vous avez des questions ?</a>
                                </h5>
                                <p>Vous pouvez prendre rendez-vous avec l'un de nos avocats </p>
                                <div className="clearfix"/>
                                <div className="row">
                                    <div className="col">
                                        <p className="font-13 mt-2 mb-0">
                                                    <span
                                                        className="badge bg-soft-success text-success">Disponnible</span>
                                        </p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="text-right">
                                            <a href="" className="text-muted">
                                                <img src={fabienImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                            <a href="" className="text-muted">
                                                <img src={alexImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                            <a href="" className="text-muted">
                                                <img src={keplerImg}
                                                     alt="task-user"
                                                     className="avatar-sm img-thumbnail rounded-circle"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default greenBondsClimate;