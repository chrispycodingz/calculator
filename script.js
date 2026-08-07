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






//NOTES: CAN ONLY FIT 11 figures on display. 12 IF NUMERIC VALUE IS 1.


//Focus on scrapping results if user inputs numeric value after sumDisplayed.


//Initialize all selector variables
const display = document.querySelector('.display');
const operators = ['.', '+', '-', 'X', '/', '%', 'AC', 'CE'];
const numeric = document.querySelectorAll('.buttons .numeric');
const operator = document.querySelectorAll('.buttons .operator');
const equal = document.querySelector('.equals');
const clear = document.querySelector('.clear');



//Update function runs all operations. 
function update() {
    //Boolean flags to set conditionals.
    let equalButtonPressed = false;
    let operandButtonPressed = false;
    let aBypass = false;
    let sumDisplayed = false;

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

    //Clear button function. TOTALLY WORKING!
    clear.addEventListener('click', () => {
        nullify();
        display.textContent = 0;
        console.log(a);
        console.log(b);
        console.log(operand)
    });
    
    //Equal button function.. TOTALLY WORKING! (INCULDING 0 DIVISION!)
    equal.addEventListener('click', () => {
        if (a !== null && operand !== null && b !== null) {
            
            display.textContent = operate(+a, +b, operand);
            equalButtonPressed = true;
        } else {
            display.textContent = 'Bozo alert';
            nullify();
        }

        if (b == 0 && operand === '/') {
            display.textContent = 'Zero Div Err';
            console.log(a);
            console.log(b);
            console.log(operand);
            nullify();
            console.log(a);
            console.log(b);
            console.log(operand);
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
            }
            if (operandButtonPressed && b === null || b == 0) {
                b = String(button.textContent);
                display.textContent = b;
            } else if (b !== null && b.length >= 1) {
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

            if (a !== null && b !== null && operandButtonPressed) {
                if (b != 0 && operand !== '/'){
                    sum = operate(+a, +b, operand);
                    console.log(operand);
                    console.log(a);
                    console.log(b);
                    console.log(sum);
                    display.textContent = sum;
                    a = sum;
                    sumDisplayed = true;
                    b = null;
                    operand = button.textContent;
                } else if (b == 0 && operand === '/'){
                    display.textContent = 'Zero Div Err';
                    nullify();
                }
            } 

        })
    )
    

}
update();


