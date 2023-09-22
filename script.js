const buttons = document.querySelectorAll('button:not(#positive-negative)');
const resetButton = document.querySelector('#ON-OFF');
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
setInterval(updateClock,60000);



buttons.forEach(button=>{
button.addEventListener('click' , ()=>{
    if(button.id === 'divide') {
        calculationArr.push('/');
    }else if(button.id === 'ON-OFF') {
            display.textContent = '0';
            calculationArr.length = 0;
    }else {calculationArr.push(button.textContent);}

    display.textContent = calculationArr.join('');
    button.classList.toggle('button-clicked');
    setTimeout(()=> {button.classList.remove('button-clicked'); } , 200);
    });
});




/*resetButton.addEventListener('click',()=>{
    display.textContent = '0';
    calculationArr.length = 0;
})*/







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