window.onload = function () {
	document.getElementById("submit").addEventListener("click", action);
};

// first Action function

function action() {
	var from = _("from-number").value;
	var to = _("to-number").value;
	var n = _("number").value;
	if (from == "null" || to == "null" || n == "") {
		if (from == "null") {
			alertWarn("fromNull");
		} else if (to == "null") {
			alertWarn("toNull");
		} else if (n == "") {
			alertWarn("inputNull");
		}
	} else if (from == "binary") {
		var check = checkValidity(n, function (num) {
			return num==1||num==0;
		});
		if (!check) {
			alertWarn("inputInvalid");
		} else {
			if (to == "binary") {
				var val = n;
				displayResult(val);
			} else if (to == "decimal") {
				var val = anyToDecimal(n, 2);
				displayResult(val);
			} else if (to == "octal") {
				var val = binaryToOctal(n);
				displayResult(val);
			} else if (to == "hexadecimal") {
				var val = binaryToHexadecimal(n);
				displayResult(val);
			}
		}
	} else if (from == "decimal") {
		var check = checkValidity(n, function (num) {
			return num <= 9 && num >= 0;
		});
		if (!check) {
			alertWarn("inputInvalid");
		} else {
			if (to == "binary") {
				var val = decimalToAny(n, 2);
				displayResult(val);
			} else if (to == "decimal") {
				var val = n;
				displayResult(val);
			} else if (to == "octal") {
				var val = decimalToAny(n, 8);
				displayResult(val);
			} else if (to == "hexadecimal") {
				var val = decimalToHexadecimal(n, 16);
				displayResult(val);
			}
		}
	} else if (from == "octal") {
		var check = checkValidity(n, function(num){
			return num>=0&&num<=7;
		});
		if (!check) {
			alertWarn("inputInvalid");
		} else {
			if (to == "binary") {
				var val = octalToBinary(n);
				displayResult(val);
			} else if (to == "decimal") {
				var val = anyToDecimal(n, 8);
				displayResult(val);
			} else if (to == "octal") {
				var val = n;
				displayResult(val);
			} else if (to == "hexadecimal") {
				var val = octalToHexadecimal(n);
				displayResult(val);
			}
		}
	} else if (from == "hexadecimal" && to == "hexadecimal") {
		var val = n.toUpperCase();
		displayResult(val);
	} else if (from == "hexadecimal" && to == "binary") {
		var val = hexadecimalToBinary(n);
		displayResult(val);
	} else if (from == "hexadecimal" && to == "decimal") {
		var val = hexadecimalToDecimal(n);
		displayResult(val);
	} else if (from == "hexadecimal" && to == "octal") {
		var val = hexadecimalToOctal(n);
		displayResult(val);
	}
}

//Number Validity Check

function checkValidity(n, cb) {
	var num = n;
	var result;
	var rem;
	var isValid;
	if (num == 0) {
		isValid = true;
	} else {
		while (num != 0) {
			result = Math.floor(num / 10);
			rem = num % 10;
			num = result;
			if (cb(rem)) {
				isValid = true;
			} else {
				isValid = false;
				break;
			}
		}
	}
	return isValid;
}

//Alert Type and Text

function alertWarn(type) {
	switch (type) {
		case "fromNull":
			text = "Please Select a Number System!";
			showAlert(type, text);
			break;
		case "toNull":
			text = "Please Select a Number System";
			showAlert(type, text);
			break;
		case "inputNull":
			text = "Please Input a Number";
			showAlert(type, text);
			break;
		case "inputInvalid":
			text = "Your Number is Invalid! Please input a valid Number";
			showAlert(type, text);
			break;
	}
}

/**
 *
 * Alert Show
 */

function showAlert(alertType, alertText) {
	var elm = document.createElement("div");
	elm.className = "alert alert-danger my-1";
	elm.setAttribute("role", "alert");
	elm.setAttribute("id", "alert");

	if (alertType == "fromNull") {
		var parentElm = _("from-select");
		elm.textContent = alertText;
		parentElm.appendChild(elm);
		setInterval(function () {
			elm.remove();
		}, 3000);
	} else if (alertType == "toNull") {
		var parentElm = _("to-select");
		elm.textContent = alertText;
		parentElm.appendChild(elm);
		setInterval(function () {
			elm.remove();
		}, 3000);
	} else if (alertType == "inputNull") {
		var parentElm = _("input-field");
		elm.textContent = alertText;
		parentElm.appendChild(elm);
		setInterval(function () {
			elm.remove();
		}, 3000);
	} else if (alertType == "inputInvalid") {
		var parentElm = _("input-field");
		elm.textContent = alertText;
		parentElm.appendChild(elm);
		setInterval(function () {
			elm.remove();
		}, 4000);
	}
}
/**
 * Alert Remove
 */
function removeAlert() {
	var elm = _("alert");
	elm.remove();
}

/**
 * Input Type change according to number system
 */

function changeInputType() {
	var value = _("from-number").value;
	var inputField = _("number");

	if (value == "hexadecimal") {
		inputField.setAttribute("type", "text");
	} else {
		inputField.setAttribute("type", "number");
	}
}

/**
 *
 * Any(Binary, Octal, Hexadecimal) Number To Decimal
 */

function anyToDecimal(n, cb) {
	var num = n;
	var arr = [];
	var result;
	var rem;
	var dec = 0;
	while (num != 0) {
		result = Math.floor(num / 10);
		rem = num % 10;
		arr.push(rem);
		num = result;
	}
	for (var i = 0; i < arr.length; i++) {
		dec += arr[i] * Math.pow(cb, i);
	}
	return dec;
}

/**
 * Decimal To Any Number(Binary, Octal, Hexadecimal)
 */

function decimalToAny(n, cb) {
	var num = n;
	var arr = [];
	var result;
	var rem;
	var bin = 0;
	while (num != 0) {
		rem = num % cb;
		result = Math.floor(num / cb);
		arr.push(rem);
		num = result;
	}

	for (var i = arr.length - 1; i >= 0; i--) {
		bin = bin * 10 + arr[i];
	}
	return bin;
}

/**
 *
 * Binary to Octal
 */

function binaryToOctal(n) {
	dec = anyToDecimal(n, 2);
	oct = decimalToAny(dec, 8);
	return oct;
}

/**
 *
 * Octal to Binary
 */

function octalToBinary(n) {
	var dec = anyToDecimal(n, 8);
	var bin = decimalToAny(dec, 2);
	return bin;
}

/**
 *
 * Octal to Hexadecimal
 */

function octalToHexadecimal(n) {
	var dec = anyToDecimal(n, 8);
	var hex = dec.toString(16);
	return hex;
}

/**
 *
 * Binary to Hexadecimal
 */

function binaryToHexadecimal(n) {
	var num = binaryToDecimal(n);
	var hex = num.toString(16);
	return hex;
}

/**
 *
 * Decimal to Octal
 */

function decimalToOctal(n) {
	var bin = decimalToBinary(n);
	var oct = binaryToOctal(bin);
	return oct;
}

/**
 *
 * Decimal to Hexadecimal
 */

function decimalToHexadecimal(n, cb) {
	var num = n;
	var arr = [];
	var result;
	var rem;
	var hex = "";
	var hexadecimal = {
		0: "0",
		1: "1",
		2: "2",
		3: "3",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		8: "8",
		9: "9",
		10: "A",
		11: "B",
		12: "C",
		13: "D",
		14: "E",
		15: "F",
	};

	while (num != 0) {
		rem = num % cb;
		result = Math.floor(num / cb);
		arr.push(rem);
		num = result;
	}

	for (var i = arr.length - 1; i >= 0; i--) {
		hex += hexadecimal[arr[i]];
	}
	return hex;
}

/**
 *
 * Octal to Hexadecimal
 */

function octalToHexadecimal(n) {
	var dec = anyToDecimal(n, 8);
	var hex = decimalToHexadecimal(dec, 16);
	return hex;
}

/**
 *
 * Binary to Hexadecimal
 */

function binaryToHexadecimal(n) {
	var dec = anyToDecimal(n, 2);
	var hex = decimalToHexadecimal(dec, 16);
	return hex;
}

/**
 *
 * Hexadecimal to Decimal
 */

function hexadecimalToDecimal(n) {
	var num = n;
	var arr = [];
	var dec = 0;
	for (var i = num.length - 1; i >= 0; i--) {
		switch (num[i]) {
			case "0":
				arr.push(0);
				break;
			case "1":
				arr.push(1);
				break;
			case "2":
				arr.push(2);
				break;
			case "3":
				arr.push(3);
				break;
			case "4":
				arr.push(4);
				break;
			case "5":
				arr.push(5);
				break;
			case "6":
				arr.push(6);
				break;
			case "7":
				arr.push(7);
				break;
			case "8":
				arr.push(8);
				break;
			case "9":
				arr.push(9);
				break;
			case "a":
				arr.push(10);
				break;
			case "A":
				arr.push(10);
				break;
			case "b":
				arr.push(11);
				break;
			case "B":
				arr.push(11);
				break;
			case "c":
				arr.push(12);
				break;
			case "C":
				arr.push(12);
				break;
			case "d":
				arr.push(13);
				break;
			case "D":
				arr.push(13);
				break;
			case "e":
				arr.push(14);
				break;
			case "E":
				arr.push(14);
				break;
			case "f":
				arr.push(15);
				break;
			case "F":
				arr.push(15);
				break;
			default:
				alertWarn("inputInvalid");
				break;
		}
	}

	for (var i = arr.length - 1; i >= 0; i--) {
		dec += arr[i] * Math.pow(16, i);
	}
	return dec;
}

/**
 *
 * Hexadecimal to Binary
 */

function hexadecimalToBinary(n) {
	var dec = hexadecimalToDecimal(n);
	var bin = decimalToAny(dec, 2);
	return bin;
}

/**
 *
 * Hexadecimal to Octal
 */

function hexadecimalToOctal(n) {
	var dec = hexadecimalToDecimal(n);
	var oct = decimalToAny(dec, 8);
	return oct;
}

/**
 *
 * Display Result
 */

function displayResult(num) {
	_("result-text").innerHTML = num;
}

/**
 *
 * Selector shortcut document.getElementById => _
 */

function _(selector) {
	return document.getElementById(selector);
}
