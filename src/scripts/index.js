import '../pages/index.css';
// import { initialCards } from './cards';
import { createCard, deleteCardButton, handleLikeCard } from '../components/card';
import { openModal, closeModal, addClosePopupListeners } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import { getUserData, getAllCards, createNewCard, editProfile, editAvatar } from '../components/api';

const cardContainer = document.querySelector('.places__list');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  // fieldsWithCustomValidation: ['place-input', 'name-input', 'avatar-url-input']
  submitButtonInactiveSelector: 'popup__button_inactive',
  inputError: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  // errorSuffix: '-error'
};

// @todo: Функция создания попапа для картинки
function handleOpenImagePopup(name, link) {
  const imagePopupItself = document.querySelector('.popup_type_image');
  const popupImage = imagePopupItself.querySelector('.popup__image');
  const popupCaption = imagePopupItself.querySelector('.popup__caption');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopupItself);
}

// @todo: Вывести карточки на страницу
// initialCards.forEach(cardData => {
//   const newCard = createCard(cardData, deleteCardButton, handleLikeCard, handleOpenImagePopup);
//   cardContainer.append(newCard);
// });

const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupSubmitButton = document.querySelector('.popup__button');

addClosePopupListeners(popupEdit);
addClosePopupListeners(popupImage);

popupImage.addEventListener('click', () => closeModal(popupImage));

const editButton = document.querySelector('.profile__edit-button');
const imageButton = document.querySelector('.popup__content_content_image');

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementEditProfile, validationConfig);
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

const popupNewCard = document.querySelector('.popup_type_new-card');
addClosePopupListeners(popupNewCard);
const newCardButton = document.querySelector('.profile__add-button');
newCardButton.addEventListener("click", () => {
  newPlaceName.value = "";
  newPlaceUrl.value = "";
  openModal(popupNewCard);
  clearValidation(formElementNewCard, validationConfig);
});

const formElementAvatar = document.querySelector('.popup__form_avatar');
const avatarInput = formElementAvatar.querySelector('.popup__input_type_avatar-url');
const popupAvatar = document.querySelector('.popup_type_avatar');
const changeAvatar = document.querySelector('.profile__image-container');
const profileImage = changeAvatar.querySelector('.profile__image');

addClosePopupListeners(popupAvatar);
changeAvatar.addEventListener("click", () => {
  // avatarInput.value = avatarUrl;
  openModal(popupAvatar);
  clearValidation(formElementAvatar, validationConfig);
});

const formElementNewCard = document.querySelector('.popup__form_new-place');
const newPlaceName = formElementNewCard.querySelector('.popup__input_type_card-name');
const newPlaceUrl = formElementNewCard.querySelector('.popup__input_type_url'); 

enableValidation(validationConfig);  

// Добавление новой карточки
formElementNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupSubmitButton.textContent = 'Сохранение...';

  const cardData = {
    name: newPlaceName.value,
    link: newPlaceUrl.value
  };

  createNewCard(cardData)
  .then((data) => {  
  const newCard = createCard({ name: data.name, link: data.link, likes: data.likes, ownerId: data.owner._id, id: data._id  }, deleteCardButton, handleLikeCard, handleOpenImagePopup, userId);
  cardContainer.prepend(newCard);

  closeModal(popupNewCard);

  formElementNewCard.reset();
  })
  .finally(() => {
    popupSubmitButton.textContent = 'Сохранить'
})
})

// Изменение данных профиля
formElementEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupSubmitButton.textContent = 'Сохранение...';

  const cardData = {
    name: nameInput.value,
    about: jobInput.value
  };

  editProfile(cardData)
  .then((data) => {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);

  formElementEditProfile.reset();
  })
  .finally(() => {
    popupSubmitButton.textContent = 'Сохранить'
})
})

const newAvatarData = {
  avatar: 'https://i.pinimg.com/originals/6a/1b/7f/6a1b7f79a89349b03acd36c89c22068a.jpg'
}

let userId = null;
Promise.all([getUserData(), getAllCards(), editAvatar(newAvatarData)])
  .then(([userData, cards, avatarData]) => {
    userId = userData._id;

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${avatarData.avatar}')`;
    avatarInput.value = avatarData.avatar;

    cards.forEach(data => {
      const newCard = createCard({ name: data.name, link: data.link, likes: data.likes, ownerId: data.owner._id, id: data._id }, deleteCardButton, handleLikeCard, handleOpenImagePopup, userId);
      cardContainer.append(newCard);
    });
  })
// Изменение аватара
formElementAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  popupSubmitButton.textContent = 'Сохранение...';

  const currentAvatarUrl = {
    avatar: avatarInput.value
  };

  editAvatar(currentAvatarUrl)
  .then((data) => {
  profileImage.style.backgroundImage = `url('${data.avatar}')`;
  closeModal(popupAvatar);

  formElementAvatar.reset();
  })
  .finally(() => {
    popupSubmitButton.textContent = 'Сохранить'
})
})