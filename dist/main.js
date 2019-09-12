/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);


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
  const game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"](); // import all the cards images

  function importAllImages(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAllImages(__webpack_require__(11)); // check if either the player or the dealer has a black jack

  const blackJackCheck = () => {
    game.player.hand.calculateHandValue();
    game.dealer.hand.calculateHandValue();

    if (game.player.hand.value === 21 || game.dealer.hand.value === 21) {
      return true;
    }
  }; // display the player's score and optionaly the dealer's score


  const displayScores = hideDealerScore => {
    game.player.hand.calculateHandValue();
    game.dealer.hand.calculateHandValue();
    playerScore.innerHTML = `PLAYER ${game.player.hand.value}`;

    if (hideDealerScore) {
      dealerScore.innerHTML = `DEALER ?`;
    } else {
      dealerScore.innerHTML = `DEALER ${game.dealer.hand.value}`;
    }
  }; // show dealer's first hidden card


  const showDealerFirstCard = () => {
    dealerCards.firstElementChild.src = images[game.dealer.hand.cards[0].imageLocation];
  }; // show next hand button only


  const showNextBtnOnly = () => {
    hitButton.style.display = "none";
    standButton.style.display = "none";
    nextButton.style.display = "block";
  }; // update the the number of cards left in the deck


  const numberOfCardsLeft = () => {
    cardsCount.innerHTML = `CARDS LEFT: ${game.decks.nbrOfcardsLeft()}`;
  }; // handle the logic to setup a new hand


  const newHand = () => {
    if (game.decks.nbrOfcardsLeft() < 20) {
      game.decks.reset();
    }

    hitButton.style.display = "block";
    standButton.style.display = "block";
    handResult.innerHTML = "GOOD LUCK! 🍀"; // draw 4 cards and deal them out to dealer and player

    for (let i = 0; i < 2; i++) {
      let newPlayerCard = game.decks.draw();
      game.player.hand.cards.push(newPlayerCard);
      let newDealerCard = game.decks.draw();
      game.dealer.hand.cards.push(newDealerCard);
    } // append cards to dom for the player


    game.player.hand.cards.forEach(card => {
      let cardDomElement = document.createElement("img");
      cardDomElement.src = images[card.imageLocation];
      playerCards.appendChild(cardDomElement);
    }); // append cards to dom for the dealer

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
  }; // reset the hands of both dealer & player and clear the cards off the board


  const putCardsAway = () => {
    game.player.hand.reset();
    playerCards.innerHTML = "";
    game.dealer.hand.reset();
    dealerCards.innerHTML = "";
  }; // handle the logic to deal a card to player


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
  }; // handle the ouput of the hand


  const handOutput = () => {
    displayScores();

    if (game.dealer.hand.value > game.player.hand.value && game.dealer.hand.value < 22) {
      handResult.innerHTML = "DEALER WON 😢";
    } else if (game.dealer.hand.value < game.player.hand.value && game.player.hand.value < 22) {
      handResult.innerHTML = "YOU WON! 🤑";
    } else if (game.dealer.hand.value > 21) {
      handResult.innerHTML = "YOU WON! 🤑";
    } else {
      handResult.innerHTML = "PUSH! 🙃";
    }
  }; // handle logic to complete dealer's hand


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
  }; // handle logic if player decides to stand


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
  }; // make main 3 buttons functional


  nextButton.addEventListener("click", () => {
    putCardsAway(), newHand();
  });
  hitButton.addEventListener("click", () => hitMe());
  standButton.addEventListener("click", () => stand());
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(2);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(4)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// Module
exports.push([module.i, "body {\n  background-color: #1c7545;\n  font-family: \"Helvetica\", \"sans-serif\";\n  padding: 0;\n  margin: 0;\n}\n\nmain {\n  display: flex;\n  padding: 10px;\n}\n\n.game-board {\n  width: 100%;\n}\n\n.dealer-score {\n  margin: 10px;\n  font-size: 2em;\n  min-height: 47px;\n}\n\n.hand-result {\n  padding: 10px;\n  font-size: 2em;\n  text-align: center;\n  min-height: 40px;\n}\n\n.player-score {\n  margin: 10px;\n  font-size: 2em;\n  min-height: 47px;\n}\n\n.player-cards {\n  min-height: 100px;\n  border-radius: 5px;\n  width: 100%;\n}\n\n.dealer-cards {\n  min-height: 100px;\n  border-radius: 5px;\n  width: 100%;\n}\n\nimg {\n  height: 100px;\n}\n\n.button {\n  margin: 10px auto;\n  background-color: black;\n  border-radius: 5px;\n  padding: 5px;\n  color: white;\n  font-weight: bold;\n  font-size: 3em;\n  letter-spacing: 1px;\n  width: 100%;\n  display: block;\n}\n\n.hit {\n  display: none;\n}\n\n.stand {\n  display: none;\n}\n\n.upper-board {\n  display: flex;\n  justify-content: space-between;\n}\n\n.cards-count {\n  margin: 10px;\n  font-size: 2em;\n  min-height: 47px;\n  text-align: left;\n}\n\n@media only screen and (max-width: 600px) {\n  .dealer-score,\n.player-score,\n.cards-count,\n.hand-result {\n    font-size: 1em;\n  }\n}", ""]);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function listToStyles(list, options) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}

function addStylesToDom(styles, options) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i];
    var domStyle = stylesInDom[item.id];
    var j = 0;

    if (domStyle) {
      domStyle.refs++;

      for (; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j]);
      }

      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j], options));
      }
    } else {
      var parts = [];

      for (; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j], options));
      }

      stylesInDom[item.id] = {
        id: item.id,
        refs: 1,
        parts: parts
      };
    }
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');

  if (typeof options.attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  Object.keys(options.attributes).forEach(function (key) {
    style.setAttribute(key, options.attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  options.attributes = typeof options.attributes === 'object' ? options.attributes : {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  var styles = listToStyles(list, options);
  addStylesToDom(styles, options);
  return function update(newList) {
    var mayRemove = [];

    for (var i = 0; i < styles.length; i++) {
      var item = styles[i];
      var domStyle = stylesInDom[item.id];

      if (domStyle) {
        domStyle.refs--;
        mayRemove.push(domStyle);
      }
    }

    if (newList) {
      var newStyles = listToStyles(newList, options);
      addStylesToDom(newStyles, options);
    }

    for (var _i = 0; _i < mayRemove.length; _i++) {
      var _domStyle = mayRemove[_i];

      if (_domStyle.refs === 0) {
        for (var j = 0; j < _domStyle.parts.length; j++) {
          _domStyle.parts[j]();
        }

        delete stylesInDom[_domStyle.id];
      }
    }
  };
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _dealer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _decks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);




class Game {
  constructor() {
    this.dealer = new _dealer__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.decks = new _decks__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.init();
  }

  init() {
    this.decks.shuffle();
  }

}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dealer; });
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

class Dealer {
  constructor(hand) {
    this.name = "Dealer";
    this.hand = new _hand__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hand; });
class Hand {
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
        card.fullName.includes("Ace") ? this.ace = true : null;
      });

      if (this.value > 21 && this.ace) {
        this.value -= 10;
      }
    }
  }

}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

class Player {
  constructor() {
    this.name = "Player";
    this.hand = new _hand__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Decks; });
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

class Decks {
  constructor() {
    this.nbrOfDeck = 8;
    this.reset();
  }

  reset() {
    const newDeck = new Array();
    const suits = ["spades", "hearts", "clubs", "diamonds"];

    for (let j = 0; j < this.nbrOfDeck; j++) {
      for (let suit of suits) {
        for (let i = 1; i <= 13; i++) {
          newDeck.push(new _card__WEBPACK_IMPORTED_MODULE_0__["default"](i, suit));
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

  nbrOfcardsLeft() {
    return this.cards.length;
  }

}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Card; });
class Card {
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
    typeof convertedRank === "string" ? convertedRank = convertedRank[0] : convertedRank;
    this.imageLocation = `${convertedRank}${capitalizedSuit[0]}.png`;
  }

}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./10C.png": 12,
	"./10D.png": 13,
	"./10H.png": 14,
	"./10S.png": 15,
	"./2C.png": 16,
	"./2D.png": 17,
	"./2H.png": 18,
	"./2S.png": 19,
	"./3C.png": 20,
	"./3D.png": 21,
	"./3H.png": 22,
	"./3S.png": 23,
	"./4C.png": 24,
	"./4D.png": 25,
	"./4H.png": 26,
	"./4S.png": 27,
	"./5C.png": 28,
	"./5D.png": 29,
	"./5H.png": 30,
	"./5S.png": 31,
	"./6C.png": 32,
	"./6D.png": 33,
	"./6H.png": 34,
	"./6S.png": 35,
	"./7C.png": 36,
	"./7D.png": 37,
	"./7H.png": 38,
	"./7S.png": 39,
	"./8C.png": 40,
	"./8D.png": 41,
	"./8H.png": 42,
	"./8S.png": 43,
	"./9C.png": 44,
	"./9D.png": 45,
	"./9H.png": 46,
	"./9S.png": 47,
	"./AC.png": 48,
	"./AD.png": 49,
	"./AH.png": 50,
	"./AS.png": 51,
	"./JC.png": 52,
	"./JD.png": 53,
	"./JH.png": 54,
	"./JS.png": 55,
	"./KC.png": 56,
	"./KD.png": 57,
	"./KH.png": 58,
	"./KS.png": 59,
	"./QC.png": 60,
	"./QD.png": 61,
	"./QH.png": 62,
	"./QS.png": 63,
	"./redback.png": 64
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1963502749c024e1590789bab3632bc9.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "39ef422e15761450c33f8cb3ee369ebe.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "60ab387c8c1c50dd3a75255500218b94.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b208cd7f21ce87cf950936ab6fb3e717.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "136dab439961d61f4b9c1f939e07828d.png";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1451de5d494406e395215276a2489a7c.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ebe434953cb5c82ec5c8e38b8e735489.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "33c964ae685ff65233d2ac2c35b96072.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6ed5bf64f008d72e83c67f81468ab7c5.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "690d5a477dfe9ed93261bd814c0a40d6.png";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "7278d51dda50bd4b8c8cadb7fe349953.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9638bf9f29919b027765992a81f6d39b.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "23c51e0b449e342f8b7f6c8fd57e2137.png";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "89eaac32133444fe40876cb51f697f13.png";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6695f1d514765572dfe7e5dd0863dfce.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5156259e1f30dece1376dc5695a9a1d4.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3ac88eddd1ac03bfc901de76424b5aba.png";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "24fd440cbb52affc5242a507c9dec4d1.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5457f189cabc0476511c7ed1421b419d.png";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ab3d8627d0c4d17c86c73d90817900b.png";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5c96f40f637a6b2ed34d5e837d81ef7b.png";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ff1c62992cf49b6164401d1d9f77a20c.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "84564e31bf0a0e8bcd5fdd3d4aa12cc3.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c99b0f04000841e5f3db53d64b3f7034.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4808cc416c976dbd5c3cb629a0f102a5.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "58d872f063752027e59e15af4d090123.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c8475b530ea9f0970ff829c97f3e7abf.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "82d62864ff67ff7b5e20150316d26872.png";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a46a54d93ff6e543497d205db97fd460.png";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fcafeaf2d610109aa1916208080ab711.png";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1e9e59b0d6f684908f3ad7d2fe942a42.png";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "497eed1efa7e554de5b62bc9eb2b5ae6.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4f8d0d8f2ebaeacf99e7134221d6da49.png";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1d495bb1ebf632dca66a538b61bae19a.png";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "33ab7891b4259ea8d8823a352ef38cdf.png";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "50caac183ef66afe6cdda1d2e3daafda.png";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "17ca9f77b395a41c6d45cbff350573bb.png";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f37d608fb18056bc4f83737d633c5cf5.png";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a762540d55018bcf43ffba8b6343c9c9.png";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e6a6d2f8a350079dcad97e814d3559e7.png";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1595a3ea21f452c290cf26af7ae53ede.png";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d5682eb454510b9cdf54beb9c5a0e5f5.png";

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fdf4ffc434ac567c6b77905cb1b11c8a.png";

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "89d2c97e62fcaec36c80dbdd725f216f.png";

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aa73cfd0e548d87f4af4a18a8d2c3c8f.png";

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6b5b30c00309e3cfae486f543bc1809a.png";

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3b48ae8207b07a1f9477d7e6135ca211.png";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e8d1a4cfe9d8dca64733c050e65e9dfd.png";

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d6296277472d7e9594d0ebee0cb82cdc.png";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6940967da8669e3410fefd3a8a33aad9.png";

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "63afa62b47efa84b8b87d3e39ef42bc1.png";

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9026849bcbad6fd92f7c3cb8f70e3cd4.png";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b27beff28165bc95efa3894baf92b637.png";

/***/ })
/******/ ]);