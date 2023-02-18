const checkStringLength = (string, maxLength) => string.length <= maxLength;
const checkPalindrome = (string) => {
  string = string.toLowerCase().replaceAll(' ', '');
  let isPalindrome = true;
  const halfLength = Math.ceil(string.length / 2);

  for (let i = 0; i < halfLength; i++) {
    if (string[i] !== string[string.length - (i + 1)]) {
      isPalindrome = false;
    }
  }

  return isPalindrome;
};

const extractNumbers = (source) => {
  const string = source.toString().replace(/\s+/g, '');
  let numbers = '';

  for (const char of string) {
    const symbol = Number(char);
    if (!isNaN(symbol)) {
      numbers += symbol;
    }
  }

  return Number(numbers) === 0 ? NaN : Number(numbers);
};

const incrementString = (sourceString, minLength, incrementalString) => {
  if (sourceString.length >= minLength) {
    return sourceString;
  }

  let resultString = sourceString;

  while ((resultString.length + incrementalString.length) < minLength) {
    resultString = incrementalString + resultString;
  }

  const gap = minLength - resultString.length;
  resultString = incrementalString.slice(0, gap) + resultString;

  return resultString;
};
