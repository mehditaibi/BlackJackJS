import Hand from "./hand";

export default class Dealer {
  constructor(hand) {
    this.name = "Dealer";
    this.hand = new Hand();
  }
}
