import React, {Component} from 'react';
import {Collapse, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import edit from "../../assets/images/icons/edit.svg"
import googlepay from "../../assets/images/googlepay.jpg"
import CheckoutService from "../../provider/checkoutservice"

class CheckoutInfo extends Component {
    constructor(props){
        super(props)
        this.state={
            collapse1:false,
            collapse2:false,
            client:"",
            produits:[],
            total:0

        }

}
componentDidMount() {
        let id = this.props.match.params.id
         CheckoutService.getCheckout(id).then((res)=>{
             let total=0
             res.produits.map((item,key)=>{
                 total=total+ parseInt(item.prix)
             })
             console.log(res)
             this.setState({client:res.client[0],produits:res.produits,total:total})
         })

}

    render() {
        return (
            <div >

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="border border-dark">
                                <div className="row align-items-center justify-content-between p-3">
                                  <div>
                                      <h4>Refferer Code</h4>
                                  </div>
                                    <div className="col-md-1">
                                        <img onClick={()=>{this.setState({collapse1:!this.state.collapse1})}} src={edit} style={{width:25,height:25}}/>
                                    </div>
                                </div>
                                <Collapse in={this.state.collapse1} timeout="auto" unmountOnExit>
                                    <div className="p-2">
                                    <div className="col-md-8">
                                        <TextField id="outlined-basic" label="who reffered you to BS " variant="outlined" style={{width:"100%"}} />

                                    </div>
                                    <div className="col-md-auto mt-2">
                                        <h4>
                                            I don't have a distributor
                                        </h4>
                                    </div>
                                    </div>



                                </Collapse>

                            </div>

                            <div className="border border-dark mt-3">
                                <div className="row align-items-center justify-content-between p-3">
                                    <div>
                                        <h4>Contact Information</h4>
                                    </div>
                                    <div className="col-md-1">
                                        <img onClick={()=>{this.setState({collapse2:!this.state.collapse2})}} src={edit} style={{width:25,height:25}}/>
                                    </div>
                                </div>
                                <Collapse in={this.state.collapse2} timeout="auto" unmountOnExit>
                                    <div className="p-2">
                                        <div className="col-md-8">

                                            <text>
                                                (189)-929-981
                                            </text>

                                        </div>
                                        <div className="col-md-auto mt-2">
                                           <text>
                                               {this.state.client.email}
                                           </text>
                                        </div>
                                    </div>



                                </Collapse>

                            </div>

                            <div className="border border-dark mt-3">
                                <div className="row align-items-center justify-content-between p-3">
                                    <div>
                                        <h4>Shipping  Address</h4>
                                    </div>
                                    <div className="col-md-1">
                                        <img onClick={()=>{this.setState({collapse3:!this.state.collapse3})}} src={edit} style={{width:25,height:25}}/>
                                    </div>
                                </div>
                                <Collapse in={this.state.collapse3} timeout="auto" unmountOnExit>
                                    <div className="p-2">
                                        <div className="col-md-8">

                                            <text>
                                                {this.state.client.nom+" "+this.state.client.prenom}
                                            </text>

                                        </div>
                                        <div className="col-md-auto mt-2">
                                            <text>

                                                {this.state.client.ville} , {this.state.client.pays}
                                            </text>
                                        </div>
                                    </div>



                                </Collapse>

                            </div>
                            <div className="border border-dark mt-3">
                                <div className="row align-items-center justify-content-between p-3">
                                    <div>
                                        <h4>Delivery methode</h4>
                                    </div>
                                    <div className="col-md-1">
                                        <img onClick={()=>{this.setState({collapse4:!this.state.collapse4})}} src={edit} style={{width:25,height:25}}/>
                                    </div>
                                </div>
                                <Collapse in={this.state.collapse4} timeout="auto" unmountOnExit>
                                    <div className="p-2">
                                        <div className="col-md-8">

                                            <text>
                                               methode X
                                            </text>

                                        </div>

                                    </div>



                                </Collapse>

                            </div>
                            <div className="border border-dark mt-3">
                                <div className="row align-items-center justify-content-between p-3">
                                    <div>
                                        <h4>Payment Methode</h4>
                                    </div>
                                    <div className="col-md-1">
                                        <img onClick={()=>{this.setState({collapse5:!this.state.collapse5})}} src={edit} style={{width:25,height:25}}/>
                                    </div>
                                </div>
                                <Collapse in={this.state.collapse5} timeout="auto" unmountOnExit>
                                    <div className="p-2">
                                        <div className="col-md-8">
                                            <RadioGroup row aria-label="position" name="position" defaultValue="top">


                                                <div className="col-md-4 p-2  border border-dark" style={{borderRadius:40 ,maxHeight:70   ,backgroundColor:"#e6e6e6"}}>
                                                    <FormControlLabel
                                                        value="end"
                                                        control={<Radio color="primary" />}
                                                        label={<div >Stripe</div> }
                                                        labelPlacement="end"
                                                    />
                                                </div>

                                                <div className="col-md-4 p-2 ml-2 border border-dark " style={{borderRadius:40,maxHeight:70}}>
                                                    <FormControlLabel

                                                        value="end"
                                                        control={<Radio color="primary" />}
                                                        label={<div >google pay <img src={googlepay} style={{width:"40%"}}/></div> }
                                                        labelPlacement="end"
                                                    />
                                                </div>

                                            </RadioGroup>

                                        </div>

                                    </div>



                                </Collapse>

                            </div>


                        </div>
                        <div className="col-md-4">
                            <div className="border border-dark p-2">
                                {this.state.produits.map((item,key)=>(
                                    <div className="row mt-2">
                                        <div className="col-md-4 text-center">
                                            <img src={item.image} style={{width:100,height:100}}/>
                                        </div>
                                        <div className="col-md-8">
                                            <h3>
                                                {item.nomProd}
                                            </h3>
                                            <h6>
                                                {item.descriptionProd}
                                            </h6>
                                            <text>
                                                {item.prix + "€"}
                                            </text>

                                        </div>

                                    </div>
                                ))}

                            </div>

                            <div className="border border-dark mt-3 p-2">
                                <h2>Order Summary</h2>

                                <div className="p-2">
                                    <div className="row justify-content-between w-100 ">
                                        <div>
                                            PV
                                        </div>
                                        <div>
                                            445
                                        </div>

                                    </div>
                                    <div className="mt-2">
                                        <hr style={{backgroundColor:"#a6a6a6",width:"100%",height:1}}/>
                                    </div>

                                    <div className="mt-2">
                                        <text style={{fontWeight:"bold"}}>{this.state.produits.length+" "}  </text>
                                        <text>
                                            product in shopping cart
                                        </text>
                                    </div>
                                    <div className="mt-2">
                                        <div className="row justify-content-between">
                                            <div>
                                                <text>Total:</text>
                                            </div>
                                            <div>
                                                <h3>
                                                    Total € {this.state.total}
                                                </h3>

                                            </div>

                                        </div>

                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>


                </div>

            </div>
        );
    }
}

export default CheckoutInfo;
