const btn = document.getElementById('btn');
const e_btn = document.getElementById('e_btn');
const square = document.getElementById('square');
const circle = document.getElementById('circle');
const input = document.getElementById('text');
const inputRange = document.getElementById('range');
const rangeSpan = document.getElementById('range-span');
const allowedColors = ['red', 'green', 'blue', 'yellow', 'black', 'orange']

btn.addEventListener('click', () => {
    if (allowedColors.indexOf(input.value) !== -1) {
        square.style.background = input.value;
    } else {
        alert('Квадрату нельзя задать такой цвет');
    }
});

e_btn.style.display = 'none';

inputRange.setAttribute('min', 0);
inputRange.setAttribute('max', 100);
rangeSpan.textContent = `${inputRange.value}%`;

inputRange.addEventListener('input', () => {
    circle.style.width = `${inputRange.value}%`;
    circle.style.height = `${inputRange.value}%`;
    rangeSpan.textContent = `${inputRange.value}%`;
});
