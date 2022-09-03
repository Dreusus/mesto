export default class Card {
  constructor(cardName, link, selectors , openPopup) {
  this._selectors = selectors
  this._card =  document.querySelector(this._selectors.template).content.querySelector(this._selectors.container).cloneNode(true)
  this._image = this._card.querySelector(this._selectors.image);
  this._name = cardName;
  this._link = link;
  this._openPopup = openPopup;
}

  _setEventListeners() {
    this._image.addEventListener('click', () => this._openImage());
    this._card.querySelector(this._selectors.buttonLike).addEventListener('click', () => this._likeButton())
    this._card.querySelector(this._selectors.buttonDel).addEventListener('click', () => this._deleteButton())
  }

  _deleteButton () {
    this._card.remove()
    }

  _likeButton() {
    this._card.querySelector(this._selectors.buttonLike).classList.toggle('element__like_active')
     }


  _openImage () {
    document.querySelector(this._selectors.imagePopupPhoto).src = this._link;
    document.querySelector(this._selectors.imagePopupPhoto).alt = this._name;
    document.querySelector(this._selectors.subscriptionPopupPhoto).textContent = this._name;
    this._openPopup(document.querySelector(this._selectors.popupPhoto))
  }


  generateCard() {

    this._card.querySelector('.element__title').textContent = this._name;
    this._card.querySelector('.element__image').src = this._link;
    this._card.querySelector('.element__image').alt = this._name;
    this._setEventListeners()
    return this._card;
  }
}
