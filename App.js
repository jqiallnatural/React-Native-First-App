import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Swiper from './js/SwipeCards'
import FavoritesList from './js/Favourites'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
      </View>
    )
  }
}

class FavoritesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
        <FavoritesList/>>
      </View>
    )
  }
}
const AppNavigator = createBottomTabNavigator(
  {
  Home: Swiper,
  Faves: FavoritesList
  }
)
//you can use fragment, but view is better for styling
export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
