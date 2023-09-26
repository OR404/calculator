const buttons = document.querySelectorAll('button:not(#positive-negative)');
const clearButton = document.querySelector('#clear');
const display = document.querySelector('.display');
const calculationArr = [];



function updateClock() {
const time = document.querySelector('.time');
const currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
hours = hours < 10 ? `0${hours}` : `${hours}`;
time.textContent = `${hours}:${minutes}`;
}
updateClock();
setInterval(updateClock,30000);

    buttons.forEach(button=>{
        button.addEventListener('click' , ()=>{
            let lastElement = calculationArr[calculationArr.length-1];
            if(typeof lastElement === 'undefined') {
                if(button.classList.contains('number')){calculationArr.push(parseInt(button.textContent))};
            }
            else if(button.classList.contains('operator') && typeof lastElement === 'number') {
                calculationArr.push(button.textContent);  
            }
            else if(button.classList.contains('number')) {
                if(typeof lastElement === 'number'){calculationArr[calculationArr.length - 1] = parseInt(`${lastElement}${button.textContent}`);}
                else{calculationArr.push(parseInt(button.textContent)); };
            }  
            else if(button.id === 'clear') {
                display.textContent = '0';
                calculationArr.length = 0;
            }
            console.log(calculationArr);
            display.textContent = calculationArr.join('');
    
            button.classList.toggle('button-clicked');
            setTimeout(()=> {button.classList.remove('button-clicked'); } , 200);
            console.log(calculationArr);
            });
        });





























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