const commentItemTemplate = document.querySelector('.social__comment').cloneNode(true);
const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikes = preview.querySelector('.likes-count');
const previewComments = preview.querySelector('.comments-count');
const commentsContainer = preview.querySelector('.social__comments');
const previewCaption = preview.querySelector('.social__caption');

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

const renderBigPicture = (targetPhoto) => {
  previewImg.src = targetPhoto.url;
  previewLikes.textContent = targetPhoto.likes;
  previewComments.textContent = targetPhoto.comments.length;
  previewCaption.textContent = targetPhoto.description;

  commentsContainer.innerHTML = '';
  commentsContainer.append(createComments(targetPhoto.comments));
};

export {renderBigPicture};
