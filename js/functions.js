function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome(string) {
  string = string.toLowerCase().replaceAll(' ', '');
  let isPalindrome = true;
  const halfLength = Math.ceil(string.length / 2);
  
  for (let i = 0; i < halfLength; i++) {
    if (string[i] !== string[string.length - (i + 1)]) {
      isPalindrome = false;
    }
  }
  
  return isPalindrome;
}

function extractNumbers (source) {
  const string = source.toString().replaceAll(' ', '');
  let numbers = '';
  
  for (let i = 0; i < string.length; i++) {
    const symbol = Number(string[i]);
    if (!isNaN(symbol)) {
      numbers += symbol;
    }
  }
  
  return Number(numbers) === 0 ? NaN : Number(numbers);
}

function incrementString (sourceString, minLength, incrementalString) {
  if (sourceString.length >= minLength) {
    return sourceString;
  }
  let augmentedString = sourceString;
  while (augmentedString.length + incrementalString.length < minLength) {
    augmentedString = incrementalString + augmentedString;
  }
  const gap = minLength - augmentedString.length;
  //gap ввожу для улучшения читаемости кода, нужно ли? Ведь выделяется лишняя память, насколько я понимаю.
  augmentedString = incrementalString.slice(0, gap) + augmentedString;
  return augmentedString;
}

//Сначала решила задачу по-другому (ниже). Хочу понять, какое решение удачнее. Кажется, по асимптотике одинаково, а по читаемости, наверное, всё-таки верхнее.
// function incrementString (sourceString, minLength, incrementalString) {
//   if (sourceString.length >= minLength) {
//     return sourceString;
//   }
//   let augmentedString = '';
//   const gap = minLength - sourceString.length;
//   for (let i = 0; i < gap % incrementalString.length; i++) {
//     augmentedString += incrementalString[i];
//   }
//   for (let i = 0; i < Math.floor(gap / incrementalString.length); i++) {
//     augmentedString += incrementalString;
//   }
//   augmentedString += sourceString;
//   return augmentedString;
// }
