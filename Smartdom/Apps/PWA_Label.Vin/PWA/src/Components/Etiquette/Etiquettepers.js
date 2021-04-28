import React, {Component} from 'react';
import logo from "../../assets/images/logos/wine.jpeg"
import "./style.css"
import html2canvas from 'html2canvas';

class Etiquettepers extends Component {
    state={
        text1:"",
        text2:""
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
    render() {
        return (
            <div className="text-center">
                <div id="print" className="ml-auto mr-auto  text-center" style={{position:"relative",width:"282px",height:"322px"}}>
                    <img src={logo} style={{width:"100%"}} />
                    <div   style={{position:"absolute",top:20,left:6 ,width:"100%",margin:0}}   >
                       <div className="row justify-content-center">
                            <text style={{fontSize:24,fontFamily:"Parisien",fontWeight:"bold"}} >
                                Chateau
                            </text>

                        <input  className="ml-2 text-center noOutline" placeholder={"placer votre text"} type="test" value={this.props.nom} style={{fontSize:24,fontFamily:"Parisien",fontWeight:"bold",width:100}} onChange={(e)=>{this.props.onChange('nom',e)}}
                               />
                       </div>

                    </div>

                    <div  style={{position:"absolute",top:150,left:40}}   >

                        <input className="text-center noOutline" placeholder={"Année"} type="test" value={this.props.annee} style={{fontSize:15,fontWeight:"bold"}} onChange={(e)=>{this.props.onChange('annee',e)}}
                        />
                    </div>

                </div>

                <div>

                </div>

            </div>
        );
    }
}

export default Etiquettepers;
