const display = document.getElementById('display');
let a = '';
let b = '0';
let c = '';
display.textContent = b;

let op = undefined;
let newNum = false;
let rptCalc = false;

let add = function(a, b) {return Number(a) + Number(b);}
let subtract = function(a, b) {return Number(a) - Number(b);}
let multiply = function(a, b) {return Number(a) * Number(b);}
let divide = function(a, b) {return Number(a) / Number(b);}
let power = function(a, b) {return Number(a) ** Number(b);}

const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const plusMinusBtn = document.getElementById('plusMinus');
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
const equalBtn = document.getElementById('equal');
const numBtns = document.getElementsByClassName('num');

clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', backspace);
plusMinusBtn.addEventListener('click', plusMinus);
addBtn.addEventListener('click', ()=>{updateOp(add)});
subtractBtn.addEventListener('click', ()=>{updateOp(subtract)});
multiplyBtn.addEventListener('click', ()=>{updateOp(multiply)});
divideBtn.addEventListener('click', ()=>{updateOp(divide)});
equalBtn.addEventListener('click', calc);


function updateOp(newOp) {       
    op = newOp;
    a = b;
    newNum = true;
    rptCalc = false;
};

function calc() {
    if (op) {
        // When user hits 'equal' without entering any numbers or a new 
        // operation, repeat the last calculation – calc(a, b) – using 
        // the result as (a) andkeeping (b) the same 
        if(rptCalc) {
            b = op(b, c); 
            display.textContent = b;
            a = '';
            newNum = true;
        }
        // If no second operand provided, 
        // use the first number as both a and b
        else if(a=='') {
            a = b;
            c = b;
            b = op(a, b); 
            display.textContent = b;
            a = '';
            newNum = true;
            rptCalc = true;
        }
       
        else {
            c = b;
            b = op(a, b); 
            display.textContent = b;
            a = '';
            newNum = true;
            rptCalc = true;
        }
    }
}

//assign button-click event listeners to number buttons
for (let i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener('click', inputNum.bind(numBtns[i]));
}

function inputNum(val) {
    val = this.id || val;
    if (newNum) {
        if (val == '.') {
            b = '0.'
        }
        else {
            b = val
        }
        newNum = false;
    }
    else { //formatting rules to avoid hanging/multiple decimals
        if (b === '0' && val == '.') {b = '0.'}
        else if (b === '0' && val != '.') {b = val}
        else if (val == '.' && !b.includes('.')) {b += '.'}
        else if (val != '.') {b += val}
    }

    display.textContent = b;
}


function clear() {
    b = '0';
    display.textContent = b;
}

function backspace() {
    b.length > 1 ? b = b.slice(0, b.length - 1) : b = '0';
    b = b === '-' ? '0' : b;
    display.textContent = b;
}

function plusMinus() {
    b.charAt(0) === '-' ?
        b = b.slice(1)
        : b = b === '0' ? 
            '0' : '-' + b;
    display.textContent = b;
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    function clickBtn (id) {
        document.getElementById(id).classList.add("active");
            window.setTimeout(()=>
            {document.getElementById(id).classList.remove("active")}, 30);
    }
    switch (event.key) {
        case "Backspace":
            backspace();
            clickBtn('backspace');
            break;
        case "Clear":
        case "Escape":
            clear();
            clickBtn('clear');
            break;
        case "Enter":
        case "=":
            calc();
            clickBtn('equal');
            break;
        case "+":
        case "Add":
            updateOp(add);
            clickBtn('add');
            break;
        case "-":
        case "Subtract":
            updateOp(subtract);
            clickBtn('subtract');
            break;
        case "Multiply":
        case "*":
            updateOp(multiply);
            clickBtn('multiply');
            break;
        case "Divide":
        case "/":
            updateOp(divide);
            clickBtn('divide');
            break;
        case "Decimal":
        case ".":    
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            inputNum(event.key);
            clickBtn(event.key);
            break;
        default:
        return; // Quit when this doesn't handle the key event.
    }
    
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

