import {isEnterKey, isEscapeKey} from './util.js';
import {renderBigPicture, addComments} from './render-photo.js';

const UNIT_COMMENTS_NUMBER = 5;

const modal = document.querySelector('.big-picture');
const closeModalButton = modal.querySelector('#picture-cancel');
const openModalContainer = document.querySelector('.pictures');
const commentLoader = modal.querySelector('.comments-loader');

let commentsCounter = UNIT_COMMENTS_NUMBER;
let onCommentLoaderClick;

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalWindow();
  }
};

function openModalWindow() {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydownEsc);
}

function closeModalWindow() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  commentLoader.removeEventListener('click', onCommentLoaderClick);
}

const onOpenModalContainerClick = (evt, photos) => {
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
    onOpenModalContainerClick(evt, photos);
  }
};

const initGallery = (photos) => {
  closeModalButton.addEventListener('click', () => closeModalWindow());
  openModalContainer.addEventListener('click', (evt) => onOpenModalContainerClick(evt, photos));
  openModalContainer.addEventListener('keydown', (evt) => onOpenModalContainerEnter(evt, photos));
};

export {initGallery};
