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

console.log(operate(1, 3, '+'));