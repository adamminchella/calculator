const digits = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const negate = document.querySelector(".negate");
const percent = document.querySelector(".percent");
let storedValue = "";
let displayValue = "";
let operatorValue = "";
let lastPressedEquals = false;
let digitPressedAfterEquals = false;

percent.addEventListener("click", () => {
  display.textContent = display.textContent / 100;
  displayValue = +display.textContent;
});

negate.addEventListener("click", () => {
  negateDisplay();
});

function negateDisplay() {
  if (display.textContent == `-0`) {
    display.textContent = "0";
  } else if (displayValue == "") {
    display.textContent = `-0`;
  } else {
    display.textContent = display.textContent * -1;
    displayValue = +display.textContent;
  }
  console.log([
    operatorValue,
    storedValue,
    displayValue,
    display.textContent,
    lastPressedEquals,
    digitPressedAfterEquals,
  ]);
}

backspace.addEventListener("click", () => {
  let displayString = display.textContent;
  if (
    displayString.length === 1 ||
    (displayString.length === 2 && displayString.includes("-"))
  ) {
    // storedValue = "";
    display.textContent = "0";
    displayValue = +display.textContent;
  } else {
    let lastDigitRemoved = displayString.slice(0, displayString.length - 1);
    display.textContent = lastDigitRemoved;
    displayValue = +display.textContent;
  }
});

clear.addEventListener("click", () => {
  clearData();
  removeOperatorFill();
});

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    removeOperatorFill();
    populateDisplay(digit);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    toggleOperatorFill(e);
    if (storedValue && displayValue === "") {
      return reselectOperator(operator);
    }
    operateOnOperator(operator);
  });
});

equals.addEventListener("click", () => {
  removeOperatorFill();
  if (!operatorValue) {
    return retainDisplay();
  }
  operateOnEquals();
});

function toggleOperatorFill(e) {
  if (!e.target.classList.contains("fill")) {
    operators.forEach((operator) => {
      if (e.target.classList == operator.classList) {
        e.target.classList.add("fill");
      } else {
        operator.classList.remove("fill");
      }
    });
  }
}

function removeOperatorFill() {
  operators.forEach((operator) => {
    if (operator.classList.contains("fill")) {
      operator.classList.remove("fill");
    }
  });
}

function clearData() {
  storedValue = "";
  displayValue = "";
  operatorValue = "";
  display.textContent = 0;
  lastPressedEquals = false;
  digitPressedAfterEquals = false;
}

function populateDisplay(digit) {
  if (lastPressedEquals) {
    clearDisplay();
    digitPressedAfterEquals = true;
    lastPressedEquals = false;
  } else if (display.textContent.includes("-") && display.textContent == 0) {
    display.textContent =
      display.textContent.substr(0, 1) +
      display.textContent.substr(2, display.textContent.length);
  } else if (displayValue == "") {
    clearDisplay(); // 1. resets displayValue so the display can be cleared when another digit is pressed after selecting an operator
  }
  display.textContent += digit.textContent;
  displayValue = +display.textContent;
  console.log([
    operatorValue,
    storedValue,
    displayValue,
    lastPressedEquals,
    digitPressedAfterEquals,
  ]);
  return displayValue;
}

function clearDisplay() {
  return (display.textContent = "");
}

function reselectOperator(operator) {
  operatorValue = operator.textContent; // allows user to reselect operator without resetting storedValue to ""
  return operatorValue;
}

function operateOnOperator(operator) {
  if (digitPressedAfterEquals || lastPressedEquals) {
    digitPressedAfterEquals = false;
    lastPressedEquals = false; // must be set to false so that the first time an operator is pressed after equals display.textcontent doesn't change
  } else if (typeof displayValue === "number" && storedValue) {
    display.textContent = operate(operatorValue, storedValue, displayValue); // had to use typeof because 0 is falsy
    displayValue = +display.textContent; // 3. allows display to be updated when chaining operations
  }
  operatorValue = operator.textContent;
  storedValue = displayValue;
  displayValue = "";
  console.log([
    operatorValue,
    storedValue,
    displayValue,
    display.textContent,
    lastPressedEquals,
    digitPressedAfterEquals,
  ]); // 1. resets display value so the display can be cleared when another digit is pressed after selecting an operator
  return operatorValue;
}

function retainDisplay() {
  if (displayValue == "") {
    display.textContent = "0";
  } else {
    display.textContent = displayValue;
  }
  digitPressedAfterEquals = false;
  lastPressedEquals = true; // keeps the current displayed value if equals is clicked before selecting an operator
}

function operateOnEquals() {
  if (lastPressedEquals || digitPressedAfterEquals) {
    display.textContent = operate(operatorValue, displayValue, storedValue); // parameters must be reversed for subtraction and division
    displayValue = +display.textContent;
    digitPressedAfterEquals = false;
    lastPressedEquals = true;
  } else {
    if (displayValue === "") {
      // must be a strict equality because "" == 0
      displayValue = storedValue;
    }
    display.textContent = operate(operatorValue, storedValue, displayValue);
    storedValue = displayValue;
    displayValue = +display.textContent;
    lastPressedEquals = true; // 2. must be set to true so that when an operator is pressed after the equals the current display is kept the same.
  }
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
    case "−":
      return subtract(x, y);
    case "×":
      return multiply(x, y);
    case "÷":
      if (y === 0) {
        return "ERROR";
      }
      return divide(x, y);
    default:
      "fuk u";
  }
}
