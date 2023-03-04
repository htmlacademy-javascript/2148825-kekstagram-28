const commentItemTemplate = document.querySelector('.social__comment').cloneNode(true);
const preview = document.querySelector('.big-picture');
const previewImg = preview.querySelector('.big-picture__img img');
const previewLikes = preview.querySelector('.likes-count');
const previewComments = preview.querySelector('.comments-count');
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

const reloadCommentsCount = () => {

};

const renderBigPicture = (targetPhoto) => {
  previewImg.src = targetPhoto.url;
  previewLikes.textContent = targetPhoto.likes;
  previewCaption.textContent = targetPhoto.description;
  commentsContainer.innerHTML = '';
  const numberOfComments = targetPhoto.comments.length;

  if (numberOfComments > 5) {
    commentsContainer.append(createComments(targetPhoto.comments, 0, 5));
    commentLoader.classList.remove('hidden');
  } else {
    commentsContainer.append(createComments(targetPhoto.comments));
    commentLoader.classList.add('hidden');
  }
};

export {renderBigPicture};

//Будет функция, делаем это всё внутри createComments, на вход берёт длину массива(х). Если больше 5, то только то пишет 5 комментов из х (в create comments тоже делает )
//Функция Enough comments (если меньше то х из х и удаляет кнопку загрузить ещё) - эта функция будет при отрисовке большой картинки
//Функция для обработчика загрузить ещё reloadComments - принимает счётчик которое должно быть отображено и массив с комментами, в конце счётчик +5
//Событие навесим в onOpenModalButtonClick при нахождении нужного объекта
// но нужно ещё передавать ей количество отображаемых комментариев, значит вне неё нужен счётчик(счётчик напишем в util)
//Возможно счётчик стоит сделать с помощью замыкания и создавать его в onOpenModalButtonClick перед событием загрузить ещё
