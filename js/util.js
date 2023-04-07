const ALERT_SHOW_TIME = 5000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscapeKey, isEnterKey, showAlert, getRandomUniqueNumber, debounce};
