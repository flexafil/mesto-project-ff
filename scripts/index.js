// @todo: Темплейт карточки

// @todo: DOM узлы

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (cardData, deleteCardButton) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', () => {
    deleteCardButton(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCardButton (cardElement) {
  cardElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(cardData => {
  const newCard = addCard(cardData, deleteCardButton);
  cardContainer.append(newCard);
});