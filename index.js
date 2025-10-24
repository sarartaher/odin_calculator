function add(a,b) {
   return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if(b === 0){
        return "Error";
    }
    return a/b;
}

function operate(operator, num1, num2){
    switch(operator){
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return null;
    }
}

// ---- basic UI setup ----
let display = document.getElementById("display");
let buttons = document.querySelectorAll(".btn");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            appendNumber(button.dataset.num || button.textContent);
        } else if (button.classList.contains("operator")) {
            chooseOperator(button.dataset.op || button.textContent);
        } else if (button.classList.contains("equal") || button.id === "equals") {
            evaluate();
        } else if (button.classList.contains("clear") || button.id === "clear") {
            clear();
        } else if (button.classList.contains("backspace")) {
            backspace();
        } else if (button.classList.contains("decimal")) {
            appendDecimal();
        }
    });
});

function appendNumber(num) {
    if (display.textContent === "0" || shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    display.textContent += num;
}

function chooseOperator(op) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = op;
    shouldResetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    if (result === "Error") {
        display.textContent = "Cannot divide by 0";
    } else {
        display.textContent = (Math.round(result * 100) / 100).toString();
    }
    currentOperator = null;
}

function clear() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
}

function backspace() {
    if (shouldResetDisplay) return;
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") display.textContent = "0";
}

function appendDecimal() {
    if (shouldResetDisplay) {
        display.textContent = "0";
        shouldResetDisplay = false;
    }
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}
