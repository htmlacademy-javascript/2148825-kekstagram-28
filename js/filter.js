import {getRandomUniqueNumber} from './util.js';
import {renderPhotos} from './pictures.js';
import {debounce} from './util.js';

const NUMBER_OF_PHOTOS = 25;
const NUMBER_OF_RANDOM_PHOTOS = 10;

const imgFilters = document.querySelector('.img-filters');
const buttons = document.querySelectorAll('.img-filters__button');
const buttonsContainer = document.querySelector('.img-filters__form');

const Filter = {
  'filter-default': (photos) => photos,
  'filter-random': (photos) => generateNewRandomPhotoData(photos),
  'filter-discussed': (photos) => generateDiscussedPhotoData(photos),
};

const generateNewRandomPhotoData = (sourceArray) => {
  const getRandomId = getRandomUniqueNumber(0, NUMBER_OF_PHOTOS - 1);
  const newRandomPhotoData = [];

  for (let i = 0; i < NUMBER_OF_RANDOM_PHOTOS; ++i) {
    const number = getRandomId();
    newRandomPhotoData.push(sourceArray[number]);
  }

  return newRandomPhotoData;
};

const generateDiscussedPhotoData = (sourceArray) => sourceArray.slice().sort((a, b) => b.comments.length - a.comments.length);


const showFilter = () => imgFilters.classList.remove('img-filters--inactive');

const clearPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const clearButtons = () => {
  buttons.forEach((button) => button.classList.remove('img-filters__button--active'));
};

const setFilterListener = (data) => {
  buttonsContainer.addEventListener('click', debounce((evt) => {
    const targetButton = evt.target.closest('.img-filters__button');

    if (targetButton) {
      clearButtons();
      targetButton.classList.add('img-filters__button--active');
      const filterFn = Filter[targetButton.id];
      const filterPhotos = filterFn(data);
      clearPictures();
      renderPhotos(filterPhotos);
    }
  }));
};

const initFilter = (data) => {
  showFilter();
  setFilterListener(data);
};

export {initFilter};
