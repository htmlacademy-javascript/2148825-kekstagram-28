import {hasDuplicates} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const isEveryValid = (string) => {
  if (!string) {
    return true;
  }
  const hashtags = string.trim().split(/\s+/);
  return hashtags.every((hashtag) => hashtagRegex.test(hashtag));
};

const isNonRepeatable = (string) => {
  if (!string) {
    return true;
  }
  const hashtags = string.trim().toLowerCase().split(/\s+/);
  return !hasDuplicates(hashtags);
};

const isLengthValid = (string) => {
  if (!string) {
    return true;
  }
  const hashtags = string.trim().split(/\s+/);
  return hashtags.length <= 5;
};

pristine.addValidator(textHashtags, isEveryValid, 'Убедитесь, что хэш-теги начинаются с #, содержат только буквы и цифры, имеют длину от 2 до 20 символов и разделяются пробелами');
pristine.addValidator(textHashtags, isNonRepeatable, 'Хэш-теги не должны повторяться');
pristine.addValidator(textHashtags, isLengthValid, 'Нельзя указать больше пяти хэш-тегов');

const validateForm = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      console.log(new FormData(uploadForm));
    }
  });
};

export {validateForm};
