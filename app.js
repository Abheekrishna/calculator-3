const numberBtn = document.querySelectorAll('[data-numbers]');
const operationsBtn = document.querySelectorAll('[data-operations]');
const currentNumberTextDiv = document.querySelector('[data-currentNumberText]');
const previousNumberTextDiv = document.querySelector('[data-previousNumberText]');
const allClearBtn = document.querySelector('[data-allClear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const year = document.getElementById('year');
const darkModeToggle = document.getElementById('darkmode');



let haveDot = false;
let currentNumber = '';
let previousNumber = '';
let result = null;
let lastOperation = '';


numberBtn.forEach(number => {
    number.addEventListener('click', (e) => {
        if(e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if(e.target.innerText === '.' && haveDot) {
            return;
        }
        currentNumber += e.target.innerText;
        currentNumberTextDiv.innerText = currentNumber;
    })
})

operationsBtn.forEach(operation => {
    operation.addEventListener('click', (e) => {
        const operationName = e.target.innerText;
        if(!currentNumber) return;
        haveDot = false;
        if(currentNumber && lastOperation && previousNumber) {
            mathOperations();
        } else {
            result  = parseFloat(currentNumber);
        }
        
        lastOperation = operationName;
        clear(lastOperation);
    })
})

const mathOperations = () => {
    if(lastOperation === '/') {
        result = parseFloat(result) / parseFloat(currentNumber);
    } else if(lastOperation === '*') {
        result = parseFloat(result) * parseFloat(currentNumber);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(currentNumber);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(currentNumber);
    }
}

const clear = (operationName = '') => {
    previousNumber = `${currentNumber} ${operationName}`;
    previousNumberTextDiv.innerText = previousNumber;
    currentNumber = '';
    currentNumberTextDiv.innerText = '';
}

equalsBtn.addEventListener('click', () => {
    if(!currentNumber) return;
    mathOperations();
    clear(lastOperation);
    currentNumberTextDiv.innerText = result;
})

allClearBtn.addEventListener('click', () => {
    currentNumberTextDiv.innerText = '';
    previousNumberTextDiv.innerText = '';
    currentNumber = '';
    lastOperation = '';
    previousNumber = '';
})

deleteBtn.addEventListener('click', () => {
    currentNumber = currentNumber.toString().slice(0, -1);
    currentNumberTextDiv.innerText = currentNumber;
})


const newYear = (new Date()).getFullYear();
year.innerText = `${newYear}`;


let darkMode = localStorage.getItem('darkmode');

const enableDarkMode = () => {
    document.body.classList.add('lightmode')
    localStorage.setItem('darkmode', 'enabled');
} 

const disableDarkMode = () => {
    document.body.classList.remove('lightmode')
    localStorage.setItem('darkmode', null);
}

darkModeToggle.addEventListener('click', () => {
    let darkMode = localStorage.getItem('darkmode');
    if(darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode()
    }
})


const audio = new Audio('./audio/onLoad.mp3');
window.onload = function () {
    audio.play()
}