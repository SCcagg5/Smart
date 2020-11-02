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





const Topbar = React.lazy(() => import("../../../../../../components/Topbar"));
const Navbar = React.lazy(() => import("../../../../../../components/Navbar"));
const loading = () => <Loader/>;


class buildingTypeofBond extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMenuOpened: false,
            activeMenuItem: 'item-gestion',
            entreprise:""
        };
    }

    changeActivePage = (page) => event => {
        if (page !== '') {
            this.setState({
                activePage: page
            })
        }
    };
    componentWillMount() {
        if (this.props.location.state === null || this.props.location.state === undefined) {
            this.props.history.goBack();
        } else {
            this.setState({entreprise: this.props.location.state.entreprise})
        }
    }


    render() {
        return (
            <div className="app center-menu">
                <header id="topnav">
                    <Suspense fallback={loading()}>
                        <Topbar changeActivePage={this.changeActivePage}/>
                        <Navbar isMenuOpened={this.state.isMenuOpened}
                                activeItem={this.state.activeMenuItem} changeActivePage={this.changeActivePage}/>
                    </Suspense>
                </header>

                <div className="wrapper">
                    <Container fluid>
                        <Suspense fallback={loading()}>
                            {this.state.loading && <Loader/>}
                            <div className="row" style={{marginTop: 35}}>
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div className="card-body ">
                                            <a style={{color:'hover: #21a5c2 !important',cursor:'pointer'}}
                                               onClick={()=>this.props.history.goBack()} className="float-right text-info">Retour</a>

                                            <h4 className="header-title mt-0 mb-1">Building Type of Bond issuance / Asset type </h4>
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
                                                            <img height="80%"width="80%" src={building}/>
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
                                        <div className="clearfix"></div>
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
                        </Suspense>
                    </Container>
                </div>


            </div>
        )
    }

}

export default buildingTypeofBond;