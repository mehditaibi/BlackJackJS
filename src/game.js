import Dealer from "./dealer";
import Player from "./player";
import Decks from "./decks";
import Hand from "./hand";

export default class Game {
  constructor() {
    this.dealer = new Dealer();
    this.player = new Player();
    this.decks = new Decks();
    this.init();
  }

  init() {
    this.decks.shuffle();
  }
}
