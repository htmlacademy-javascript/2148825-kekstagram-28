import {sendData} from './api.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const NUMBER_OF_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const submitButton = document.querySelector('#upload-submit');

let errorKey = '';

const submitButtonText = {
  sent: 'Опубликовать',
  sending: 'Отправка...',
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const noDuplicates = (arr) => new Set(arr).size === arr.length;
const isAmountValid = (arr) => arr.length <= NUMBER_OF_HASHTAGS;
const isEveryItemValid = (hashtags) => hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));

const validationRules = {
  doubles: noDuplicates,
  regex: isEveryItemValid,
  count: isAmountValid,
};

const errorMessages = {
  doubles: 'Хэш-теги не должны повторяться',
  regex: 'Убедитесь, что хэш-теги начинаются с #, содержат только буквы и цифры, имеют длину от 2 до 20 символов и разделяются пробелами',
  count: 'Нельзя указать больше пяти хэш-тегов',
};

const validateHashtags = (inputValue) => {
  const hashtags = inputValue.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const isValid = Object.entries(validationRules).every(([key, validationFn]) => {
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
