
function updateClock() {
const time = document.querySelector('.time');
const currentTime = new Date();
time.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
}
updateClock();
setInterval(updateClock,60000);


const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button:not(#ON-OFF):not(#positive-negative):not(#divide)');
const calculationArr = [];
buttons.forEach(button=>{
button.addEventListener('click' , ()=>{
    calculationArr.push(button.textContent);
    display.textContent = calculationArr.join('');
})
})

const resetButton = document.querySelector('#ON-OFF')
resetButton.addEventListener('click',()=>{
    display.textContent = '0';
    calculationArr.length = 0;
})





function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b ;
}

function operate(num1 , operator , num2) {
    if(operator=== '+') {return add(num1,num2)};
    if(operator=== '-') {return subtract(num1,num2)};
    if(operator=== '*') {return multiply(num1,num2)};
    if(operator=== '/') {return divide(num1,num2)};
}