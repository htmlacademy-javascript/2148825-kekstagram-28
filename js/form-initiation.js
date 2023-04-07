import {isEscapeKey} from './util.js';
import {validateForm} from './form-validation.js';
import {activateScaleSlider, resetScaleSlider} from './scale-slider.js';
import {initFilterSelection, destroyFilterSlider, resetFilterSlider} from './filter-selection.js';
import {showSuccess, showError} from './popups.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFormWindow = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const closeUploadFormButton = document.querySelector('#upload-cancel');
const textHashtags = uploadFormWindow.querySelector('.text__hashtags');
const textDescription = uploadFormWindow.querySelector('.text__description');
const preview = document.querySelector('.img-upload__preview img');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (!document.querySelector('.error')) {
      closeUploadFormWindow();
    }
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
  uploadFileInput.value = '';
  resetScaleSlider();
  resetFilterSlider();
  destroyFilterSlider();
}

const onSendSuccess = () => {
  showSuccess();
  closeUploadFormWindow();
};

const onUploadFileInputChange = () => {
  openUploadFormWindow();
  activateScaleSlider();
  initFilterSelection();
  const file = uploadFileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((ending) => fileName.endsWith(ending));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

const initForm = () => {
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  closeUploadFormButton.addEventListener('click', () => closeUploadFormWindow());
  validateForm(onSendSuccess, showError);
};

export {initForm};
