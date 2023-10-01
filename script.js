const numsAndOperatorsButton = document.querySelectorAll('button:not(#equals):not(#clear):not(#DEL):not(.parentheses)');
const parentheses = document.querySelectorAll('.parentheses');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#DEL');
const display = document.querySelector('.display');
const calculationArr = [];
let toggleParentheses = false;


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


function orderOfOperations (array) {
        while(array.includes('*') ||array.includes('/') ){
        for(let i = 0 ;  i<array.length ; i++) {
            let currentCalculation = null;
            if(array[i] === '*' || array[i] === '/'){
                currentCalculation = operate(array[i-1],array[i],array[i+1]);
                array.splice(i-1,3,currentCalculation);
            }}}
        while(array.includes('+') || array.includes('-')){
        for(let i = 0 ; i<array.length ; i++){
            let currentCalculation2 = null;
            if(array[i] === '+' || array[i] === '-'){
            currentCalculation2 = operate(array[i-1],array[i],array[i+1]);
            array.splice(i-1,3,currentCalculation2);
        }}}

        return parseFloat(array.join(' '));
}


    numsAndOperatorsButton.forEach(button=>{
        button.addEventListener('click' , ()=>{
            let lastElement = calculationArr[calculationArr.length-1];
            if(typeof lastElement === 'undefined') {
                if(button.classList.contains('number')){calculationArr.push(parseFloat(button.textContent))};
            }
            else if(button.classList.contains('operator')  && (typeof lastElement === 'number' || lastElement === ')') && button.id !== 'dot') {
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
            toggleParentheses = false;
            calculationArr.length = 0;
            display.textContent = calculationArr.join('');
            buttonClickEffect(clearButton);
        })
        deleteButton.addEventListener('click' , ()=>{
           if(calculationArr[calculationArr.length-1] === '('){toggleParentheses = false;}
           else if (calculationArr[calculationArr.length-1] === ')'){toggleParentheses = true;}
            calculationArr.pop();
            display.textContent = calculationArr.join('');
            buttonClickEffect(deleteButton);
        })


        equalsButton.addEventListener('click' , ()=>{
            for(let i = 0 ; i<calculationArr.length ; i++) {
            let parenthesesExpression = [];
            if(calculationArr[i] === '('){
            let parenthesesLength = calculationArr.indexOf(')')-calculationArr.indexOf('(');
            parenthesesExpression = calculationArr.slice(calculationArr.indexOf('(')+1, calculationArr.indexOf(')'));
            console.log('parenthses length:' + parenthesesLength);
            console.log('parenthses expression:' + parenthesesExpression);
            console.log('calculation array before splice:' + calculationArr);
            calculationArr.splice(calculationArr.indexOf('('),parenthesesLength+1,orderOfOperations(parenthesesExpression));
            console.log('calculation array after splice: ' + calculationArr);
            }}
       
            if(typeof calculationArr[calculationArr.length-1] === 'number' && toggleParentheses === false){ 
            orderOfOperations(calculationArr); 
            }

            buttonClickEffect(equalsButton);
            display.textContent = calculationArr.join(''); 
        })

       
        parentheses.forEach(button=>{
            button.addEventListener('click' , ()=>{
            let lastElement = calculationArr[calculationArr.length-1];
                if(button.id === 'left-parentheses'&& typeof lastElement === 'string' && lastElement !== ')' && toggleParentheses === false  && isOperatorInArray(calculationArr)) {
                    toggleParentheses = true;
                    calculationArr.push(button.textContent);
                    display.textContent = calculationArr.join('');
                }
                if(button.id === 'right-parentheses' && typeof lastElement === 'number' && toggleParentheses == true && isOperatorInArrayParentheses(calculationArr)){
                    toggleParentheses = false;
                    calculationArr.push(button.textContent);
                    display.textContent = calculationArr.join('');
                }
                console.log(calculationArr);
                buttonClickEffect(button);
            })
        })
      

function isOperatorInArray(array) {
   if(array.includes('/') || array.includes('*') || array.includes('-') || array.includes('+')){
    return true;
   }
}


function isOperatorInArrayParentheses(array){
    parenthesesArray = array.slice(array.indexOf('('));
    if(isOperatorInArray(parenthesesArray)){
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