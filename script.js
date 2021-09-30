'use strict';

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
        // console.log('Данные объекта appData:');
        // for (let key in appData) {
        //     console.log(key, appData[key]);
        // }
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    },
}

appData.start();