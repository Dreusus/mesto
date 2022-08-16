const showInputError = (formElement, inputElement,  errorMessage) => {
    const errorElement =  formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add('popup__text_type_error')
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
    const errorElement =  formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove('popup__text_type_error')
    errorElement.textContent = ' ';
}

const hasInvalidInput = (inputList) => {
  return inputList.some( (inputElement) => {
     return !inputElement.validity.valid;

})
};

const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput (inputList)) {
      buttonElement.classList.add('popup__accept_invalid')
      buttonElement.setAttribute('disabled', 'disabled')
      } else {
      buttonElement.classList.remove('popup__accept_invalid')
      buttonElement.removeAttribute('disabled', 'disabled')

}
}

const isValid = (formElement, inputElement) =>  {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
    hideInputError(formElement, inputElement)
 }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__accept')
  toggleButtonState(inputList,buttonElement);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement,inputElement);
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

enableValidation()

/* enableValidation({
  formElement: '.popup__form',
  inputElement: '.popup__text',
  buttonElement: '.popup__accept',
  inactiveButtonClass: 'popup__accept_invalid',
  inputErrorClass: 'popup__text_type_error',
  });

 */

