import React, {Component} from "react";
import "firebase/database"
import Loader from "../../../../../../components/Loader";
import check from "../../../../../../assets/images/check.png"
import soleil from "../../../../../../assets/images/soleil.png"
import right from "../../../../../../assets/images/right.png"
import bioenergy from "../../../../../../assets/images/bioenergy.png"
import transmission from "../../../../../../assets/images/transmission.png"
import TopBar from "../../../../../../components/TopBar/TopBar";
import logo from "../../../../../../assets/images/logos/logoSmartCo.jpeg";
import SideMenu from "../../../../../../components/SideMenu/SideMenu";
import data from "../../../../../../data/data";
import SideBar from "../../../../../../components/SideBar/SideBar";



class createGreenBonds extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            selectedSieMenuItem: "soc",
            openSideMenu: false,
            showSecondSideBar: false,
            entreprise: ""
        };
    }

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };

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
                                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                                       onClick={() => this.props.history.goBack()}
                                       className="float-right text-info">Retour</a>

                                    <h4 className=" mt-0 mb-1">Solar type Bond Issuance / Asset type </h4>
                                    <a>Green Bonds Issuance with CLIMATE BOND’s taxonomy </a>

                                    <table className="table-responsive table table-centered table-bordered mb-0"
                                           bgcolor="#FDE8B3" border-color="red" style={{marginTop: "5%"}}>
                                        <thead>
                                        <tr bgcolor="#F9C754">

                                            <th colSpan="7"><p className="font-weight-bold">ENERGY</p></th>

                                        </tr>
                                        <tr bgcolor="#FFD277">
                                            <th colSpan="7"> ELECTRECITY & HEAT PRODUCTION</th>
                                        </tr>

                                        <tr>
                                            <th>

                                            </th>
                                            <th scope="col">
                                                <text>Asset type</text>
                                            </th>
                                            <th scope="col">
                                                <text>Asset specifics</text>
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


                                        <tbody background-color="#ffebcc">
                                        <tr>
                                            <th scope="row" rowSpan="6">
                                                <div align="center">
                                                    <text> SOLAR</text>
                                                </div>
                                                <div align="center" style={{marginTop: "2%"}}>
                                                    <img style={{height:100,width:100,maxHeight:100}} src={soleil}/>

                                                </div>
                                            </th>


                                            <td rowSpan="2">
                                                <text>Generation facilities (power & heat</text>
                                            </td>
                                            <td>
                                                <text>Photovoltaic generation facilities (onshore )</text>


                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>


                                            </td>
                                            <td rowSpan="2">
                                                <text> Facilities shall have no more than 15% of electricity
                                                    generated from
                                                    non-renewable sources
                                                </text>
                                            </td>

                                            <td align="center">

                                                <img src={check}/>

                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                <text>Concentrated solar power facilities (onshore)</text>

                                            </td>

                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>

                                            </td>


                                        </tr>
                                        <tr>
                                            <td rowSpan="2">

                                            </td>
                                            <td>
                                                <text> Manufacturing facilities wholly dedicated to onshore
                                                    solar energy
                                                    developement such as PV celles & components , CSP dishes,
                                                    troughs & components etc
                                                </text>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td rowSpan="2">


                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>

                                            <td>
                                                <text>Dedicated storage, distribution, installation, wholesale
                                                    and retail
                                                </text>


                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td align="center">
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>
                                            <td rowSpan="2">
                                                <text>infractrusture</text>

                                            </td>
                                            <td>
                                                <text> Dedicated transmission infastructure</text>

                                            </td>
                                            <td>

                                            </td>
                                            <td rowSpan="2">


                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>
                                        <tr>

                                            <td>
                                                <text> Dedicated supporting infrastructure including invertes,
                                                    transformes, energy storage systems and control sytem
                                                </text>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>

                                        <tr>
                                            <th rowSpan="7">
                                                <div align="center">
                                                    <text> BIO-ENERGY</text>
                                                </div>
                                                <div align="center">
                                                    <img style={{height:100,width:100,maxHeight:100}}src={bioenergy}/>

                                                </div>
                                            </th>
                                            <td rowSpan="3">
                                                <text>Facilities producing biofuel, biogas, including
                                                    fuel preparation process facilities, pretreatment facilities
                                                    and biorefinery facilities (if ⩾ 50% biomass based products
                                                    produced for energy use)
                                                </text>
                                            </td>
                                            <td>
                                                <text>Facilities producing liquid biofuel, solid and gaseous
                                                    biomass for heating and cogeneration
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="3">
                                                <text> (i) 80% GHG emission reduction compared to fossil fuel
                                                    baseline
                                                </text>

                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>


                                        </tr>

                                        <tr>
                                            <td>
                                                <text>facilities producing liquid biofuel, solid and gaseous
                                                    biomass
                                                    for electricity production
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>

                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <text>facilities producing liquid biofuel for transport</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>

                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="4">
                                                <text> Generation facilities (power, heat & cooling)</text>

                                            </td>
                                            <td>
                                                <text>Electricity generation facilities such as biomass power
                                                    station
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <text>
                                                    (i) Emissions of electricity generated must be lower than
                                                    100gCO2/kWh
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>


                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Heating facilities</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="3">
                                                <text>
                                                    (ii)Emissions of biomass or biofuel used must be 80% lower
                                                    than fossil fuel baseline and the energy efficiency achieved
                                                    must be
                                                    at least 80%
                                                </text>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>

                                        </tr>

                                        <tr>
                                            <td>
                                                <text>Cooling faclities</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>

                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>


                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Combined Heat & Power facilities</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td align="center">
                                                <img src={check}
                                                />
                                            </td>

                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>


                                        </tr>
                                        <tr>

                                            <th scope="row" rowSpan="5">
                                                <div align="center">
                                                    TRANSMISSION & DISTRIBUTION
                                                </div>
                                                <div align="center">
                                                    <img style={{height:100,width:100,maxHeight:100}} src={transmission}/>

                                                </div>

                                            </th>
                                            <td rowSpan="3">
                                                Infrastructure
                                            </td>
                                            <td>
                                                Construction or upgrading of overground transmission and
                                                distribution lines
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="3">
                                                <text>Infrastructure supports the integration of renewable
                                                    energy
                                                    or energy efficiency systems and their load-balancing
                                                </text>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Undergrounding of lines where exposed to climate risks
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Construction or upgrading of sub-stations, buildings,
                                                    fences and busbars
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <text> Distributed assets</text>
                                            </td>
                                            <td>
                                                <text>Fuses, circuit breakers, disconnectors, reactors,
                                                    capacitors,transformers , voltage , regulators and
                                                    switchgeat
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>
                                                <text>Required for construction or upgrading of transmission
                                                    & distribution infrastructure to reduce the curtailment of
                                                    renewable energy into the grid
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <text>ICT / smart grid applications</text>
                                            </td>
                                            <td>
                                                <text>
                                                    Controls, computers, automation, sensors, smart meters , ICT
                                                    , platforms
                                                    and technology that is dedicated to smart systems
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>

                                            </td>
                                        </tr>

                                        <tr>
                                            <th scope="row" rowSpan="3" align="center">
                                                STORAGE

                                            </th>
                                            <td>
                                                <text> Storage assets</text>
                                            </td>
                                            <td>
                                                <text>Batteries, capacitors, compressed air storage and
                                                    flywheels
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td rowSpan="3">
                                                <text>Reduce GHG emissions by enabling renewable energy ,
                                                    reducing
                                                    the curtailement of renewable energy , or facilitating lower
                                                    carbon sources of electricity generation during charging /
                                                    storage
                                                    compared to fossil
                                                </text>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>

                                            </td>

                                        </tr>
                                        <tr>
                                            <td rowSpan="2">
                                                <text>Facilities</text>
                                            </td>
                                            <td>
                                                <text>Large scale energy storage facilities</text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
                                                </i>

                                            </td>

                                        </tr>
                                        <tr>
                                            <td>
                                                <text>Manufacture facilities dedicated to any of the above
                                                </text>
                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "green"}}></i>

                                            </td>
                                            <td align="center">
                                                <i className="fa fa-circle" style={{color: "#ff9900"}}></i>

                                            </td>
                                            <td>

                                                <i style={{cursor: 'pointer'}}>
                                                    <img src={right}/>
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

export default createGreenBonds;