/*

Game Rules:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes.
- Each result get added to a ROUND score
- But, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to his GLOBAL/TOTAL score.  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var globalScores;
var roundScore;
var activePlayer; // player 

var isGamePlaying;

initializeGame();

// click event handlers, w/ callback fnx
document.querySelector('.btn--roll').addEventListener('click', function() {
    if(isGamePlaying){
        // generate random number
        var diceNumber = Math.floor(Math.random() * 6) + 1; 

        // display dice
        var diceElement = document.querySelector('.dice');
        diceElement.src = 'dice-' + diceNumber + '.png';    // change dice img to match random number
        diceElement.style.display = 'block';    // display finally

        // show and update in current score
        if (diceNumber > 1) {
            roundScore += diceNumber;
            document.getElementById('current--' + activePlayer).textContent = roundScore;
        }   
        else {
            // switch active player
            nextPlayer();
        }
    }
})

function nextPlayer() {
    // switch active player
    if (activePlayer === 0) { 
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

     // reset current round scores on both sides
     roundScore = 0;
     document.getElementById('current--0').textContent = 0;
     document.getElementById('current--1').textContent = 0; 
     
     // active player focus by removing and adding class
     document.querySelector('.player--0').classList.toggle('player--active');
     document.querySelector('.player--1').classList.toggle('player--active');
     // document.querySelector('.player--0').classList.remove('player--active');
     // document.querySelector('.player--1').classList.add('player--active');
     
     // hide dice on player switch
     document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(isGamePlaying){
         // update global score
        globalScores[activePlayer] += roundScore;
        document.getElementById('score--' + activePlayer).textContent = globalScores[activePlayer];

        // check if player won
        if(globalScores[activePlayer] >= 10){
            document.querySelector('#name--' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            isGamePlaying = false;
        } else {
            // switch player
            nextPlayer();
        }
    }
});

document.querySelector('.btn--new').addEventListener('click', initializeGame);  // not initializeGame()

function initializeGame() {
    globalScores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // player 1
    isGamePlaying = true;
    
    // remove dice via css style 
    document.querySelector('.dice').style.display = 'none';
    
    // set all scores to zero 
    document.getElementById('score--0').textContent = 0; 
    document.getElementById('current--0').textContent = 0; 
    document.getElementById('score--1').textContent = 0; 
    document.getElementById('current--1').textContent = 0;

    // reset player names (removes 'winner')
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    // remove player winner focus
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    // reset player 1 as active
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}








// ==== NB ====
// document.querySelector('#current--' + activePlayer).textContent = dice; // sets raw text, not html-based
// var diceValue = document.querySelector('#current--' + activePlayer).textContent;
// console.log(diceValue); // gets raw value

// document.querySelector('#current--' + activePlayer).innerHTML = '<i>' + dice + '</i>';   // set as html parsing