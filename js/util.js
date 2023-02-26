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

export {getRandomNumber, getRandomUniqueNumber};
