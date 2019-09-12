export default class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.initValues();
  }

  initValues() {
    let convertedRank = "";
    switch (this.value) {
      case 1:
        convertedRank = "Ace";
        this.gameValue = 11;
        break;
      case 11:
        convertedRank = "Jack";
        this.gameValue = 10;
        break;
      case 12:
        convertedRank = "Queen";
        this.gameValue = 10;
        break;
      case 13:
        convertedRank = "King";
        this.gameValue = 10;
        break;
      default:
        convertedRank = this.value;
        this.gameValue = this.value;
        break;
    }
    const capitalizedSuit = this.suit[0].toUpperCase() + this.suit.slice(1);
    this.fullName = `${convertedRank} of ${this.suit}`;
    typeof convertedRank === "string"
      ? (convertedRank = convertedRank[0])
      : convertedRank;
    this.imageLocation = `${convertedRank}${capitalizedSuit[0]}.png`;
  }
}
