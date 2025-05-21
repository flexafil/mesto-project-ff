// Загрузка информации о пользователе с сервера
export const getUserData = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-38/users/me', {
    method: 'GET',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  
  .catch((err) => {
    console.log(err);
  }); 
}

// Загрузка карточек с сервера
export const getAllCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-38/cards', {
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
  }

// Добавление новой карточки
export const createNewCard = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-38/cards', {
    method: 'POST',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
}

// Редактирование профиля
export const editProfile = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-38/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
}

// Обновление аватара пользователя
export const editAvatar = (data) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-38/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
}
