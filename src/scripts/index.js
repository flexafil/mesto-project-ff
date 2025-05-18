import '../pages/index.css';
import { initialCards } from './cards';
import { createCard, deleteCardButton, handleLikeCard } from '../components/card';
import { openModal, closeModal, addClosePopupListeners } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';

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

addClosePopupListeners(popupEdit);
addClosePopupListeners(popupImage);

popupImage.addEventListener('click', () => closeModal(popupImage));

const editButton = document.querySelector('.profile__edit-button');
const imageButton = document.querySelector('.popup__content_content_image');

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementEditProfile);
  openModal(popupEdit);
})
imageButton.addEventListener("click", () => openModal(popupImage));

//работа с попапами. шаг 4
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Находим форму в DOM
const formElementEditProfile = document.querySelector('.popup__form_edit-profile');
// Находим поля формы в DOM
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function setSubmitFormEdit (evt) {
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
formElementEditProfile.addEventListener('submit', setSubmitFormEdit); 

const popupNewCard = document.querySelector('.popup_type_new-card');
addClosePopupListeners(popupNewCard);
const newCardButton = document.querySelector('.profile__add-button');
newCardButton.addEventListener("click", () => {
  newPlaceName.value = "";
  newPlaceUrl.value = "";
  openModal(popupNewCard);
  clearValidation(formElementNewCard);
});

const formElementNewCard = document.querySelector('.popup__form_new-place');
const newPlaceName = formElementNewCard.querySelector('.popup__input_type_card-name');
const newPlaceUrl = formElementNewCard.querySelector('.popup__input_type_url');

// const formEditProfile = document.querySelector('.popup__form_edit-profile');
// const profileNameInput = formEditProfile.querySelector('.popup__input_type_name');
// const profileDescriptionInput = formEditProfile.querySelector('.popup__input_type_description');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});  

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
  clearValidation(formElementNewCard);
}

formElementNewCard.addEventListener('submit', handleAddCardSubmit);