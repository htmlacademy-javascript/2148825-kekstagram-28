import {sendData} from './api.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const NUMBER_OF_HASHTAGS = 5;

const submitButtonText = {
  sent: 'Опубликовать',
  sending: 'Отправка...',
};

const errorMessages = {
  DOUBLES: 'Хэш-теги не должны повторяться',
  REGEX: 'Убедитесь, что хэш-теги начинаются с #, содержат только буквы и цифры, имеют длину от 2 до 20 символов и разделяются пробелами',
  COUNT: 'Нельзя указать больше пяти хэш-тегов',
};

const ValidationRules = {
  DOUBLES: (arr) => new Set(arr).size === arr.length,
  REGEX: (hashtags) => hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag)),
  COUNT: (arr) => arr.length <= NUMBER_OF_HASHTAGS,
};

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');

let errorKey = '';

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const validateHashtags = (inputValue) => {
  const hashtags = inputValue.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const isValid = Object.entries(ValidationRules).every(([key, validationFn]) => {
    const result = validationFn(hashtags);
    errorKey = key;

    return result;
  });

  return isValid;
};

const getErrorMessage = () => errorMessages[errorKey];

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.sending;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.sent;
};

const validateForm = (onSuccess, onError) => {
  pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(uploadForm))
        .then(onSuccess)
        .catch(onError)
        .finally(unblockSubmitButton);
    }
  });
};

export {validateForm};
