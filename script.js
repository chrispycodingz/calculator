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

// If the value of variable a is empty
// fill it with clicked value. Else fill b
// If sum has been displayed. Flag it as true and set conditional to exclusively update a 
// with value of sum and for b to take any numeric update





//NOTES: CAN ONLY FIT 11 figures on display. 12 IF NUMERIC VALUE IS 1.
//TODO: CARRY OPERATION FORWARD IF OPERATOR PRESSED AFTER RESULT IS DISPLAYED
//ELSE: DELETE ALL VALUES AND RESET FLAGS


//If a and b and operand aren't null and equals hasnt been called AND operator is pressed again, display value.
//If a is set to sum skip the numeric.forEach operation for a and move to b.

//IF AC IS PRESSED... THE SECOND OPERATOR NO LONGER WORKS 


//Initialize all selector variables
const display = document.querySelector('.display');
const operators = ['.', '+', '-', 'X', '/', '%', 'AC', 'CE'];
const numeric = document.querySelectorAll('.buttons .numeric');
const operator = document.querySelectorAll('.buttons .operator');
const equal = document.querySelector('.equals');
const clear = document.querySelector('.clear');

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

//Update function runs all operations. 
function update() {
    //Boolean flags to set conditionals.
    let equalButtonPressed = false;
    let operandButtonPressed = false;
    let aBypass = false;
    let sumDisplayed = false;

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
            }
        })
    );
    operator.forEach(button => 
        button.addEventListener('click', () => {
            if (a !== null && operandButtonPressed !== true) {
                operand = button.textContent;
                operandButtonPressed = true;
            }

            if (a !== null && b !== null && operandButtonPressed) {
                
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
            } 

        })
    )
    

}
update();


