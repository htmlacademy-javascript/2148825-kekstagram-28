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

const reloadComments = (commentsData, counterValue) => {
  //Если раскомментировать этот console.log, то будет видно, что с каждым открытием фотки, количество счётчиков растёт
  // console.log(counterValue);
  const start = counterValue - 5;
  const end = counterValue;

  if (commentsData.length > end) {
    commentsContainer.append(createComments(commentsData, start, end));
    reloadCommentsCount(commentsData.length, end);
    commentLoader.classList.remove('hidden');
  } else {
    commentsContainer.append(createComments(commentsData, start, commentsData.length));
    reloadCommentsCount(commentsData.length);
    commentLoader.classList.add('hidden');
  }
};

const renderBigPicture = (targetPhoto) => {
  previewImg.src = targetPhoto.url;
  previewLikes.textContent = targetPhoto.likes;
  previewCaption.textContent = targetPhoto.description;
  commentsContainer.innerHTML = '';

  const numberOfComments = targetPhoto.comments.length;

  if (numberOfComments > 5) {
    commentsContainer.append(createComments(targetPhoto.comments, 0, 5));
    reloadCommentsCount(numberOfComments, 5);
    commentLoader.classList.remove('hidden');
  } else {
    commentsContainer.append(createComments(targetPhoto.comments));
    reloadCommentsCount(numberOfComments);
    commentLoader.classList.add('hidden');
  }
};

export {renderBigPicture, reloadComments};
