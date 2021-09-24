const title = prompt('Как называется Ваш проект?', 'Калькулятор стоимости сайта');
const screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
const adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Добавление JavaScript');
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000');
let service2 = prompt('Какой тип второй дополнительной услуги?', 'Добавление CMS');
let servicePrice2 = +prompt('Сколько будет стоить вторая услуга?', '7000');

let rollback = 10;
let servicePercentPrice; 
let fullPrice;




const showTypeOf = function(variable) {
    console.log(varable, typeof variable);
};

const getAllServicePrices = (addService1, addService2) => {
    return +addService1 + addService2;
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
        return "";
    } else if (price < 15000 && price >= 0) {
        return "Даем скидку 5%";
    } else {
        return "Что-то пошло не так...";
    }
};

const allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);




console.log(getRollbackMessage(fullPrice));

showTypeOf(type);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(`Стоимость верстки экранов: ${screenPrice} рублей`,
            `\nСтоимость разработки сайта: ${fullPrice} рублей`);

console.log('Массив screens:', screens.toLowerCase().split(' '));
console.log(getRollbackMessage(fullPrice));
console.log('Итоговую стоимость за вычетом процента отката:', getServicePercentPrices());
console.log('Процент отката посреднику за работу:', Math.ceil(fullPrice / 100 * rollback));
