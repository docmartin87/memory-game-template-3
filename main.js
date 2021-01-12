// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Fisher-Yates (aka Knuth) Shuffle
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

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", displayCard);
};

// deck of all cards in game
const deck = document.querySelector(".deck");
function startGame(){
   var shuffledCards = shuffle(cards);
   
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
        deck.appendChild(item);
      });
   }
}

// toggles open and show class to display cards
var displayCard = function (){
   this.classList.toggle("open");
   this.classList.toggle("show");
   this.classList.toggle("disabled");
}

window.onload = startGame();
