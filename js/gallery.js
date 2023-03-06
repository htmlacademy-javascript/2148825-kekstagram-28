import {isEnterKey, isEscapeKey} from './util.js';
import {renderBigPicture, addComments} from './render-photo.js';

const UNIT_COMMENTS_NUMBER = 5;

const modalElement = document.querySelector('.big-picture');
const closeModalButton = modalElement.querySelector('#picture-cancel');
const openModalContainer = document.querySelector('.pictures');
const commentLoader = modalElement.querySelector('.comments-loader');

let commentsCounter = UNIT_COMMENTS_NUMBER;
let onCommentLoaderClick;

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

function openModalWindow() {
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function closeModalWindow() {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  commentLoader.removeEventListener('click', onCommentLoaderClick);
}

const onOpenModalButtonClick = (evt, photos) => {
  const element = evt.target.closest('.picture');

  if (element && element.dataset.id) {
    evt.preventDefault();
    openModalWindow();
    const targetPhoto = photos.find((item) => item.id === Number(element.dataset.id));
    renderBigPicture(targetPhoto);
    commentsCounter = UNIT_COMMENTS_NUMBER;

    onCommentLoaderClick = () => {
      commentsCounter += UNIT_COMMENTS_NUMBER;
      addComments(targetPhoto.comments, commentsCounter);
    };

    commentLoader.addEventListener('click', onCommentLoaderClick);
  }
};

const onOpenModalContainerEnter = (evt, photos) => {
  if (isEnterKey(evt)) {
    onOpenModalButtonClick(evt, photos);
  }
};

const initGallery = (photos) => {
  closeModalButton.addEventListener('click', () => closeModalWindow());
  openModalContainer.addEventListener('click', (evt) => onOpenModalButtonClick(evt, photos));
  openModalContainer.addEventListener('keydown', (evt) => onOpenModalContainerEnter(evt, photos));
};

export {initGallery};
