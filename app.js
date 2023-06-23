const numberBtn = document.querySelectorAll('[data-numbers]');
const operationsBtn = document.querySelectorAll('[data-operations]');
const currentNumberTextDiv = document.querySelector('[data-currentNumberText]');
const previousNumberTextDiv = document.querySelector('[data-previousNumberText]');
const allClearBtn = document.querySelector('[data-allClear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const year = document.getElementById('year');



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
    reset()
})

deleteBtn.addEventListener('click', () => {
    currentNumber = currentNumber.toString().slice(0, -1);
    currentNumberTextDiv.innerText = currentNumber;
})

const reset = () => {
    equalsBtn.addEventListener('click' , () => {
        currentNumberTextDiv.innerText = '';
    })
}

const newYear = (new Date()).getFullYear();
year.innerText = `${newYear}`;