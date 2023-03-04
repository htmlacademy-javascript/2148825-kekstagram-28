import {isEnterKey, isEscapeKey, addFive} from './util.js';
import {renderBigPicture, reloadComments} from './render-photo.js';

const modalElement = document.querySelector('.big-picture');
const closeModalButton = modalElement.querySelector('#picture-cancel');
const openModalContainer = document.querySelector('.pictures');
const commentLoader = modalElement.querySelector('.comments-loader');

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
}

const commentsCounter = (commentsData) => {
  const counter = addFive();

  return () => {
    reloadComments(commentsData, counter());
  };
};


const onOpenModalButtonClick = (evt, photos) => {
  evt.preventDefault();
  const element = evt.target.closest('.picture');

  if (element.dataset.id) {
    openModalWindow();
    const targetPhoto = photos.find((item) => item.id === Number(element.dataset.id));
    renderBigPicture(targetPhoto);

    const onCommentLoaderClick = commentsCounter(targetPhoto.comments);
    commentLoader.addEventListener('click', onCommentLoaderClick);
    // Если раскомментировать код ниже, то проблема со счётчиками решится, но будут увеличиваться события на этих кнопкахы
    // closeModalButton.addEventListener('click', () => {
    //   commentLoader.removeEventListener('click', onCommentLoaderClick);
    // });
    //
    // document.addEventListener('keydown',() => {
    //   commentLoader.removeEventListener('click', onCommentLoaderClick);
    // });
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
