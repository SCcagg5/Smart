/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, TouchableHighlight, Text, ScrollView, Image, Text as TextReact} from 'react-native';
import styles from './styles';
import {Divider, ListItem, Overlay} from 'react-native-elements';
import profilIcon from "../../assets/icons/profilIcon.png"
import loveIcon from "../../assets/icons/love.png"
import survIcon from "../../assets/icons/surveillance.png"
import tradingIcon from "../../assets/icons/trading.png"
import coffreIcon from "../../assets/icons/coffre-fort.png"
import botIcon from "../../assets/images/botIcon.png"
import Chevron from "../../components/Chevron";
import {Button, Icon} from "native-base";

const list1 = [
  {
    id:'1',
    title: "Mon profil",
    image: profilIcon,
  },
  {
    id:'2',
    title: 'ChatBot',
    image: botIcon,
  }
];
const list2 = [
  {
    id:'1',
    title: "Coffres",
    subtitle:"Coffre fort des docs",
    image: coffreIcon,
  },
  {
    id:'2',
    title: 'Trading',
    subtitle:"Green Bonds",
    image: tradingIcon,
  },
  {
    id:'3',
    title: 'Liste de surveillance',
    image: survIcon,
  }
];
const list3 = [
  {
    id:'1',
    title: "Dons",
    image: loveIcon,
  }
];

export default class Dashboard extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginRight:15,marginLeft:15}}>

        {
          list1.map((l,key) => (
              <ListItem
                  leftAvatar={{source:l.image,overlayContainerStyle:{backgroundColor: '#fff'}}}
                  key={key}
                  title={l.title}
                  hideChevron
                  bottomDivider={true}
                  onPress={()=>{
                    l.id === '1' ? this.props.navigation.push("Profile") :
                        l.id === '2' ? this.props.navigation.push("ChatBot") : null
                  }}
                  rightIcon={<Chevron/>}
              />
          ))
        }
        <View style={{marginTop:25}}>

          {
            list2.map((l,key) => (
                <ListItem
                    leftAvatar={{source:l.image,overlayContainerStyle:{backgroundColor: '#fff'}}}
                    key={key}
                    title={l.title}
                    subtitle={l.subtitle || ""}
                    hideChevron
                    bottomDivider={true}
                    rightIcon={<Chevron/>}
                />
            ))
          }

        </View>

        <View style={{marginTop:40}}>

          {
            list3.map((l,key) => (
                <ListItem
                    leftAvatar={{source:l.image,overlayContainerStyle:{backgroundColor: '#fff'}}}
                    key={key}
                    title={l.title}
                    hideChevron
                    bottomDivider={true}
                    onPress={() => this.props.navigation.navigate("Dons")}
                    rightIcon={<Chevron/>}
                />
            ))
          }

        </View>


      </View>
    );
  }
}
