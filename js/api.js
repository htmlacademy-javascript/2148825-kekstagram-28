const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const MethodType = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить данные. Попробуйте ещё раз',
};

const load = (url, message, method = MethodType.GET, body = null) => fetch(
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

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, MethodType.POST, body);

export {getData, sendData};
