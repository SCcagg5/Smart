import React, {Component} from 'react';
import DescriptionIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Etiquettepers from "../../Components/Etiquette/Etiquettepers"
import TouchAppIcon from '@material-ui/icons/TouchApp';
import down from "../../assets/images/icons/down.svg"
import right from "../../assets/images/icons/right.svg"
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import "./style.css"
import {navigateTo} from "../routes/history";
import WooService from "../../provider/wooService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import dataImages from './dataImage'
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NewImage from "../../assets/images/etiquette/art/IMG_20200201_220041.jpg"
class Etiquette extends Component {
    constructor(props){
        super(props)
        this.state={
            openAlert: false,
            alertMessage: '',
            alertType: '',

            prodcut:'',
            quantity:1,
            loading:true,
            choice:"",
            openUploadtModal:true,
            openTitleModal:false,
            photoUploaded:'',
            textposition:'',
            nom:"IMG_20200201_220041.jpg",
            annee:'',
            idCat:0,
            afficherImage:false

        }

        this.onChangefirstEtiquette=this.onChangefirstEtiquette.bind(this)

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

    uploadPhoto(e){
        this.setState({photoUploaded:URL.createObjectURL(e.target.files[0]),openTitleModal:true,openUploadtModal:false})
    }
    handleChange(e){
        this.setState({choice:e.target.value})
    }
    componentDidMount() {
        this.getProduct()
    }



    getProduct(){
        console.log(this.props.history)
        let path_array = this.props.history.location.pathname.split("/")
        let id = path_array[path_array.length -2]
        let quantity = path_array[path_array.length -1]

        WooService.getProductByid(id).then((res)=>{
            if (res && res.status===200){
                this.setState({product:res.data,quantity:quantity,loading:false})
            }
        })
    }

    addTicket(){
        let data = {
            nom:this.state.nom,
            annee:this.state.annee
        }
        localStorage.setItem('etiquette',JSON.stringify(data))
        navigateTo('/home/cart')
    }

    onChangefirstEtiquette(item,e){
        this.setState({[item]:e.target.value})

    }

    getImages(key){
        this.setState({afficherImage:true,idCat:key})
    }

    addToCart(){

            let product = this.state.product
            product.quantite=this.state.quantity
            product.have_etiquette = true
            product.etiqu_name = this.state.name || "";
            product.etiqu_year = this.state.annee || "";

            let cart = localStorage.getItem('cart')
            if (cart !== null && cart !== undefined){
                cart = JSON.parse(localStorage.getItem('cart'))
                cart.push(product)
                localStorage.setItem('cart',JSON.stringify(cart))
                let data = {
                    nom:this.state.nom,
                    annee:this.state.annee
                }
                localStorage.setItem('etiquette',JSON.stringify(data))
                this.props.onAddToCart(cart.length)
                this.openSnackbar("success","Produit ajouté avec succès dans votre panier")
                setTimeout(() => {
                    navigateTo('/home/cart')
                },600)
            }else {
                cart = []
                cart.push(product)
                localStorage.setItem('cart',JSON.stringify(cart))
                let data = {
                    nom:this.state.nom,
                    annee:this.state.annee
                }
                localStorage.setItem('etiquette',JSON.stringify(data))
                this.props.onAddToCart(cart.length)
                this.setState({cartQuantite:cart.length})
                this.openSnackbar("success","Produit ajouté avec succès dans votre panier")
                setTimeout(() => {
                    navigateTo('/home/cart')
                },600)
            }

    }

    render() {
        return (
            <div>
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
                                        <text style={{fontSize:15,fontWeight:"bold"}}>{this.state.product.name}</text>
                                    </div>
                                    <div className="col-4">

                                        <text style={{color:"#6EC1E4",fontFamily:"Pacifico-Regular",fontSize:25}}>{this.state.quantity + " x " +this.state.product.price}</text>
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


                                </div>


                            </div>

                            <hr style={{width:"100%",height:1,backgroundColor:"#e6e6e6"}}/>

                            <div className="row justify-content-center align-items-center text-center">
                                <EditIcon />
                                <h5>L'ÉTIQUETTE PERSONNALISÉE</h5>


                            </div>


                            <div align="center" style={{marginTop:10}}>
                                <Button onClick={()=>this.addToCart()} variant="contained" color="secondary" style={{fontWeight:700,textTransform:"none"}}>
                                    Ajouter au panier
                                </Button>
                            </div>
                        </div>


                        }

                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={this.state.choice}
                                            onChange={(e) => {
                                                this.handleChange(e)
                                            }}>
                                    <FormControlLabel value="1" control={<Radio/>}
                                                      label="J'ecris mon message sur une étiquette standard"/>
                                    {this.state.choice === "1" && <div>
                                        <Etiquettepers nom={this.state.nom} annee={this.state.annee}
                                                       onChange={this.onChangefirstEtiquette}/>
                                    </div>}
                                    <FormControlLabel value="2" control={<Radio/>}
                                                      label="Je crée mon étiquette de A à Z sur l'interface graphique "/>
                                    {
                                        this.state.choice === "2" &&
                                        <div className="text-center">

                                            <TouchAppIcon fontSize="small"/>
                                            <small>Création de votre etiquette sur notre interface graphique aprés
                                                ajouté le coffret à votre panier
                                            </small>
                                        </div>
                                    }
                                    <FormControlLabel value="3" control={<Radio/>}
                                                      label="Je personalise une etiquette toute faite "/>
                                    {
                                        this.state.choice === "3" && <div>
                                            <h5>
                                                Découvre les étiquettes toutes faites en cliquant sur la catégorie
                                                <img src={down} style={{width: "18px"}}/>
                                            </h5>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour Noel
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour Nouvel Année
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour Saint Valentin
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour un anniversaire
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour la féte de pères - mères
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour une demande témoin
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour une demande parrain - marraine
                                                </small>

                                            </div>
                                            <div className="p-1 text-center">
                                                <img src={right} style={{width: "15px"}}/>
                                                <small className="ml-2">
                                                    Pour un homme amateur de bières
                                                </small>

                                            </div>
                                        </div>
                                    }
                                    <FormControlLabel value="disabled" control={<Radio/>}
                                                      label="Je crée jusqu'a 6 étiquettes differente dans mon coffret"/>
                                    <FormControlLabel value="5" control={<Radio/>}
                                                      label="Upload une photo ou prendre une selfie "/>
                                    {
                                        this.state.choice === "5" &&
                                        <div>
                                            <Dialog onClose={() => {
                                                this.setState({openUploadtModal: false})
                                            }}
                                                    aria-labelledby="simple-dialog-title"
                                                    open={this.state.openUploadtModal}>
                                                <DialogTitle id="simple-dialog-title">Très bon
                                                    choix &#128512;</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Connectez-vous pour ajouter au panier
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <label htmlFor="file-upload">

                                                        upload photo

                                                        <input onChange={(e) => {
                                                            this.uploadPhoto(e)
                                                        }} id="file-upload" type="file" style={{display: 'none'}}/>

                                                    </label>
                                                    <label htmlFor="take-photo">

                                                        prendre une selfie

                                                        <input
                                                            accept="image/*"
                                                            id="take-photo"
                                                            type="file"
                                                            capture="environment"
                                                            style={{display: 'none'}}
                                                            onChange={(e) => this.uploadPhoto(e)}
                                                        />

                                                    </label>
                                                </DialogActions>


                                            </Dialog>

                                            <Dialog onClose={() => {
                                                this.setState({openTitleModal: false})
                                            }}
                                                    aria-labelledby="simple-dialog-title"
                                                    open={this.state.openTitleModal}>
                                                <DialogTitle id="simple-dialog-title">Très bon
                                                    choix &#128512;</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Choisir style de titre et sous titre
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <label onClick={() => {
                                                        this.setState({
                                                            textposition: "horizontal",
                                                            openTitleModal: false
                                                        })
                                                    }}>

                                                        Titre horizontal


                                                    </label>
                                                    <label onClick={() => {
                                                        this.setState({textposition: "vertical", openTitleModal: false})
                                                    }}>

                                                        Titre vertical


                                                    </label>
                                                </DialogActions>


                                            </Dialog>
                                            {
                                                this.state.photoUploaded != '' &&
                                                this.state.textposition === "horizontal" ?
                                                    <div className="text-center">


                                                        <img src={this.state.photoUploaded} style={{width: 300}}/>

                                                        <input className="text-center noOutline mt-2"
                                                               placeholder={'Titre'}
                                                               style={{fontWeight: 'bold', fontSize: 20}}/>
                                                        <input className="text-center noOutline mt-2"
                                                               placeholder={'Sous titre'} style={{fontSize: 18}}/>

                                                    </div> :
                                                    <div style={{position: 'relative'}}>

                                                        <input type={"text"}
                                                               className="text-center noOutline vertical mt-2"
                                                               placeholder={'Titre'}
                                                               style={{fontWeight: 'bold', fontSize: 20}}/>


                                                        <img src={this.state.photoUploaded}
                                                             style={{width: 300, marginLeft: 40}}/>


                                                    </div>
                                            }
                                        </div>
                                    }

                                    <FormControlLabel value="6" control={<Radio/>}
                                                      label="Je choisis une images a partir nos dossiers"/>
                                    {this.state.choice === "6" && <div>
                                        <div>
                                            {this.state.afficherImage===false ?
                                                dataImages.map((item,key)=>(
                                                    <div onClick={()=>{this.
                                                        getImages(key)
                                                    }} key={key} className="folder_item_container"
                                                         draggable


                                                    >
                                                        <div className="folder_item">
                                                            <div>
                                                                <FolderIcon style={{color:"rgb(95, 99, 104)"}}/>
                                                            </div>
                                                            <div style={{marginTop:4,marginLeft:8,color:"rgb(95, 99, 104)"}}>
                                                                {item.categories}
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))
                                                :
                                                <div>
                                                    <ArrowBackIcon  color={"primary"} onClick={()=>{this.setState({afficherImage:false})}}/>
                                                <div className='row justify-content-center'>


                                                    {
                                                        dataImages[this.state.idCat].images.map((item, key) => (
                                                            <div  className='col-4 mt-2'>
                                                                <img src={item.src} style={{width:'100%'}}/>
                                                            </div>

                                                        ))
                                                    }

                                                    <div   className='col-4 mt-2'>
                                                        <img src={NewImage} style={{width:'100%'}}/>
                                                    </div>

                                                </div>

                                                    <div align="center" style={{marginTop:10}}>
                                                        <Button onClick={()=>this.addToCart()} variant="contained" color="secondary" style={{fontWeight:700,textTransform:"none"}}>
                                                            Ajouter au panier
                                                        </Button>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>}




                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>


                <Snackbar
                    open={this.state.openAlert}
                    autoHideDuration={5000}
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

export default Etiquette;
