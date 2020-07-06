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




class commander extends Component {
    constructor (props) {
        super(props)

        this.state = {
            search: '',
            quantite:1,
            total:0,
            recette:"",
            btnspinner:false



        }

    }

    componentDidMount(): void {
        const {recette} = this.props.navigation.state.params
        this.setState({recette:recette,total:recette.prixF})

    }
add(){
        let quantite=this.state.quantite+1
        let prix= this.state.recette.prixF
        let total= quantite*prix
   this.setState({quantite:quantite,total:total})

    }

    minimise(){
        let quantite=this.state.quantite-1
        let prix= this.state.recette.prixF
        let total= quantite*prix
        this.setState({quantite:quantite,total:total})
    }


reservation(){
        this.setState({btnspinner:true})
    fetch('https://api.smartdom.ch/website/quinsac/cart/',
        {
            method:'POST',
            headers:{

                "Cache-Control":"no-cache",
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Accept-Encoding":"gzip, deflate, br",
                "Connection":"keep-alive",


            },
            body:JSON.stringify( {
                "command": [
                    {
                        "id": this.state.recette.id,
                        "number": this.state.quantite
                    }
                ]
            })





        }).then(response => response.json()).then(data =>{
        if (data.succes===true){
            console.log(data.data.cmd_token)
            this.props.navigation.navigate("selectCard",{recette:this.state.recette,quantite:this.state.quantite,total:this.state.total,cmdtoken:data.data.cmd_token})

            this.setState({btnspinner:false})

        }else{
            this.setState({btnspinner:false})

            console.log(data)
        }


    })
}

    render() {

        const {recette} = this.props.navigation.state.params


        return (
            <Container>
                <Header style={{backgroundColor: "#fff", height: 68 ,justifyContent:"center"}}>
                    <Image style={{width: 180, height: 80, resizeMode: "contain"}}
                           source={require('../../assets/images/logo.png')}/>
                </Header>
                <Content  >

                    <ScrollView >

                        <View style={{justifyContent:"center" ,flexDirection:"row",marginTop:"10%"}}>
                            <Image source={{uri:recette.imageUrl}} style={{width:150,height:160}}/>


                        </View>
                        <View style={{backgroundColor:"#319fe1",height:3,width:"90%",marginLeft:"auto",marginRight:"auto",borderRadius:100,marginTop:"5%"}}>

                        </View>

                        <View style={{flexDirection:"row" ,padding:10,width:"80%"}}>
                            <Text style={{fontWeight:"bold"}}>
                                Options:
                            </Text>
                            <Text style={{marginLeft:2}}>
                                Commandes des autres ingredients de la recette via Thomas Livraison
                            </Text>
                        </View>

                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>

                            <TouchableOpacity disabled={this.state.quantite===1} onPress={()=>this.minimise()}  style={{width:60,height:60,backgroundColor:"#355b52",borderRadius:555555}}>

                                <Text style={{position:"absolute",fontSize:50,color:"white",left:23,bottom:1}}>
                                    -
                                </Text>

                            </TouchableOpacity>

                            <View style={{marginLeft:20,marginRight:20}}>
                                <Text style={{fontSize:75}}>
                                    {this.state.quantite}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.add()} style={{width:60,height:60,backgroundColor:"#355b52",borderRadius:555555}}>

                                <Text style={{position:"absolute",fontSize:35,color:"white",left:20,bottom:8}}>
                                    +
                                </Text>

                            </TouchableOpacity>

                        </View>

                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>

                            <Text style={{fontSize:18,marginRight:10}}>
                                Total:
                            </Text>
                            <Text style={{fontSize:35,fontWeight:"bold",color:"#355b52"}}>
                                {this.state.total}
                            </Text>

                        </View>

                        <View style={{flexDirection:"row",justifyContent:"center",marginTop:"10%"}}>

                            <Button loading={this.state.btnspinner} onPress={()=>this.reservation()} title="Reservation" buttonStyle={{width:"100%",borderRadius:100,backgroundColor:"#355b52"}}/>



                        </View>
                    </ScrollView>











                </Content>
            </Container>
        );
    }
}

export default commander;
