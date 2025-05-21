const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorActive);

};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.inputErrorActive);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, config) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return Array.from(inputList).some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.submitButtonInactiveSelector);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.submitButtonInactiveSelector);
  }
};

const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}; 

export const enableValidation = config => { 
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => { 
    setEventListeners(formElement, config); 
  })
}

export function clearValidation(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.setCustomValidity("");
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
}