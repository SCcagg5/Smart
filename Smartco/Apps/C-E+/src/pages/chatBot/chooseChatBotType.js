import React from 'react';
import {Body, Button, Container, Content, Header, Icon, Left, Title} from "native-base";
import {
    AsyncStorage,
    View,
    Text as TextReact,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native"


class chooseChatBotType extends React.Component {


    state = {};


    render() {

        return (

            <Container>

                <Content>

                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('BotVocal');
                    }}>
                        <View style={{alignItems: 'center'}}>
                            <Image style={{width: 120, height: 120, marginTop: 120}}
                                   source={require('../../assets/images/botcall.jpg')}/>
                            <TextReact style={{fontWeight: 'bold', marginTop: 5, color: "#00cc7f", fontSize: 18}}>Convertation vocale
                            </TextReact>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('BotMsg');
                    }}>
                        <View style={{alignItems: 'center'}}>
                            <Image style={{width: 100, height: 100, marginTop: 130}}
                                   source={require('../../assets/images/botMsg.png')}/>
                            <TextReact style={{fontWeight: 'bold', marginTop: 5, color: "#00cc7f", fontSize: 18}}>Convertation textuelle</TextReact>
                        </View>
                    </TouchableOpacity>

                </Content>


            </Container>
        )

    }


}


export default chooseChatBotType;
