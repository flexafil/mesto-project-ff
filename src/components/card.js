//Функция создания
const userMyId = 'cdc7cf1592cfc29164a4e21c';
export function createCard ({ name, link, likes, ownerId, id }, deleteCardButton, handleLikeCard, openImagePopup) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeNumber = cardElement.querySelector('.card__like-number');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeNumber.textContent = likes.length;

  if (likes.some(likeData => likeData._id === userMyId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  if (userMyId === ownerId) {
    deleteButton.addEventListener('click', () => {
      deleteCardButton(id, cardElement);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  likeButton.addEventListener('click', () => {
    handleLikeCard(id, likeButton, likeNumber);
  });

  cardImage.addEventListener('click', () => openImagePopup(name, link));

  return cardElement;
}

// Функция удаления
export const deleteCardButton = (cardId, cardElement) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-38/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      cardElement.remove();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  }); 
}

// Запрос DELETE удаления лайка
const removeLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
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

// Запрос PUT добавления лайка
const addLike = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-38/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '6b9ea1ba-0efe-4243-bb21-fff41dc97647',
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      // likesNumber.length+1;
      // likeIcon.classList.add('card__like-button_is-active');
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
}

// Функция изменения лайка
export function handleLikeCard(cardId, likeButton, likeNumber) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    removeLike(cardId)
      .then(updatedCard => {
        likeButton.classList.remove('card__like-button_is-active');
        likeNumber.textContent = updatedCard.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    // Если лайка нет — ставим лайк
    addLike(cardId)
      .then(updatedCard => {
        likeButton.classList.add('card__like-button_is-active');
        likeNumber.textContent = updatedCard.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  }
}