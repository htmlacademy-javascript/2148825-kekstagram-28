import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const selectors = {
  success: {
    button: '.success__button',
    inner:  '.success__inner',
  },
  error: {
    button: '.error__button',
    inner:  '.error__inner',
  },
};

const showPopup = (template, buttonSelector, innerSelector) => {
  const node = template.cloneNode(true);
  const button = node.querySelector(buttonSelector);
  const innerBlock = node.querySelector(innerSelector);

  const onDocumentKeydownEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  function closePopup() {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydownEsc);
  }

  document.body.append(node);
  document.addEventListener('keydown', onDocumentKeydownEsc);
  button.addEventListener('click', () => closePopup());
  node.addEventListener('click', () => closePopup());
  innerBlock.addEventListener('click', (evt) => evt.stopPropagation());
};

const showSuccess = () => showPopup(successTemplate, selectors.success.button, selectors.success.inner);
const showError = () => showPopup(errorTemplate, selectors.error.button, selectors.error.inner);

export {showSuccess, showError};
