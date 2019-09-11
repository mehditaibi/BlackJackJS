import Hand from "./hand";

export default class Player {
  constructor() {
    this.name = "Player";
    this.hand = new Hand();
  }
}
