const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let storedValue = "";
let displayValue = "";
let operatorValue = "";

clear.addEventListener("click", clearData);

function clearData() {
  storedValue = "";
  displayValue = "";
  operatorValue = "";
  display.textContent = "";
}

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (displayValue == "") {
      display.textContent = "";
    }
    display.textContent += digit.textContent;
    displayValue = +display.textContent;
    return displayValue;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    operatorValue = operator.textContent;
    storedValue = displayValue;
    displayValue = "";
    console.log(operatorValue);
    return operatorValue;
  });
});

equals.addEventListener("click", () => {
  display.textContent = operate(operatorValue, storedValue, displayValue);
  displayValue = +display.textContent;
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
