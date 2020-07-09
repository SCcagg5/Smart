import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

export default function ItemContainer(props) {

    return(
        <View style={{backgroundColor:"#f4f4f4",borderRadius:10,padding:15,marginBottom:20}}>
            <View style={{flexDirection:"row"}}>
                <View style={{width:"30%"}}>
                    <Image source={props.image} style={{width:80,height:100,resizeMode:"contain"}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={{padding:10}}>
                        <Text style={{fontFamily:"sans-serif-medium",fontSize:14}}>{props.name}</Text>
                        <Text style={{fontSize:13,marginTop:30,color:"#981b1a"}}>{props.price + " " + props.currency} </Text>
                        <View style={{marginTop:5,alignItems:"flex-end"}}>
                            <TouchableOpacity onPress={props.onPressPlusButton}>
                                <View style={{width:25,height:25,backgroundColor:"#981b1a",borderRadius:15,alignItems:"center",justifyContent:"center"}}>
                                    <Text style={{color:"#fff",fontSize:16,fontWeight:"bold"}}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )

}