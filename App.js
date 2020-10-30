import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,FlatList,Image } from 'react-native';

export default class App extends React.Component{

  /*You can use component didmount*/
  componentDidMount() {
      this.fetchData();
  }

    state={
    birdObjects:{}
  }

  /*Asynkront kald*/
  fetchData = async () =>{

    const url = 'https://arpo-prod-api-app.azurewebsites.net/taxons/?searchText=&take=15&skip=0&notMatched=false&isDkTaxon=true&isDefaultTaxon=true&isMissingPhoto=false&speciesGroups=Fugle';

    try {
      /*Try'er to we can fetch, cant fetch on browser bcs cors*/
      const response =  await fetch(url);
        const jsonResponse = await response.json();
        const birdItems = jsonResponse.items

        this.setState({birdObjects:birdItems})
      console.log("\n\n ------Results-----\n");

      /*Amount of products */
      console.log("Efter push til array antal:\n",birdItems.length);

      /*Use this one to output wehlers products */

      console.log("Wehlers produkter:\n",birdItems);

    }catch (e) {
      console.log("\n---FejlBesked---\n\n",e)
    }
  };

  render(){
    const {birdObjects} = this.state;

    return(
        <View style={styles.container}>
          <FlatList
              style={styles.flatList}
              data={birdObjects}
              keyExtractor={item => item.id}
              renderItem={({item})=>(
                      <View>

                          <View>
                              {item.imageUrl ?
                                  <Image style={styles.img}
                                         source={{uri:item.imageUrl}}
                                  />

                              :
                              <Text>
                                  Intet billede
                              </Text>
                              }

                          </View>
                          <Text>
                              id: {item.id} {"\n"}
                              Name: {item.acceptedVernacularName ? item.acceptedVernacularName : "Intet navn"} {"\n"}
                          </Text>
                        </View>

              )}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    flatList:{
        width:"100%"
    },
    img:{
        width: 100,
        height:100,
    },
  container: {
    padding:50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
