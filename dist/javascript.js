const characterRange = document.getElementById("characterRange");
const characterAmount = document.getElementById("characterAmount");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const form = document.getElementById("passwordForm");
const passwordDisplay = document.getElementById("passwordDisplay");


// Each value is a stored array
const LOWERCASE_CHAR_CODES = lowToHighArray(97, 122);
const UPPERCASE_CHAR_CODES = lowToHighArray(65, 90);
const NUMBER_CHAR_CODES = lowToHighArray(48, 57);
const SYMBOL_CHAR_CODES = lowToHighArray(33, 47)
  .concat(lowToHighArray(58, 64))
  .concat(lowToHighArray(91, 96))
  .concat(lowToHighArray(123, 126));

characterAmount.addEventListener("input", syncCharacters);
characterRange.addEventListener("input", syncCharacters);

form.addEventListener("submit", event => {
  event.preventDefault();
  const characterAmountVal = characterAmount.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(
    characterAmountVal,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }
  if (includeNumbers) {
    charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  }
  if (includeSymbols) {
    charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  }
  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}


// Stores all numerical values in order from low to high and returns an array
function lowToHighArray(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacters(e) {
  const value = e.target.value;
  characterAmount.value = value;
  characterRange.value = value;
}
