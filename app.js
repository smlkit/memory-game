"use strict";

const grid = document.querySelector(".grid");
const timeDisplay = document.querySelector(".time");
const scoreDisplay = document.querySelector(".score");
const btnRefresh = document.querySelector(".btn-refresh");
const message = document.querySelector(".message");

const cardsArray = [
  {
    name: "amethyst",
    img: "images/amethyst.png",
  },
  {
    name: "aquamarine",
    img: "images/aquamarine.png",
  },
  {
    name: "citrine",
    img: "images/citrine.png",
  },
  {
    name: "diamond",
    img: "images/diamond.png",
  },
  {
    name: "emerald",
    img: "images/emerald.png",
  },
  {
    name: "topaz",
    img: "images/topaz.png",
  },
  {
    name: "amethyst",
    img: "images/amethyst.png",
  },
  {
    name: "aquamarine",
    img: "images/aquamarine.png",
  },
  {
    name: "citrine",
    img: "images/citrine.png",
  },
  {
    name: "diamond",
    img: "images/diamond.png",
  },
  {
    name: "emerald",
    img: "images/emerald.png",
  },
  {
    name: "topaz",
    img: "images/topaz.png",
  },
];

let disableDeck = false;
let cardsChosen = [];
let cardsChosenIds = [];
let score = 0;
let time = 60;
let timer;

shuffleCards();
function shuffleCards() {
  cardsArray.sort(() => 0.5 - Math.random());
}

createBoard();
function createBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/secret.png");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    grid.append(card);
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");
  if (!disableDeck) {
    this.setAttribute("src", cardsArray[cardId].img);

    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log(cardsChosenIds);

    if (cardsChosen.length === 2) {
      disableDeck = true;
      setTimeout(checkMatch, 700);
    }
  }
}

function checkMatch() {
  const allCards = document.querySelectorAll(".grid img");
  const firstCardId = cardsChosenIds[0];
  const secondCardId = cardsChosenIds[1];

  if (firstCardId !== secondCardId && cardsChosen[0] === cardsChosen[1]) {
    console.log("match");
    allCards[firstCardId].setAttribute("src", "images/blank.png");
    allCards[secondCardId].setAttribute("src", "images/blank.png");
    allCards[firstCardId].removeEventListener("click", flipCard);
    allCards[secondCardId].removeEventListener("click", flipCard);
    score++;
    scoreDisplay.textContent = score;
  } else {
    console.log("wrong");
    allCards[firstCardId].setAttribute("src", "images/secret.png");
    allCards[secondCardId].setAttribute("src", "images/secret.png");
  }

  cardsChosen = [];
  cardsChosenIds = [];
  disableDeck = false;

  if (score === 6) {
    message.textContent = "Congrats! You won :)";
    message.style.opacity = 1;
    clearInterval(timer);
  }
}

btnRefresh.addEventListener("click", refresh);
function refresh() {
  message.style.opacity = 0;
  shuffleCards();
  grid.innerHTML = "";
  createBoard();
  disableDeck = false;

  score = 0;
  scoreDisplay.textContent = score;

  clearInterval(timer);
  time = 60;
  timeDisplay.textContent = time + "s";
  setTimer();
}

setTimer();
function setTimer() {
  timer = setInterval(function () {
    time--;
    timeDisplay.textContent = time + "s";
    if (time === 0 && score < 6) {
      timeDisplay.textContent = time + "s";
      clearInterval(timer);
      disableDeck = true;
      message.textContent = "Oh no! You lost :(";
      message.style.opacity = 1;
    }
  }, 1000);
}
