//Deck of unique cards
const cardNames = ['anchor', 'diamond', 'bomb', 'leaf', 'bolt', 'bicycle','paper-plane-o', 'cube' ];

//Create full deck with duplicate cards
const cardDeck = cardNames.concat(cardNames);

let moves = 0;
let starRating = 3;
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

// Move-counter functions: reset, increment, print
function resetMoves() {
  moves = 0;
  printMoves();
}

function incrementMoves() {
  moves += 1;

  if (moves <= 4) {
    starRating = 3;
  } else if (moves <= 6) {
    starRating = 2;
    printRating();
  } else {
    starRating = 1;
    printRating();
  }

  printMoves();
}

function printMoves() {
  document.querySelector('.moves').textContent = moves;
}

function rateMoves() {
  if (moves <= 4) {
    starRating = 3;
  } else if (moves <= 6) {
    starRating = 2;
  } else {
    starRating = 1;
  }
  printRating();
}

function printRating() {
  const stars = document.querySelectorAll('.stars .fa-star');

  for (i = starRating; i < stars.length; i++) {
    stars[i].classList.replace('fa-star', 'fa-star-o');
  }
}

function resetRating() {
  const stars = document.querySelectorAll('.stars .fa-star-o');

  for(i = 0; stars.length > 0 && i < stars.length; i++) {
    stars[i].classList.replace('fa-star-o', 'fa-star');
  }
}

//Deal cards by shuffle cards, then create HTML fragment for 'ul.deck'
function dealCards() {
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


function validateCard() {

    const cards =  document.querySelectorAll('.open.show');

    if(openedCards[0] === openedCards[1]) {
      console.log('the cards match!');
      cards.forEach(function(value, index, listObj){
        value.classList.remove('open', 'show');
        value.classList.add('match');
      })

    } else {
      console.log('the cards DON\'T match!');
      setTimeout(function(){
        cards.forEach(function(value, index, listObj){
          value.classList.remove('open', 'show');
        })
      }, 500)
    }
  openedCards.length = 0;
}

//openCard function called from event listener when a card is clicked
function openCard(event) {
  const clickedElement = event.target;

  if(clickedElement.matches('.card') && !clickedElement.classList.contains('match') && !clickedElement.classList.contains('open')) {

    console.log('A card was clicked!');
    clickedElement.classList.toggle('open');
    clickedElement.classList.toggle('show');

    incrementMoves();
    openedCards.push(clickedElement.dataset.cardName);
    if(openedCards.length == 2){
      validateCard();
    }
  }
}

//Win function

//Restart function; empties 'ul.deck', resets move-counter and redeals the cards.
function restart(){
  document.querySelector('.deck').innerHTML = '';
  resetMoves();
  resetRating();
  dealCards();
}

dealCards();

document.querySelector('.deck').addEventListener('click', openCard);

document.querySelector('.restart').addEventListener('click', restart);


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
