import React from 'react';
import {View, Image, AsyncStorage, Text, ActivityIndicator} from "react-native";
import {Container,Header,Content} from "native-base";
import {ListItem,Divider} from "react-native-elements";

const operationsList = [
    {
        title: 'Assemblées générales',
        desc: 'AG, AGE, Board',
        name: 'op_transTitres',
        id: 0
    },
    {
        title: 'Transfert de titre',
        desc: 'Inscrire une transaction dans le registre (échange, donations, apport,...)',
        name: 'op_transTitres',
        id: 1
    },
    {
        title: 'Emission de titre',
        desc: 'Création de minibons (BSA, BSPCE, Bonds obligations, Bonds HSE,...)',
        name: 'op_emmisionTitres',
        id: 2
    },
    {
        title: 'Augmentation de capital',
        desc: 'PV AGE, PV gérant, Bulletins souscription ,...',
        name: 'op_emmisionTitres',
        id: 8
    },
    {
        title: 'Transformation société',
        desc: 'SARL vers SA ,...',
        name: 'op_emmisionTitres',
        id: 9
    },
    {
        title: "Création d'une société filiale",
        desc: "Création d'une société filiale controlée par la société mère",
        name: 'newEntreprise',
        id: 0
    },
    {
        title: "Création d’un Utility Token ( ICO ) ",
        desc: "Création de jetons d’usage de services ",
        name: '',
        id: 10
    },
    {
        title: 'Convertir / Exercer un titre',
        desc: 'Exercer les droits relatifs à une action, un bon.',
        name: '',
        id: 3
    },
    {
        title: 'Nantissement de titre',
        desc: 'Inscription / modification des titres nantis.',
        name: '',
        id: 4
    },
    {
        title: 'Réduction de capital',
        desc: 'réduire manuellement les titres de la société.',
        name: '',
        id: 5
    },
    {
        title: 'Prêt de titre',
        desc: 'Prêt de titre entre actionnaires',
        name: '',
        id: 6
    },
    {
        title: 'Annuler une transaction',
        desc: 'Inscrire une annulation dans le registre',
        name: '',
        id: 7
    },

];

export default class Journal extends React.Component{

    state={
        user:""
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            this.setState({user: JSON.parse(value)})
        });
    }

    render() {
        const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        return(
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68}}>
                    <Image style={{width: 100, height: 45, marginTop: 10,resizeMode:"contain"}}
                           source={require('../../assets/images/rocket_logo.jpeg')}/>
                </Header>
                <Content>
                </Content>
            </Container>
        )
    }

}

