var numberInput = document.getElementById("number");
var findFactorsButton = document.getElementById("findFactors");
var factorsDiv = document.getElementById("factors");

numberInput.addEventListener("keydown", numberInputKeydown);
findFactorsButton.addEventListener("click", findFactors);

numberInput.focus();

function numberInputKeydown(event) {
    if (event.keyCode == 13) {
        findFactors();
    }
}

function findFactors() {
    var number = parseInt(numberInput.value.trim(), 10);

    if (!isNaN(number)) {
        factorsDiv.innerHTML = "";

        if (number >= 2) {
            var hasPrimeFactors = showPrimeFactors(number, 0);

            if (!hasPrimeFactors) {
                var primeMessage = document.createElement("p");
                primeMessage.innerHTML = number + " is prime.";
                factorsDiv.appendChild(primeMessage);
            }
        }
        else {
            var invalidNumberMessage = document.createElement("p");
            invalidNumberMessage.innerHTML = "Number must be at least 2.";
            factorsDiv.appendChild(invalidNumberMessage);
        }
    }
}

function showPrimeFactors(number, round) {
    var sqrtNumber = Math.sqrt(number);

    for (var i = 2; i <= sqrtNumber; i++) {
        if (number % i == 0) {
            var factorRowDiv = createFactorRowDiv(round);

            var factorDiv = createFactorDiv(i, factorRowDiv);
            labelPrime(factorDiv);

            factorDiv = createFactorDiv(number / i, factorRowDiv);
            var hasPrimeFactors = showPrimeFactors(number / i, round + 1);

            if (!hasPrimeFactors) {
                labelPrime(factorDiv);
            }

            return true;
        }
    }

    return false;
}

function createFactorRowDiv(round) {
    var factorRowDiv = document.createElement("div");
    factorRowDiv.style.marginLeft = (round * 20) + "px";
    factorsDiv.appendChild(factorRowDiv);

    return factorRowDiv;
}

function createFactorDiv(number, factorRowDiv) {
    var factorDiv = document.createElement("div");
    factorDiv.classList.add("factor");
    factorDiv.innerHTML = number;
    factorRowDiv.appendChild(factorDiv);

    return factorDiv;
}

function labelPrime(factorDiv) {
    factorDiv.classList.add("prime");
}
