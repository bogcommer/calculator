function Calculator() {
    this.math = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    };

    this.operate = function(str) {
        let sep = str.split(' ');

        let a = parseInt(sep[0]);
        let op = sep[1];
        let b = parseInt(sep[2]);

        if (op === '/' && b === 0) {
            return NaN;
        }

        if (!this.math[op] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        return this.math[op](a, b);
    }
}

function pressed(e) {
    if (e.target.name === "clear") {
        clear();
    } else if (e.target.innerHTML === "+" || e.target.innerHTML === "-" || e.target.innerHTML === "*" || e.target.innerHTML === "/") {
        if (display.innerHTML.indexOf('+') === -1 && display.innerHTML.indexOf('-') === -1 && display.innerHTML.indexOf('*') === -1 && display.innerHTML.indexOf('/') === -1) {
            if (display.innerHTML !== "NaN") {
                display.innerHTML += " " + e.target.innerHTML + " ";
            } else if (display.innerHTML === "NaN") {
                display.innerHTML = 0 + " " + e.target.innerHTML + " ";
            }
        }
        else {
            result = math.operate(display.innerHTML);

            if (!isNaN(result)) {
                display.innerHTML = result + " " + e.target.innerHTML + " ";
            }
        }
    } else if (e.target.name === "equals") {
        result = math.operate(display.innerHTML);
        display.innerHTML = result;
    } else {
        if (display.innerHTML === result.toString() || display.innerHTML === "NaN") {
            clear();
            result = 0;
        }
        display.innerHTML += e.target.innerHTML;
    }
}

function clear() {
    display.innerHTML = "";
}

const math = new Calculator();
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.button');
let result = 0;

buttons.forEach(buttons => buttons.addEventListener('click', pressed))