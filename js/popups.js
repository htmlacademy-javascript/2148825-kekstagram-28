import {isEscapeKey} from './util.js';

const Selectors = {
  SUCCESS: {
    BUTTON: '.success__button',
    INNER:  '.success__inner',
  },
  ERROR: {
    BUTTON: '.error__button',
    INNER:  '.error__inner',
  },
};

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

let popup;

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup() {
  popup.remove();
  document.removeEventListener('keydown', onDocumentKeydownEsc);
}

const showPopup = (template, buttonSelector, innerSelector) => {
  popup = template.cloneNode(true);
  const button = popup.querySelector(buttonSelector);
  const innerBlock = popup.querySelector(innerSelector);

  document.body.append(popup);
  document.addEventListener('keydown', onDocumentKeydownEsc);
  button.addEventListener('click', () => closePopup());
  popup.addEventListener('click', () => closePopup());
  innerBlock.addEventListener('click', (evt) => evt.stopPropagation());
};

const showSuccess = () => showPopup(successTemplate, Selectors.SUCCESS.BUTTON, Selectors.SUCCESS.INNER);
const showError = () => showPopup(errorTemplate, Selectors.ERROR.BUTTON, Selectors.ERROR.INNER);

export {showSuccess, showError};
