const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let storedValue = "";
let displayValue = "";
let operatorValue = "";
let lastPressedEquals = false;
let digitPressed = false;

clear.addEventListener("click", clearData);

function clearData() {
  storedValue = "";
  displayValue = "";
  operatorValue = "";
  display.textContent = 0;
  lastPressedEquals = false;
  digitPressed = false;
}

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (lastPressedEquals) {
      display.textContent = "";
      digitPressed = true;
      lastPressedEquals = false;
    } else if (displayValue == "") {
      display.textContent = ""; // 1. resets display value so the display can be cleared when another digit is pressed after selecting an operator
    }
    display.textContent += digit.textContent;
    displayValue = +display.textContent;
    console.log([
      operatorValue,
      storedValue,
      displayValue,
      lastPressedEquals,
      digitPressed,
    ]);
    return displayValue;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (storedValue && !displayValue) {
      operatorValue = operator.textContent;
      return; // Allows user to reselect operator without resetting storedValue to ""
    }
    if (digitPressed) {
      storedValue = "";
      digitPressed = false;
    } else if (lastPressedEquals) {
      display.textContent;
      lastPressedEquals = false; // 2. must be set to true so that when an operator is pressed after the equals the current display is kept the same
    } else if (displayValue && storedValue) {
      display.textContent = operate(operatorValue, storedValue, displayValue);
      displayValue = +display.textContent; // 3. allows display to be updated when chaining operations
    }
    operatorValue = operator.textContent;
    storedValue = displayValue;
    displayValue = ""; // 1. resets display value so the display can be cleared when another digit is pressed after selecting an operator
    console.log([
      operatorValue,
      storedValue,
      displayValue,
      lastPressedEquals,
      digitPressed,
    ]);
    return operatorValue;
  });
});

equals.addEventListener("click", () => {
  if (!operatorValue) {
    display.textContent = displayValue;
    console.log([
      operatorValue,
      storedValue,
      displayValue,
      lastPressedEquals,
      digitPressed,
    ]);
    return; // keeps the current displayed value if equals is clicked before selecting an operator
  }
  if (lastPressedEquals || digitPressed) {
    display.textContent = operate(operatorValue, displayValue, storedValue); // parameters must be reversed for subtraction and division
    displayValue = +display.textContent;
    digitPressed = false;
    lastPressedEquals = true;
  } else {
    display.textContent = operate(operatorValue, storedValue, displayValue);
    storedValue = displayValue;
    displayValue = +display.textContent;
    lastPressedEquals = true; // 2. must be set to true so that when an operator is pressed after the equals the current display is kept the same.
    console.log([
      operatorValue,
      storedValue,
      displayValue,
      lastPressedEquals,
      digitPressed,
    ]);
  }
});

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "−":
      return subtract(x, y);
    case "×":
      return multiply(x, y);
    case "÷":
      return divide(x, y);
    default:
      "fuk u";
  }
}
