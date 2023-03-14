import {isEscapeKey} from './util.js';
import {validateForm} from './form-validation.js';

const uploadFormWindow = document.querySelector('.img-upload__overlay');
const uploadFileButton = document.querySelector('#upload-file');
const closeUploadFormButton = document.querySelector('#upload-cancel');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFormWindow();
  }
};

function openUploadFormWindow () {
  uploadFormWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function closeUploadFormWindow () {
  uploadFormWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  uploadFileButton.value = '';
}

const initForm = () => {
  uploadFileButton.addEventListener('change', openUploadFormWindow);
  closeUploadFormButton.addEventListener('click', closeUploadFormWindow);
  validateForm();
};

export {initForm};
