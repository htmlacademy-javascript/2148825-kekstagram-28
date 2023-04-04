import {getRandomUniqueNumber} from './util.js';
import {renderPhotos} from './pictures.js';
import {debounce} from './util.js';

const NUMBER_OF_PHOTOS = 25;
const NUMBER_OF_RANDOM_PHOTOS = 10;

const imgFilters = document.querySelector('.img-filters');
const buttons = document.querySelectorAll('.img-filters__button');
const buttonsContainer = document.querySelector('.img-filters__form');

const showFilter = () => imgFilters.classList.remove('img-filters--inactive');

const generateNewRandomPhotoData = (array) => {
  const getRandomId = getRandomUniqueNumber(0, NUMBER_OF_PHOTOS - 1);
  const newRandomPhotoData = [];

  for (let i = 0; i < NUMBER_OF_RANDOM_PHOTOS; ++i) {
    const number = getRandomId();
    newRandomPhotoData.push(array[number]);
  }

  return newRandomPhotoData;
};

const generateDiscussedPhotoData = (sourceArray) => sourceArray.slice().sort((a, b) => b.comments.length - a.comments.length);

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const renderNewPhotos = (sourceData, cb = (el) => el) => {
  clearPictures();
  renderPhotos(cb(sourceData));
};

const Callbacks = {
  'filter-default': (photos) => renderNewPhotos(photos),
  'filter-random': (photos) => renderNewPhotos(photos, generateNewRandomPhotoData),
  'filter-discussed': (photos) => renderNewPhotos(photos, generateDiscussedPhotoData)
};

const clearButtons = () => {
  buttons.forEach((button) => button.classList.remove('img-filters__button--active'));
};

const changeButtons = (evt) => {
  clearButtons();
  const element = evt.target.closest('.img-filters__button');
  element.classList.add('img-filters__button--active');
};

const setButtonsContainerListeners = (data) => {
  buttonsContainer.addEventListener('click', (evt) => {
    const targetButton = evt.target.closest('.img-filters__button').id;
    const cb = Callbacks[targetButton];
    const cbDebounced = debounce(() => cb(data));
    cbDebounced(data);
  });
};

const initFilter = (data) => {
  showFilter();
  buttons.forEach((button) => button.addEventListener('click', (evt) => changeButtons(evt)));
  setButtonsContainerListeners(data);
};

export {initFilter};
