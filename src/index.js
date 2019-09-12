import "./styles/main.scss";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const nextButton = document.querySelector(".next");
  const hitButton = document.querySelector(".hit");
  const standButton = document.querySelector(".stand");
  const playerCards = document.querySelector(".player-cards");
  const dealerCards = document.querySelector(".dealer-cards");
  const dealerScore = document.querySelector(".dealer-score");
  const playerScore = document.querySelector(".player-score");
  const handResult = document.querySelector(".hand-result");
  const cardsCount = document.querySelector(".cards-count");
  const game = new Game();

  // import all the cards images
  function importAllImages(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAllImages(
    require.context("./images", false, /\.(png|jpe?g|svg)$/)
  );

  // check if either the player or the dealer has a black jack
  const blackJackCheck = () => {
    game.player.hand.calculateHandValue();
    game.dealer.hand.calculateHandValue();
    if (game.player.hand.value === 21 || game.dealer.hand.value === 21) {
      return true;
    }
  };

  // display the player's score and optionaly the dealer's score
  const displayScores = hideDealerScore => {
    game.player.hand.calculateHandValue();
    game.dealer.hand.calculateHandValue();
    playerScore.innerHTML = `PLAYER ${game.player.hand.value}`;
    if (hideDealerScore) {
      dealerScore.innerHTML = `DEALER ?`;
    } else {
      dealerScore.innerHTML = `DEALER ${game.dealer.hand.value}`;
    }
  };

  // show dealer's first hidden card
  const showDealerFirstCard = () => {
    dealerCards.firstElementChild.src =
      images[game.dealer.hand.cards[0].imageLocation];
  };

  // show next hand button only
  const showNextBtnOnly = () => {
    hitButton.style.display = "none";
    standButton.style.display = "none";
    nextButton.style.display = "block";
  };

  // update the the number of cards left in the deck
  const numberOfCardsLeft = () => {
    cardsCount.innerHTML = `CARDS LEFT: ${game.decks.nbrOfcardsLeft()}`;
  };

  // handle the logic to setup a new hand
  const newHand = () => {
    if (game.decks.nbrOfcardsLeft() < 20) {
      game.decks.reset();
    }
    hitButton.style.display = "block";
    standButton.style.display = "block";
    handResult.innerHTML = "GOOD LUCK! 🍀";

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

    numberOfCardsLeft();
    displayScores(true);
    nextButton.style.display = "none";

    if (blackJackCheck()) {
      if (game.dealer.hand.value == 11 && game.player.hand.value == 11) {
        showDealerFirstCard();
        handResult.innerHTML = "PUSH! 🙃";
      } else if (game.dealer.hand.value == 11) {
        showDealerFirstCard();
        handResult.innerHTML = "DEALER WON 😢";
      } else {
        handResult.innerHTML = " 🎉 BLACKJACK! 🎉";
        showDealerFirstCard();
      }
      showNextBtnOnly();
      displayScores();
    }
  };

  // reset the hands of both dealer & player and clear the cards off the board
  const putCardsAway = () => {
    game.player.hand.reset();
    playerCards.innerHTML = "";
    game.dealer.hand.reset();
    dealerCards.innerHTML = "";
  };

  // handle the logic to deal a card to player
  const hitMe = () => {
    if (playerCards.hasChildNodes()) {
      let newPlayerCard = game.decks.draw();
      game.player.hand.cards.push(newPlayerCard);
      let cardDomElement = document.createElement("img");
      cardDomElement.src = images[newPlayerCard.imageLocation];
      playerCards.appendChild(cardDomElement);
      game.player.hand.calculateHandValue();
      displayScores(true);
      numberOfCardsLeft();

      if (game.player.hand.value > 21) {
        showDealerFirstCard();
        displayScores();
        handResult.innerHTML = "OOPS TOO MANY.. 😢";
        showNextBtnOnly();
      }
    } else {
      handResult.innerHTML = "PRESS ON THE NEXT HAND BUTTON FIRST 🙄";
    }
  };

  // handle the ouput of the hand
  const handOutput = () => {
    displayScores();
    if (
      game.dealer.hand.value > game.player.hand.value &&
      game.dealer.hand.value < 22
    ) {
      handResult.innerHTML = "DEALER WON 😢";
    } else if (
      game.dealer.hand.value < game.player.hand.value &&
      game.player.hand.value < 22
    ) {
      handResult.innerHTML = "YOU WON! 🤑";
    } else if (game.dealer.hand.value > 21) {
      handResult.innerHTML = "YOU WON! 🤑";
    } else {
      handResult.innerHTML = "PUSH! 🙃";
    }
  };

  // handle logic to complete dealer's hand
  const completeDealerHand = () => {
    while (game.dealer.hand.value < 17) {
      let newDealerCard = game.decks.draw();
      game.dealer.hand.cards.push(newDealerCard);
      let cardDomElement = document.createElement("img");
      cardDomElement.src = images[newDealerCard.imageLocation];
      dealerCards.appendChild(cardDomElement);
      game.dealer.hand.calculateHandValue();
      numberOfCardsLeft();
    }
  };

  // handle logic if player decides to stand
  const stand = () => {
    if (playerCards.hasChildNodes()) {
      hitButton.style.display = "none";
      standButton.style.display = "none";
      showDealerFirstCard();
      completeDealerHand();
      handOutput();
    } else {
      handResult.innerHTML = "PRESS ON THE NEXT HAND BUTTON FIRST 🙄";
    }
    nextButton.style.display = "block";
  };

  // make main 3 buttons functional
  nextButton.addEventListener("click", () => {
    putCardsAway(), newHand();
  });
  hitButton.addEventListener("click", () => hitMe());
  standButton.addEventListener("click", () => stand());
});
