'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};


let play = function() {

  let secretNumber = Math.floor(Math.random() * 100) + 1;

  let getAnswer = function() {
    let userNumber = prompt('Угадай число от 1 до 100:');

    if (userNumber === null) {
      return;
    } else if (!isNumber(userNumber)) {
      alert('Введи число!');
    } else if (userNumber > secretNumber) {
      alert('Загаданное число меньше');
    } else if (userNumber < secretNumber) {
      alert('Загаданное число больше');
    } else {
      alert('Поздравляю, Вы угадали!!!');
      return;
    }

    getAnswer();
  };

  getAnswer();
  
};

play();
alert('Игра окончена');