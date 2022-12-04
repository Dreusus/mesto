export default class Card {
  constructor( cardName, link, selectors , handleCardClick) {
    this._name = cardName;
    this._link = link;
    this._selectors = selectors
    this._handleCardClick = handleCardClick
}

  _setEventListeners() {
    this._element.querySelector(this._selectors.image).addEventListener('click', () => this._handleCardClick())
    this._element.querySelector(this._selectors.buttonLike).addEventListener('click', () => this._likeButton())
    this._element.querySelector(this._selectors.buttonDel).addEventListener('click', () => this._deleteButton())
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selectors.template).content.querySelector(this._selectors.container).cloneNode(true)
    return cardElement
  }

  _deleteButton () {
    this._element.remove()
    }

  _likeButton() {
    this._element.querySelector(this._selectors.buttonLike).classList.toggle('element__like_active')
     }

  generateCard() {
    this._element = this._getTemplate()
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._setEventListeners()
    return this._element;
  }
}
