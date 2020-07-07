/* eslint-disable comma-dangle */
import React from 'react';
import { View, TouchableHighlight, FlatList, Text, ScrollView, Dimensions, Image } from 'react-native';
import Card2View from '../../components/Card2View/Card2View';
import styles from './styles';
import { account } from '../../AppStyles';
import { Button, Icon, Text as TextNB } from "native-base";
import defaultConfig from "../../constants/defaultConfig"
import BackButton from '../../components/BackButton/BackButton';
import BaseIcon from '../../components/Icon'

const { width, height } = Dimensions.get('window');

class transfertBondFirstScreen extends React.Component {

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
        this.state={
            bond: this.props.navigation.state.params.bond
        }
    }




    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={account.facilitieContainer}>

                    <View style={{ marginTop: 30 }}>
                        <Image
                            style={{
                                width: 200,
                                height: 200,
                                alignSelf: "center"
                            }}
                            source={require('../../assets/images/transfersc.png')}
                        />

                        <View style={{ justifyContent: "center", marginTop: 30, marginLeft: 25, marginRight: 25 }}>

                            <Text style={{ alignSelf: "center", color: "#000", fontWeight: "bold", fontSize: 16 }}>
                                Le nouveau moyen pour
                        </Text>
                            <Text style={{ alignSelf: "center", color: "#000", fontWeight: "bold", fontSize: 16 }}>
                                envoyer et demander des Green
                        </Text>
                            <Text style={{ alignSelf: "center", color: "#000", fontWeight: "bold", fontSize: 16 }}>
                                Bonds simplement
                        </Text>

                            <Text style={{ marginTop: 15, alignSelf: "center", color: "#C0C0C0", fontSize: 12, justifyContent: "center" }}>
                                Créer un lien de transfert pour envoyer ou demander des bonds à n'importe qui, même s'ils ne sont pas encore
                            chez <Text style={{ color: "#000", fontWeight: "bold" }}>Gilet verts !</Text>
                            </Text>

                            <View style={{ marginRight: 20, marginLeft: 20, marginTop: 50 }}>

                                <Button rounded block style={{ backgroundColor: "#EA008D" }}
                                    onPress={() => this.props.navigation.navigate("TransferBondContactList",{bond:this.state.bond})}>

                                    <TextNB style={{ color: "#fff", fontWeight: "bold" }}>J'ai compris</TextNB>

                                </Button>

                            </View>



                        </View>



                    </View>

                </View>

            </ScrollView>
        );
    }
}



export default transfertBondFirstScreen;
