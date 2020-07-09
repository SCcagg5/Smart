import React from 'react';
import {View, ActivityIndicator} from "react-native";

export default class EmptyPage extends React.Component{

    state={

    }


    render() {
        return(
            <View style={{flex: 1, justifyContent: "center", flexDirection: "row", backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color="green"/>
            </View>
        )
    }

}

