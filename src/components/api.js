const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

// Загрузка информации о пользователе с сервера
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)  
  .catch((err) => {
    console.log(err);
  }); 
}

// Загрузка карточек с сервера
export const getAllCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  }); 
  }

// Добавление новой карточки
export const createNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  }); 
}

// Функция удаления
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
}

// Запрос DELETE удаления лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  }); 
}

// Запрос PUT добавления лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  });
}

// Редактирование профиля
export const editProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  }); 
}

// Обновление аватара пользователя
export const editAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then(handleResponse) 
  .catch((err) => {
    console.log(err);
  }); 
}
