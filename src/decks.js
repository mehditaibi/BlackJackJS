import Card from "./card";

export default class Decks {
  constructor() {
    this.nbrOfDeck = 8;
    this.reset();
  }

  reset() {
    const newDeck = new Array;
    const suits = ["spades", "hearts", "clubs", "diamonds"];
    for (let j = 0; j < this.nbrOfDeck; j++) {
      for (let suit of suits) {
        for (let i = 1; i <= 13; i++) {
          newDeck.push(new Card(i, suit));
        }
      }
    }
    this.cards = newDeck;
  }

  draw() {
    return this.cards.pop();
  }

  shuffle() {
    this.cards.sort((card1, card2) => {
      return 0.5 - Math.random();
    });
  }

  nbrOfcardsLeft(){
    return this.cards.length
  }
}
