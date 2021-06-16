import React, {Component} from 'react';
import logo from "../../assets/images/logos/wine.jpeg"
import bloglatentationdesaintantoine_ from "../../assets/images/etiquette/blog la tentation de saint antoine _.jpg"
import blog_pornokrate from "../../assets/images/etiquette/blog pornokrate.jpg"
import Fonds_du_Patrimoine_Fondation_Roi_Baudouin from "../../assets/images/etiquette/Fonds_du_Patrimoine_Fondation_Roi_Baudouin.jpg"
import Koning_Boudewijnstichting from "../../assets/images/etiquette/Koning_Boudewijnstichting.jpg"
import pommeavendre from "../../assets/images/etiquette/pommeavendre.jpg"
import "./style.css"
import html2canvas from 'html2canvas';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
class Etiquettepers extends Component {
    state={
        text1:"",
        text2:"",
        image :logo,
    }

    onChangeText(item,e){
        this.setState({[item]:e.target.value})

    }
    htmltoimg(){
        console.log("work")
        const printArea = document.getElementById("print");
        html2canvas(printArea).then(canvas => {
            const dataURL = canvas.toDataURL();
            console.log(dataURL)
            let a = document.createElement("a"); //Create <a>
            a.href =  dataURL; //Image Base64 Goes here
            a.download = "Image.png"; //File name Here
            a.click();
        })


    }
    handleChange (e){
        this.setState({image:e.target.value})
    }
    render() {
        return (
            <div className="text-center">
                <FormControl style={{minWidth:150}} variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">Etiquette Modele</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.image}
                        onChange={(e)=>this.handleChange(e)}
                        label="Etiquette Modele"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={bloglatentationdesaintantoine_}>bloglatentationdesaintantoine_</MenuItem>
                        <MenuItem value={Fonds_du_Patrimoine_Fondation_Roi_Baudouin}>Fonds_du_Patrimoine_Fondation_Roi_Baudouin</MenuItem>
                        <MenuItem value={Koning_Boudewijnstichting}>Koning_Boudewijnstichting</MenuItem>
                        <MenuItem value={blog_pornokrate}>blog_pornokrate</MenuItem>
                        <MenuItem value={pommeavendre}>pommeavendre</MenuItem>


                    </Select>
                </FormControl>

                <div id="print" className="ml-auto mr-auto  text-center" style={{position:"relative",width:"282px",height:"322px"}}>
                    <div className="row justify-content-center">
                        <text style={{fontSize:24,fontFamily:"Parisien",fontWeight:"bold"}} >
                            Chateau
                        </text>

                        <input  className="ml-2 text-center noOutline" placeholder={"placer votre text"} type="test" value={this.props.nom} style={{fontSize:24,fontFamily:"Parisien",fontWeight:"bold",width:100}} onChange={(e)=>{this.props.onChange('nom',e)}}
                        />
                    </div>
                    <img src={this.state.image} style={{width:"100%"}} />




                        <input className="text-center noOutline" placeholder={"Année"} type="test" value={this.props.annee} style={{fontSize:15,fontWeight:"bold"}} onChange={(e)=>{this.props.onChange('annee',e)}}
                        />


                </div>

                <div>

                </div>

            </div>
        );
    }
}

export default Etiquettepers;
