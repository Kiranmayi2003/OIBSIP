const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");
const equalsButton = document.getElementById("equals");

let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;


// Number buttons
numberButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const number = button.textContent;

        if (display.value === "Error") {
            display.value = number;
            firstNumber = null;
            currentOperator = null;
            waitingForSecondNumber = false;
            return;
        }

        if (waitingForSecondNumber) {
            display.value = number;
            waitingForSecondNumber = false;
        } 
        else if (display.value === "0") {
            display.value = number;
        } 
        else {
            display.value += number;
        }
    });

});


// Decimal button
decimalButton.addEventListener("click", function () {

    if (display.value === "Error") {
        display.value = "0.";
        return;
    }

    if (waitingForSecondNumber) {
        display.value = "0.";
        waitingForSecondNumber = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }

});


// Operator buttons
operatorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const operator = button.dataset.operator;
        const currentNumber = parseFloat(display.value);

        if (display.value === "Error") {
            return;
        }

        // If user presses another operator
        if (currentOperator !== null && waitingForSecondNumber) {
            currentOperator = operator;
            return;
        }

        // First number
        if (firstNumber === null) {
            firstNumber = currentNumber;
        } 
        else if (currentOperator !== null) {

            const result = calculate(
                firstNumber,
                currentNumber,
                currentOperator
            );

            if (result === "Error") {
                display.value = "Error";
                firstNumber = null;
                currentOperator = null;
                return;
            }

            display.value = result;
            firstNumber = result;
        }

        currentOperator = operator;
        waitingForSecondNumber = true;
    });

});


// Equals button
equalsButton.addEventListener("click", function () {

    if (
        firstNumber === null ||
        currentOperator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const secondNumber = parseFloat(display.value);

    const result = calculate(
        firstNumber,
        secondNumber,
        currentOperator
    );

    if (result === "Error") {
        display.value = "Error";
    } 
    else {
        display.value = result;
    }

    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
});


// Clear button
clearButton.addEventListener("click", function () {

    display.value = "0";
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;

});


// Backspace button
backspaceButton.addEventListener("click", function () {

    if (display.value === "Error") {
        display.value = "0";
        return;
    }

    if (waitingForSecondNumber) {
        return;
    }

    if (display.value.length === 1) {
        display.value = "0";
    } 
    else {
        display.value = display.value.slice(0, -1);
    }

});


// Calculation logic
function calculate(first, second, operator) {

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":
            if (second === 0) {
                return "Error";
            }
            return first / second;

        default:
            return second;
    }
}