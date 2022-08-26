export default class FormValidator {
  constructor(object, formElement){
    this._object = object;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(this._object.buttonElement)
    this._inputList = Array.from(formElement.querySelectorAll(this._object.inputElement))
     }

  _showInputError = (inputElement,  errorMessage) => {
      const errorElement =   this._formElement.querySelector(`.${inputElement.id}-error`)
      inputElement.classList.add(this._object.inputErrorClass)
      errorElement.textContent = errorMessage;
    }

  _hideInputError = (inputElement) => {
    const errorElement =   this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._object.inputErrorClass)
    errorElement.textContent = ' ';
    }

  _hasInvalidInput (inputList) {
    return inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput (inputList)) {
      this._buttonElement.classList.add(this._object.inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', 'disabled')
      } else {
      this._buttonElement.classList.remove(this._object.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled', 'disabled')
  }}

 _setEventListeners = () => {

    this._toggleButtonState(this._inputList);
     this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList);
    })
    })
    }



  _isValid = (inputElement) =>  {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
        } else {
        this._hideInputError(inputElement)
      }
      }

  enableValidation = () => {
    this._buttonElement.classList.add(this._object.inactiveButtonClass);
    this._setEventListeners(this._formElement)

}
}





/*
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

 */
