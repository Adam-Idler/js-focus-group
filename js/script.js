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

const appData = {
    screens: [],
    screenPrice: 0,
    screensCount: 0,
    adaptive: true,

    servicePrice1: 0,
    servicePrice2: 0,

    servicesPercent: {},
    servicesNumber: {},
    rollback: 10,
    servicePercentPrice: 0,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,

    init: () => {
        appData.start();
        appData.addTitle();

        rangeSlider.addEventListener('input', appData.changeRangeNumber)
        calcBtn.addEventListener('mouseenter', appData.emptyCheck);
        plusBtn.addEventListener('click', appData.addScreenBlock);
    },

    changeRangeNumber: () => {
        rollbackNumber.textContent = `${rangeSlider.value}%`;
        appData.rollback = rangeSlider.value;
    },

    changePriceWithRollback: () => {
        appData.rollback = rangeSlider.value;
        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice / 100 * appData.rollback)
        totalCountRollback.value = appData.servicePercentPrice;
    },

    addTitle: () => {
        document.title = title.textContent;
    },  

    emptyCheck: () => {
        const emptyScreens = [...screens].filter((screen) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (select.options.selectedIndex === 0 || input.value === '') {
                return screen;
            } 
        }); 

        const calcBtnParentNode = calcBtn.parentNode;
        calcBtn.parentNode.style.position = "relative";
        if (emptyScreens.length > 0) {
            calcBtn.style.cursor = 'not-allowed';

            if (!calcBtnParentNode.querySelector('#error-text')) {
                const errorText = document.createElement('div');
                errorText.id = 'error-text';
                errorText.textContent = 'Проверьте введенные данные';
                errorText.style.cssText = "width: 100%; text-align: center; font-size: 12px; color: red; position: absolute; top: 45px";
            
                calcBtnParentNode.appendChild(errorText);
            }

            calcBtn.removeEventListener('click', appData.start);
            rangeSlider.removeEventListener('input', appData.changePriceWithRollback)
        } else {
            const errorTextElement = calcBtnParentNode.querySelector('#error-text');
            if (errorTextElement) {
                calcBtnParentNode.removeChild(errorTextElement);
            }

            calcBtn.style.cursor = 'pointer';
            calcBtn.addEventListener('click', appData.start);
            rangeSlider.addEventListener('input', appData.changePriceWithRollback);
        }
    },

    start: () => {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
    },

    showResult: () => {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
        totalCount.value = appData.screensCount;
    },

    addScreens: () => {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value,
            })
        });
    },

    addServices: () => {
        percentItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        });

        numberItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addScreenBlock: () => {
        const cloneScreen = screens[0].cloneNode(true);

        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: () => {
        for (let screen of appData.screens) {
            appData.screenPrice  += +screen.price;
            appData.screensCount += screen.count;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += Math.ceil(appData.screenPrice / 100 * appData.servicesPercent[key]);
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += Math.ceil(appData.screenPrice / 100 * appData.servicesPercent[key]);
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += Math.ceil(appData.screenPrice / 100 * appData.servicesPercent[key]);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;
        appData.servicePercentPrice = appData.fullPrice - Math.ceil(appData.fullPrice / 100 * appData.rollback);
    },
}

appData.init();