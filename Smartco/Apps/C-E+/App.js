/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import * as firebase from "firebase";
import {PermissionsAndroid, View, ActivityIndicator} from "react-native";
import Contacts from "react-native-contacts";
import FlashMessage from "./src/customComponents/react-native-flash-message/src";


//Firebase name = carbonePlusBank
var firebaseConfig = {
    apiKey: "AIzaSyBVEWV6d-7S0e6xJ7j6fI_0qbsVoXeirWg",
    authDomain: "what-else-app.firebaseapp.com",
    databaseURL: "https://what-else-app.firebaseio.com",
    projectId: "what-else-app",
    storageBucket: "what-else-app.appspot.com",
    messagingSenderId: "240735399678",
    appId: "1:240735399678:web:3070b2e1ef3085922b7faf"
};

firebase.initializeApp(firebaseConfig);
console.disableYellowBox = true;

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {

        if (Platform.OS === "android") {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: "Contacts",
                message: "This app would like to view your contacts."
            }).then(() => {

                Contacts.getAll((err, contacts) => {
                    if (err) {
                        alert(JSON.stringify(err))
                    } else {

                        global.contacts = contacts;
                        this.setState({loading: false})

                    }
                })

            });
        }

    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{flex: 1, justifyContent: "center", flexDirection: "row", backgroundColor: "#fff"}}>
                    <ActivityIndicator size="large" color="blue"/>
                </View>
            )
        } else {

            return (
                <View style={{flex:1}}>
                    <AppContainer/>
                    <FlashMessage position="top" hideOnPress={true} duration={5000}
                                  titleStyle={{fontWeight:"bold"}}
                    />
                </View>

            );

        }
    }


}

export default App;
