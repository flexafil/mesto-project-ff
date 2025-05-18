//Функция создания
export function createCard (cardData, deleteCardButton, handleLikeCard, openImagePopup) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    deleteCardButton(cardElement);
  });

  likeButton.addEventListener('click', () => {
    handleLikeCard(likeButton);
  });

  cardImage.addEventListener('click', () => openImagePopup(cardData));

  return cardElement;
}

// Функция удаления
export function deleteCardButton (cardElement) {
  cardElement.remove();
}

//Функция изменения лайка
export function handleLikeCard (cardElement) {
  cardElement.classList.toggle('card__like-button_is-active');
}

