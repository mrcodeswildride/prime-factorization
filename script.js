let number = document.getElementById(`number`)
let factorButton = document.getElementById(`factorButton`)
let box = document.getElementById(`box`)

let finding = false

factorButton.addEventListener(`click`, startFindFactors)

number.addEventListener(`keydown`, keyPressed)
number.focus()

function startFindFactors() {
  let numberValue = number.value.trim()

  if (numberValue != `` && !isNaN(numberValue) && !finding) {
    if (numberValue < 2) {
      box.innerHTML = `Number must be at least 2.`
    }
    else if (numberValue != Math.floor(numberValue)) {
      box.innerHTML = `Number must be an integer.`
    }
    else {
      box.innerHTML = `Finding all prime factors...`
      finding = true

      setTimeout(findFactors, 10, numberValue)
    }
  }

  number.focus()
}

function findFactors(numberValue) {
  let round = 0
  let previousFactorDiv
  let hasFactors = true

  while (hasFactors) {
    let otherFactorDiv = makeRow(numberValue, round)

    if (otherFactorDiv == null) {
      if (round == 0) {
        box.innerHTML = `${numberValue} is prime.`
      }
      else {
        labelPrime(previousFactorDiv)
      }

      hasFactors = false
    }
    else {
      numberValue = otherFactorDiv.innerHTML
      round++
      previousFactorDiv = otherFactorDiv
    }
  }

  finding = false
}

function makeRow(number, round) {
  for (let i = 2; i * i <= number; i++) {
    if (number % i == 0) {
      let row = makeRowDiv(round)

      let primeFactorDiv = makeFactorDiv(row, i)
      labelPrime(primeFactorDiv)

      let otherFactorDiv = makeFactorDiv(row, number / i)

      return otherFactorDiv
    }
  }

  return null
}

function makeRowDiv(round) {
  if (round == 0) {
    box.innerHTML = ``
  }

  let row = document.createElement(`div`)
  row.classList.add(`row`)
  row.style.marginLeft = `${round * 20}px`
  box.appendChild(row)

  return row
}

function makeFactorDiv(row, number) {
  let factorDiv = document.createElement(`div`)
  factorDiv.classList.add(`factor`)
  factorDiv.innerHTML = number
  row.appendChild(factorDiv)

  return factorDiv
}

function labelPrime(factorDiv) {
  factorDiv.classList.add(`prime`)
}

function keyPressed(event) {
  if (event.keyCode == 13) {
    startFindFactors()
  }
}