// SwipeCards.js
"use strict";

import React, { Component } from "react";
import { StyleSheet, Text, View, Image, AsyncStorage, Dimensions } from "react-native";

import SwipeCards from "react-native-swipe-cards";

const cardHeight = Dimensions.get('window').height / 3
const cardWidth = Dimensions.get('window').width

const Card = ({backgroundColor, url, name }) => (
  <View style={[styles.card, { backgroundColor }]}>
    <Image
      style={{ width: cardWidth, height: cardHeight }}
      source={{ uri:url }}
    />
    <Text>{name}</Text>
  </View>
);

const NoMoreCards = () => (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    );

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    fetch("https://uu8v8b0rod.execute-api.us-east-1.amazonaws.com/dev/api/pics")
      .then(response => response.json())
      .then(results => {
        this.setState({
          cards: results
        });
      });
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
    try {
      AsyncStorage.setItem(`${card.name}`, `${card.url}`);
    } catch (error) {
      alert("You have an error", JSON.stringify(error));
    }
  }
  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300
  },
  noMoreCardsText: {
    fontSize: 22
  }
});
