/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, FlatList, Text, ScrollView, Dimensions, Image, PermissionsAndroid } from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account } from '../../AppStyles';
import { Button, Icon, Text as TextNB } from "native-base";
import defaultConfig from "../../constants/defaultConfig"
import BackButton from '../../components/BackButton/BackButton';
import BaseIcon from '../../components/Icon'
import Contacts from 'react-native-contacts';
import Spinner from 'react-native-loading-spinner-overlay';
import { ButtonGroup, Divider, Avatar } from "react-native-elements"
import TextAvatar from "react-native-text-avatar"

const { width, height } = Dimensions.get('window');

class selectedContactScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const { params = {} } = navigation.state;  
        return {
            headerLeft: <BackButton onPress={() => navigation.goBack()} title="" />,
            title: "",
            headerRight: <View />
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            contact: this.props.navigation.state.params.contact,
            bond:this.props.navigation.state.params.bond
        };
    }

    componentWillMount() {


    }




    render() {

        return (
            <ScrollView style={styles.container}>
                <View style={account.facilitieContainer}>

                    <View style={{ height: "20%", width: "100%", backgroundColor: "#F0F9FE" }} />

                    <View style={{ alignItems: "center", marginTop: "-15%" }}>

                        {
                            this.state.contact.thumbnailPath === "" ?
                                <TextAvatar
                                    backgroundColor={
                                        Math.floor(Math.random() * 5) === 1 ? "#E91E63" :
                                            Math.floor(Math.random() * 5) === 2 ? "#2196F3" :
                                                Math.floor(Math.random() * 5) === 3 ? "#9C27B0" :
                                                    Math.floor(Math.random() * 5) === 4 ? "#3F51B5" :
                                                        Math.floor(Math.random() * 5) === 5 ? "#00BCD4" : "#F44336"
                                    }
                                    textColor={'#fff'}
                                    size={100}
                                    type={'circle'}

                                >
                                    {this.state.contact.displayName}
                                </TextAvatar> :

                                <Avatar
                                    size={100}
                                    rounded
                                    source={{ uri: this.state.contact.thumbnailPath }}
                                />
                        }
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", marginTop: 15 }}>{this.state.contact.displayName} </Text>


                    </View>

                    <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 20, height: 2 }} /> 

                    <View style={{ flexDirection: "row", marginLeft: "2.5%", marginRight: "2.5%", marginBottom: 20, marginTop: 20 }}>
                        <View style={{ width: "33.3%" }}>
                            <Button style={account.cercleBtnIcon} onPress={() => this.props.navigation.navigate("AmountBondToSendScreen",{contact:this.state.contact,bond:this.state.bond})} >
                                <Icon name='arrow-right' type="Feather" style={{ alignSelf: "center" }} />
                            </Button>
                            <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center" }}>Envoyer</Text>
                        </View>
                        <View style={{ width: "33.3%" }}>
                            <Button style={account.cercleBtnIcon}>
                                <Icon name='arrow-left' type="Feather" style={{ alignSelf: "center" }} />
                            </Button>
                            <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center", textTransform: "capitalize" }}>Demander</Text>
                        </View>
                        <View style={{ width: "33.3%" }}>
                            <Button style={account.cercleBtnIcon}>
                                <Icon name='users' type="Feather" style={{ alignSelf: "center" }} />
                            </Button>
                            <Text style={{ fontSize: 12, color: defaultConfig.primaryColor, alignSelf: "center" }}>Inviter</Text>
                        </View>     
                    </View>

                    <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 15, height: 5 }} />

                    <View style={{ flexDirection: "row", marginLeft: "2.5%", marginRight: "1%", marginTop: 25 }}>
                        <View style={{ width: "50%" }}>

                            <Text style={{ color: "grey", fontSize: 16 }}>Téléphone:</Text>

                        </View>

                        <View style={{ width: "50%" }}>
                            <Text style={{ color: "#000", fontSize: 15, alignSelf: "flex-end", fontWeight: "bold" }}>{this.state.contact.phoneNumbers[0].number} </Text>
                        </View>

                    </View>
                    <Divider style={{ backgroundColor: '#F0F0F0', marginTop: 25, height: 3 }} />

                    <Divider style={{ backgroundColor: '#F3F4F6', height: 70 }}> 
                        <Text style={{alignSelf:"center",color:"#267DDA",fontSize:15,marginTop:25}}>Un problème ? Contactez-nous !</Text>
                    </Divider>




                </View>

            </ScrollView>
        );
    }
}



export default selectedContactScreen;
