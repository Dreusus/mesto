import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
constructor (popupSelector,handleSubmitForm) {
  super(popupSelector)
  this._handleSubmitForm = handleSubmitForm

  this._formElement = this._popupSelector.querySelector('.popup__form')
  this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__text'))
  this._button = this._popupSelector.querySelector('.popup__accept');

}

_getInputValues(){
  this._inputValues = {}
  this._inputList.forEach( (input) => {
    this._getInputValues[input.name] = input.value
  })

  return this._inputValues
}

setEventListeners() {
  super.setEventListeners();
  this._formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    this._handleSubmitForm(this._getInputValues())
  });
}

close(){
  this._formElement.reset();
  super.close();
}

}
