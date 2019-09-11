import "./styles/main.scss";
import Game from "./game";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector(".next");
  const hitButton = document.querySelector(".hit");
  const standButton = document.querySelector(".stand");
  const playerCards = document.querySelector(".player-cards");
  const dealerCards = document.querySelector(".dealer-cards");
  const game = new Game();

  const initGame = () => {
    // draw 4 cards and deal them out to dealer and player
    for (let i = 0; i < 2; i++) {
      let newPlayerCard = game.decks.draw();
      game.player.hand.cards.push(newPlayerCard);
      let newDealerCard = game.decks.draw();
      game.dealer.hand.cards.push(newDealerCard);
    }

    // append cards to dom for the player 
    game.player.hand.cards.forEach(card => {
      let cardDomElement = document.createElement("img");
      cardDomElement.src = images[card.imageLocation];
      playerCards.appendChild(cardDomElement);
    });

    // append cards to dom for the dealer 
    game.dealer.hand.cards.forEach(card => {
      let cardDomElement = document.createElement("img");
      if (card == game.dealer.hand.cards[0]) {
        cardDomElement.src = images["redback.png"];
        dealerCards.appendChild(cardDomElement);
      } else {
        cardDomElement.src = images[card.imageLocation];
        dealerCards.appendChild(cardDomElement);
      }
    });
  };

  initGame();

  const putCardsAway = () => {};

  const nextHand = () => {
    console.log("nextHand");
  };

  const hitMe = () => {
    console.log("hitMe");
  };

  const stand = () => {
    console.log("stand");
  };

  nextButton.addEventListener("click", () => nextHand());
  hitButton.addEventListener("click", () => hitMe());
  standButton.addEventListener("click", () => stand());
});
