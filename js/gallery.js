import {generatePhotos} from './generate-data.js';
import {renderPhotos} from './pictures.js';
import {isEnterKey, isEscapeKey} from './util.js';
import {renderBigPicture} from './show-photo.js';

// Генерация данных и создание миниатюр
const PHOTO_NUMBER = 25;
const photoData = generatePhotos(PHOTO_NUMBER);
renderPhotos(photoData);

//Обработчики событий на странице
const modalElement = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const closeModalButton = modalElement.querySelector('#picture-cancel');
const openModalContainer = document.querySelector('.pictures');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

//в скринкасте тоже использовали function declaration, чтобы можно было использовать функции до их объявления
function openModalWindow() {
  modalElement.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function closeModalWindow() {
  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
}

const onOpenModalButtonClick = (evt) => {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    openModalWindow();
    const element = evt.target.closest('.picture');
    renderBigPicture(element, photoData);
  }
};

const onOpenModalContainerEnter = (evt) => {
  if (isEnterKey(evt)) {
    onOpenModalButtonClick(evt);
  }
};

openModalContainer.addEventListener('click', onOpenModalButtonClick);
openModalContainer.addEventListener('keydowm', onOpenModalContainerEnter);

closeModalButton.addEventListener('click', () => {
  closeModalWindow();
});
