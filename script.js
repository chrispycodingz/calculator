function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, op) {
    if (op == '+') {
        return add(a, b);
    } else if (op == '-') {
        return subtract(a,b);
    } else if (op == '/') {
        return divide(a,b);
    } else {
        return multiply(a, b);
    }
}

let a = null;
let b = null;
let operand = null;
let sum = null;



//Initialize all selector variables
const display = document.querySelector('.display');
const operators = ['.', '+', '-', 'X', '/', '%', 'AC', 'CE'];
const numeric = document.querySelectorAll('.buttons .numeric');
const operator = document.querySelectorAll('.buttons .operator');
const equal = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const ce = document.querySelector('.CE');

//Non functional selectors
const decimal = document.querySelector('.decimal');
const percent = document.querySelector('.percent');



//Update function runs all operations. 
function update() {
    //Boolean flags to set conditionals.
    let equalButtonPressed = false;
    let operandButtonPressed = false;
    let aBypass = false;
    let sumDisplayed = false;
    let forward = false;

    function nullify() {
        a = null;
        b = null;
        operand = null;
        sum = null;
        equalButtonPressed = false;
        operandButtonPressed = false;
        aBypass = false;
        sumDisplayed = false;
    }

    //Non functional events
    percent.addEventListener('click', () => {
        display.textContent = `No %'s ;)`
    })

    decimal.addEventListener('click', () => {
        display.textContent = 'No floats ;)';
        nullify();
    })

    //Functional events
    ce.addEventListener('click', () => {
        if (sumDisplayed === false && operandButtonPressed === false && a !== null) {
            a = null;
            display.textContent = '0';
        } else if (operandButtonPressed && b !== null && sumDisplayed === false) {
            b = null;
            display.textContent = '0';
        } else if (sumDisplayed && b !== null) {
            a = sum;
            b = null;
            display.textContent = '0';
        } else if (sumDisplayed && b === null) {
            display.textContent = '0';
        }
        
    })

    //Clear button function. TOTALLY WORKING!
    clear.addEventListener('click', () => {
        nullify();
        display.textContent = 0;
    });
    
    //Equal button function.. TOTALLY WORKING! (INCULDING 0 DIVISION!)
    equal.addEventListener('click', () => {
        if (a !== null && operand !== null && b !== null) {
            sum = operate(+a, +b, operand);
            sum = Math.round(sum * 100) / 100;
            display.textContent = sum;
            forward = true;
            sumDisplayed = true;
            equalButtonPressed = true;
        } else {
            display.textContent = 'Bozo alert!';
            nullify();
        }

        if (b == 0 && operand === '/') {
            display.textContent = 'Zero Div Err';
            nullify();
        }
        
    });
    // 
    numeric.forEach(button => 
        button.addEventListener('click', () => {
            if (sumDisplayed === false){
                if (a === null || a == 0 && b === null){
                    a = String(button.textContent)
                    display.textContent = a;
                } else if (a.length >= 1 && operandButtonPressed === false) {
                    a = a + String(button.textContent);
                    display.textContent = a;
                }
            } else if (sumDisplayed && b !== null && forward === true) {
                
                nullify();
                a = String(button.textContent);
                display.textContent = a;
            }

            if (operandButtonPressed && b === null || b == 0) {
                forward = false;
                b = String(button.textContent);
                display.textContent = b;
            } else if (b !== null && b.length >= 1 && forward === false) {
                b = b + String(button.textContent);
                display.textContent = b;
            }
        })
    );
    operator.forEach(button => 
        button.addEventListener('click', () => {
            if (a !== null && b === null) {
                operand = button.textContent;
                operandButtonPressed = true;
            }
// If b does not equal 0 AND if operand does NOT equal '/'. This means that both need to be true to run the code
            if (a !== null && b !== null && operandButtonPressed) {
                if (b === '0' && operand === '/'){
                    display.textContent = 'Zero Div Err';
                    nullify();
                } else {
                    sum = operate(+a, +b, operand);
                    sum = Math.round(sum * 100) / 100;
                    display.textContent = sum;
                    a = sum;
                    sumDisplayed = true;
                    forward = true;
                    b = null;
                    operand = button.textContent;
                }
            } 

        })
    )
    

}
update();


