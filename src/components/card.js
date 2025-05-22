import { deleteCard, removeLike, addLike } from './api';

//Функция создания
export function createCard ({ name, link, likes, ownerId, id }, deleteCardButton, handleLikeCard, openImagePopup, userId) {

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

  if (likes.some(likeData => likeData._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  if (userId === ownerId) {
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

export const deleteCardButton = (cardId, cardElement) => {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch(err => console.log(err));
}

export function handleLikeCard(cardId, likeButton, likeNumber) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likeMethod = isLiked ? removeLike : addLike;
  likeMethod(cardId) 
    .then(updatedCard => { 
    likeButton.classList.toggle('card__like-button_is-active'); 
    likeNumber.textContent = updatedCard.likes.length;
    })
    .catch(err => console.log(err));
}