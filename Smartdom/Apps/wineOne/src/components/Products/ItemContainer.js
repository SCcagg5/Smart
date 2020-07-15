import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

export default function ItemContainer(props) {

    return(
        <TouchableOpacity onPress={props.onPress}>
            <View style={{backgroundColor:"#fff",borderRadius:10,padding:15,marginBottom:20}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:"35%"}}>
                        <Image source={props.image} style={{width:100,height:100,resizeMode:"stretch"}}/>
                    </View>
                    <View style={{width:"65%"}}>
                        <View style={{padding:10}}>
                            <Text style={{fontFamily:"sans-serif-medium",fontSize:17}}>{props.id === "1" ? props.name+" (teaser)" : props.name}</Text>
                            {
                                props.id !== "1" &&
                                <View style={{
                                    width:100,
                                    backgroundColor: "#F15FA8",
                                    height: 25,
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontFamily: "sans-serif-medium",fontSize:12
                                    }}>
                                        {
                                            props.id === "2" ? "1 panneaux" :
                                                props.id === "3" ? "3 panneaux" :
                                                    props.id === "4" ? "150 panneaux" : ""
                                        }
                                    </Text>
                                </View>
                            }

                            <Text style={{fontSize:17,marginTop:20,color:"#981b1a",fontWeight:"bold"}}>{props.price + " €"} </Text>
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
        </TouchableOpacity>

    )

}