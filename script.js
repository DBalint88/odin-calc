// Define Constants & Variables
const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];
const buttons = document.getElementsByClassName("button");

let firstInput = "";
let operator = "";
let secondInput = "";
let answer = ""



// Define arithmetic functions
const add = (a, b) => parseInt(a) + parseInt(b);
const subtract = (a, b) => parseInt(a) - parseInt(b);
const multiply = (a, b) => parseInt(a) * parseInt(b);
const divide = (a,b) => parseInt(a) / parseInt(b);



// Process each type of input, route to the correct function.
const inputHandler = (e) => {
    let selection = e.textContent

    // If operator isn't yet defined, and a digit is selected, build out the first input.
    if (operator === "" && digits.includes(selection)) {
        buildFirstInput(selection)
        console.log(firstInput)
    }
    // If operator is selected, and a second Input is not yet defined, define the operator.
    if (operators.includes(selection) && secondInput == "") {
        operator = selection;
        console.log(operator);
    }

    // If operator IS defined, and a digit is selected, build out the second input
    if (operator !== "" && digits.includes(selection)) {
        buildSecondInput(selection);
        console.log(secondInput);
    }

    // If operator IS defined, as well as both inputs, and another operator is selected, solve the existing calc before resetting.
    if (operator !== "" && firstInput !== "" && secondInput !== "" && operators.includes(selection)) {
        operate();
        //updateDisplay
        setUpForChain();
        operator = selection;
    }

    // If Enter is pressed, check for validity, perform the calculation, and prep for a calc chain
    if (selection === "Enter") {
        operate();
        //updateDisplay
        setUpForChain();
    }

    // If AC is pressed, reset all variables to ""
    if (selection === "AC") {
        clear();
    }

    // If Back is pressed, pop off the last digit of the input
    if (selection === "Back") {
        backButton();
    }
}


// The above handler routes to the functions below:



const buildFirstInput = (digit) => {
    // The user may input one leading zero, but not multiple.
    if (firstInput === "0" && digit == "0") {
        return
    }
    // if there is already a "." in firstInput, the "." button should be deactivated.
    if (firstInput.includes(".") && digit ==".") {
        return
    }
    firstInput += digit;
}

const buildSecondInput = (digit) => {
    // The user may input one leading zero, but not multiple.
    if (secondInput === "0" && digit == "0") {
        return
    }
    // if there is already a "." in firstInput, the "." button should be deactivated.
    if (secondInput.includes(".") && digit ==".") {
        return
    }
    secondInput += digit;
}

const operate = () => {
    if (firstInput == "" || operator == "" || secondInput == "") {
        return;
    }
    if (operator == "/" && secondInput == "0") {
        console.log("Cannot divide by zero!!") 
        return;
    }
    switch (operator) {
        case "+":
            answer = add(firstInput, secondInput);
            break;
        case "-":
            answer = subtract(firstInput, secondInput);
            break;
        case "*":
            answer = multiply(firstInput, secondInput);
            break;
        case "/":
            answer = divide(firstInput, secondInput);
            break;
        default:
            break;
    }
    console.log("Answer: " + roundToTwo(answer));
}

const setUpForChain = () => {
    firstInput = String(answer);
    answer = "";
    operator = "";
    secondInput = "";
}

const clear = () => {
    firstInput = "";
    secondInput = "";
    answer = "";
    operator = "";
}

const backButton = () => {
    // Logic for the back button determines if user is working on first or second input, converts to array, pops, then re-strings.
    if (firstInput !== "" && operator === "") {
        let stringArray = firstInput.split('');
        stringArray.pop();
        firstInput = stringArray.join("");
        console.log(firstInput);
    }
    if (operator !== "" && secondInput !== "") {
        let stringArray = secondInput.split('');
        stringArray.pop();
        secondInput = stringArray.join("");
        console.log(secondInput);
    }
}





// Event Lister for ALL buttons:
for (const button of buttons) {
    button.addEventListener("click", () => {
        inputHandler(button);
    });
}



// Rounding Algorithm:
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}