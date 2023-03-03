const picturesContainer = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const renderPhotos = (data) => {
  data.forEach(({url, likes, comments, id}) => {
    const picture = picturesTemplate.cloneNode(true);
    picture.dataset.id = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPhotos};
