const title = prompt('Как называется Ваш проект?', 'Калькулятор стоимости сайта');
const screens= prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
const adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Добавление JavaScript');
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000');
let service2 = prompt('Какой тип второй дополнительной услуги?', 'Добавление CMS');
let servicePrice2 = +prompt('Сколько будет стоить вторая услуга?', '7000');

let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - Math.ceil(fullPrice / 100 * rollback); 

if (fullPrice >= 30000) {
    console.log('Даем скидку 10%');
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку 5%');
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log('Скидка не предусмотрена');
} else {
    console.log('Что-то пошло не так...');
}

console.log('type of title:', typeof title);
console.log('type of fullPrice:', typeof fullPrice);
console.log('type of adaptive:', typeof adaptive);

console.log('Длина строки screens:', screens.length);

console.log(`Стоимость верстки экранов: ${screenPrice} рублей`,
            `\nСтоимость разработки сайта: ${fullPrice} рублей`);

console.log('Массив screens:', screens.toLowerCase().split(' '));

console.log('Итоговую стоимость за вычетом процента отката:', servicePercentPrice);
console.log('Процент отката посреднику за работу:', Math.ceil(fullPrice / 100 * rollback));
