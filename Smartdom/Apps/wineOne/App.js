import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import * as firebase from "firebase";
import {PermissionsAndroid, View, ActivityIndicator} from "react-native";


var firebaseConfig = {
    apiKey: "AIzaSyBZzmIgVrXxE3xohn48vXX65maBX9WCjoE",
    authDomain: "quinsac-55271.firebaseapp.com",
    databaseURL: "https://quinsac-55271.firebaseio.com",
    projectId: "quinsac-55271",
    storageBucket: "quinsac-55271.appspot.com",
    messagingSenderId: "856473453678",
    appId: "1:856473453678:web:e3be0c6aa35cd9b84cd27f",
    measurementId: "G-P8VCKR3M92"
};

firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    componentDidMount() {

    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{flex: 1, justifyContent: "center", flexDirection: "row", backgroundColor: "#fff"}}>
                    <ActivityIndicator size="large" color="green"/>
                </View>
            )
        } else {

            return (
                <AppContainer/>
            );

        }
    }


}

export default App;
