import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import "video-react/dist/video-react.css"; // import css
import MySnackbarContentWrapper from "../../../tools/customSnackBar";
import firebase from "firebase";
import  Loader from "../../../components/Loader"
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import  recetteService from "../../../provider/RecetteService"
import CircularProgress from '@material-ui/core/CircularProgress';
import plus from "../../../assets/images/icons/plus.svg"
import Snackbar from "@material-ui/core/Snackbar"
import { Player } from 'video-react';
import { Dropdown } from 'semantic-ui-react'
import NewRecTopBar from "../../../components/TopBar/newRecTopBar";

const useStyles = withStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const url = process.env.REACT_APP_JAWHER_API_ENDPOINT

export default class NewRecette extends Component {
    constructor(props){
        super(props);
        this.state={
            test:45,
            loadingButton:false,
            data:{
                list_nomRecette:"",
                list_Duree_prepa_repas:"",
                list_Duree_Cuission:"",
                list_Nombre_person:1,
                list_Nombre_calorie:0,
                list_Pourcentrage_glucides:0,
                list_Pourcentrage_lipides:0,
                list_Pourcentrage_proteines:0,
                list_Gramme_Glucide:0,
                list_Gramme_Lipide:0,
                list_Gramme_Proteine:0,
                nutriscore:"",
                preparation:"",
                list_photo :"",
                list_video:"",
                list_Tendances:0,
                plat:"",
            },
            loading1:false,
            nutriscore:"Non disponible",

            ingr:[],
            Ingredients:{
                legumes:[],
                cerealiers:[],
                laitiers:[],
                viandes:[]

            },
            openAlert: false,
            alertMessage: "",
            alertType: "",
            loading :false,
            percentage:"",
            preparation:[{
                text:""

            }],
            dataLength:"",
            recettes:[],
            files:"",
            ing:[],
            foodlist:{
                legumes:[],
                cerealiers:[],
                laitiers: [],
                viande:[]
            }
        }
    }

    componentDidMount() {
        this.setState({loading1:true})

        fetch(url+'getfoodlist', {
            method: 'GET',

        }).then(response => response.json()).then((res)=>{
            console.log(res)
            res.map((item,key)=>{
                if (item.alim_ssgrp_nom_fr.includes("légumes")||item.alim_ssssgrp_nom_fr.includes("légumes")||item.alim_grp_nom_fr.includes("légumes")){
                    this.state.foodlist.legumes.push({
                        key:item.alim_code,
                        value:item.alim_code,
                        text:item.alim_nom_fr,

                    })

                }else if (item.alim_ssgrp_nom_fr.includes("viande")||item.alim_ssssgrp_nom_fr.includes("viande")||item.alim_grp_nom_fr.includes("viande")){
                    this.state.foodlist.viande.push({
                        key:item.alim_code,
                        value:item.alim_code,
                        text:item.alim_nom_fr
                    })

                }else if (item.alim_ssgrp_nom_fr.includes("céréaliers")||item.alim_ssgrp_nom_fr.includes("céréaliers")||item.alim_ssssgrp_nom_fr.includes("céréaliers")||item.alim_grp_nom_fr.includes("céréaliers")){
                    this.state.foodlist.cerealiers.push({
                        key:item.alim_code,
                        value:item.alim_code,
                        text:item.alim_nom_fr
                    })

                }else if (item.alim_ssgrp_nom_fr.includes("laitiers")||item.alim_ssssgrp_nom_fr.includes("laitiers")||item.alim_grp_nom_fr.includes("laitiers")){
                    this.state.foodlist.laitiers.push({
                        key:item.alim_code,
                        value:item.alim_code,
                        text:item.alim_nom_fr
                    })

                }
            })
        }).then(()=>this.setState({loading1:false})).catch(error => {
            console.log(error);
        });


        firebase.database().ref("recettes/").on("value", (snapshot) => {
            let recettes = snapshot.val();

            if (recettes !=null) {

                let rets = []
                for (let i = 0; i < recettes.length; i++) {

                    rets.push(recettes[i])

                }

                this.setState({recettes: rets})
            }






        })
    }

    addPreparation(){
        let data = this.state.preparation
        data.push({
            text:""
        })
        this.setState({preparation:data})
    }

    addItem(name){
        let data= this.state.Ingredients

        data[name].push({
            nom_Ingr:"",
            dose_Ingre:"",
            id_ingr:""
        })
        this.setState({Ingredients:data})
    }

    getFiles(files){

        let data = this.state.data
        data.list_photo=files.base64

        this.setState({ data: data })
    }

    handleChange(event,name){
        if (name==="list_photo"||name==="list_video"){
            let data = this.state.data
            data[name]=event.target.files[0]
            this.setState({data:data})

        }else {

            let data = this.state.data
            data[name] = event.target.value
            this.setState({data: data})
        }
    }

    uploadlist_video(event) {

        var list_video = event.target.files[0]


        if (list_video !== undefined) {
            this.setState({loading: true})
            var storageRef = firebase.storage().ref().child('/recettes/' + list_video.name);
            var file = list_video;
            var uploadTask = storageRef.put(file);


            uploadTask.on('state_changed', snapshot => {
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.setState({percentage: percentage.toFixed(2)})
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    /* no default */
                }
            }, error => {
                console.log(error);
            }, () => {

                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log('File available at', downloadURL);
                    let data = this.state.data;
                    data.list_video = downloadURL;
                    this.setState({
                        data: data
                    });
                    this.setState({loading: false});

                });
            });
        }
    };

    verify(){
        let data = this.state.data
        if (
            data.list_nomRecette === ""||
            data.list_Duree_prepa_repas===""||
            data.list_Duree_Cuission===""||
            data.list_Nombre_person===""||
            data.list_Nombre_calorie=== ""||
            data.list_Pourcentrage_glucides===""||
            data.list_Pourcentrage_lipides===""||
            data.list_Pourcentrage_proteines===""||
            data.list_Gramme_Glucide===""||
            data.list_Gramme_Lipide===""||
            data.list_Gramme_Proteine===""||
            data.Ingredients===""||
            data.Preparation===""||
            data.list_photo ===""||
            data.list_video===""
        ){
            return true
        }else {
            return false
        }
    }

    calculNutriscore(){

        let header = new Headers()
        header.append('Content-Type','application/json')
        let dd = this.getingr()


        let data =[]
        dd.map((item,key)=>{
            data.push({
                id:item.id_ingr,
                pds:item.dose_Ingre
            })
        })

        console.log(data)
        fetch('https://ayurws.azurewebsites.net/recette/nutriscore', {
            method: 'POST',
            headers:header,
            body:JSON.stringify(data)
        }).then(response => {
            let res = response.text()
            console.log(response)
            if (response.status===200){
                let data = this.state.data
                data.nutriscore=res
                this.setState({data:data})
            }else {
                let data = this.state.data
                data.nutriscore="indisponible"
                this.setState({data:data})
            }
        })
    }

    getingr(){
        let data = this.state.Ingredients

        let dd=[]
        if (data.legumes.length!=0){
            data.legumes.map((item,ket)=>{
                dd.push(item)
            })
        }

        if (data.laitiers.length!=0){
            data.laitiers.map((item,ket)=>{
                dd.push(item)
            })
        }
        if (data.cerealiers.length!=0){
            data.cerealiers.map((item,ket)=>{
                dd.push(item)
            })
        }

        if (data.viandes.length!=0){
            data.viandes.map((item,ket)=>{
                dd.push(item)
            })
        }


        this.setState({ingr:dd})

        return dd

    }

    async getPreparation(){
        let data = this.state.preparation
        let text = ""

        data.map((item,key)=>{
            text = text +key+"- "+item.text+ " (space) "
        })
        let dd = this.state.data
        dd.preparation=text
        this.setState({data:dd})
    }

    saveData(){

        this.setState({loadingButton:true})

        let header = new Headers()
        header.append('Content-Type','application/json')
        let dd = this.getingr()

        let data =[]
        dd.map((item,key)=>{
            data.push({
                id:item.id_ingr,
                pds:item.dose_Ingre
            })
        })

        fetch('https://ayurws.azurewebsites.net/recette/nutriscore', {
            method: 'POST',
            headers:header,
            body:JSON.stringify(data)
        }).then(response => response.text()).then((response) => {
            console.log(response.toString())
            let zz = this.state.data
            if (response.toString().length === 1){
                zz.nutriscore=response.toString()
                this.setState({data:zz})
            }else{
                zz.nutriscore="indisponible"
                this.setState({data:zz})
            }
        }).then( async () => {
            let dd = await this.getingr()
            await this.getPreparation()
            return dd

        }).then((dd)=>{
            let lipides=0
            let proteines=0
            let glucides=0

            this.state.ingr.map( (item, key) => {
                fetch('https://ayurws.azurewebsites.net/foodsV2/' + item.id_ingr, {
                    method: 'GET'}).then(response => response.json()).then((res) => {

                    lipides = lipides + ((parseFloat(res.Lipides) * parseFloat(item.dose_Ingre)) / 100)
                    proteines = proteines + ((parseFloat(res.Proteines) * parseFloat(item.dose_Ingre)) / 100)
                    glucides = glucides + ((parseFloat(res.Glucides) * parseFloat(item.dose_Ingre)) / 100)
                    let dataR = this.state.data
                    dataR.list_Gramme_Glucide = glucides
                    dataR.list_Gramme_Lipide = lipides
                    dataR.list_Gramme_Proteine = proteines
                    this.setState({data: dataR})
                }).catch(err => {
                    console.log(err)
                    this.openSnackbar("error","ayurws foodsV2 api error !")
                })
            })
        }).then (()=>{

            setTimeout(
                function() {
                    recetteService.CreateRecette(this.state.data).then( res1 => {
                        console.log(res1)
                        dd.map((item,key)=>{
                            item.id_rec = res1.data

                            recetteService.createIngredient(item).then(res2=>{
                                console.log(res2)
                            }).catch(err => {
                                console.log(err)
                            })
                        })

                    }).then(()=>{
                        this.setState({openAlert:true,alertMessage:"Votre recette est crée avec succès",alertType:'success'})
                        this.setState({loadingButton:false})
                        this.props.history.goBack()
                    }).catch(err => {
                        this.openSnackbar("error","Une erreur est survenue lors de la création de la recette !")
                        console.log(err)
                    })
                }
                .bind(this),
                3000
            );



        }).catch( err => {
            this.openSnackbar("error","ayurws recette nutriscore api error !")
            console.log(err)
        })

    }

    changeTextPreparation(key,e){
        let data = this.state.preparation
        data[key].text=e.target.value
        this.setState({preparation:data})

    }

    uploadImage(event) {


        var list_photo = event.target.files[0]

        if (list_photo !== undefined) {


            this.setState({loading: true})


            var storageRef = firebase.storage().ref().child('/recettes/' + list_photo.name);
            var file = list_photo;

            var uploadTask = storageRef.put(file);




            uploadTask.on('state_changed', snapshot => {

                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                this.setState({percentage: percentage.toFixed(2)})

                //this.uploadPercent = progress.toFixed(2) + ' %';
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    /* no default */

                }
            }, error => {
                console.log(error);
            }, () => {

                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    console.log('File available at', downloadURL);
                    let data = this.state.data;
                    data.list_photo = downloadURL;
                    this.setState({
                        data: data
                    });
                    this.setState({loading: false});

                });
            });


        }
    }

    dropdownHangleChange(event,e,name1,name2,key){

        console.log(e.target.textContent)


        let data = this.state.Ingredients
        data[name1][key]["id_ingr"] = event.value
        data[name1][key]["nom_Ingr"] = e.target.textContent
        this.setState({Ingredients: data})

        console.log(this.state.Ingredients)
    }

    handleChange2(event,name1,name2,key){

        if (name2==="nom_Ingr"){
            const { myValue } = event.currentTarget.dataset;
            // --> 123



            let data = this.state.Ingredients
            data[name1][key][name2] = myValue
            data[name1][key]["id_ingr"]=event.target.value
            this.setState({Ingredients: data})
        }else{
            let data = this.state.Ingredients
            data[name1][key][name2] = event.target.value
            this.setState({Ingredients: data})
        }





    }

    calculePGl(data){

        let lipides=0
        let proteines=0
        let glucides=0
        data.map((item,key)=>{

            fetch('https://ayurws.azurewebsites.net/foodsV2/'+item.id_ingr, {
                method: 'GET',

            }).then(response => response.json()).then((res)=>{
                lipides = lipides + ((parseFloat(res.Lipides)* parseFloat(item.dose_Ingre))/100)
                proteines=proteines +  ((parseFloat(res.Proteines)* parseFloat(item.dose_Ingre))/100)
                glucides=glucides+((parseFloat(res.Glucides)* parseFloat(item.dose_Ingre))/100)
            }).then(()=>{
                let dataR = this.state.data
                dataR.list_Gramme_Glucide=glucides
                dataR.list_Gramme_Lipide=lipides
                dataR.list_Gramme_Proteine=proteines

                this.setState({data:dataR})
            })

        })
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
        this.setState({ openAlert: false });
    };
    render() {

        const legumes = this.state.foodlist.legumes
        const cereliers=this.state.foodlist.cerealiers
        const laitiers=this.state.foodlist.laitiers
        const viandes=this.state.foodlist.viande

        return (
            <div >

                {
                    this.state.loading === true &&
                    <Loader percentage={this.state.percentage+"%"}/>
                }

                <NewRecTopBar height={80} title="Ajouter une recette" onBackBtnClick={() => {this.props.history.goBack()}}/>
                <div className="wrapper">
                    <div className="container-fluid p-5 justify-content-around" style={{border:"2px solid #c0c0c0"}}>

                        <div className="row justify-content-around align-items-center">
                            <div className="col-md-3">

                                <TextField InputLabelProps={{
                                    shrink: true,
                                }} required id="standard-required" label="Nom du repas"  style={{width:"100%"}}
                                           value={this.state.data.list_nomRecette}
                                           onChange={(e)=>this.handleChange(e,"list_nomRecette")}/>

                            </div>

                            <div className="col-md-3" >
                                <div>
                                    <InputLabel id="demo-simple-select-label">Durée preparation du repas</InputLabel>
                                </div>

                                <Select
                                    onChange={(e)=>{this.handleChange(e,"list_Duree_prepa_repas")}}
                                    value={this.state.data.list_Duree_prepa_repas}
                                    style={{width:"100%"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >

                                    <MenuItem value={"5 min"}>5 min </MenuItem>
                                    <MenuItem value={"10 min"}>10 min</MenuItem>
                                    <MenuItem value={"15 min"}>15 min </MenuItem>
                                    <MenuItem value={"20 min "}>20 min </MenuItem>
                                    <MenuItem value={"30 min"}>30 min </MenuItem>
                                    <MenuItem value={"45 min"}>45 min </MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="row justify-content-around mt-3 align-items-center mt-3">
                            <div className="col-md-3" >
                                <div>
                                    <InputLabel id="demo-simple-select-label">Durée cuission</InputLabel>
                                </div>

                                <Select
                                    value={this.state.data.list_Duree_Cuission}
                                    onChange={(e)=>this.handleChange(e,"list_Duree_Cuission")}
                                    style={{width:"100%"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={"5 min"}>5 min </MenuItem>
                                    <MenuItem value={"10 min"}>10 min</MenuItem>
                                    <MenuItem value={"15 min"}>15 min </MenuItem>
                                    <MenuItem value={"20 min"}>20 min </MenuItem>
                                    <MenuItem value={"30 min"}>30 min </MenuItem>
                                    <MenuItem value={"45 min"}>45 min </MenuItem>
                                </Select>
                            </div>
                            <div  className="col-md-3">
                                <div>
                                    <InputLabel id="demo-simple-select-label">Nombre de personnes</InputLabel>
                                </div>

                                <Select
                                    value={this.state.data.list_Nombre_person}
                                    onChange={(e)=>this.handleChange(e,"list_Nombre_person")}
                                    style={{width:"100%"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    displayEmpty={false}
                                >
                                    <MenuItem value={"1"}>1 </MenuItem>
                                    <MenuItem value={"2"}>2</MenuItem>
                                    <MenuItem value={"3"}>3 </MenuItem>
                                    <MenuItem value={"4"}>4 </MenuItem>
                                    <MenuItem value={"5"}>5 </MenuItem>
                                    <MenuItem value={"6"}>6 </MenuItem>
                                    <MenuItem value={"7"}>7 </MenuItem>
                                    <MenuItem value={"8"}>8 </MenuItem>
                                    <MenuItem value={"9"}>9 </MenuItem>
                                </Select>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-10 mt-5">
                                <h5 className="font-weight-bold">Ingredient liste</h5>
                                <hr style={{height:2 ,width:"100%",backgroundColor:"black"}}/>
                            </div>
                            <div className="col-md-2 mt-5">
                                <h5 className="font-weight-bold">Grammage correspondant</h5>
                                <hr style={{height:2 ,width:"100%",backgroundColor:"black"}}/>
                            </div>
                        </div>

                        {this.state.loading1===false&& <div>
                            <h5 style={{color:"blue"}}> Fruits et legumes </h5>

                            {this.state.Ingredients.legumes.map((item,key)=>(
                                <div key={key} className="row mb-5">
                                    <div className="col-md-10 ">
                                        <div className="row align-items-center justify-content-start">

                                            <div className="col-md-auto">
                                                <text>{key +1})</text>

                                            </div>
                                            <div className="col-md-3">

                                                <Dropdown

                                                    name="legumes"
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    placeholder='Search fruit et legume'
                                                    onChange={(e,data)=>this.dropdownHangleChange(data,e,"legumes","nom_Ingr",key)}
                                                    fluid
                                                    search
                                                    selection
                                                    renderLabel={(e)=>{console.log(e)}}
                                                    options={legumes}
                                                />
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">A-B</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}


                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    { legumes.filter(name => (name.text.startsWith('A')||name.text.startsWith('B'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">C</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('C'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">D-E-F</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('D')||name.text.startsWith('E')||name.text.startsWith('F'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">G-H-I</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('G')||name.text.startsWith('H')||name.text.startsWith('I'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">J-K-L</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('J')||name.text.startsWith('K')||name.text.startsWith('L'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">M-N-O</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('M')||name.text.startsWith('N')||name.text.startsWith('O'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">P-Q</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('P')||name.text.startsWith('Q'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">R-S-T</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.legumes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"legumes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.legumes.filter(name => (name.text.startsWith('R')||name.text.startsWith('S')||name.text.startsWith('T'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>




                                        </div>
                                    </div>
                                    <div className="col-md-2">




                                        <div>
                                            <InputLabel id="demo-simple-select-label">Grammages correspondant</InputLabel>
                                        </div>

                                        <Select
                                            value={this.state.Ingredients.legumes[key].dose_Ingre}
                                            onChange={(e)=>this.handleChange2(e,"legumes","dose_Ingre",key)}
                                            style={{width:"100%"}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            displayEmpty={false}
                                        >
                                            <ListSubheader style={{fontWeight :"bold"}}>cueillère à café	5 grammes </ListSubheader>
                                            <MenuItem value={5}>1 cc </MenuItem>
                                            <MenuItem value={10}>2 cc</MenuItem>
                                            <MenuItem value={15}>3 cc  </MenuItem>
                                            <MenuItem value={20}>4 cc</MenuItem>
                                            <MenuItem value={25}>5 cc </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>cuillere à soupe	15 grammes </ListSubheader>
                                            <MenuItem value={15}>1 cs </MenuItem>
                                            <MenuItem value={30}>2 cs</MenuItem>
                                            <MenuItem value={45}>3 cs </MenuItem>
                                            <MenuItem value={60}>4 cs</MenuItem>
                                            <MenuItem value={75}>5 cs </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Une tasse	115 grammes </ListSubheader>
                                            <MenuItem value={115}>1 t </MenuItem>
                                            <MenuItem value={230}>2 t</MenuItem>
                                            <MenuItem value={345}>3 t</MenuItem>
                                            <MenuItem value={460}>4 t</MenuItem>
                                            <MenuItem value={575}>5 t</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Décilitre ( 100 gr environ )	100 grammes</ListSubheader>
                                            <MenuItem value={100}>1 dc</MenuItem>
                                            <MenuItem value={200}>2 dc</MenuItem>
                                            <MenuItem value={300}>3 dc</MenuItem>
                                            <MenuItem value={400}>4 dc</MenuItem>
                                            <MenuItem value={500}>5 dc</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Nombres</ListSubheader>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>


                                        </Select>
                                    </div>






                                </div>
                            ))}

                            <div className="col-md-1">
                                <img src={plus} style={{width:"40%" ,cursor:"pointer"}} onClick={()=>{this.addItem("legumes")}}/>
                            </div>

                            <h5 style={{color:"blue"}}> Produits cerealiers </h5>

                            {this.state.Ingredients.cerealiers.map((item,key)=>(
                                <div key={key} className="row mb-5 ">
                                    <div className="col-md-10 ">
                                        <div className="row align-items-center justify-content-start">

                                            <div className="col-md-auto">
                                                <text>{key +1})</text>

                                            </div>
                                            <div className="col-md-3">

                                                <Dropdown

                                                    name="legumes"
                                                    value={this.state.Ingredients.cerealiers[key].id_ingr}
                                                    placeholder='search cereliers'
                                                    onChange={(e,data)=>this.dropdownHangleChange(data,e,"cerealiers","nom_Ingr",key)}

                                                    fluid
                                                    search
                                                    selection
                                                    options={cereliers}
                                                />
                                            </div>
                                            <div className="col-md-2">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label" >A-B</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.cerealiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"cerealiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.cerealiers.filter(name => (name.text.startsWith('A')||name.text.startsWith('B'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>


                                            </div>
                                            <div className="col-md-2">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">C-D-E-F-..-M</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.cerealiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"cerealiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.cerealiers.filter(name => (name.text.startsWith('C')
                                                        ||name.text.startsWith('D')||name.text.startsWith('E')||name.text.startsWith('F')||name.text.startsWith('G')
                                                        ||name.text.startsWith('H')||name.text.startsWith('I')||name.text.startsWith('J')||name.text.startsWith('K')
                                                        ||name.text.startsWith('l')||name.text.startsWith('M'))).map((filteredName,key) => (
                                                        <MenuItem key={key} value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">P</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.cerealiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"cerealiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.cerealiers.filter(name => (name.text.startsWith('P'))).map(filteredName => (
                                                        <MenuItem value={ filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-3">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">Q-R-S-T-U-V</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.cerealiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"cerealiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.cerealiers.filter(name => (name.text.startsWith('Q')
                                                        ||name.text.startsWith('R')||name.text.startsWith('S')||name.text.startsWith('T')||name.text.startsWith('U')
                                                        ||name.text.startsWith('V'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>





                                        </div>
                                    </div>
                                    <div className="col-md-2">




                                        <div>
                                            <InputLabel id="demo-simple-select-label">Grammages correspondant</InputLabel>
                                        </div>

                                        <Select
                                            value={this.state.Ingredients.cerealiers[key].dose_Ingre}
                                            onChange={(e)=>this.handleChange2(e,"cerealiers","dose_Ingre",key)}
                                            style={{width:"100%"}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            displayEmpty={false}
                                        >
                                            <ListSubheader style={{fontWeight :"bold"}}>cueillère à café	5 grammes </ListSubheader>
                                            <MenuItem value={5}>1 cc </MenuItem>
                                            <MenuItem value={10}>2 cc</MenuItem>
                                            <MenuItem value={15}>3 cc  </MenuItem>
                                            <MenuItem value={20}>4 cc</MenuItem>
                                            <MenuItem value={25}>5 cc </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>cuillere à soupe	15 grammes </ListSubheader>
                                            <MenuItem value={15}>1 cs </MenuItem>
                                            <MenuItem value={30}>2 cs</MenuItem>
                                            <MenuItem value={45}>3 cs </MenuItem>
                                            <MenuItem value={60}>4 cs</MenuItem>
                                            <MenuItem value={75}>5 cs </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Une tasse	115 grammes </ListSubheader>
                                            <MenuItem value={115}>1 t </MenuItem>
                                            <MenuItem value={230}>2 t</MenuItem>
                                            <MenuItem value={345}>3 t</MenuItem>
                                            <MenuItem value={460}>4 t</MenuItem>
                                            <MenuItem value={575}>5 t</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Décilitre ( 100 gr environ )	100 grammes</ListSubheader>
                                            <MenuItem value={100}>1 dc</MenuItem>
                                            <MenuItem value={200}>2 dc</MenuItem>
                                            <MenuItem value={300}>3 dc</MenuItem>
                                            <MenuItem value={400}>4 dc</MenuItem>
                                            <MenuItem value={500}>5 dc</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Nombres</ListSubheader>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>


                                        </Select>
                                    </div>






                                </div>
                            ))}

                            <div className="col-md-1">
                                <img src={plus} style={{width:"40%" ,cursor:"pointer"}} onClick={()=>{this.addItem("cerealiers")}}/>
                            </div>

                            <h5 style={{color:"blue"}}> Produits Laitiers </h5>

                            {this.state.Ingredients.laitiers.map((item,key)=>(
                                <div key={key} className="row mb-5 ">
                                    <div className="col-md-10 ">
                                        <div className="row align-items-center justify-content-start">

                                            <div className="col-md-auto">
                                                <text>{key +1})</text>

                                            </div>
                                            <div className="col-md-3">

                                                <Dropdown

                                                    name="legumes"

                                                    placeholder='Search laitiers'
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e,data)=>this.dropdownHangleChange(data,e,"laitiers","nom_Ingr",key)}
                                                    fluid
                                                    search
                                                    selection
                                                    options={laitiers}
                                                />
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label" >A-B</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('A')||name.text.startsWith('B'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>


                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">C-D-E</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('C')
                                                        ||name.text.startsWith('D')||name.text.startsWith('E'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">F</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('F'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">G-I-L</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('G')
                                                        ||name.text.startsWith('I')||name.text.startsWith('L'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">M-P</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('M')
                                                        ||name.text.startsWith('P'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">R-S-T</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('R')
                                                        ||name.text.startsWith('S')||name.text.startsWith('T'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">V-Y</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.laitiers[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"laitiers","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.laitiers.filter(name => (name.text.startsWith('V')
                                                        ||name.text.startsWith('Y'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>






                                        </div>
                                    </div>
                                    <div className="col-md-2">




                                        <div>
                                            <InputLabel id="demo-simple-select-label">Grammages correspondant</InputLabel>
                                        </div>

                                        <Select
                                            value={this.state.Ingredients.laitiers[key].dose_Ingre}
                                            onChange={(e)=>this.handleChange2(e,"laitiers","dose_Ingre",key)}
                                            style={{width:"100%"}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            displayEmpty={false}
                                        >
                                            <ListSubheader style={{fontWeight :"bold"}}>cueillère à café	5 grammes </ListSubheader>
                                            <MenuItem value={5}>1 cc </MenuItem>
                                            <MenuItem value={10}>2 cc</MenuItem>
                                            <MenuItem value={15}>3 cc  </MenuItem>
                                            <MenuItem value={20}>4 cc</MenuItem>
                                            <MenuItem value={25}>5 cc </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>cuillere à soupe	15 grammes </ListSubheader>
                                            <MenuItem value={15}>1 cs </MenuItem>
                                            <MenuItem value={30}>2 cs</MenuItem>
                                            <MenuItem value={45}>3 cs </MenuItem>
                                            <MenuItem value={60}>4 cs</MenuItem>
                                            <MenuItem value={75}>5 cs </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Une tasse	115 grammes </ListSubheader>
                                            <MenuItem value={115}>1 t </MenuItem>
                                            <MenuItem value={230}>2 t</MenuItem>
                                            <MenuItem value={345}>3 t</MenuItem>
                                            <MenuItem value={460}>4 t</MenuItem>
                                            <MenuItem value={575}>5 t</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Décilitre ( 100 gr environ )	100 grammes</ListSubheader>
                                            <MenuItem value={100}>1 dc</MenuItem>
                                            <MenuItem value={200}>2 dc</MenuItem>
                                            <MenuItem value={300}>3 dc</MenuItem>
                                            <MenuItem value={400}>4 dc</MenuItem>
                                            <MenuItem value={500}>5 dc</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Nombres</ListSubheader>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>


                                        </Select>
                                    </div>






                                </div>
                            ))}

                            <div className="col-md-1">
                                <img src={plus} style={{width:"40%" ,cursor:"pointer"}} onClick={()=>{this.addItem('laitiers')}}/>
                            </div>

                            <h5 style={{color:"blue"}}> Viande</h5>

                            {this.state.Ingredients.viandes.map((item,key)=>(
                                <div key={key} className="row mb-5 ">
                                    <div className="col-md-10 ">
                                        <div className="row align-items-center justify-content-start">

                                            <div className="col-md-auto">
                                                <text>{key +1})</text>

                                            </div>
                                            <div className="col-md-3">

                                                <Dropdown

                                                    name="legumes"

                                                    placeholder='Search viande'
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    fluid
                                                    search
                                                    selection
                                                    onChange={(e,data)=>this.dropdownHangleChange(data,e,"viandes","nom_Ingr",key)}
                                                    options={viandes}
                                                />
                                            </div>
                                            <div className="col-md-1">
                                                .
                                                <div>
                                                    <InputLabel id="demo-simple-select-label" >A-B</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('A')||name.text.startsWith('B'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>


                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">C-D-E</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('C')
                                                        ||name.text.startsWith('D')||name.text.startsWith('E'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div>
                                                    <InputLabel id="demo-simple-select-label">F</InputLabel>
                                                </div>

                                                <Select
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('F'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">G-I-L</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('G')
                                                        ||name.text.startsWith('I')||name.text.startsWith('L'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">M-P</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('M')
                                                        ||name.text.startsWith('P'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">R-S-T</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('R')
                                                        ||name.text.startsWith('S')||name.text.startsWith('T'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>
                                            <div className="col-md-1">

                                                <div className="text-left">
                                                    <InputLabel id="demo-simple-select-label">V-Y</InputLabel>
                                                </div>

                                                <Select
                                                    placeholder={""}
                                                    value={this.state.Ingredients.viandes[key].id_ingr}
                                                    onChange={(e)=>this.handleChange2(e,"viandes","nom_Ingr",key)}
                                                    style={{width:"100%"}}

                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                >
                                                    {this.state.foodlist.viande.filter(name => (name.text.startsWith('V')
                                                        ||name.text.startsWith('Y'))).map(filteredName => (
                                                        <MenuItem value={filteredName.value}  data-my-value={filteredName.text}  >{filteredName.text} </MenuItem>
                                                    ))}

                                                </Select>
                                            </div>






                                        </div>
                                    </div>
                                    <div className="col-md-2">




                                        <div>
                                            <InputLabel id="demo-simple-select-label">Grammages correspondant</InputLabel>
                                        </div>

                                        <Select
                                            value={this.state.Ingredients.viandes[key].dose_Ingre}
                                            onChange={(e)=>this.handleChange2(e,"viandes","dose_Ingre",key)}
                                            style={{width:"100%"}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            displayEmpty={false}
                                        >
                                            <ListSubheader style={{fontWeight :"bold"}}>cueillère à café	5 grammes </ListSubheader>
                                            <MenuItem value={5}>1 cc </MenuItem>
                                            <MenuItem value={10}>2 cc</MenuItem>
                                            <MenuItem value={15}>3 cc  </MenuItem>
                                            <MenuItem value={20}>4 cc</MenuItem>
                                            <MenuItem value={25}>5 cc </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>cuillere à soupe	15 grammes </ListSubheader>
                                            <MenuItem value={15}>1 cs </MenuItem>
                                            <MenuItem value={30}>2 cs</MenuItem>
                                            <MenuItem value={45}>3 cs </MenuItem>
                                            <MenuItem value={60}>4 cs</MenuItem>
                                            <MenuItem value={75}>5 cs </MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Une tasse	115 grammes </ListSubheader>
                                            <MenuItem value={115}>1 t </MenuItem>
                                            <MenuItem value={230}>2 t</MenuItem>
                                            <MenuItem value={345}>3 t</MenuItem>
                                            <MenuItem value={460}>4 t</MenuItem>
                                            <MenuItem value={575}>5 t</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Décilitre ( 100 gr environ )	100 grammes</ListSubheader>
                                            <MenuItem value={100}>1 dc</MenuItem>
                                            <MenuItem value={200}>2 dc</MenuItem>
                                            <MenuItem value={300}>3 dc</MenuItem>
                                            <MenuItem value={400}>4 dc</MenuItem>
                                            <MenuItem value={500}>5 dc</MenuItem>
                                            <ListSubheader style={{fontWeight :"bold"}}>Nombres</ListSubheader>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>


                                        </Select>
                                    </div>






                                </div>
                            ))}

                            <div className="col-md-1">
                                <img src={plus} style={{width:"40%" ,cursor:"pointer"}} onClick={()=>{this.addItem('viandes')}}/>
                            </div>


                        </div>

                        }
                        <div className="row">
                            <div className="col-md-12 mt-5">
                                <h5 className="font-weight-bold">Preparation</h5>
                                <hr style={{height:2 ,width:"100%",backgroundColor:"black"}}/>
                            </div>

                        </div>



                        <div>
                            <h5> Les etapes :</h5>
                        </div>


                        <div className="mt-2">
                            {this.state.preparation.map((item,key)=>(
                                <div key={key} className="row ml-3 align-items-center mt-2">
                                    <div className="col-md-1">
                                        <h5> {"Etape "+ (key+1)}</h5>
                                    </div>
                                    <div className="col-md-11">
                                        <TextField value={this.state.preparation[key].text} onChange={(e)=>{this.changeTextPreparation(key,e)}}  style={{width:"100%"}} id="outlined-basic"  variant="outlined" />

                                    </div>
                                </div>
                            ))}



                        </div>

                        <div className="row justify-content-end mt-2">
                            <div className="col-md-1 text-right">
                                <img src={plus} style={{width:"40%" ,cursor:"pointer"}} onClick={()=>{this.addPreparation()}}/>
                            </div>
                        </div>




                        <div className="row  justify-content-center align-items-center " style={{marginTop:"10%"}}>
                            <div className="col-md-2 text-center">
                                <InputLabel>Upload list_photo : </InputLabel>
                            </div>
                            <div className="col-md-5">

                                <Button
                                    color="secondary"
                                    variant="contained"
                                    component="label"
                                >
                                    Upload list_photo

                                    <input
                                        onChange={(e)=>this.uploadImage(e )}


                                        type="file"
                                        style={{ display: "none" }}
                                    />


                                </Button>



                            </div>
                            <div className="col-md-3">

                                {(this.state.data.list_photo!=="" && this.state.data.list_photo!=null) &&



                                <img alt="" src={this.state.data.list_photo} style={{width:200,height:200}}/>}



                            </div>

                        </div>
                        <div className="row mt-5 justify-content-center align-items-center ">
                            <div className="col-md-2 text-center">
                                <InputLabel>Upload list_video : </InputLabel>
                            </div>
                            <div className="col-md-5">

                                <Button
                                    color="secondary"
                                    variant="contained"
                                    component="label"
                                >
                                    Upload list_video
                                    <input
                                        onChange={(e)=>this.uploadlist_video(e)}


                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                </Button>



                            </div>
                            <div className="col-md-3">

                                {(this.state.data.list_video!==""&&this.state.data.list_video!=null) &&
                                <Player

                                    playsInline
                                    poster="/assets/poster.png"
                                    src={this.state.data.list_video}
                                />
                                }



                            </div>

                        </div>

                        <div className="row justify-content-center mt-5">
                            <Button
                                style={{background:"#4ca832",color:"white",width:"40%"}}
                                onClick={()=>{this.saveData()}}

                            >
                                {this.state.loadingButton===false?
                                    <div>
                                        Créer une recette
                                    </div>:
                                    <CircularProgress style={{color:"green"}} />

                                }

                            </Button>
                        </div>





                    </div>

                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openAlert}
                    autoHideDuration={5000}
                    onClose={this.closeSnackbar}
                >
                    <MySnackbarContentWrapper
                        onClose={this.closeSnackbar}
                        variant={this.state.alertType}
                        message={this.state.alertMessage}
                    />
                </Snackbar>
            </div>


        );
    }
}


