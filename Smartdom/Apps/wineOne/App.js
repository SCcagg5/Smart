import React from 'react';
import AppContainer from './src/navigation/AppNavigation';
import {View, ActivityIndicator,PermissionsAndroid} from "react-native";
import FlashMessage from "./custom_modules/react-native-flash-message/src";
import Contacts from "react-native-contacts";


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
                message: "Cette application souhaite afficher vos contacts."
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
                    <ActivityIndicator size="large" color="green"/>
                </View>
            )
        } else {

            return (
                <View style={{flex:1}}>
                    <AppContainer/>
                    <FlashMessage position="top" hideOnPress={true} duration={5000}
                                  titleStyle={{fontWeight:"bold"}} animated={true}
                    />
                </View>

            );

        }
    }


}

export default App;
