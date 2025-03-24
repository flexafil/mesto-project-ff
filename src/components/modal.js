const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  // добавить класс открытия попапа
  document.addEventListener('keyup', handleEscKeyUp);
  // добавить слушатель на кнопку Escape
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  // удалить класс открытия попапа
  document.removeEventListener('keyup', handleEscKeyUp);
  // удалить слушатель на кнопку Escape
}

export const addEvent = (popupElement) => {
  const closeBtn = popupElement.querySelector('.popup__close');
 // ищем кнопку крестик в попапе
  closeBtn.addEventListener("click", () => {
    closeModal(popupElement);
  });

  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains('popup')) {
      closeModal(popupElement);
    }
  // если event.target содержит класс "popup", то закрываем
  });
}