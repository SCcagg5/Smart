import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { Avatar,Badge } from 'react-native-elements';

export default function Basket(props) {



    return(
        <View>
            <TouchableOpacity onPress={props.onPress}>
                <View>
                    <Avatar
                        size="small"
                        rounded
                        iconStyle={{color:"#fff"}}
                        icon={{type:"simple-line-icon", name:"basket",color:"#fff"}}
                        overlayContainerStyle={{backgroundColor:"#981b1a"}}
                    />
                    <Badge
                        status="warning"
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        textStyle={{color:"#fff"}}
                        value={props.value}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )

}