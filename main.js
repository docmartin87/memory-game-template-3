// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of cards
const deck = document.getElementById('card');

// move variable
let moves = 0;
let counter = document.querySelector('.moves');

// variable for matchedCards
let matchedCard = document.getElementsByClassName("match");

// array for opened cards
var openedCards = [];

// Shuffle Cards - Fisher-Yates (aka Knuth) Shuffle
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

// New Game
function startGame(){
 
    // reset the openCards array
    openedCards = [];

    // shuffle the deck
    cards = shuffle(cards);

    // resets all classes for each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    //reset timer
    second = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 secs";
    clearInterval(interval);
}

// toggles open and show class to display cards
var displayCard = function (){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
};

// adds cards to opened card list
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// If Cards Are a Match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// If Cards Don't Match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}

// Disables Cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// counts player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        startTimer();
    }

// Game Timer
var second = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = second+"secs";
        second++;
    },1000);
}
};