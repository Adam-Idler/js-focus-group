'use strict';

let controlElements = document.querySelectorAll('.main-controls select, .main-controls input, .main-controls button');
const title = document.getElementsByTagName('h1')[0];
const calcBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusBtn = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number ');
const rangeSlider = document.querySelector('.rollback [type=range]');
const rollbackNumber = document.querySelector('.rollback span');
const cmsOpenCheckbox = document.getElementById('cms-open');
const cmsSelect = document.getElementById('cms-select');
const hiddenCmsBlock = document.querySelector('.hidden-cms-variants');
const cmsInputWrapper = hiddenCmsBlock.querySelector('.main-controls__input')

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
    cmsPercent: 0,

    servicesPercent: {},
    servicesNumber: {},
    rollback: 0,
    servicePercentPrice: 0,
    fullPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,

    init: function() {
        this.addTitle();

        calcBtn.addEventListener('mouseenter', this.emptyCheck.bind(this));
        rangeSlider.addEventListener('input', this.changeRangeNumber.bind(this))
        plusBtn.addEventListener('click', this.addScreenBlock.bind(this));
        cmsOpenCheckbox.addEventListener('click', this.openCmsBlock.bind(this));
    },

    openCmsBlock: function() {
        hiddenCmsBlock.style.display = 'flex';

        cmsSelect.addEventListener('change', () => {
            let selectedValue = cmsSelect[cmsSelect.selectedIndex].value
            if (+selectedValue * 1 === +selectedValue) {
                this.cmsPercent = selectedValue;
            } else if (selectedValue === 'other') {
                cmsInputWrapper.style.display = 'block';

                const cmsInput = cmsInputWrapper.querySelector('input');
                cmsInput.addEventListener('input', () => {
                    this.cmsPercent = +cmsInput.value;
                })
            }
        })
    },

    changeRangeNumber: function() {
        rollbackNumber.textContent = `${rangeSlider.value}%`;
        this.rollback = rangeSlider.value;
    },

    changePriceWithRollback: function() {
        this.rollback = rangeSlider.value;
        this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice / 100 * this.rollback)
        totalCountRollback.value = this.servicePercentPrice;
    },

    addTitle: function() {
        document.title = title.textContent;
    },  

    emptyCheck: function() {
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

            calcBtn.removeEventListener('click', this.start.bind(this));
            rangeSlider.removeEventListener('input', this.changePriceWithRollback.bind(this))
        } else {
            const errorTextElement = calcBtnParentNode.querySelector('#error-text');
            if (errorTextElement) {
                calcBtnParentNode.removeChild(errorTextElement);
            }

            calcBtn.style.cursor = 'pointer';
            calcBtn.addEventListener('click', this.start.bind(this));
            rangeSlider.addEventListener('input', this.changePriceWithRollback.bind(this));
        }
    },

    start: function() {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();

        controlElements.forEach(item => {
            item.disabled = 'disabled';
        })

        calcBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        resetBtn.addEventListener('click', this.reset.bind(this))
    },

    reset: function() {
        total.value = 0;
        totalCountOther.value = 0;
        totalFullCount.value = 0;
        totalCountRollback.value = 0;
        totalCount.value = 0;

        controlElements.forEach(item => {
            item.disabled = false;
            if (item.getAttribute('type') === 'checkbox') {
                item.checked = false;
            }
        })

        this.screens = [];
        this.screenPrice = 0;
        this.screensCount = 0;
        this.adaptive = true;
        this.servicePrice1 = 0;
        this.servicePrice2 = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.rollback = 0;
        this.servicePercentPrice = 0;
        this.fullPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;

        hiddenCmsBlock.style.display = 'none';

        resetBtn.style.display = 'none';
        calcBtn.style.display = 'block';

        screens.forEach((screen, i) => {
            if (i === 0 ) {
                screen.querySelector('input').value = '';
                screen.querySelector('select').selectedIndex = 0;
                return;
            }

            screen.parentNode.removeChild(screen);
        });
    },

    showResult: function() {
        total.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screensCount;
    },

    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        controlElements = document.querySelectorAll('.main-controls select, .main-controls input, .main-controls button');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value,
            })
        });
    },

    addServices: function() {
        percentItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });

        numberItems.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });
    },

    addScreenBlock: function() {
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';

        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: function() {
        for (let screen of this.screens) {
            this.screenPrice  += +screen.price;
            this.screensCount += screen.count;
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += Math.ceil(this.screenPrice / 100 * this.servicesPercent[key]);
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += Math.ceil(this.screenPrice / 100 * this.servicesPercent[key]);
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += Math.ceil(this.screenPrice / 100 * this.servicesPercent[key]);
        }

        this.fullPrice = +this.screenPrice + 
                          this.servicePricesPercent + 
                          this.servicePricesNumber;

        if (this.cmsPercent) {
            this.fullPrice += this.fullPrice / 100 * this.cmsPercent;
        }

        this.servicePercentPrice = this.fullPrice - Math.ceil(this.fullPrice / 100 * this.rollback);
    },
}

appData.init();