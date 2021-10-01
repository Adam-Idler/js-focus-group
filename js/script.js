'use strict';

const title = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number ');
const rangeSlider = document.querySelector('.rollback [type=range]');
const rollbackNumber = document.querySelector('.rollback span');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const getUserString = function(question, possibleAnswer = '') {
    let answer;
    do {
      answer = prompt(question, possibleAnswer);
    } while (answer.trim() === '' || isNumber(answer));

    return answer;
  };
  
const getUserNum = function(question, possibleAnswer = '') {
    let answer;
    do {
      answer = prompt(question, possibleAnswer);
    } while (!isNumber(answer));

    return +answer;
  };

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,

    servicePrice1: 0,
    servicePrice2: 0,

    services: {

    },
    rollback: 10,
    servicePercentPrice: 0,
    fullPrice: 0,
    allServicePrices: 0,

    start: () => {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },

    asking: () => {
        appData.title = getUserString('Как называется Ваш проект?', 'Калькулятор стоимости сайта');

        for (let i = 0; i < 2; i++) { 
            let name = getUserString('Какие типы экранов нужно разработать?', 'Простые, Сложные');
            let price = 0;

            do {
                price = getUserNum('Сколько будет стоить данная работа?', '12000');
            } while(!isNumber(price))

            appData.screens.push({id: i, name, price})
        }

        for (let i = 0; i < 2; i++) {
            let name = appData.appDataservice1 = getUserString('Какой дополнительный тип услуги нужен?');
            let price = 0;
    
            do {
                price += getUserNum('Сколько это будет стоить?', '5000');
            } while (!isNumber(price))

            appData.services[name] = price;
        }
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },

    addPrices: () => {
        for (let screen of appData.screens) {
            appData.screenPrice  += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    
    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    
    getTitle: () => {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },
    
    getServicePercentPrices: () => {
        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice / 100 * appData.rollback);
    },
    
    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return "Даем скидку 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку 5%";
        } else if (price < 15000 && price >= 0) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так...";
        }
    },

    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
}

// appData.start();