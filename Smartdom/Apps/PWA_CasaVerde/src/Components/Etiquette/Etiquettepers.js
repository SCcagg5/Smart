import React, {Component} from 'react';
import logo from "../../assets/logos/weed.jpeg"
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
                <div id="print" className="ml-auto mr-auto  text-center" style={{position:"relative"}}>
                    <div   style={{top:20,left:6 ,width:"100%",margin:0}}   >
                        <div className="row justify-content-center">

                            <input  className="ml-2 text-center noOutline" placeholder={"placer votre text"} type="test" value={this.props.nom} style={{fontSize:24,fontFamily:"Parisien",fontWeight:"bold",width:"80%"}} onChange={(e)=>{this.props.onChange('nom',e)}}
                            />
                        </div>

                    </div>
                    <img src={logo} style={{width:"100%",marginTop:2}} />




                </div>

                <div>

                </div>

            </div>
        );
    }
}

export default Etiquettepers;
