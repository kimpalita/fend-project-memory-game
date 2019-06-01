/*
 * Create a list that holds all of your cards
 */

let cardNames = ['anchor', 'diamond', 'bomb', 'leaf', 'bolt', 'bicycle','paper-plane-o', 'cube' ];
let cardDeck = cardNames.concat(cardNames);

let moveCounter = 0;

let openedCards = [];
let matchedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetCounter() {
  moveCounter = 0;
  document.querySelector('.moves').textContent = moveCounter;
}

function deal() {
  resetCounter();
  shuffle(cardDeck);

  const fragment = document.createDocumentFragment();

  for(card of cardDeck) {
    const cardContainer = document.createElement('li');
    cardContainer.classList.add('card');
    cardContainer.dataset.cardName = card;
    cardContainer.innerHTML = `<i class="fa fa-${card}"></i>`;
    fragment.appendChild(cardContainer);
  }
  document.querySelector('.deck').appendChild(fragment);
}

function incrementCounter() {
  moveCounter += 1;
  document.querySelector('.moves').textContent = moveCounter;
}

function validateCard() {
  //const cardName = card.firstElementChild.className;
  const cardPair =  document.querySelectorAll('.open.show');
  if(openedCards[0] === openedCards[1]) {
    console.log('the cards match!');
    cardPair.forEach(function(value, index, listObj){
      value.classList.remove('open', 'show');
      value.classList.add('match');
    })

    if(document.querySelectorAll('.match').length === cardDeck.length) {
      alert('You\'ve won!');
    }

  } else {
    console.log('the cards DON\'T match!');
    setTimeout(function(){
      cardPair.forEach(function(value, index, listObj){
        value.classList.remove('open', 'show');
      })
    }, 1000)
  }
  openedCards.length = 0;
}

function openCard(event) {
  const clicked = event.target

  if(clicked.nodeName == 'LI'
    && !clicked.classList.contains('match')
    && !clicked.classList.contains('open')) {
    incrementCounter();
    clicked.classList.add('open', 'show');
    openedCards.push(clicked.firstElementChild.className);

    if(openedCards.length == 2){
      validateCard();
    }
  }
}

deal();

document.querySelector('.deck').addEventListener('click', openCard);

function reset(){
  moveCounter = 0;
  document.querySelector('.deck').innerHTML = "";
  deal();
}

document.querySelector('.restart').addEventListener('click', reset);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
