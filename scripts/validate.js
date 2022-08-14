//Cоощение ошибки
const showInputError = (formElement, inputElement,  errorMessage) => {
  const errorElement =  formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.add('popup__text_type_error')
  errorElement.textContent = errorMessage;
}

//Отсутсвие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement =  formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.remove('popup__text_type_error')
  errorElement.textContent = ' ';
}


const checkInputValidity = (formElement, inputElement) =>  {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some( (inputElement) => {
   return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement) => {
 if (hasInvalidInput (inputList)) {
   buttonElement.classList.add('popup__accept_invalid')
 } else {
   buttonElement.classList.remove('popup__accept_invalid')
 }
}


const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
        const buttonElement = formElement.querySelector('.popup__accept')
        toggleButtonState(inputList,buttonElement);
          inputList.forEach((inputElement) => {
             inputElement.addEventListener('input', () => {
              checkInputValidity(formElement,inputElement);
              toggleButtonState(inputList,buttonElement);
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



