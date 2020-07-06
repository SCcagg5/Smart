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
    View
} from 'react-native';
import { Button ,ButtonGroup,Icon} from 'react-native-elements'
import {Container, Content, Header} from "native-base";




class Wine extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search: '',

        }

    }


    render() {

        const {recette} = this.props.navigation.state.params

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
        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content  >

                    <ScrollView >

                        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-around"}}>

                            <Text style={{color:"#13ba4b",fontSize:30,fontWeight:"bold",textAlign:"left",width:"60%"}}> {recette.nom} </Text>
                            <View>
                            <Text style={{fontSize:30,fontWeight:"bold",color:"#ef5ea7"}}>
                                {recette.prixF}
                            </Text>
                                <Button
                                    onPress={()=>this.props.navigation.navigate("Preparation",{video:recette.video})}
                                    containerStyle={{width:"100%"}}
                                    buttonStyle={{backgroundColor:"#ef5ea7",borderRadius:100}}
                                    title="Video"

                                />
                            </View>
                        </View>


                        <View     style={{flexDirection:"row",marginLeft:"auto",marginRight:"auto" ,padding:5}}  >
                        <View style={{width:"60%" }}>
                            <Image source={{uri:recette.imageUrl}} style={{width:150,height:160}}/>
                        </View>

                        <View style={{width:"30%", flexDirection:"column"}}>



                        </View>




                    </View>




                       <View style={{padding:10}}>
                           <View style={{flexDirection:"row-reverse"}}>
                           <Image source={require('../../assets/images/solaire.jpeg')} style={{width:100,height:200,marginRight:"15%"}}/>
                           <View style={{backgroundColor:"#981b1a",position:"absolute",padding:10,borderRadius:100,left:"1%",top:"25%"}}>
                               <Text style={{color:"white"}}>
                                   {recette.panneaux}
                               </Text>
                           </View>
                           </View>
                       </View>


                        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                            <Button

                                containerStyle={{width:"50%",justifyContent:"space-around"}}
                                buttonStyle={{backgroundColor:"#f41a4c",borderRadius:100}}

                                icon={
                                    <Icon

                                        name='star'
                                        style={{marginRight:10}}
                                        size={15}
                                        color="white"
                                        type="font-awesome"
                                    />
                                }
                                title="SAUVEGARDÉE"
                            />
                            <Button

                                containerStyle={{justifyContent:"space-around"}}
                                buttonStyle={{backgroundColor:"white",borderRadius:100,borderWidth:2,borderColor:"#887db3"}}
                                titleStyle={{color:"#887db3"}}

                                icon={
                                    <Icon


                                        name='share'
                                        style={{marginRight:10}}
                                        size={15}
                                        color="#887db3"
                                        type='material'
                                    />
                                }
                                title="PARTAGER"
                            />
                        </View>
                        <View style={{marginRight:"auto",marginLeft:"auto",marginTop:5}}>
                            <Button
                                onPress={()=>this.props.navigation.navigate("commander",{recette:recette})}

                                containerStyle={{width:"70%",justifyContent:"space-around"}}
                                buttonStyle={{backgroundColor:"#13ba4b",borderRadius:100}}


                                title="Commander nos produits !"
                            />

                        </View>
                        <View style={{height:5}}>

                        </View>


                    </ScrollView>











                </Content>
            </Container>
        );
    }
}

export default Wine;
