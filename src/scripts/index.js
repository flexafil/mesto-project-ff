import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCardButton, handleLikeCard } from '../components/card';
import { openModal, closeModal, addEvent } from '../components/modal';

const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания попапа для картинки
function handleOpenImagePopup(cardData) {
  const imagePopupItself = document.querySelector('.popup_type_image');
  const popupImage = imagePopupItself.querySelector('.popup__image');
  const popupCaption = imagePopupItself.querySelector('.popup__caption');

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(imagePopupItself);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const newCard = createCard(cardData, deleteCardButton, handleLikeCard, handleOpenImagePopup);
  cardContainer.append(newCard);
});

const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

addEvent(popupEdit);
addEvent(popupImage);

const editButton = document.querySelector('.profile__edit-button');
const imageButton = document.querySelector('.popup__content_content_image');

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
})
imageButton.addEventListener("click", () => openModal(popupImage));

//работа с попапами. шаг 4
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form_edit-profile');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  const newName = nameInput.value;
  const newJob = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileName.textContent = newName;
  profileDescription.textContent = newJob;

  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

// //шаг 5
const popupNewCard = document.querySelector('.popup_type_new-card');
addEvent(popupNewCard);
const newCardButton = document.querySelector('.profile__add-button');
newCardButton.addEventListener("click", () => openModal(popupNewCard));

// //шаг 6
const newPlaceName = document.querySelector('.popup__input_type_card-name');
const newPlaceUrl = document.querySelector('.popup__input_type_url');
const formElementNewCard = document.querySelector('.popup__form_new-place');

function handleAddCardSubmit (evt) {
  evt.preventDefault();

  const cardData = {
    name: newPlaceName.value,
    link: newPlaceUrl.value
  };

  const newCard = createCard(cardData, deleteCardButton, handleLikeCard, handleOpenImagePopup);
  cardContainer.prepend(newCard);

  closeModal(popupNewCard);

  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', handleAddCardSubmit);