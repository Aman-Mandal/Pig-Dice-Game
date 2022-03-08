'use strict'

// Selecting Elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.getElementById('score0')
const score1El = document.getElementById('score1')
const currentScore0 = document.getElementById('current--0')
const currentScore1 = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Declaring variables
let scores, isPlaying, activePlayer, currentScore

// Initializing Function - Starting Conditions
const init = function () {
  scores = [0, 0]
  isPlaying = true
  activePlayer = 0
  currentScore = 0
  score0El.textContent = 0
  score1El.textContent = 0
  currentScore0.textContent = 0
  currentScore1.textContent = 0
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  diceEl.classList.add('hidden')
}

init()

// Switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  currentScore = 0
  // changing the background of active player
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

// Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generating a random dice roll
    const diceRolled = Math.trunc(Math.random() * 6) + 1
    console.log(diceRolled)

    // 2. Displaying the dice with random number
    diceEl.classList.remove('hidden')
    diceEl.src = `images/dice-${diceRolled}.png`

    // 3. Check if dice rolled is 1
    if (diceRolled !== 1) {
      // add the current score with previous score
      currentScore += diceRolled
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      // switch the player if dice rolled 1
      switchPlayer()
    }
  }
})

// Hold Button Functionality
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add currentScore to activePlayer score's
    scores[activePlayer] += currentScore
    console.log(scores[activePlayer])
    // score[1] = score[1] + currentScore

    // display score on screen
    document.getElementById(`score${activePlayer}`).textContent =
      scores[activePlayer]

    // 2. Check if the player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      isPlaying = false
      // remove dice
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      // else : Switch the player
      switchPlayer()
    }
  }
})

// New Game button Functionality
btnNew.addEventListener('click', init)
