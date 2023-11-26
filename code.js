let displayValue = document.querySelector("#output");
let lastCalc = document.querySelector("#last-calc")
let operatorPressed = false
let equalsPressed = false
let tempForLastCalc;

displayValue.textContent = "";
let n1, n2, operator;
let digits = document.querySelectorAll(".digit");
digits.forEach((el) => {
  el.addEventListener("click", () => {
    if (displayValue.textContent === "0") {return}
    if (displayValue.offsetWidth > 210
      ) {alert("You've reached the input limit")
        return}
    popDisplay(el);
  });
});

let dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
  if (
    displayValue.textContent.split(".").length >= 2 ||
    displayValue.textContent === ""
  ) {
    return;
  }
  popDisplay(dot);
});

let zero = document.querySelector(".zero");
zero.addEventListener("click", () => {
  if (displayValue.textContent.length > 7 || displayValue.textContent === "0") {
    return;
  }
  popDisplay(zero);
});

let operators = document.querySelectorAll(".operator");
operators.forEach((el) => {
  el.addEventListener("click", () => {
    if(operatorPressed && displayValue.textContent !== ""){
      tempForLastCalc = Number.parseFloat(lastCalc.textContent)
      // if(divisionByZero){return}
      lastCalc.textContent = operate(Number.parseFloat(lastCalc.textContent), Number.parseFloat(displayValue.textContent), operator) 
                              + " " + el.textContent
      displayValue.textContent = ""
      operator = el.textContent;

      return
    }
    operator = el.textContent;
    if(operatorPressed){
    popLastCalc(Number.parseFloat( lastCalc.textContent), operator)
    }else{
      popLastCalc(displayValue.textContent, operator)
    }
    displayValue.textContent = ""
    operatorPressed = true
    equalsPressed = false
  });
});

function divisionByZero (n2) {
  if(n2 === 0 && operator === "÷"){
    lastCalc.textContent = tempForLastCalc
    displayValue.textContent = ""
    alert("Can't do that, buddy"); 

    return true
  }
}

function popDisplay(el) {

  displayValue.textContent = displayValue.textContent + el.textContent;
}
function popLastCalc(s, operator, s2="") {
  lastCalc.textContent = s + " " + operator + " " + s2
}
function clear (){
  displayValue.textContent = ""
  lastCalc.textContent = ""
  n1 = null
  n2 = null
  operatorPressed = false
}
document.querySelector(".clear").addEventListener("click", clear)

function deleteDigit () {
  if(displayValue.textContent){
    displayValue.textContent = displayValue.textContent.substring(0, displayValue.textContent.length - 1)
  }
}
document.querySelector(".delete").addEventListener("click", deleteDigit)


document.querySelector(".equals").addEventListener("click", () => {
  operatorPressed = false

  if(equalsPressed){
    n1 = Number.parseFloat(displayValue.textContent) 
    
    popLastCalc(displayValue.textContent, operator, n2)
  }else{
    n1 = Number.parseFloat(lastCalc.textContent) 
  n2 = Number.parseFloat(displayValue.textContent) 
  }
  equalsPressed = true
  displayValue.textContent = Math.round(operate(n1, n2, operator)* 1000000) /  1000000
  if(displayValue.textContent === "NaN"){displayValue.textContent = ""}

  
})
function add(n1, n2) {
  return n1 + n2;
}
function substract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function operate(n1, n2, operator) {
  if(n2 === 0 && operator === "÷"){
    alert("How dare you..."); 
    
      console.log(tempForLastCalc)
      displayValue.textContent = ""; 
      lastCalc.textContent = tempForLastCalc;
      popLastCalc(tempForLastCalc, operator)
      console.log(lastCalc.textContent)

    
    return}
  switch (operator) {
    case "+":
      return add(n1, n2);
      break;

    case "-":
      return substract(n1, n2);
      break;

    case "×":
      return multiply(n1, n2);
      break;

    case "÷":
      return divide(n1, n2);
      break;

    default:
      break;
  }
}
