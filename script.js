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

//

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

    //Clear button function. TOTALLY WORKING!
    clear.addEventListener('click', () => {
        a = null;
        b = null;
        operand = null;
        sum = null;
        equalButtonPressed = false;
        operandButtonPressed = false;
        aBypass = false;
        sumDisplayed = false;
        display.textContent = 0;
    });
    
    //Equal button function.. TOTALLY WORKING! (INCULDING 0 DIVISION!)
    equal.addEventListener('click', () => {
        if (a !== null && operand !== null && b !== null) {
            console.log(a);
            console.log(b);
            console.log(operand);
            display.textContent = operate(+a, +b, operand);
            equalButtonPressed = true;
        }
        if (a === null || b === null || operand === null || b == 0 && operand === '/'){
            display.textContent = "Bozo Alert"
        }
    });
    // This function is absolutely gacked. Can't really make sense of it TBH... and i just wrote it yesterday LOL.
    numeric.forEach(button => {
        button.addEventListener('click', () => {
            if (operandButtonPressed && sum !== null) {
                a = +sum;
                aBypass = true;
                console.log(a);
                
            }
            if (aBypass === false){
                
                if (a === null) {
                    a = String(button.textContent);
                    display.textContent = a;
                    
                } else if (a !== '0' && operand === null){
                    a = a + String(button.textContent);
                    display.textContent = a;
                    
                } else if (a.length === 1 && a === '0' && operand === null) {
                    a = null;
                    a = String(button.textContent);
                    display.textContent = a;
                    
                }
            }
        });
    });
    // CODE SMELL: Repeats the same function as before... figure out how to incorperate it into the above function...
    numeric.forEach(button => {
        button.addEventListener('click', () => {
            if (b === null && operand !== null) {
                b = String(button.textContent);
                display.textContent = b;
            } else if (b !== '0' && b !== null && aBypass === false){
                b = b + String(button.textContent);
                display.textContent = b;
                console.log(b)
            } else if (b !== null && b.length === 1 && b === '0') {
                b = null;
                b = String(button.textContent);
                display.textContent = b;
            } else if (b !== null && sum !== null) {
                b = String(button.textContent)
                display.textContent = operate(+sum, +b, operand)
            }
            
           
            
        });
    });
    // Operator function... a bit convoluted as well in the conditionals.
    operator.forEach(button => {
        button.addEventListener('click', () => {
            
            if (a !== null && operand !== null && b!== null && equalButtonPressed === false && operandButtonPressed === true) {
                sum = operate(+a, +b, operand);
                display.textContent = sum
                sumDisplayed = true;
            }
            if (operand === null || operandButtonPressed === true) {
                operand = String(button.textContent);
                console.log(operand)
                operandButtonPressed = true;
            } 
            if (operand !== null && aBypass) {
                sum = operate(+a, +b, operand);
                console.log('Hey its working!')
                display.textContent = sum
                sumDisplayed = true;
            }

            
            
        });
    }); 
  
    

}
update();


