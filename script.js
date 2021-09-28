let title
let screens
let screenPrice
let adaptive

let servicePrice1;
let servicePrice2;

let service1;
let service2;
let rollback = 10;
let servicePercentPrice; 
let fullPrice;
let allServicePrices;

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = () => {
    title = prompt('Как называется Ваш проект?', 'Калькулятор стоимости сайта');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
    } while(!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?');
};

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getAllServicePrices = () => {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?', 'Добавление JavaScript');
        } else if (i === 1 ) {
            service2 = prompt('Какой тип второй дополнительной услуги?', 'Добавление CMS');
        }

        sum += +prompt('Сколько это будет стоить?', '5000');
    }

    return sum;
};

function getFullPrice(layoutPrice, addPrice) {
    return +layoutPrice + addPrice;
}

const getTitle = (title) => {
    return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
};

const getServicePercentPrices = (price, rollback) => {
    return price - Math.ceil(price / 100 * rollback);
};

const getRollbackMessage = function(price) {
    if (price >= 30000) {
        return "Даем скидку 10%";
    } else if (price >= 15000 && price < 30000) {
        return "Даем скидку 5%";
    } else if (price < 15000 && price >= 0) {
        return "Скидка не предусмотрена";
    } else {
        return "Что-то пошло не так...";
    }
};



asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);




console.log(getRollbackMessage(fullPrice));

showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(`Стоимость верстки экранов: ${screenPrice} рублей`,
            `\nСтоимость разработки сайта: ${fullPrice} рублей`);

console.log('Массив screens:', screens.toLowerCase().split(' '));
console.log(getRollbackMessage(fullPrice));
console.log('Итоговую стоимость за вычетом процента отката:', getServicePercentPrices());
console.log('Процент отката посреднику за работу:', Math.ceil(fullPrice / 100 * rollback));
