
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-btn");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        // Clear
        if (value === "C") {
            display.value = "";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
            return;
        }

        // Backspace
        if (value === "⌫") {
            display.value = display.value.slice(0, -1);
            return;
        }

        // Number or decimal
        if (!isNaN(value) || value === ".") {
            if (display.value === "Error" || waitingForSecondNumber) {
                display.value = "";
                waitingForSecondNumber = false;
            }

            // Prevent multiple decimal points
            if (value === "." && display.value.includes(".")) {
                return;
            }

            display.value += value;
            return;
        }

        // Percentage
        if (value === "%") {
            const number = parseFloat(display.value);

            if (isNaN(number)) {
                display.value = "Error";
            } else {
                display.value = number / 100;
            }

            return;
        }

        // Operator
        if (["+", "-", "×", "÷"].includes(value)) {
            const number = parseFloat(display.value);

            if (isNaN(number)) {
                return;
            }

            if (firstNumber !== null && operator !== null) {
                calculate(number);
            } else {
                firstNumber = number;
            }

            operator = value;
            waitingForSecondNumber = true;
            return;
        }

        // Equals
        if (value === "=") {
            const secondNumber = parseFloat(display.value);

            if (
                firstNumber === null ||
                operator === null ||
                isNaN(secondNumber)
            ) {
                return;
            }

            calculate(secondNumber);

            operator = null;
            firstNumber = null;
            waitingForSecondNumber = true;
        }
    });
});


function calculate(secondNumber) {
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }

    else if (operator === "-") {
        result = firstNumber - secondNumber;
    }

    else if (operator === "×") {
        result = firstNumber * secondNumber;
    }

    else if (operator === "÷") {
        if (secondNumber === 0) {
            display.value = "Error";
            firstNumber = null;
            operator = null;
            return;
        }

        result = firstNumber / secondNumber;
    }

    if (!Number.isFinite(result)) {
        display.value = "Error";
    } else {
        display.value = result;
        firstNumber = result;
    }
}