import {getRandomUniqueNumber} from './util.js';
import {renderPhotos} from './pictures.js';

const NUMBER_OF_PHOTOS = 25;
const NUMBER_OF_RANDOM_PHOTOS = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const buttons = document.querySelectorAll('.img-filters__button');

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

const compareLikes = (a, b) => b.likes - a.likes;

const generateDiscussedPhotoData = (sourceArray) => sourceArray.slice().sort(compareLikes);

const clearButtons = () => {
  buttons.forEach((button) => button.classList.remove('img-filters__button--active'));
};

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const defaultCallBack = (a) => a;

const changeButtons = (evt) => {
  clearButtons();
  const element = evt.target.closest('.img-filters__button');
  element.classList.add('img-filters__button--active');
};

const renderNewPhotos = (sourceData, cb = defaultCallBack) => {
  clearPictures();
  renderPhotos(cb(sourceData));
};

const defaultCb = (photos) => renderNewPhotos(photos);
const randomCb = (photos) => renderNewPhotos(photos, generateNewRandomPhotoData);
const discussedCb = (photos) => renderNewPhotos(photos, generateDiscussedPhotoData);

const initFilterButtons = () => {
  showFilter();
  buttons.forEach((button) => button.addEventListener('click', (evt) => changeButtons(evt)));
};

const initFiltersListeners = (cb1, cb2, cb3) => {
  filterDefault.addEventListener('click', () => cb1());
  filterRandom.addEventListener('click', () => cb2());
  filterDiscussed.addEventListener('click', () => cb3());
};

export {initFilterButtons, defaultCb, randomCb, discussedCb, initFiltersListeners};
