export default class Hand {
  constructor() {
    this.cards = new Array();
    this.value = 0;
    this.ace = false;
    this.reset();
  }

  reset() {
    this.cards = new Array();
    this.value = 0;
    this.ace = false;
  }

  set addCard(card) {
    this.cards.push(card);
  }

  get retrieveCards() {
    return this.cards;
  }

  calculateHandValue() {
    if (this.cards.length > 0) {
      this.value = 0;
      this.cards.forEach(card => {
        this.value += card.gameValue;
      });
      this.cards.map(card => {
        card.fullName.includes("Ace") ? (this.ace = true) : null;
      });
      if (this.value > 21 && this.ace) {
        this.value -= 10;
      }
    }
  }
}
