import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Container} from 'reactstrap';

import logoSm from '../assets/images/logos/logo1food1me.png';
import logo from '../assets/images/logos/logo1food1me.png';



class TopbarRecettes extends Component {

    constructor(props) {
        super(props);
        this.state = {

            mobile:false,
            pc:false


        };
    }

    componentDidMount() {
        let a = window.innerWidth
         if (a<=760){
             this.setState({mobile:true,pc:false})
         }else {
             this.setState({mobile:false,pc:true})
         }
    }
   componentWillUnmount() {
       let a = window.innerWidth
       if (a<=760){
           this.setState({mobile:true,pc:false})
       }else {
           this.setState({mobile:false,pc:true})
       }
   }


    render() {
        return (
            <React.Fragment>

                {this.state.mobile===true &&
                <div className="navbar-toggle ">
                    <Container fluid className="h-100" >

                        <div className="row h-100 align-items-center justify-content-around">
                            <div className="col-md-2">
                                <div  className="logo-box">
                                    <Link to="/" className="logo text-center">
                <span className="logo-lg">
                  <img src={logo} alt="" height="60"/>
                </span>
                                        <span className="logo-sm">
                  <img src={logoSm} alt="" height="60"/>
                </span>
                                    </Link>
                                </div>
                            </div>



                            <div className="col-md-2">
                                <li className="d-none d-sm-block">
                                    <form className="app-search">
                                        <div className="app-search-box">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Chercher..."/>
                                                <div className="input-group-append">
                                                    <button className="btn" type="submit">
                                                        <i className="fe-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </div>
                        </div>




                        {/*

                        */}



                    </Container>



                </div>
                }

                {this.state.pc===true &&
                <div className="navbar-custom ">
                    <Container fluid className="h-100" >

                        <div className="row h-100 align-items-center justify-content-between">
                            <div className="col-md-2">
                                <div  className="logo-box">
                                    <Link to="/" className="logo text-center">
                <span className="logo-lg">
                  <img src={logo} alt="" height="60"/>
                </span>
                                        <span className="logo-sm">
                  <img src={logoSm} alt="" height="60"/>
                </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-md-2">
                                <li className="d-none d-sm-block">
                                    <form className="app-search">
                                        <div className="app-search-box">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Chercher..."/>
                                                <div className="input-group-append">
                                                    <button className="btn" type="submit">
                                                        <i className="fe-search"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </div>
                        </div>




                        {/*

                        */}



                    </Container>



                </div>

                }

            </React.Fragment>
        );
    }
}


export default TopbarRecettes;

