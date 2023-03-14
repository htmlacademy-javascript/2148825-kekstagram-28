const getRandomNumber = (boundary1, boundary2) => {
  const min = Math.ceil(Math.min(boundary1, boundary2));
  const max = Math.floor(Math.max(boundary1, boundary2));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomUniqueNumber = (boundary1, boundary2) => {
  const previousNumbers = new Set();

  return () => {
    if (previousNumbers.size >= (Math.abs(boundary1 - boundary2) + 1)) {
      return 'Все числа в данном диапазоне заняты';
    }

    let number = getRandomNumber(boundary1, boundary2);

    while (previousNumbers.has(number)) {
      number = getRandomNumber(boundary1, boundary2);
    }

    previousNumbers.add(number);

    return number;
  };
};

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomNumber, getRandomUniqueNumber, isEscapeKey, isEnterKey, hasDuplicates};
