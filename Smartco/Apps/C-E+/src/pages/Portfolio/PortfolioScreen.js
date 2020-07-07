/* eslint-disable comma-dangle */
import React from 'react';
import { View, Text, ScrollView, FlatList, Dimensions, RefreshControl} from 'react-native';
import styles from './styles';
import CardView from '../../components/Cards/CardView/CardView';
import CardBondView from '../../components/Cards/CardBandView/CardBandView';
import CardAutreBonds from "../../components/Cards/CardAutreBonds/CardAutreBonds";
import * as firebase from "firebase";
import Spinner from 'react-native-loading-spinner-overlay';
import smartCoService from "../../provider/smartCoService";
import CardEquityBonds from "../../components/Cards/CardEquityBonds/CardEquityBonds";

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

class PortfolioScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refrech: false,
      greenBonds: [],
      cryptocurrency: [],
      autreBonds:[]
    }
  }



  componentWillMount() {
    firebase.database().ref("/").on("value", (snapshot) => {
      let data = snapshot.val();
      smartCoService.getAllBonds().then( bonds => {
        this.setState({ greenBonds: data.GreenBonds || [], cryptocurrency: data.cryptocurrency || [] , autreBonds : bonds.data || []});
      }).catch(err => alert(JSON.stringify(err)));

      setTimeout(() => {
        this.setState({ loading: false })
      }, 500); 

    })
  }

  renderItemBond = ({item}) => ( 
    <CardBondView
      onPress={() =>{this.props.navigation.navigate("BondDetails",{bond:item})}} 
      item={item}
    /> 
  );
  renderItemAutreBond = ({item}) => (
      item.percent1 !== "" &&
      <CardAutreBonds
          onPress={() =>{this.props.navigation.navigate("BondDetails",{bond:item})}}
          item={item}
      />
  );
  renderItemEquityBond = ({item}) => (
      item.percent1 === "" &&
      <CardEquityBonds
          onPress={() =>{this.props.navigation.navigate("BondDetails",{bond:item})}}
          item={item}
      />
  );
  renderItem = ({item}) => (  
    <CardView
    onPress={() =>{}}
      item={item}
    /> 
  );

  render() {
    return (
      <ScrollView style={styles.container} refreshControl={
        <RefreshControl refreshing={this.state.refrech} onRefresh={() => {
          this.setState({refrech:true});
          smartCoService.getAllBonds().then( bonds => {
            this.setState({ autreBonds : bonds.data || [], refrech:false});
          }).catch(err => alert(JSON.stringify(err)));
        }} />
      }>
        {
          this.state.loading === true ?

            <Spinner
              visible={this.state.loading}
              textContent={''}
            /> :

            <View>
              <View style={styles.facilitieContainer}>
                <Text style={styles.title}>Green Bonds</Text>
                <View style={{flexDirection:'row'}} >
                  <View style={{width:"15%"}}/>
                  <View style={{width:"27%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Fournisseur / Nom du Bond</Text>
                  </View> 
                  <View style={{width:"32%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Minimal Holding</Text>
                  </View>
                  <View style={{width:"26%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Per year Unité(montant)</Text>
                  </View>

                </View>
                <FlatList
                  vertical
                  showsVerticalScrollIndicator={false}
                  data={this.state.greenBonds}
                  renderItem={this.renderItemBond}
                  extraData={this.state}
                  listKey={'0'}
                />
              </View>


              <View style={styles.facilitieContainer}>
                <Text style={styles.title}>Autres Green Bonds</Text>
                <View style={{flexDirection:'row'}} >
                  <View style={{width:"45%"}}>
                    <Text style={{fontSize:12,color:"grey",marginLeft:10}} >Fournisseur / Nom du Bond</Text>
                  </View>
                  <View style={{width:"30%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Minimal Holding</Text>
                  </View>
                  <View style={{width:"25%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Per year Unité(montant)</Text>
                  </View>
                </View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={this.state.autreBonds}
                    renderItem={this.renderItemAutreBond}
                    extraData={this.state}
                    listKey={'0'}
                />
              </View>

              <View style={styles.facilitieContainer}>
                <Text style={styles.title}>Equity Bonds</Text>
                <View style={{flexDirection:'row'}} >
                  <View style={{width:"45%"}}>
                    <Text style={{fontSize:12,color:"grey",marginLeft:10}} >Fournisseur / Nom du Bond</Text>
                  </View>
                  <View style={{width:"30%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Minimal Holding</Text>
                  </View>
                  <View style={{width:"25%"}}>
                    <Text style={{fontSize:12,color:"grey"}} >Per year Unité(montant)</Text>
                  </View>

                </View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={this.state.autreBonds}
                    renderItem={this.renderItemEquityBond}
                    extraData={this.state}
                    listKey={'0'}
                />
              </View>



              <View style={styles.facilitieContainer}>
                <Text style={styles.title}>Cryptocurencies</Text>
                <FlatList
                  vertical
                  showsVerticalScrollIndicator={false}
                  data={this.state.cryptocurrency || []}
                  renderItem={this.renderItem}
                  extraData={this.state}
                  listKey={'1'}
                />

              </View>
            </View>



        }

      </ScrollView>
    );
  }
}


export default PortfolioScreen;
