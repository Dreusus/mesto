
const config = {
  formElement: '.popup__form',
  inputElement: '.popup__text',
  buttonElement: '.popup__accept',
  inactiveButtonClass: 'popup__accept_invalid',
  inputErrorClass: 'popup__text_type_error',
}

const showInputError = (formElement, inputElement,  errorMessage, config) => {
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement =  formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = ' ';
}

const hasInvalidInput = (inputList) => {
  return inputList.some( (inputElement) => {
  return !inputElement.validity.valid;
})
};

const toggleButtonState = (inputList, buttonElement, config) => {

if (hasInvalidInput (inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.setAttribute('disabled', 'disabled')
    } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', 'disabled')

}
}

const isValid = (formElement, inputElement, config) =>  {
if (!inputElement.validity.valid) {
  showInputError(
    formElement,
    inputElement,
    inputElement.validationMessage,
    config);
  } else {
  hideInputError(formElement, inputElement,config)
}
}

const setEventListeners = (formElement,config) => {
const inputList = Array.from(formElement.querySelectorAll(config.inputElement));
const buttonElement = formElement.querySelector(config.buttonElement)
toggleButtonState(inputList,buttonElement, config);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(formElement,inputElement, config);
    toggleButtonState(inputList,buttonElement, config);
})
})
}

const enableValidation = () => {
const formList = Array.from(document.querySelectorAll(config.formElement))
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
});
setEventListeners(formElement, config);
});
};

enableValidation(config)


