const UNIT_COMMENTS_NUMBER = 5;

const commentItemTemplate = document.querySelector('.social__comment').cloneNode(true);
const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikes = preview.querySelector('.likes-count');
const commentCount = preview.querySelector('.social__comment-count');
const commentLoader = preview.querySelector('.comments-loader');
const commentsContainer = preview.querySelector('.social__comments');
const previewCaption = preview.querySelector('.social__caption');

const createComments = (commentsData, startIndex = 0, finish = commentsData.length) => {
  const commentsFragment = document.createDocumentFragment();

  for (let i = startIndex; i < finish; i++) {
    const commentItem = commentItemTemplate.cloneNode(true);
    commentItem.querySelector('.social__picture').src = commentsData[i].avatar;
    commentItem.querySelector('.social__text').textContent = commentsData[i].message;
    commentsFragment.append(commentItem);
  }

  return commentsFragment;
};

const reloadCommentsCount = (number, numberShown = number) => {
  commentCount.innerHTML = `${numberShown} из <span class="comments-count">${number}</span> комментариев`;
};

const reloadComments = (commentsData, startIndex, finish) => {
  if (commentsData.length > finish) {
    commentsContainer.append(createComments(commentsData, startIndex, finish));
    reloadCommentsCount(commentsData.length, finish);
    commentLoader.classList.remove('hidden');
  } else {
    commentsContainer.append(createComments(commentsData, startIndex, commentsData.length));
    reloadCommentsCount(commentsData.length);
    commentLoader.classList.add('hidden');
  }
};

const addComments = (commentsData, counterValue) => {
  const commentsShown = counterValue;
  const startIndex = counterValue - UNIT_COMMENTS_NUMBER;

  reloadComments(commentsData, startIndex, commentsShown);
};

const renderBigPicture = (targetPhoto) => {
  previewImg.src = targetPhoto.url;
  previewLikes.textContent = targetPhoto.likes;
  previewCaption.textContent = targetPhoto.description;
  commentsContainer.innerHTML = '';

  reloadComments(targetPhoto.comments, 0, UNIT_COMMENTS_NUMBER);
};

export {renderBigPicture, addComments};
