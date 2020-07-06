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

import  car from "../../../../../../assets/images/car.png"
import TopBar from "../../../../../../components/TopBar/TopBar";
import logo from "../../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import data from "../../../../../../data/data";
import SideBar from "../../../../../../components/SideBar/SideBar";



class transportTypeofBond extends Component {


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

                                    <h4 className="mt-0 mb-1">Transport Type of Bond issuance / Asset type </h4>
                                    <a>Green Bonds Issuance with CLIMATE BOND’s taxonomy  </a>


                                    <table   className="table table-centered table-bordered mb-0" bgcolor="#B9D9D8"  style={
                                        {marginTop : "5%" }}
                                    >
                                        <thead >
                                        <tr bgcolor="#55AEB2" >

                                            <th colSpan="7" ><p className="font-weight-bold" style={{fontSize:"200%"}}>Transport</p></th>

                                        </tr>
                                        <tr bgcolor="#7CBFBF">
                                            <th colSpan="7"> Passenger, freight & supporting infrastructure</th>
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
                                            <th scope="row" rowSpan="7" >
                                                <div align="center">
                                                    <text > PRIVATE PASSENGER TRANSPORT </text>
                                                </div >
                                                <div align="center" style={{marginTop:"2%"}}>
                                                    <img style={{width:120,height:120,maxheight:120}} src={car}/>

                                                </div>
                                            </th>



                                            <td rowSpan="4">
                                                <text>Vehicles</text>
                                            </td>
                                            <td>
                                                <text>Electric passenger & freight vehicles</text>


                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"green"}}></i>


                                            </td>
                                            <td >

                                            </td>

                                            <td align="center">
                                                <img src={check}/>
                                            </td>
                                            <td>
                                                <i  style={{cursor:'pointer'}} onClick={() =>
                                                {this.props.history.push("/gestion/entreprises/operations/emissionTitres/5",{entreprise:this.state.entreprise})}}>
                                                    <img src={right} />
                                                </i>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td >
                                                <text>Hydrogen passenger & freight vehicles </text>

                                            </td>

                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"green"}}></i>

                                            </td>
                                            <td>
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
                                                <text>Other passenger vehicules , e.g.hybrid vehicles</text>


                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td >
                                                <text>
                                                    Vehicle meets universal gCO2/p-km (passenger per kilometre) threshold
                                                    based on IEA Mobility Model data
                                                </text>

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

                                            <td >
                                                <text>Other freight vehicules , e.g.hybrid vehicles</text>



                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td >
                                                <text> Vehicle meets universal gCO2/p-km (tonne per kilometre) threshold
                                                    based on IEA Mobility Model data </text>

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
                                                <text>Supply chain facilities</text>
                                            </td>
                                            <td>
                                                Dedicated manufacturing facilities for vehicles and key components,
                                                such as batteries, being used in eligible vehicles
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td>

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
                                                <text>Infrastructure </text>
                                            </td>
                                            <td>
                                                <text>Dedicated charging and alternative fuel infrastructure
                                                    (when separate from fossil fuel filling stations and garages)
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"green"}}></i>

                                            </td>
                                            <td>

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
                                                <text> New roads , road bridges , road upgrades , parking facilities ,fossil</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"red"}}></i>

                                            </td>
                                            <td>

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
                                            <th scope="row" rowSpan="6">
                                                <text>CROSS CUTTING</text>
                                            </th>
                                            <td rowSpan="6">

                                            </td>
                                            <td>
                                                <text>ICT that improves asset utilisation, flow and modal
                                                    shift , regardless of trasport mode (public transport information
                                                    , car-sharing schemes, smart cards , road charging systems,etc</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color:"#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="6">
                                                <text>Must deliver substantial GHG emissions savings
                                                    on either a passenger/km or a tonne/km basis</text>
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
                                                <text>Intermodal freight facilities</text>
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
                                                <text>Terminals to improve journey times</text>
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
                                                <text>Smart freight logistics</text>
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
                                                <text>Multi-modal logistics hubs</text>
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
                                                <text>Integration of transport and urban development planning</text>
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

export default transportTypeofBond;