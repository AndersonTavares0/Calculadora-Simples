let display = document.getElementById("display");
let current = "";
let resetNext = false;
let history = document.getElementById("history");
let lastExpression = "";

function appendNumber(num) {
  if (resetNext) {
    current = "";
    resetNext = false;
  }
  if (current === "0") current = "";
  current += num;
  updateDisplay();
}

function appendOperator(op) {
  if (current === "") return;
  if (/[+\-*/]$/.test(current)) {
    current = current.slice(0, -1) + op;
  } else {
    current += op;
  }
  updateDisplay();
  resetNext = false;
}

function appendDot() {
  let parts = current.split(/[+\-*/]/);
  let last = parts[parts.length - 1];
  if (!last.includes(".")) {
    current += ".";
    updateDisplay();
  }
}

function clearDisplay() {
  current = "";
  updateDisplay();
}

function backspace() {
  current = current.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    let expr = current.replace(/÷/g, "/").replace(/×/g, "*");
    let result = eval(expr);
    display.textContent = result !== undefined ? result : "0";
    lastExpression = current + " = " + result;
    updateHistory();
    current = result.toString();
    resetNext = true;
  } catch {
    display.textContent = "Erro";
    lastExpression = current + " = Erro";
    updateHistory();
    current = "";
    resetNext = true;
  }
}

function percent() {
  if (current !== "") {
    try {
      let value = eval(current) / 100;
      display.textContent = value;
      lastExpression = current + "% = " + value;
      updateHistory();
      current = value.toString();
      resetNext = true;
    } catch {
      display.textContent = "Erro";
      lastExpression = current + "% = Erro";
      updateHistory();
      current = "";
      resetNext = true;
    }
  }
}

function sqrt() {
  if (current !== "") {
    try {
      let value = Math.sqrt(eval(current));
      display.textContent = value;
      lastExpression = "√(" + current + ") = " + value;
      updateHistory();
      current = value.toString();
      resetNext = true;
    } catch {
      display.textContent = "Erro";
      lastExpression = "√(" + current + ") = Erro";
      updateHistory();
      current = "";
      resetNext = true;
    }
  }
}

function square() {
  if (current !== "") {
    try {
      let value = Math.pow(eval(current), 2);
      display.textContent = value;
      lastExpression = "(" + current + ")² = " + value;
      updateHistory();
      current = value.toString();
      resetNext = true;
    } catch {
      display.textContent = "Erro";
      lastExpression = "(" + current + ")² = Erro";
      updateHistory();
      current = "";
      resetNext = true;
    }
  }
}

function reciprocal() {
  if (current !== "") {
    try {
      let value = 1 / eval(current);
      display.textContent = value;
      lastExpression = "1/(" + current + ") = " + value;
      updateHistory();
      current = value.toString();
      resetNext = true;
    } catch {
      display.textContent = "Erro";
      lastExpression = "1/(" + current + ") = Erro";
      updateHistory();
      current = "";
      resetNext = true;
    }
  }
}

function toggleSign() {
  if (current !== "") {
    if (current.startsWith("-")) {
      current = current.substring(1);
    } else {
      current = "-" + current;
    }
    updateDisplay();
  }
}

function updateHistory() {
  if (history) {
    history.textContent = lastExpression;
  }
}
function updateDisplay() {
  display.textContent = current === "" ? "0" : current;
}
