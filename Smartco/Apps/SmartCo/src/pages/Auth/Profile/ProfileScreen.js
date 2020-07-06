/* eslint-disable comma-dangle */
import React from 'react';
import {
    AsyncStorage,
    ScrollView,
    Switch,
    StyleSheet,
    Text,
    View
} from 'react-native';
import BackButton from '../../../components/BackButton/BackButton';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import defaultAvatar from "../../../assets/images/defaultAvatar.png"
import BaseIcon from '../../../components/Icon'
import Chevron from '../../../components/Chevron'
import InfoText from '../../../components/InfoText'
import {Avatar, ListItem} from 'react-native-elements'
import RNRestart from 'react-native-restart';


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: 'white',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    userImage: {
        marginRight: 12,
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
});

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: (
            <BackButton onPress={() => navigation.goBack()}/>
        ),
        title: 'Profile',
        headerRight: <View/>
    });

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pushNotifications: true
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            this.setState({user: JSON.parse(value)})
        });
    }

    onPressOptions = () => {
        //this.props.navigation.navigate('options')
    };

    render() {
        return (

            <ScrollView style={styles.scroll}>
                <View style={styles.userRow}>
                    <View style={styles.userImage}>
                        <Avatar
                            rounded
                            size="medium"
                            source={this.state.user && this.state.user.photoURL ? {uri: this.state.user.photoURL} : defaultAvatar}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize: 16}}>{this.state.user ? this.state.user.firstname +" "+ this.state.user.lastname || this.state.user.fullname : "---"} </Text>
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 16,
                            }}
                        >
                            {this.state.user ? this.state.user.email : "---"}
                        </Text>
                    </View>
                </View>
                <InfoText text="Compte"/>
                <View>
                    <ListItem
                        hideChevron
                        title="Push Notifications"
                        containerStyle={styles.listItemContainer}
                        rightElement={
                            <Switch
                                onValueChange={() => this.setState({pushNotifications: !this.state.pushNotifications})}
                                value={this.state.pushNotifications}
                            />
                        }
                        leftIcon={
                            <BaseIcon
                                containerStyle={{
                                    backgroundColor: '#FFADF2',
                                }}
                                icon={{
                                    type: 'material',
                                    name: 'notifications',
                                }}
                            />
                        }
                    />
                    <ListItem
                        // chevron
                        title="Devise"
                        rightTitle="EURO"
                        rightTitleStyle={{fontSize: 15}}
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{backgroundColor: '#FAD291'}}
                                icon={{
                                    type: 'font-awesome',
                                    name: 'money',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                    <ListItem
                        title="Adresse"
                        rightTitle={this.state.user ? this.state.user.adress : "---"}
                        rightTitleStyle={{fontSize: 12}} 
                        onPress={() => this.onPressOptions()} 
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{backgroundColor: '#57DCE7'}}
                                icon={{
                                    type: 'material',
                                    name: 'place',
                                }}
                            />
                        }
                    />
                    <ListItem
                        title="Langue"
                        rightTitle="Français"
                        rightTitleStyle={{fontSize: 15}}
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{backgroundColor: '#FEA8A1'}}
                                icon={{
                                    type: 'material',
                                    name: 'language',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                </View>
                <InfoText text="Autre"/>
                <View>
                    <ListItem
                        title="A propos"
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{backgroundColor: '#A4C8F0'}}
                                icon={{
                                    type: 'ionicon',
                                    name: 'md-information-circle',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                    <ListItem
                        title="Termes et politiques"
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{backgroundColor: '#C6C7C6'}}
                                icon={{
                                    type: 'entypo',
                                    name: 'light-bulb',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                    <ListItem
                        title="Évaluez nous"
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        badge={{
                            value: 5,
                            textStyle: {color: 'white'},
                            containerStyle: {backgroundColor: 'gray', marginTop: 0},
                        }}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{
                                    backgroundColor: '#FECE44',
                                }}
                                icon={{
                                    type: 'entypo',
                                    name: 'star',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                    <ListItem
                        title="Envoyer FeedBack"
                        onPress={() => this.onPressOptions()}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{
                                    backgroundColor: '#00C001',
                                }}
                                icon={{
                                    type: 'materialicon',
                                    name: 'feedback',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                    <ListItem
                        title="Déconnexion"
                        onPress={() => {
                            GoogleSignin.signOut()
                            LoginManager.logOut();
                            AsyncStorage.clear();
                            RNRestart.Restart();
                            //this.props.navigation.navigate("Landing");
                        }}
                        containerStyle={styles.listItemContainer}
                        leftIcon={
                            <BaseIcon
                                containerStyle={{
                                    backgroundColor: 'red',
                                }}
                                icon={{
                                    type: 'materialicon',
                                    name: 'settings-power',
                                }}
                            />
                        }
                        rightIcon={<Chevron/>}
                    />
                </View>
            </ScrollView>


        );
    }
}
