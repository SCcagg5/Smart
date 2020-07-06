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
    Card
} from 'react-native';
import  {Text as TT}   from 'react-native-svg'



import {Container, Content, Header} from "native-base";

import * as firebase from "firebase";







class wines extends Component {
    constructor () {
        super()

        this.state = {
            search: '',
            selectedIndex:1,
            wines:[]

        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount(): void {
        firebase.database().ref("dataM").on("value", (snapshot) => {
            let recettes = snapshot.val();
            let rets =[]
            for (let i =0 ;i<recettes.length;i++){

                rets.push(recettes[i])

            }

            this.setState(   {wines:rets})

            console.log(rets)


        });
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
        const { selectedIndex } = this.state

        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content >




                    <View style={{backgroundColor:"#a6a6a6",height:2 , width:"90%", marginRight:"auto",marginLeft:"auto",marginTop:"5%"}}/>





                   <ScrollView>

                       {this.state.wines.map((item ,key) =>


                           <TouchableOpacity onPress={()=>this.props.navigation.navigate("wine",{recette:this.state.wines[key]})} style={{flexDirection:"row",marginLeft:"auto",marginRight:"auto" , borderWidth:0.5,borderRadius:5,padding:5}}  >
                               <View style={{width:"40%" }}>
                                   <Image source={{uri:item.imageUrl}} style={{width:120,height:150}}/>
                               </View>

                               <View style={{width:"50%", flexDirection:"column"}}>

                                   <View style={{alignItems:"center"}}>
                                       <Text style={{color:"#981b1a",fontSize:18,fontWeight:"bold",textAlign:"center"}}> {item.nom} </Text>
                                   </View>

                                   <View style={{marginTop:"20%",alignItems:"center"}}>

                                       <Text style={{fontSize:20,fontWeight:"bold"}}>
                                           {item.prixF} €
                                       </Text>


                                   </View>

                               </View>





                           </TouchableOpacity>


                       )}


                   </ScrollView>

















                </Content>
            </Container>
        );
    }
}

export default wines;
