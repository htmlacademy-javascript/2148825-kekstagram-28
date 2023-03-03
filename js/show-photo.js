//Функции для отрисовки большого окна
const commentItemTemplate = document.querySelector('.social__comment').cloneNode(true);
const createComments = (commentsData) => {
  const commentsFragment = document.createDocumentFragment();
  for (const comment of commentsData) {
    const commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentsFragment.append(commentItem);
  }
  return commentsFragment;
};

const renderBigPicture = (smallElement, photos) => {
  const targetPhoto = photos.find((item) => item.id === Number(smallElement.dataset.id));
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = targetPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = targetPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = targetPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = targetPhoto.description;
  const commentsContainer = bigPicture.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(createComments(targetPhoto.comments));
};

export {renderBigPicture};
