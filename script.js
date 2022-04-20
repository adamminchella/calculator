const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
let displayValue = "";

digits.forEach((digit) => {
  digit.addEventListener("click", () => populateDisplay(digit));
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => populateDisplay(operator));
});

function populateDisplay(type) {
  display.textContent += type.textContent;
  displayValue = display.textContent;
  return displayValue;
}

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
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      "fuk u";
  }
}

console.log(operate("+", 4, 2));
