import {isEscapeKey} from './util.js';
import {validateForm} from './form-validation.js';
import {activateScaleSlider, resetScaleSlider} from './scale-slider.js';
import {initFilterSelection, resetFilterSlider} from './filter-selection.js';

const uploadFormWindow = document.querySelector('.img-upload__overlay');
const uploadFileButton = document.querySelector('#upload-file');
const closeUploadFormButton = document.querySelector('#upload-cancel');
const textHashtags = uploadFormWindow.querySelector('.text__hashtags');
const textDescription = uploadFormWindow.querySelector('.text__description');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFormWindow();
  }
};

const onFieldKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function openUploadFormWindow () {
  uploadFormWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
  textHashtags.addEventListener('keydown', onFieldKeydownEsc);
  textDescription.addEventListener('keydown', onFieldKeydownEsc);
}

function closeUploadFormWindow () {
  uploadFormWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  textHashtags.removeEventListener('keydown', onFieldKeydownEsc);
  textDescription.removeEventListener('keydown', onFieldKeydownEsc);
  textHashtags.value = '';
  textDescription.value = '';
  uploadFileButton.value = '';
  resetScaleSlider();
  resetFilterSlider();
}

const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.success');
const successButton = successTemplate.querySelector('.success__button');
const errorButton = errorTemplate.querySelector('.error__button');

const onDocumentSuccessKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    removeSuccessWindow();
  }
};

const onDocumentErrorKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    removeErrorWindow();
  }
};

function removeSuccessWindow () {
  successElement.remove();
  document.removeEventListener('keydown', onDocumentSuccessKeydownEsc);
  closeUploadFormWindow();
};

function removeErrorWindow () {
  errorElement.remove();
  document.removeEventListener('keydown', onDocumentErrorKeydownEsc);
};

const onSuccessEvent = () => {
  document.body.append(successTemplate);
  document.addEventListener('keydown', onDocumentSuccessKeydownEsc);
  successButton.addEventListener('click', removeSuccessWindow);
};

const onErrorEvent = () => {
  document.body.append(errorTemplate);
  document.addEventListener('keydown', onDocumentErrorKeydownEsc);
  errorButton.addEventListener('click', removeErrorWindow);
};

const initForm = () => {
  uploadFileButton.addEventListener('change', openUploadFormWindow);
  closeUploadFormButton.addEventListener('click', closeUploadFormWindow);
  validateForm(onSuccessEvent, onErrorEvent);
  activateScaleSlider();
  initFilterSelection();
};

export {initForm};
