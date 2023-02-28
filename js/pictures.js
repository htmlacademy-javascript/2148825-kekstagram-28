import {generatePhotos} from './generate-data.js';


const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const renderPhotos = (data) => {
  data.forEach(({url, likes, comments}) => {
    const picture = picturesTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPhotos};
