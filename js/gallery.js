import {isEnterKey, isEscapeKey} from './util.js';
import {renderBigPicture} from './render-photo.js';

//Обработчики событий на странице
const modalElement = document.querySelector('.big-picture');
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

function openModalWindow() {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function closeModalWindow() {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
}

const onOpenModalButtonClick = (evt, photos) => {
  evt.preventDefault();
  const element = evt.target.closest('.picture');

  if (element.dataset.id) {
    openModalWindow();
    const targetPhoto = photos.find((item) => item.id === Number(element.dataset.id));
    renderBigPicture(targetPhoto);
  }
};

const onOpenModalContainerEnter = (evt, photos) => {
  if (isEnterKey(evt)) {
    onOpenModalButtonClick(evt, photos);
  }
};

const initGallery = (photos) => {
  closeModalButton.addEventListener('click', () => closeModalWindow());
  openModalContainer.addEventListener('click', (evt) => onOpenModalButtonClick (evt, photos));
  openModalContainer.addEventListener('keydown', (evt) => onOpenModalContainerEnter (evt, photos));
};

export {initGallery};
