import React from 'react';
import { Image, View, FlatList, AsyncStorage, StyleSheet, Button, Text } from "react-native"
import { withNavigationFocus } from 'react-navigation';
import { NavigationEvents } from "react-navigation"

function Item({name, url, id}){
  return(
    <View>
      <Image source={{uri: url}} style= {{width:'150%', height:'150%'}} />
      <Text>{name} 123</Text>
    </View>
  )
}


class FavoritesList extends React.Component{
  constructor(props){
    super(props)
    this.getCards = this.getCards.bind(this)
    this.state = {
      favorites: []
    }
  }

  componentDidMount(){
    this.getCards()
  }

  async getCards(){
    formatted_list = []
    const allKeys = await AsyncStorage.getAllKeys()
    const allValues = await AsyncStorage.multiGet(allKeys)
    allValues.map((result, i, store)=>{
      let name = store[i][0]
      let value = store[i][1]
      formatted_list.push({id: i, name: name, url: value})
    })
    this.setState({
      favorites: formatted_list
    })
    console.log("Show all keys", formatted_list)
  }

  render(){
    return(
      <View style={{ marginTop: 100}}>
        <NavigationEvents onDidFocus={()=> this.getCards()}/>
        <Button 
          title="Clear Button"
          onPress={()=>{
          AsyncStorage.clear()
          this.setState({favorites: []})
        }}
        />
        {(this.state.favorites.length < 1)?
        <Text>No Cards to Show</Text> :
        <FlatList
          data={this.state.favorites}
          renderItem={({ item })=> <Item {...item} />}
          keyExtractor={item => `list-item-${item.id}`}
        />}
      </View>
    )
  }
}


export default withNavigationFocus(FavoritesList)