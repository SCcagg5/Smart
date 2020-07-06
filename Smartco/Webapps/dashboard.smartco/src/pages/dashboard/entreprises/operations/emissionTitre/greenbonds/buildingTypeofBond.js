import React, {Component, Suspense} from "react";
import "firebase/database"
import fabienImg from "../../../../../../assets/images/avocats/fabian.png";
import alexImg from "../../../../../../assets/images/avocats/alex.jpg";
import keplerImg from "../../../../../../assets/images/avocats/aKapeller.jpg";
import Loader from "../../../../../../components/Loader";
import {Container} from "reactstrap";
import france from "../../../../../../assets/images/flags/france.png";
import suisse from "../../../../../../assets/images/flags/suisse.png";
import tunisie from "../../../../../../assets/images/flags/tunisie.png";
import check from "../../../../../../assets/images/check.png"
import soleil from "../../../../../../assets/images/soleil.png"
import  right from "../../../../../../assets/images/right.png"

import  building from "../../../../../../assets/images/building.png"
import TopBar from "../../../../../../components/TopBar/TopBar";
import logo from "../../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import data from "../../../../../../data/data";
import SideBar from "../../../../../../components/SideBar/SideBar";





const Topbar = React.lazy(() => import("../../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../../components/Navbar"));
const loading = () => <Loader/>;


class buildingTypeofBond extends Component {


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
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body ">
                                    <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                       onClick={()=>this.props.history.goBack()} className="float-right text-info">Retour</a>

                                    <h4 className=" mt-0 mb-1">Building Type of Bond issuance / Asset type </h4>
                                    <a>Green Bonds Issuance with CLIMATE BOND’s taxonomy  </a>


                                    <table   className="table table-centered table-bordered mb-0" bgcolor="#F9D5B1"  style={
                                        {marginTop : "5%" }}
                                    >
                                        <thead >
                                        <tr bgcolor="#EFA05E" >

                                            <th colSpan="7" ><p className="font-weight-bold" style={{fontSize:"200%"}}>Building</p></th>

                                        </tr>
                                        <tr bgcolor="#F4B77F">
                                            <th colSpan="7"> Commercial, residential & energy efficiency</th>
                                        </tr>

                                        <tr>
                                            <th>

                                            </th>
                                            <th scope="col">
                                                <text>Asset type</text>
                                            </th>
                                            <th scope="col" >
                                                <text>Asset specifics </text>
                                            </th>
                                            <th scope="col">
                                                <text>2 degree compilant</text>
                                            </th>
                                            <th scope="col">
                                                <text>Screening indicator</text>
                                            </th>
                                            <th scope="col">
                                                <text>Certifiable</text>
                                            </th>

                                        </tr>
                                        </thead>


                                        <tbody background-color="#B9D9D8">

                                        <tr>
                                            <th scope="row" rowSpan="6">
                                                <div>
                                                    <text>BUILDINGS</text>
                                                </div>
                                                <div style={{marginTop : "5%"}}>
                                                    <img style={{height:120,width:120,maxHeight:120}} src={building}/>
                                                </div>

                                            </th>
                                            <td>
                                                <text>Comercial buildings</text>
                                            </td>
                                            <td>
                                                <text>Including offices , hotels , retail
                                                    buildings , public buildings, edicational buildings
                                                    healthcare buildings etc.</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="3">
                                                <div>
                                                    <text>An emissions footprint in the top 15% of emissions
                                                        performance in the local market
                                                    </text>
                                                </div>
                                                <div>
                                                    <text>OR</text>

                                                </div>
                                                <div>
                                                    <text>A substantial reduction in gCO2/m2 because of
                                                        upgrade fo retrofit</text>
                                                </div>
                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>
                                            <td rowSpan="2">
                                                <text>Residential buildings</text>
                                            </td>
                                            <td>
                                                <text>Private dwellings</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>

                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>


                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Multifamily residential buildings</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>

                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>
                                            <td rowSpan="3">
                                                <text> Other building types</text>

                                            </td>
                                            <td>
                                                <text>Data centres</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <text>See ICT(pg. 16)</text>
                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Stations and related buildings
                                                    for eligible transport</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <text>See Transport (pg.7)</text>
                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                <text>Industrial buildings</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <text>See Transport (pg.7)</text>
                                            </td>
                                            <td align="center">

                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>
                                            <th scope="row" rowSpan="2">
                                                <text>PRODUCTS AND SYSTEMS FOR BUILDING
                                                    EFFICIENCY</text>
                                            </th>
                                            <td>
                                                <text>Energy efficiency</text>
                                            </td>
                                            <td>
                                                <text>Facilities dedicated to manufacturing
                                                    energy efficient components</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="2">
                                                <text> See Industry (pg.14)</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                <text>Low carbon building materials</text>
                                            </td>
                                            <td>
                                                <text>Low carbon and alternative building
                                                    materials such as alternatives to cement and
                                                    concrete</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>

                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}}>
                                                    <img src={right} />
                                                </i>


                                            </td>


                                        </tr>













                                        </tbody>
                                    </table>






                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        )
    }

}

export default buildingTypeofBond;