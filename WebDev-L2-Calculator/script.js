const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calc-btn");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        const value = button.textContent;

        // Clear
        if (value === "C") {
            display.value = "";
        }

        // Backspace
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }

        // Calculate result
        else if (value === "=") {
            try {
                if (display.value.trim() === "") {
                    return;
                }

                let exp = display.value
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*");

                const result = Function(
                    '"use strict"; return (' + exp + ')'
                )();

                if (!Number.isFinite(result)) {
                    display.value = "Error";
                } else {
                    display.value = result;
                }

            } catch {
                display.value = "Error";
            }
        }

        // Percentage
        else if (value === "%") {
            try {
                const number = parseFloat(display.value);

                if (isNaN(number)) {
                    display.value = "Error";
                } else {
                    display.value = number / 100;
                }

            } catch {
                display.value = "Error";
            }
        }

        // Numbers, decimal point and operators
        else {
            if (display.value === "Error") {
                display.value = "";
            }

            display.value += value;
        }
    });
});