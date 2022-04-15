// "use strict";
let toggleButton = document.querySelector('.toggle-menu');
let navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
	navBar.classList.toggle('toggle');
});

// let cardsContent = [
//   {
    
//     img: 'images/1.png'
//   },
//   {
    
//     img: 'images/2.png'
//   },
//   {
   
//     img: 'images/3.png'
//   },
//   {
    
//     img: 'images/4.png'
//   },
//   {
    
//     img: 'images/5.png'
//   },
//   {
    
//     img: 'images/6.png'
//   },
//   {
    
//     img: 'images/7.png'
//   },
//   {
//     img: 'images/8.png'
//   },
//   {
    
//     img: 'images/9.png'
//   },
//   {
    
//     img: 'images/10.png'
//   },
//   // {
    
  //   img: 'images/1.png'
  // },
  // {
    
  //   img: 'images/2.png'
  // },
  // {
    
  //   img: 'images/3.png'
  // },
  // {
    
  //   img: 'images/4.png'
  // },
  // {
    
  //   img: 'images/5.png'
  // },
  // {
   
  //   img: 'images/6.png'
  // },
  // {
    
  //   img: 'images/7.png'
  // },
  // {
    
  //   img: 'images/8.png'
  // },
  // {
    
  //   img: 'images/9.png'
  // },
  // {
   
  //   img: 'images/10.png'
  // },
// ];

// console.log(cardArray);
// cardArray.sort(() => 0.5 - Math.random());
//create your board

  // for (let i = 0; i < cardsContent.length; i++) {
  //   const card = document.createElement('img');
  //   card.setAttribute('src', 'img/back.jpg');
  //   card.setAttribute('data-id', i);
  //   card.style.cssText = `width: 100px; height: 100px;  position: relative; display: flex; flex-direction: row; 
  //   flex-wrap: wrap;align-items: center;justify-content: center; border: 3px solid #000; cursor: pointer;
  //   user-select: none; margin: 3px; padding: 2px;`;
  //   // card.addEventListener('click',flipCard);
  //   field.appendChild(card);
    
  // }


  

  

let gameField      = document.getElementById('field');
let restartButton  = document.getElementById('restart');
let stepsCounter   = document.getElementById('steps');
let timerUI        = document.getElementById('timer');
let cardViewInHTML = '<div class="card card_closed" data-status="closed"></div>';
// let cardsContent   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
let cardsContent   = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png', 'img/8.png', 'img/9.png', 'img/10.png', 'img/11.png', 'img/12.png'];
console.log(cardsContent);
let openedCards    = [];
let complitedCards = 0;
let paused         = false;

restartButton.hidden = true;
cardsContent = doubleCards(cardsContent);
createCardsOnGameField(field);

gameField.onclick = function(e) {
	// wait while two wrong opened cards was closed;
  if (paused) { 
  	return; 
  }
  if (!timerUI.dataset.started) {
  	toggleTimer();
  }
  if (e.target.dataset.status === 'opened'
   || e.target.dataset.status === 'complited') {
    return;
  }

  openCard(e.target);
  stepsCounter.innerHTML = +stepsCounter.innerHTML + 1;

  if (openedCards.length !== 2) return;

  // set comlited status for matched cards, or close their with delay if not
  if (openedCards[0] === openedCards[1]) {
    setOpenedCardsStatus('complited', '');
    complitedCards += 2;
  } else {
    paused = true;
    setTimeout(() => {
      setOpenedCardsStatus('closed', 'card_closed');
      paused = false;
    }, 700);
  }

  // clear openedCards array for next try
  openedCards = [];

  if (complitedCards === cardsContent.length) {
    restartButton.hidden = false;
  }
}

restart.onclick = function() {
  gameField.innerHTML = '';
  cardsContent = mixarr(cardsContent);
  // create cards in HTML
  for (let i = 0; i < cardsContent.length; i++) {
    gameField.insertAdjacentHTML('beforeend', cardViewInHTML);
    gameField.lastElementChild.innerHTML = cardsContent[i];
  }
  toggleTimer();
  stepsCounter.innerHTML = 0;
  complitedCards = 0;
  restartButton.hidden = true;
}

function openCard(target) {
  target.dataset.status = 'opened';
  target.classList.remove('card_closed');
  openedCards.push(target.innerHTML);
}

function setOpenedCardsStatus(status, className) {
  for (let i = 0; i < gameField.children.length; i++) {
    if (gameField.children[i].dataset.status === 'opened') {
      gameField.children[i].dataset.status = status;
      if (!className) continue;
      gameField.children[i].classList.add(className);
    }
  }
}

function mixarr(arr) {
  return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
}

function doubleCards(cardsContent) {
	cardsContent.push(...cardsContent);
	cardsContent = mixarr(cardsContent);
  return cardsContent;
}

function createCardsOnGameField(field) {
  for (let i = 0; i < cardsContent.length; i++) {
    field.insertAdjacentHTML('beforeend', cardViewInHTML);
    field.lastElementChild.innerHTML = cardsContent[i];
  }
}

function timer(elemId) {
  let minutes = '00';
  let seconds = '00';
  let milliseconds = '00';

  let timerId = setInterval(() => {
    elemId.innerHTML = setTime();
    if (complitedCards === cardsContent.length) clearTimeout(timerId);
  }, 10);

  function doubleNumber(number) {
    if (number < 10) return '0' + number;
    return number;
  }

  function setTime() {
    if (milliseconds === 99) {
      milliseconds = '00';
      seconds++;
      seconds = doubleNumber(seconds);
    }
    if (seconds === 60) {
      seconds = '00';
      minutes++;
      minutes = doubleNumber(minutes);
    }

    milliseconds++;
    milliseconds = doubleNumber(milliseconds);

    return `${minutes}:${seconds}:${milliseconds}`;
  }
}

function toggleTimer() {
	if (!timerUI.dataset.started) {
  	timerUI.dataset.started = 'true';
  	timer(timerUI);
  } else {
  	timerUI.innerHTML = '00:00:00';
  	timerUI.dataset.started = '';
  }
}



// two variant

// const cards = document.querySelectorAll('.memo-card'); // Получаем массив элементов - карточек
// let hasFlipCard = false; // Перевернута ли карточка
// let boardLocked = false; //Запрет на кликание по другим карточкам пока открыты две одновременно
// let firstCard; // сохроняем в переменнные DOM элементы для дальнейшнго сравнения
// let secondCard;
// console.log(cards);


// const flipCard = (e) => {
//     if(boardLocked) return;
//     const target = e.target.parentElement;

//     if(target === firstCard) return;  //если доска закрыта все действия прекращаются

//     target.classList.add("flip");
    
//     if(!hasFlipCard) { //ПРоверяем какая была карточка
//         //First click
//         hasFlipCard = true;
//         firstCard = target;
//     }else{
//         //Second click
//         hasFlipCard = false;
//         secondCard = target;
//         checkForMatch(); // Проверка на совместимость, схожесть карточек (одинаковые ли)
//     }
// };
// //Chek for match
// function checkForMatch() {
//     const isEqual = firstCard.dataset.ikon === secondCard.dataset.ikon;
//     isEqual ? disableCards() : unflipCards(); // если тру остовляем карточки если false переворачиваем в исходное положение
// }

// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);
// }

// function unflipCards() {
//     boardLocked = true;
//     setTimeout(() => {
//         firstCard.classList.remove('flip');
//         secondCard.classList.remove('flip');
//         resetBoard();
//     },700);
// }

// function resetBoard() {
//     hasFlipCard = boardLocked = false;
//     firstCard = secondCard = null;
// }

// cards.forEach(card => {
//     card.addEventListener('click', flipCard);
//     const randomIndex = Math.floor(Math.random() * cards.length);
//     card.style.order = randomIndex;
// });