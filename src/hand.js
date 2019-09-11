export default class Hand {
  constructor() {
    this.cards = new Array();
    this.reset();
  }

  reset() {
    this.cards = new Array();
  }

  set addCard(card) {
    this.cards.push(card);
  }

  get retrieveCards() {
    return this.cards;
  }
}
