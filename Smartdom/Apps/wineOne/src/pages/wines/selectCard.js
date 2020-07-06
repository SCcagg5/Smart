import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Card,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements'

import  {Text as TT}   from 'react-native-svg'



import {Container, Content, Header} from "native-base";

import CreditCard from "../../../custom_modules/react-native-credit-card";
import DropdownAlert from "react-native-dropdownalert";







class selectCard extends Component {
    constructor () {
        super()

        this.state = {
            search: '',
            selectedIndex:1,
            user:"",
            cards:[],
            recette:"",
            quantite:"",
            cmdtoken:""


        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {

        const {recette,quantite,total,cmdtoken} = this.props.navigation.state.params

        this.setState({recette:recette,quantite:quantite,total:total,cmdtoken:cmdtoken})

        fetch('https://api.smartdom.ch/listcard/',
            {
                method:'GET',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                this.setState({cards:data.data.cards})

                console.log(this.state.cards[1].exp_month.toString())



            }else{
                console.log(data)
            }


        })


    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        fetch('https://api.smartdom.ch/listcard/',
            {
                method:'GET',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                this.setState({cards:data.data.cards})





            }else{
                console.log(data)
            }


        })
    }

    payment(crdtoken){
        fetch('https://api.smartdom.ch/order/',
            {
                method:'POST',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },
                body:JSON.stringify({ "cmd_token":this.props.navigation.state.params.cmdtoken,
                    "crd_token":crdtoken})





            }).then(response => response.json()).then(data =>{
            if (data.succes===true){
                console.log(data)


                this.dropDownAlertRef.alertWithType('success', 'Félicitation',
                    "Payment a ete effectue avec succes")

                setTimeout(()=>{this.props.navigation.goBack()}, 1000)





            }else{

                console.log(data)
            }


        })

    }

    alert(crdToken){
        Alert.alert(
            "Payment ",
            "Voulez-vous payer avec cette card ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OUI", onPress: () => this.payment(crdToken)}
            ],
            { cancelable: false }
        );

    }
    deletecard(crdToken){

        fetch('https://api.smartdom.ch/delcard/',
            {
                method:'POST',
                headers:{

                    "Cache-Control":"no-cache",
                    "Content-Type":"application/json",
                    "Accept":"*/*",
                    "Accept-Encoding":"gzip, deflate, br",
                    "Connection":"keep-alive",


                },
                body:JSON.stringify(
                    {
                        crd_token:crdToken
                    }
                )




            }).then(response => response.json()).then(data =>{
            if (data.succes===true){



            }else{
                console.log(data)
            }


        })

    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }


    updateSearch = search => {
        this.setState({ search });
    };
    render() {
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <TT
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={12}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </TT>
                )
            })
        }

        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#ff5859' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#a8d335' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#388aca' }
            },

        ]
        const { search } = this.state;
        const buttons = ['RECETTES', 'REPAS', 'ALIMENTS']
        const { selectedIndex ,cards} = this.state

        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content style={{height: 100}} >




                    <View style={{backgroundColor:"#a6a6a6",height:2 , width:"90%", marginRight:"auto",marginLeft:"auto",marginTop:"5%"}}/>


                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:"10%"}}>
                        <Text  style={{fontWeight:"bold",fontFamily:"serif",fontSize:20 ,textAlign:"center"}}>
                            Choisissez votre carte pour le payment
                        </Text>
                    </View>





                    <ScrollView>


                        {
                            cards.map((item,key)=>

                                <TouchableOpacity onLongPress={()=>{ this.alert(item.crd_token)

                                }}  style={{marginLeft: 25, marginBottom: 15, marginTop: 20,padding:10}}>



                                    <CreditCard


                                        shiny={false}
                                        bar={true}
                                        focused={null}
                                        number={"************"+item.last4}
                                        name={item.brand}
                                        expiry="07/21"
                                        cvc="465"/>

                                    <View style={{position:"absolute",right:30,top:10}}>
                                        <Icon

                                            name='arrow-circle-right'
                                            type='font-awesome'
                                            color='white'
                                            size={25}
                                            onPress={()=>{ this.alert(item.crd_token)}}

                                            />
                                    </View>
                                </TouchableOpacity>
                            )
                        }

                    </ScrollView>

















                </Content>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
            </Container>
        );
    }
}

export default selectCard;
