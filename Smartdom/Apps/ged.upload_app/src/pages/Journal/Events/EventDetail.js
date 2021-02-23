import React from 'react';
import {View, ActivityIndicator, Text, Dimensions, AsyncStorage} from "react-native";
import {Header, Overlay, CheckBox, Button, Icon} from "react-native-elements";
import EventItem from "../../../components/EventItem/EventItem";
import moment from "moment";
import * as firebase from "firebase";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class EventDetail extends React.Component{

    state={
        user:"",
        event:this.props.navigation.state.params.event,
        eventIndex:this.props.navigation.state.params.eventIndex,
        showVoteModal:false
    }

    componentDidMount() {
        AsyncStorage.getItem("user").then(value => {
            let user = JSON.parse(value)
            this.setState({user: user});
        });
    }


    onPresCheckbox = (key,vote) => evt => {
        let event = this.state.event;
        let questions = event.questions || [];
        let question = questions[key];
        let votes = question.votes || [];
        let find = votes.find(x => x.actioMail === this.state.user.email);
        if(find === undefined || find === null){
            votes.push({actioMail:this.state.user.email,vote:vote})
            questions[key]['votes'] = votes;
            event[questions] = questions;
            this.setState({event:event})
        }else{
            let findIndex = votes.findIndex(x => x.actioMail === this.state.user.email);
            find["vote"] = vote;
            votes[findIndex] = find;
            questions[key]['votes'] = votes;
            event[questions] = questions;
            this.setState({event:event})
        }
    }


    render() {
        //calcul Votes
        let Pour = 0;
        let Contre = 0;
        let event = this.state.event;
        (event.questions || []).map((question,key1) => {
            (question.votes || []).map((vote,key2) => {
                vote.vote === "Pour" ? Pour++ : Contre++ ;
            })
        })

        return(
            <View>
                <Header
                    containerStyle={{
                        height: 55,
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        paddingBottom: 20
                    }}
                    leftComponent={{
                        icon: 'arrow-back', type: "material", color: '#000', onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }}
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Détails Événement</Text>}
                />
                <View style={{marginTop:30,marginRight:20,marginLeft:20}}>
                    <EventItem title={this.state.event.type}
                               date={moment(this.state.event.date_debut).format("dddd DD MMMM HH:mm") +" à "+moment(this.state.event.date_fin).format("HH:mm")}
                               dateFin={this.state.event.date_fin}
                               finished={moment(this.state.event.date_debut) < moment()}
                               showDocs={true} onPressBtnVote={() => this.setState({showVoteModal:true})}
                               adress_phy={this.state.event.adress_phy} adress_virt={this.state.event.adress_virt} docs={this.state.event.docs}/>
                </View>


                <Overlay isVisible={this.state.showVoteModal} width={width-40} height={height-140}
                         onBackdropPress={() => this.setState({showVoteModal:false})}>
                    {
                        moment(this.state.event.date_debut) > moment() ?
                            <View>
                                <Text style={{fontSize:15,fontWeight:'bold',color:'#00cc7f',alignSelf:"center",marginTop:10}}>Indiquer votre choix de vote</Text>
                                <View style={{height:2,marginTop:15,marginBottom:15,backgroundColor:"#f0f0f0"}}/>
                                <View style={{marginTop:15}}>
                                    {
                                        (this.state.event.questions || []).map((question,key) =>
                                            <View style={{marginLeft:5,marginRight:15,marginBottom:15}}>
                                                <Text style={{fontWeight:"bold",fontSize:12,color:"#00cc7f",letterSpacing:0.4}}>
                                                    Résolution {key + 1}: <Text style={{color:"#000"}}>{question.question}</Text></Text>
                                                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                                                    <CheckBox title='Pour' textStyle={{fontSize:12}}
                                                              containerStyle={{backgroundColor:"#fff",borderWidth:0,padding:0}} checkedColor="#00cc7f"
                                                              checked={question.votes && (question.votes || []).find(x => x.actioMail === this.state.user.email && x.vote === "Pour")}
                                                              onPress={this.onPresCheckbox(key,"Pour")}
                                                    />
                                                    <CheckBox title='Contre' textStyle={{fontSize:12}}
                                                              containerStyle={{backgroundColor:"#fff",borderWidth:0,padding:0}} checkedColor="#00cc7f"
                                                              checked={question.votes && (question.votes || []).find(x => x.actioMail === this.state.user.email && x.vote === "Contre")}
                                                              onPress={this.onPresCheckbox(key,"Contre")}
                                                    />
                                                    <CheckBox title='Abtention' textStyle={{fontSize:12}}
                                                              containerStyle={{backgroundColor:"#fff",borderWidth:0,padding:0}} checkedColor="#00cc7f"
                                                              checked={question.votes && (question.votes || []).find(x => x.actioMail === this.state.user.email && x.vote === "Abtention")}
                                                              onPress={this.onPresCheckbox(key,"Abtention")}
                                                    />
                                                </View>
                                                <View style={{height:2,marginTop:15,marginBottom:15,backgroundColor:"#f0f0f0"}}/>
                                            </View>
                                        )
                                    }
                                    <View style={{marginTop:20,alignItems:"center"}}>
                                        <Button title="Effectuer le vote"
                                                buttonStyle={{width: (width / 2 - 50), height: 35, backgroundColor: "#00cc7f"}}
                                                titleStyle={{fontSize: 13, color: "#fff", fontWeight: "bold"}}
                                                onPress={() => {
                                                    firebase.database().ref("/events/"+this.state.eventIndex).update({
                                                        "questions":this.state.event.questions || []
                                                    }).then( ok => {
                                                        this.setState({showVoteModal:false})
                                                        setTimeout(()=> {alert("Votre vote est bien sauvgardé")},1500)
                                                    }).catch( err => console.log(err))
                                                }}
                                        />
                                    </View>
                                </View>
                            </View>  :



                            <View>
                                <Text style={{fontSize:22,fontWeight:'bold',color:'#00cc7f',alignSelf:"center",marginTop:40,textTransform:"uppercase"}}>
                                    Résultat des votes</Text>
                                <View style={{marginTop:25}}>
                                    <View style={{flexDirection:"row",justifyContent:"center"}}>
                                        <View style={{width:80,height:80,borderWidth:1,borderColor:"#d3d3d3",padding:5}}>
                                            <Text style={{alignSelf:"center",fontSize:18,fontWeight:"bold",color:"#00cc7f"}}>Pour</Text>
                                            <Text style={{alignSelf:"center",fontSize:34,fontWeight:"bold",color:"#00cc7f"}}>{Pour}</Text>
                                        </View>
                                        <View style={{width:80,height:80,borderWidth:1,borderColor:"#d3d3d3",marginLeft:30,padding:5}}>
                                            <Text style={{alignSelf:"center",fontSize:18,fontWeight:"bold",color:"#000"}}>Contre</Text>
                                            <Text style={{alignSelf:"center",fontSize:34,fontWeight:"bold",color:"#000"}}>{Contre}</Text>
                                        </View>
                                    </View>
                                    {
                                        Pour > Contre ?
                                            <View style={{marginTop:65}}>
                                                <Text style={{fontWeight:"bold",fontSize:18,alignSelf:"center",letterSpacing:0.4}}>
                                                    Résolution <Text style={{color:"#00cc7f"}}>adoptée !</Text> </Text>
                                                <Icon type="antdesign" name="checkcircleo" size={54} color="#00cc7f" iconStyle={{alignSelf:"center",marginTop:20}}/>
                                            </View>  :

                                            <View style={{marginTop:65}}>
                                                <Text style={{fontWeight:"bold",fontSize:18,alignSelf:"center",letterSpacing:0.4}}>
                                                    Résolution <Text style={{color:"red"}}> non adoptée !</Text> </Text>
                                                <Icon type="antdesign" name="closecircleo" color="red" size={54} iconStyle={{alignSelf:"center",marginTop:20}}/>
                                            </View>
                                    }
                                </View>
                            </View>
                    }

                </Overlay>
            </View>
        )
    }

}

