import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import logo from'../assets/images/vin/logo.png'
import certif from'../assets/images/certif.jpg'



class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            villeborder:"white",
            vtcborder:"white",
            compactborder:"white",
            veborder:"white"

    }
    }

    changeborder(name){
        this.setState({
            villeborder:"white",
            vtcborder:"white",
            compactborder:"white",
            veborder:"white"
        })

        this.setState({[name]:"#1382c0"})

}


    render() {
        const {page} = this.props;
        return (
            <React.Fragment>
                <div className="topbar-menu ">
                    <div className="container-fluid ">
                        <div className="row align-items-center">
                            <div className="col-md-2" >
                                <img src={logo} style={{width:"100%"}}/>

                            </div>
                            <div className="col-md-1">
                                <img  src={certif} style={{width:"80%"}} />
                            </div>
                            <div className="col-md-5">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search this blog"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-secondary" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                </div>


                            </div>
                           <div className="col-md-auto">
                               <div className="input-group">
                                   <div className="input-group-append">
                                       <button className="btn btn-secondary" type="button" >
                                           <i className="fa fa-shopping-cart  " ></i>
                                       </button>
                                   </div>
                                   <label  className="form-control">Panier (0)</label>

                               </div>
                           </div>

                        </div>
                        <div className="row align-items-center justify-content-center">
                        <div className="col-md-1" style={{cursor:"pointer" ,borderBottomColor:this.state.villeborder,borderBottomWidth: 3 ,borderBottomStyle:"solid"}} onClick={()=>{this.changeborder("villeborder")
                            this.props.changeActivePage("showVille")
                        this.props.history.push("/categorie/4bouteilles")}}>
                            <text >
                                4 bouteilles

                            </text>

                        </div>
                            <div className="col-md-1"style={{cursor:"pointer",borderBottomColor:this.state.vtcborder,borderBottomWidth: 3 ,borderBottomStyle:"solid"}} onClick={()=>{this.changeborder("vtcborder")
                                this.props.changeActivePage("showVtc")
                                this.props.history.push("/categorie/caisse")}}>
                                <text >
                                   Une caisse
                                </text>

                            </div>
                            <div className="col-md-1" style={{cursor:"pointer",borderBottomColor:this.state.compactborder,borderBottomWidth: 3 ,borderBottomStyle:"solid"}} onClick={()=>{this.changeborder("compactborder")
                                this.props.changeActivePage("showCompact")
                                this.props.history.push("/categorie/palette")}}>
                                <text>
                                   Une palette
                                </text>

                            </div>

                        </div>




                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Navbar);
