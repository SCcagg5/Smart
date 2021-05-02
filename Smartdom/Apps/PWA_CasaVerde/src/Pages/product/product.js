import React, {Component} from 'react';
import WooService from "../../provider/wooService";
import InfoIcon from '@material-ui/icons/Info';
import InputLabel from '@material-ui/core/InputLabel';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BottomBar from "../../Components/BottomBar/BottomBar";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {navigateTo} from "../routes/history";
import Loader from "../../Components/Loaders/Loader";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from 'react-router-dom';

class Product extends Component {
    constructor(props){
        super(props)
        this.state={
            openAlert: false,
            alertMessage: '',
            alertType: '',
            product:"",
            loading:true,
            quantite:1,
            price:0,
            cartQuantite:0,
            openConnectModal:false,
            openTicketModal:false
        }
    }
    componentDidMount() {
       this.getProduct()
        let cart = localStorage.getItem('cart')
        if (cart !== undefined && cart !== null){
            this.setState({cartQuantite:JSON.parse(cart).length})
        }
    }

    openSnackbar = (type, msg) => {
        this.setState({
            openAlert: true,
            alertMessage: msg, //***
            alertType: type
        });
    };

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({openAlert: false});
    };


    getProduct(){
        console.log(this.props.history)
        let path_array = this.props.history.location.pathname.split("/")
        let id = path_array[path_array.length -1]

        WooService.getProductByid(id).then((res)=>{
            if (res && res.status===200){
                let price = this.state.quantite * res.data.price
                this.setState({product:res.data,loading:false,price:price})
            }
        })
    }

    addQuantite(){
        let price =0
        let quantite = this.state.quantite
        quantite=quantite+1
        price=quantite*this.state.product.price
        this.setState({quantite:quantite,price:price.toFixed(2)})
    }

    downQuantite(){
        let quantite = this.state.quantite
        let price =0
        if (quantite !== 1){
            quantite=quantite-1
            price=quantite*this.state.product.price
            this.setState({quantite:quantite,price:price.toFixed(2)})
        }
    }

    addToCart(){
        if(localStorage.getItem("phone") === null){
            this.setState({openConnectModal:true})
        }else{
            let product = this.state.product
            product.total=this.state.price
            product.quantite=this.state.quantite
            let cart = localStorage.getItem('cart')
            if (cart !== null && cart !== undefined){
                cart = JSON.parse(localStorage.getItem('cart'))
                cart.push(product)
                localStorage.setItem('cart',JSON.stringify(cart))
                this.props.onAddToCart(cart.length)
                this.setState({cartQuantite:cart.length})
                this.openSnackbar("success","Produit ajouté avec succès dans votre panier")
            }else {
                cart = []
                cart.push(product)
                localStorage.setItem('cart',JSON.stringify(cart))
                this.props.onAddToCart(cart.length)
                this.setState({cartQuantite:cart.length})
                this.openSnackbar("success","Produit ajouté avec succès dans votre panier")
            }
        }
    }

    render() {
        const product= this.state.product
        return (
            <div>
                {this.state.loading && <Loader/>}

                <div style={{padding:10,minHeight:"100vh",marginTop:50,overflow:"auto"}}>
                    <div className="pb-5">
                        {this.state.loading===false &&
                        <div className="h-100 pb-4 ">
                            <div>
                                <img style={{width:"100%",maxHeight:250}} src={this.state.product.images[0].src}/>
                            </div>
                            <hr style={{width:"100%",height:1,backgroundColor:"#e6e6e6"}}/>
                            <div className="p-1">
                                <div className="row align-items-center ">
                                    <div className="col-8">
                                        <text style={{fontSize:15,fontWeight:"bold"}}>{product.name}</text>
                                    </div>
                                    <div className="col-4">

                                        <text style={{color:"#6EC1E4",fontFamily:"Pacifico-Regular",fontSize:25}}>{this.state.price}</text>
                                        <text style={{color:"#6EC1E4",fontSize:20,fontWeight:"bold"}}> €</text>

                                    </div>

                                </div>

                                <div className="p-1">
                                    {/*<div className="row align-items-center  justify-content-center ">
                                        <div className="col-4">
                                            <div className="p-2 text-center" style={{borderStyle:"solid",borderColor:"#e6e6e6",borderWidth:1,borderRadius:10}}>
                                                <InfoIcon className="mr-1" />
                                                <text  className="font-weight-bold" style={{fontFamily:"IBMPlexSans-Bold",fontSize:15}}>75 g</text>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="row align-items-center p-2 text-center " style={{borderStyle:"solid",borderColor:"#e6e6e6",borderWidth:1,borderRadius:10 ,backgroundColor:'#f2f2f2'}}>
                                                <div>
                                                    <text  className="font-weight-bold" style={{fontFamily:"IBMPlexSans-Bold",fontSize:15,color:"#c6c6c6"}}>8 - 15min → </text>
                                                </div>
                                                <div>
                                                    <FormControl  className="ml-1" variant="outlined" >

                                                        <Select
                                                            style={{height:30}}
                                                            native

                                                            inputProps={{
                                                                name: 'age',
                                                                id: 'outlined-age-native-simple',
                                                            }}
                                                        >
                                                            <option value={10}>Ten</option>
                                                            <option value={20}>Twenty</option>
                                                            <option value={30}>Thirty</option>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}
                                    <div align="center" className="p-3 ">
                                        <div className="col-8 row justify-content-center mt-2" style={{position:"relative",backgroundColor:"#ff7979"}}>
                                            <div className="col-6 text-center" style={{height:50}}>
                                                <text style={{fontSize:30,color:"white"}}>{this.state.quantite}</text>
                                            </div>
                                            <div onClick={()=>this.addQuantite()}  style={{position:"absolute",left:-21}}>
                                                <div   style={{borderRadius:1000,height:50,width:50,position:"relative",borderWidth:1,backgroundColor:"red",}}>
                                                    <text  style={{fontSize:30,position:"absolute",left:15,bottom:3,color:"white"}}>+</text>
                                                </div>
                                            </div>
                                            <div onClick={()=>this.downQuantite()} style={{position:"absolute",right:-21}}>
                                                <div   style={{borderRadius:1000,height:50,width:50,position:"relative",borderWidth:1,backgroundColor:"red"}}>
                                                    <text  style={{fontSize:30,position:"absolute",left:20,bottom:3,color:"white"}}>-</text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <hr style={{width:"100%",height:1,backgroundColor:"#e6e6e6"}}/>
                            <div className="px-1" style={{display:"flex"}}>
                                <DescriptionIcon fontSize="small" />
                                <h5>Description</h5>
                            </div>
                            <div className="px-1 mt-1">
                                <div style={{fontSize:15}}>
                                    <div className="content" dangerouslySetInnerHTML={{__html: product.short_description}}/>
                                </div>
                            </div>

                            <div className="text-center mt-2 pb-4">
                                <Button onClick={()=> {this.setState({openTicketModal:true})}}
                                        style={{borderRadius:25,textTransform:"none",fontWeight:"bold"}} variant="contained" color="secondary"
                                        startIcon={<ShoppingCartIcon />}
                                >
                                    Ajouter au panier
                                </Button>
                            </div>

                        </div>


                        }

                    </div>
                </div>



                <Dialog onClose={() => {this.setState({openTicketModal:false})}}
                        aria-labelledby="simple-dialog-title" open={this.state.openTicketModal}>
                    <DialogTitle id="simple-dialog-title">Etiquette &#128512;</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Souhaitez vous personnaliser l’étiquette de ces bouteilles ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                               this.props.history.push('/home/etiquette/' + this.state.product.id + '/' + this.state.quantite)
                        }} color="primary">
                            Oui
                        </Button>
                        <Button onClick={() => {
                            this.setState({openTicketModal:false})
                            setTimeout(() => {
                                this.addToCart()
                            },500)
                        }} color="primary">
                           Non
                        </Button>
                    </DialogActions>


                </Dialog>

                <Dialog onClose={() => {this.setState({openConnectModal:false})}}
                        aria-labelledby="simple-dialog-title" open={this.state.openConnectModal}>
                    <DialogTitle id="simple-dialog-title">Très bon choix &#128512;</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Connectez-vous pour ajouter au panier
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            this.setState({loading:true})
                            setTimeout(() => {
                                navigateTo("/phone")
                                window.location.reload()
                            },1500)
                        }} color="primary">
                            Je me connecte
                        </Button>
                        <Button onClick={() => this.setState({openConnectModal:false})} color="primary">
                            Pas maintenant
                        </Button>
                    </DialogActions>


                </Dialog>

                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={7000}
                    onClose={this.closeSnackbar}
                >
                    <Alert elevation={6} variant="filled" onClose={this.closeSnackbar} severity={this.state.alertType}>
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

            </div>

        );
    }
}

export default withRouter( Product);
