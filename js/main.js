const PHOTO_DESCRIPTIONS = [
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
  'Признай это. Без меня, твоя жизнь была бы действительно скучной.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Я пытался заниматься йогой, но в позе лотоса уснул.',
  'Я опять съела сладкое. А все потому, что каждую секунду в мире 200 человек празднуют свой день рождения!',
  'Если вам никто не улыбнулся утром, я подарю вам одну из своих...',
  'Ешь, молись, люби.',
  'Если у вас есть глаза, взгляните на меня сейчас!',
  'Лучшее еще впереди.',
  'Бог должен быть невероятно креативным. Что я имею в виду? Просто посмотри на меня!',
  'Я устал сегодня. Пожалуйста, дайте мне новый день.',
  'Мой успех просто отложен на будущее.',
  'Мой стиль уникален, поэтому, пожалуйста, не копируйте его.',
  'Мой босс сказал мне, что у меня должен быть хоть один хороший день, поэтому я пошла домой.',
  'Всякий раз, когда у меня возникает проблема, я просто начинаю петь. Затем я понимаю, что мой голос — худшая из всех моих проблем.',
  'Работать трудно, но помните, что и хорошо погулять не просто.',
  'Это не лень, это режим энергосбережения',
  'Возьми мой совет, потому что я его не использую.',
  'Самое крутое доказательство того, что я умею делать фотки, лучше чем вы.',
  'Усы в среду.',
  'Супер-кадр, никогда себя таким не видел.',
  'Без хорошей физической подготовки такие кадры и не сделаешь.',
  'Рожденный фотографировать - сниматься не может! Или может...',
  'А вот и спонсор прекрасных фотоснимков на этой страничке.'
];

const COMMENT_MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USER_NAMES = [
  'Криштиану',
  'Лионель',
  'Кайли',
  'Дуэйн',
  'Селена',
  'Ариана',
  'Ким',
  'Вейонсе',
  'Джастин'
];

const NUMBER_OF_PHOTOS = 25;
const COMMENTS_MAX_NUMBER = 6;
const getRandomNumber = (boundary1, boundary2) => {
  const min = Math.ceil(Math.min(boundary1, boundary2));
  const max = Math.floor(Math.max(boundary1, boundary2));

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomUniqueNumber = (boundary1, boundary2) => {
  const previousNumbers = [];

  return function () {
    if (previousNumbers.length >= (Math.abs(boundary1 - boundary2) + 1)) {
      return 'Все числа в данном диапазоне заняты';
    }

    let number = getRandomNumber(boundary1, boundary2);

    while (previousNumbers.includes(number)) {
      number = getRandomNumber(boundary1, boundary2);
    }

    previousNumbers.push(number);

    return number;
  };
};

const getRandomUniqueIdComment = getRandomUniqueNumber(1, NUMBER_OF_PHOTOS * COMMENTS_MAX_NUMBER);
const getRandomUniqueIdPhoto = getRandomUniqueNumber(1, NUMBER_OF_PHOTOS);
const getRandomUniquePhotoImage = getRandomUniqueNumber(1, NUMBER_OF_PHOTOS);
const getRandomUniquePhotoDescription = getRandomUniqueNumber(0, PHOTO_DESCRIPTIONS.length - 1);

const createComment = () => ({
  id: getRandomUniqueIdComment(),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: COMMENT_MASSAGES[getRandomNumber(0, COMMENT_MASSAGES.length - 1)],
  name: USER_NAMES[getRandomNumber(0, USER_NAMES.length - 1)],
});

const createPhoto = () => (
  {id: getRandomUniqueIdPhoto(),
    url: `photos/${getRandomUniquePhotoImage()}.jpg`,
    description: PHOTO_DESCRIPTIONS[getRandomUniquePhotoDescription()],
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(1, 6)}, createComment)
  });

const Photos = Array.from({length: NUMBER_OF_PHOTOS}, createPhoto);
