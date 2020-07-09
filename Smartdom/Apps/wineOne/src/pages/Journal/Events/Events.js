import React from 'react';
import {View, ActivityIndicator, Text} from "react-native";
import {Header} from "react-native-elements";
import moment from "moment";
import * as firebase from "firebase";
import "moment/locale/fr"
moment.locale("fr")
import EventItem from "../../../components/EventItem/EventItem";
import Spinner from "react-native-loading-spinner-overlay";
/*const events = [
    {
        name:"",
        desc:"",
        type:"Assemblée générale ordinaire",
        date_debut:moment().add(3,"d"),
        date_fin:moment().add(10,"d"),
        adress_phy:"20 B rue de luis Philipe, 698541 neilly sur seine",
        adress_virt:"https://meet.smartdom.ch/babba123456",
        docs:[
            {
                name:"Age.pdf",
                created_at:moment().subtract(5,"day"),
                url:"http://51.158.97.220:3003/uploads/docs/test1_05072020_122720.pdf",
            },
            {
                name:"Statut.pdf",
                created_at:moment().subtract(5,"day"),
                url:"http://51.158.97.220:3003/uploads/docs/test1_05072020_122720.pdf",
            }
        ],
        questions:[
            {
                question:"Approbation du compte",
                responses:["Pour","Contre","Abstention"],
                votes:[]
            },
            {
                question:"affectation du résultat",
                responses:["Pour","Contre","Abstention"],
                votes:[
                   /!* {
                        actioMail:"",
                        vote:"",
                    }*!/
                ]
            }
        ]
    },
    {
        name:"",
        desc:"",
        type:"Advisory Board Meeting",
        date_debut:moment().add(3,"day"),
        date_fin:moment().add(10,"day"),
        adress_phy:"20 B rue de luis Philipe, 698541 neilly sur seine",
        adress_virt:"https://meet.smartdom.ch/babba123456",
        docs:[
            {
                name:"Age.pdf",
                created_at:moment().subtract(5,"day"),
                url:"http://51.158.97.220:3003/uploads/docs/test1_05072020_122720.pdf",
            }
        ],
        questions:[
            {
                question:"Approbation du compte",
                responses:["Pour","Contre","Abstention"],
                votes:[]
            },
            {
                question:"affectation du résultat",
                responses:["Pour","Contre","Abstention"],
                votes:[
                    /!* {
                         actioMail:"",
                         vote:"",
                     }*!/
                ]
            }
        ]
    }
]*/

export default class Events extends React.Component{

    state={
        loading:true,
        society:this.props.navigation.state.params.society,
        events:[]
    }

    componentDidMount() {
       firebase.database().ref("/events").on("value",(snapshot) => {
           let events = snapshot.val();
           console.log(this.props.navigation.state.params.society.uidS);
           let socEvents = events.filter(x => x.uidS === this.props.navigation.state.params.society.uidS) || [];
           console.log(socEvents)
           this.setState({events:socEvents,loading:false})
       })
    }


    render() {
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
                    centerComponent={<Text style={{fontWeight:"bold",fontSize:14}}>Événements</Text>}
                />
                {
                    this.state.loading === false && this.state.events.length === 0 &&
                        <Text style={{marginTop:"50%",alignSelf:"center",color:"grey",fontSize:16}}>Aucun événement pour le moment ! </Text>
                }

                <View style={{marginTop:30,marginRight:20,marginLeft:20}}>
                    {
                        this.state.loading === false && (this.state.events || []).map((item,key) =>
                            <EventItem title={item.type} date={moment(item.date_debut).format("dddd DD MMMM HH:mm") +" à "+moment(item.date_fin).format("HH:mm")}
                                       dateFin={item.date_fin}
                                       finished={moment(item.date_debut) < moment()}
                                       onPressBtnVote={() => this.props.navigation.navigate("EventDetail",{event:item,eventIndex:key})}
                                       adress_phy={item.adress_phy} adress_virt={item.adress_virt} docs={item.docs}
                            />
                        )
                    }
                </View>

                <Spinner
                    visible={this.state.loading}
                    textContent={'Chargement...'}
                    textStyle={{color: "#fff", fontSize: 16}}
                    overlayColor="rgba(0, 0, 0, 0.6)"
                />
            </View>
        )
    }

}

