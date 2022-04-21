const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let storedValue = "";
let displayValue = "";
let operatorValue = "";
let lastPressedEquals = false;

clear.addEventListener("click", clearData);

function clearData() {
  storedValue = "";
  displayValue = "";
  operatorValue = "";
  display.textContent = "";
}

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (lastPressedEquals) {
      display.textContent = "";
    } else if (displayValue == "") {
      display.textContent = ""; // 1. resets display value so the display can be cleared when another digit is pressed after selecting an operator
    }
    display.textContent += digit.textContent;
    displayValue = +display.textContent;
    console.log([operatorValue, storedValue, displayValue, lastPressedEquals]);
    return displayValue;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (lastPressedEquals) {
      display.textContent;
      lastPressedEquals = false; // 2. must be set to true so that when an operator is pressed after the equals the current display is kept the same
    } else if (displayValue && storedValue) {
      display.textContent = operate(operatorValue, storedValue, displayValue);
      displayValue = +display.textContent; // 3. allows display to be updated when chaining operations
    }
    operatorValue = operator.textContent;
    storedValue = displayValue;
    displayValue = ""; // 1. resets display value so the display can be cleared when another digit is pressed after selecting an operator
    console.log([operatorValue, storedValue, displayValue, lastPressedEquals]);
    return operatorValue;
  });
});

equals.addEventListener("click", () => {
  if (lastPressedEquals) {
    display.textContent = operate(operatorValue, displayValue, storedValue); // parameters must be reversed for subtraction and division
    displayValue = +display.textContent;
  } else {
    display.textContent = operate(operatorValue, storedValue, displayValue);
    storedValue = displayValue;
    displayValue = +display.textContent;
    lastPressedEquals = true; // 2. must be set to true so that when an operator is pressed after the equals the current display is kept the same.
  }
  console.log([operatorValue, storedValue, displayValue, lastPressedEquals]);
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
