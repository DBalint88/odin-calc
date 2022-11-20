const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];

const buttons = document.getElementsByClassName("button");

let firstInput = "";
let operator = "";
let secondInput = "";
let answer = ""

const add = (a, b) => parseInt(a)+parseInt(b);
const subtract = (a, b) => a-b;
const multiply = (a, b) => a*b;
const divide = (a,b) => a/b;

const handleInput = (e) => {
    let selection = e.textContent
    // If no operator has been entered, selections should be appended to firstInput
    if (operator === "" & digits.includes(selection)) {
        firstInput += selection;
        console.log(firstInput);
    }
    if (operators.includes(selection)) {
        operator = selection;
        console.log(operator)
    }
    if ((operator !== "") & digits.includes(selection)) {
        secondInput += selection;
        console.log(secondInput)
    }
    if (selection === "Enter") {
        switch (operator) {
            case "+":
                answer = add(firstInput, secondInput);
                console.log(answer);
                break;
        }
    }

}

for (const button of buttons) {
    button.addEventListener("click", () => {
        handleInput(button);
    });
}





/*
Event listener hears the click
handleInput identifies the text content of the button pressed by comparing it with button arrays and updates variables accordingly
updateDisplay just updates the display


*/