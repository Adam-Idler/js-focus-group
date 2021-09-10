let title = 'My project';
let screens= 'Простые, Сложные, Интерактивные';
let screenPrice = 2500;
let rollback = 50;
let fullPrice = 10000;
let adaptive = true;

console.log('type of title:', typeof title);
console.log('type of fullPrice:', typeof fullPrice);
console.log('type of adaptive:', typeof adaptive);

console.log('Длина строки screens:', screens.length);

console.log(`Стоимость верстки экранов: ${screenPrice} рублей`,
            `\nСтоимость разработки сайта: ${fullPrice} рублей`);

console.log('Массив screens:', screens.toLowerCase().split(' '));

console.log('Процент отката посреднику за работу:', fullPrice * (rollback / 100));
