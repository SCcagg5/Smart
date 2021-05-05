import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Container} from 'reactstrap';

import logoSm from '../assets/images/beautysane_LOGO_vert.png';
import logo from '../assets/images/beautysane_LOGO_vert.png';



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

                            <div className="col-md-1">
                                <h3>Recettes</h3>
                            </div>
                            <div className="col-md-1">
                                <h3>Workout</h3>
                            </div>
                            <div className="col-md-1">
                                <h3>Article</h3>
                            </div>
                            <div className="col-md-1">
                                <h3 style={{cursor:"pointer"}} onClick={()=>this.props.history.push('/questions')}>BodyCheck</h3>
                            </div>
                            <div>
                                <button type="button" className="btn btn-success" style={{backgroundColor:"#00ba4c",color:"white"}}>BOUTIQUE</button>

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

                            <div className="col-md-1">
                                <text style={{fontWeight: "bold" , fontSize:"1.8vw",color:"black" }}>Recette</text>
                            </div>
                            <div className="col-md-1">
                                <text style={{fontWeight: "bold" , fontSize:"1.8vw",color:"black" }}>Workout</text>

                            </div>
                            <div className="col-md-1">
                                <text style={{fontWeight: "bold" , fontSize:"1.8vw",color:"black" }}>Article</text>
                            </div>
                            <div className="col-md-1">
                                <h3 style={{fontWeight: "bold" , fontSize:"1.8vw",color:"black" ,cursor:"pointer"}} onClick={()=>this.props.history.push('/questions')}>BodyCheck</h3>
                            </div>
                            <div className="col-md-1">
                                <button type="button" className="btn btn-success" style={{backgroundColor:"#00ba4c",color:"white"}}>BOUTIQUE</button>

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

