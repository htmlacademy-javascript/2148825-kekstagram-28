const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const methodType = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные. Попробуйте ещё раз',
};

const load = (url, message, method = methodType.GET, body = null) => fetch(
  `${BASE_URL}${url}`, {
    method: method,
    body
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  })
  .catch(() => {
    throw new Error(message);
  });

const getData = () => load(route.GET_DATA, errorText.GET_DATA);

const sendData = (body) => load(route.SEND_DATA, errorText.SEND_DATA, methodType.POST, body);

export {getData, sendData};
