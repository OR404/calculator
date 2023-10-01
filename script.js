const numsAndOperatorsButton = document.querySelectorAll('button:not(#equals):not(#clear):not(#DEL):not(.parentheses)');
const parentheses = document.querySelectorAll('.parentheses');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#DEL');
const display = document.querySelector('.display');
const calculationArr = [];


function buttonClickEffect(button) {
    button.classList.toggle('button-clicked');
    setTimeout(()=> {button.classList.remove('button-clicked'); } , 200);
};


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


function orderOfOperations (calculationArr) {
    if(typeof calculationArr[calculationArr.length-1] === 'number') {
        while(calculationArr.includes('*') ||calculationArr.includes('/') ){
        for(let i = 0 ;  i<calculationArr.length ; i++) {
            let currentCalculation = null;
            if(calculationArr[i] === '*' || calculationArr[i] === '/'){
                currentCalculation = operate(calculationArr[i-1],calculationArr[i],calculationArr[i+1]);
                calculationArr.splice(i-1,3,currentCalculation);
            }}}
        while(calculationArr.includes('+') || calculationArr.includes('-')){
        for(let i = 0 ; i<calculationArr.length ; i++){
            let currentCalculation2 = null;
            if(calculationArr[i] === '+' || calculationArr[i] === '-'){
            currentCalculation2 = operate(calculationArr[i-1],calculationArr[i],calculationArr[i+1]);
            calculationArr.splice(i-1,3,currentCalculation2);
           console.log(currentCalculation2);
        }}}
        display.textContent = calculationArr.join(''); 
    }
}


    numsAndOperatorsButton.forEach(button=>{
        button.addEventListener('click' , ()=>{
            let lastElement = calculationArr[calculationArr.length-1];
            if(typeof lastElement === 'undefined') {
                if(button.classList.contains('number')){calculationArr.push(parseFloat(button.textContent))};
            }
            else if(button.classList.contains('operator')  && typeof lastElement === 'number' && button.id !== 'dot') {
                calculationArr.push(button.textContent);  
            }
            else if(button.classList.contains('number')) {
                if(typeof lastElement === 'number' || lastElement.charAt(lastElement.length-1)=== '.')
                {calculationArr[calculationArr.length - 1] = parseFloat(`${lastElement}${button.textContent}`);}
                else{calculationArr.push(parseFloat(button.textContent)); };
            }
            else if(button.id === 'dot' && !lastElement.toString().includes('.')  ){
                if(typeof lastElement === 'number'){calculationArr[calculationArr.length - 1] +='.'};
            }
            display.textContent = calculationArr.join('');
            console.log(calculationArr);
            buttonClickEffect(button);
            });
        });
        
        clearButton.addEventListener('click' , ()=>{
            calculationArr.length = 0;
            display.textContent = calculationArr.join('');
            buttonClickEffect(clearButton);
        })
        deleteButton.addEventListener('click' , ()=>{
            calculationArr.pop();
            display.textContent = calculationArr.join('');
            buttonClickEffect(deleteButton);
        })
        equalsButton.addEventListener('click' , ()=>{
            buttonClickEffect(equalsButton);
            orderOfOperations(calculationArr);
        })




        let toggleParentheses = false;
        parentheses.forEach(button=>{
            button.addEventListener('click' , ()=>{
            let lastElement = calculationArr[calculationArr.length-1];

                if(button.id === 'left-parentheses'&& typeof lastElement === 'string' && operatorInArrayCheck(calculationArr)) {
                    buttonClickEffect(button);
                }











                //buttonClickEffect(button);
            })
        })
      
















function operatorInArrayCheck(array) {
   if(array.includes('/') || array.includes('*') || array.includes('-') || array.includes('+')){
    return true;
   }
}

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