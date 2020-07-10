/* eslint-disable comma-dangle */
import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View, Image
} from 'react-native';
import BackButton from '../../../components/BackButton/BackButton';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import { Icon, ListItem} from 'react-native-elements'
import RNRestart from 'react-native-restart';
import {Container, Content} from "native-base";
import Basket from "../../../components/Panier/Basket";
import {Header} from "react-native-elements";

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

const information = [
    {
        title:"Mon profil",
        icon:"user",
        typeIcon:"feather",
        iconColor:"#c0c0c0",
        to:"EditAccount"
    },
    {
        title:"Mes cartes",
        icon:"creditcard",
        typeIcon:"antdesign",
        iconColor:"#c0c0c0",
        to:"Cards"
    },
    {
        title:"Mes commandes",
        icon:"clipboard-list-outline",
        typeIcon:"material-community",
        iconColor:"#c0c0c0",
        to:""
    },
];
const settings = [
    {
        title:"Articles sauvgardés",
        icon:"hearto",
        typeIcon:"antdesign",
        iconColor:"#c0c0c0",
        to:""
    },
    {
        title:"Paramètres de l'application",
        typeIcon: "antdesign",
        icon:"setting",
        iconColor:"#c0c0c0",
        to:""
    },
    {
        title:"Se déconnecter",
        icon:"logout",
        typeIcon:"antdesign",
        iconColor:"red",
        to:"logout"
    }
];


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
            AsyncStorage.getItem("pwd").then( pwd => {
                this.setState({pwd:pwd,user:JSON.parse(value)})
            })
        });
    }

    render() {
        return (

            <Container>
                <Header
                    containerStyle={{
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    rightComponent={<Basket value={0}/>}
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Tableau de bord</Text>}
                />
                <Content>
                    <View>
                        <View style={{marginLeft:20,marginRight:20}}>
                            <View style={{marginTop:15}}>
                                <View style={{backgroundColor:"#F4F4F4",height:90,borderRadius:10,padding:5,paddingLeft:15}}>
                                    <View>
                                        <View style={{flexDirection:"row",marginTop:10}}>
                                            <View style={{width:"20%"}}>
                                                <Image source={require("../../../assets/images/defaultAvatar.png")} style={{height:60,width:60,resizeMode:"cover"}}/>
                                            </View>
                                            <View style={{width:"80%"}}>
                                                <Text style={{marginLeft:15,fontSize:17,marginTop:10}}>{"Bonjour, "+this.state.user.firstname+" "+this.state.user.lastname}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginTop:20}}>
                                <Text style={{fontSize:17,color:"#c0c0c0"}}>Information</Text>
                                <View style={{marginTop:10}}>
                                    {
                                        information.map((item, key) => (
                                            <ListItem
                                                leftElement={<Icon type={item.typeIcon} name={item.icon} color={item.iconColor}/>}
                                                bottomDivider={true}
                                                key={key}
                                                title={item.title}
                                                titleStyle={{fontSize:13,fontFamily:"sans-serif-medium"}}
                                                rightElement={<Icon type="entypo" name="chevron-right" iconStyle={{fontSize:16}} />}
                                                onPress={() => item.to !== "" && this.props.navigation.navigate(item.to)}
                                            />
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={{marginTop:15}}>
                                <Text style={{fontSize:17,color:"#c0c0c0"}}>Autres</Text>
                                <View style={{marginTop:10}}>
                                    {
                                        settings.map((item, key) => (
                                            <ListItem
                                                leftElement={<Icon type={item.typeIcon} name={item.icon} color={item.iconColor}/>}
                                                bottomDivider={true}
                                                key={key}
                                                title={item.title}
                                                titleStyle={{fontSize:13,fontFamily:"sans-serif-medium"}}
                                                rightElement={<Icon type="entypo" name="chevron-right" iconStyle={{fontSize:16}} />}
                                                onPress={() => {
                                                    if(item.to === "logout"){
                                                        GoogleSignin.signOut()
                                                        LoginManager.logOut();
                                                        AsyncStorage.clear();
                                                        RNRestart.Restart();
                                                    }else{

                                                    }
                                                }}
                                            />
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>



            /*<ScrollView style={styles.scroll}>
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
            </ScrollView>*/


        );
    }
}
