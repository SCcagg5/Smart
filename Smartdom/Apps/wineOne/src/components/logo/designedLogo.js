import React from "react";
import {Text, View} from "react-native";

export default function DesignedLogo(props) {

    return(
        <View style={{flexDirection:"row"}}>
            <Text style={{fontSize:18,color:"#000",letterSpacing:0.5,marginRight:3}}>BACCHUS</Text>
            <View style={{backgroundColor:"#981b1a",height:15,marginRight:3,justifyContent:"center",width:15,marginTop:5}}>
                <Text style={{alignSelf:"center",color:"#fff",marginTop:-2}}>&</Text>
            </View>
            <Text style={{fontSize:18,color:"#000",letterSpacing:0.5}}>SOLAR</Text>
        </View>
    )
}