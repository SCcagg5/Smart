import React from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity, AsyncStorage} from "react-native";
import {Header, Icon} from "react-native-elements";
import {Container, Content} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import SmartService from "../../provider/SmartService";
import moment from "moment";

export default class Orders extends React.Component {

    state = {
        loading:true,
        orders:[]
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)

            SmartService.getToken().then(res => {
                if (res.succes === true && res.status === 200) {
                    AsyncStorage.getItem("pwd").then(pwd => {
                        SmartService.login({
                            email: user.email,
                            password1: pwd
                        }, res.data.token).then(result => {
                            if (result.succes === true && result.status === 200) {

                                SmartService.getOrders(res.data.token,result.data.usrtoken).then( orders => {
                                    console.log(orders);
                                    if (orders.succes === true && orders.status === 200) {
                                        let ordersCp = orders.data.orders || []
                                        ordersCp.map( (order,key) => {
                                            SmartService.getOrderDetail({order_id:order.id},res.data.token,result.data.usrtoken).then( orderDetail => {
                                                let orderDet = orderDetail.data.order;
                                                ordersCp[key].details = orderDet
                                                this.setState({orders:ordersCp})
                                            }).catch( err => {
                                                alert(err)
                                                this.setState({loading:false})
                                            })
                                        })
                                        setTimeout(() => {
                                            this.setState({loading:false})
                                        },2000)

                                    }else{
                                        alert(orders.error)
                                        this.setState({loading:false})
                                    }

                                }).catch(err => {
                                    alert(err)
                                    this.setState({loading:false})
                                })

                            } else {
                                alert(result.error)
                                this.setState({loading:false})
                            }
                        }).catch(err => {
                            alert(err)
                            this.setState({loading:false})
                        })
                    })
                } else {
                    alert(res.error)
                    this.setState({loading:false})
                }
            }).catch(err => {})
        })

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
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon type="material" name="arrow-back" color="#000"/>
                        </TouchableOpacity>
                    }

                    centerComponent={<Text style={{fontWeight: "bold", fontSize: 14}}>Mes commandes</Text>}
                />
                <Content style={{backgroundColor:"#f0f0f0"}}>
                    <View style={{marginRight: 15, marginLeft: 15, marginTop: 20}}>
                        {
                            (this.state.orders || []).map((order,key) =>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("OrderDetail",{order:order})}>
                                    <View style={{backgroundColor: "#fff", padding: 10, borderRadius: 10,paddingTop:20,paddingBottom:20,marginBottom:15}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{width: "15%"}}>
                                                <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: "#E4F8ED",justifyContent:"center",alignItems:"center"}}>
                                                    <Text style={{color:"#01BA54",fontWeight:"bold",fontSize:30,marginTop:-2}}>•</Text>
                                                </View>
                                            </View>
                                            <View style={{width: "65%"}}>
                                                <Text style={{color: "#387DE2", fontFamily: "sans-serif-medium"}}>#{order.id}</Text>
                                                <Text style={{color: "#000", fontFamily: "sans-serif-medium",marginTop:10,letterSpacing:0.3}}>
                                                    Fait avec votre carte</Text>
                                                <Text style={{color: "#c0c0c0",marginTop:10,fontSize:12,textTransform:"capitalize"}}>
                                                    {moment(parseInt(order.date)).format("dddd DD MMMM YYYY")}</Text>
                                            </View>
                                            <View style={{width: "20%"}}>
                                                <Text style={{color:"#01BA54",fontFamily:"sans-serif-medium",fontSize:12}}>{order.details ? order.details.payment.amount :""} €</Text>
                                                <View style={{marginTop:15}}>
                                                    <Icon type="material" name="keyboard-arrow-right"/>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            )
                        }

                    </View>
                </Content>


                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color:"#fff",fontSize:16}}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                />
            </Container>


        )
    }

}

