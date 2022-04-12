// "use strict";
let toggleButton = document.querySelector('.toggle-menu');
let navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', function () {
	navBar.classList.toggle('toggle');
});

const cards = document.querySelectorAll('.memo-card'); // Получаем массив элементов - карточек
let hasFlipCard = false; // Перевернута ли карточка
let boardLocked = false; //Запрет на кликание по другим карточкам пока открыты две одновременно
let firstCard; // сохроняем в переменнные DOM элементы для дальнейшнго сравнения
let secondCard;
console.log(cards);


const flipCard = (e) => {
    if(boardLocked) return;
    const target = e.target.parentElement;

    if(target === firstCard) return;  //если доска закрыта все действия прекращаются

    target.classList.add("flip");
    
    if(!hasFlipCard) { //ПРоверяем какая была карточка
        //First click
        hasFlipCard = true;
        firstCard = target;
    }else{
        //Second click
        hasFlipCard = false;
        secondCard = target;
        checkForMatch(); // Проверка на совместимость, схожесть карточек (одинаковые ли)
    }
};
//Chek for match
function checkForMatch() {
    const isEqual = firstCard.dataset.ikon === secondCard.dataset.ikon;
    isEqual ? disableCards() : unflipCards(); // если тру остовляем карточки если false переворачиваем в исходное положение
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    boardLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },700);
}

function resetBoard() {
    hasFlipCard = boardLocked = false;
    firstCard = secondCard = null;
}

cards.forEach(card => {
    card.addEventListener('click', flipCard);
    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});



