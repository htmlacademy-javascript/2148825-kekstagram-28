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
  const inner = node.querySelector(innerSelector);

  const onDocumentKeydownEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeNode();
    }
  };

  function closeNode() {
    node.remove();
    document.removeEventListener('keydown', onDocumentKeydownEsc);
  }

  document.body.append(node);
  document.addEventListener('keydown', onDocumentKeydownEsc);
  button.addEventListener('click', () => closeNode());
  node.addEventListener('click', () => closeNode());
  inner.addEventListener('click', (evt) => evt.stopPropagation());
};

const showSuccess = () => showPopup(successTemplate, selectors.success.button, selectors.success.inner);
const showError = () => showPopup(errorTemplate, selectors.error.button, selectors.error.inner);

export {showSuccess, showError};
