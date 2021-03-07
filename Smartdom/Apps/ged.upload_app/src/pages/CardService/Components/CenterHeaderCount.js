import React, {Component} from "react";
import {Text} from "react-native";


export default class CenterHeaderCount extends Component{

    constructor(props) {
        super(props);


        this.state={
            all:this.props.all,
            count:this.props.count
        }
    }


    render() {
        return(
            /*<Text style={{fontWeight: "bold"}}>
                {this.props.count + " images sélectionnées de " + this.props.all}
            </Text>*/
            <Text style={{fontWeight: "bold",justifyContent:"center",alignSelf:"center",textAlign:"center"}}>
                Sélectionner les images à transmettre
            </Text>
        )
    }


}