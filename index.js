var display = document.getElementById("screen");
var show = "";
var check = true;
var op1 = "";
var op2 = "";
var opr = "";

function calc() {
  var value = this.getAttribute("data-value");

  //for clear
  if (value === "AC") {
    check = true;
    show = "";
    op1 = "";
    op2 = "";
    opr = "";
    display.innerText = show;
  }

  // for simple oprator
  else if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "%"
  ) {
    if (show === "" || opr !== "") {
      display.innerText = "Error!";
    } else {
      opr = value;
      check = true;
      op1 = show;
      show = "";
      display.innerText = show;
    }
  }

  // for final evaluation
  else if (value === "=") {
    if (show === "" || (opr === "/" && show === "0")) {
      display.innerText = "Error!";
      show = "";
    } else if (opr === "-" && show[0] === "-") {
      opr = "+";
      op2 = show.slice(1);
      show = eval(op1 + opr + op2);
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    } else {
      check = true;
      op2 = show;
      if (opr === "%") {
        show = op1 * (op2 / 100);
      } else {
        show = eval(op1 + opr + op2);
      }
      if (Number.isInteger(show) === false) {
        show = show.toFixed(3);
      }
      display.innerText = show;
      opr = "";
    }
  }

  // for decimal
  else if (value === ".") {
    if (check === true) {
      check = false;
      show += value;
      display.innerText = show;
    } else {
      display.innerText = "Error!";
    }
  }

  //For chnge positive no.to -ve or viceversa(+/-)
  else if (value === "+/-") {
    if (show[0] === "-") {
      show = show.slice(1);
      display.innerText = show;
    } else {
      show = "-" + show;
      display.innerText = show;
    }
  }
  // for all numric 0 to 9
  else {
    show += value;
    display.innerText = show;
  }
}
var btn_bucket = document.getElementsByClassName("btn");
for (var i = 0; i < btn_bucket.length; i++) {
  btn_bucket[i].addEventListener("click", calc);
}
