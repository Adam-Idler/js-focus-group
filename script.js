'use strict';

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,

    servicePrice1: 0,
    servicePrice2: 0,

    service1: '',
    service2: '',
    rollback: 10,
    servicePercentPrice: 0,
    fullPrice: 0,
    allServicePrices: 0,

    asking: () => {
        appData.title = prompt('Как называется Ваш проект?', 'Калькулятор стоимости сайта');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
        } while(!isNumber(appData.screenPrice))
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    
    getAllServicePrices: () => {
        let sum = 0;
    
        for (let i = 0; i < 2; i++) {
            let price = 0;
    
            if (i === 0) {
                appData.appDataservice1 = prompt('Какой дополнительный тип услуги нужен?', 'Добавление JavaScript');
            } else if (i === 1 ) {
                appData.appDataservice2 = prompt('Какой тип второй дополнительной услуги?', 'Добавление CMS');
            }
    
            do {
                sum += +prompt('Сколько это будет стоить?', '5000');
            } while (!isNumber(price))
    
            sum += +price;
        }
    
        return sum;
    },
    
    getFullPrice: function() {
        return +appData.screenPrice + appData.allServicePrices;
    },
    
    getTitle: () => {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().slice(1).toLowerCase();
    },
    
    getServicePercentPrices: () => {
        return appData.fullPrice - Math.ceil(appData.fullPrice / 100 * appData.rollback);
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

    start: () => {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger();
    },

    logger: () => {
        console.log('Данные объекта appData:');
        for (let key in appData) {
            console.log(key, appData[key]);
        }
    },
}

appData.start();