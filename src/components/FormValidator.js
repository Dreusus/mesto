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

  _hasInvalidInput () {
    return this._inputList.some( (inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput ()) {
      this._buttonElement.classList.add(this._object.inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', 'disabled')
      } else {
      this._buttonElement.classList.remove(this._object.inactiveButtonClass)
      this._buttonElement.removeAttribute('disabled', 'disabled')
  }}

  _isValid = (inputElement) =>  {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      } else {
      this._hideInputError(inputElement)
    }
    }

 _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       this._isValid(inputElement);
        this._toggleButtonState(this._inputList);
    })
    })
    }

   resetValidation() {
    this._toggleButtonState()
    this._inputList.forEach( (inputElement) => {
      this._hideInputError( inputElement)
    })
   }

  enableValidation = () => {
    this._setEventListeners()
  }
}




