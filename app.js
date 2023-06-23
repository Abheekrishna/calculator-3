const numberBtn = document.querySelectorAll('[data-numbers]');
const operationsBtn = document.querySelectorAll('[data-operations]');
const currentNumberTextDiv = document.querySelector('[data-currentNumberText]');
const previousNumberTextDiv = document.querySelector('[data-previousNumberText]');
const allClearBtn = document.querySelector('[data-allClear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');



let haveDot = false;
let currentNumber = '';
let previousNumber = '';
let result = null;
let lastOperation = '';


numberBtn.forEach(number => {
    number.addEventListener('click', (e) => {
        console.log(!haveDot)
        if(e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if(e.target.innerText === '.' && haveDot) {
            return;
        }
        currentNumber += e.target.innerText;
        currentNumberTextDiv.innerText = currentNumber; 

    })
})