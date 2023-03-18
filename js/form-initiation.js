import {isEscapeKey} from './util.js';
import {validateForm} from './form-validation.js';
import {activateScaleSlider, resetScaleSlider} from './scale-slider.js';

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
  uploadFileButton.value = '';
  resetScaleSlider();
}

const initForm = () => {
  uploadFileButton.addEventListener('change', openUploadFormWindow);
  closeUploadFormButton.addEventListener('click', closeUploadFormWindow);
  validateForm();
  activateScaleSlider();
};

export {initForm};
