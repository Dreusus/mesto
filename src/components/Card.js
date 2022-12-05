export default class Card {
  constructor( cardName, link, selectors , handleCardClick) {
    this._name = cardName;
    this._link = link;
    this._selectors = selectors
    this._handleCardClick = handleCardClick
}

  _setEventListeners() {
    this._cardImage = this._element.querySelector(this._selectors.image)
    this._cardLike = this._element.querySelector(this._selectors.buttonLike)
    this._cardDelete = this._element.querySelector(this._selectors.buttonDel)

    this._cardImage.addEventListener('click', () => this._handleCardClick())
    this._cardLike.addEventListener('click', () => this._likeButton())
    this._cardDelete.addEventListener('click', () => this._deleteButton())

  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selectors.template).content.querySelector(this._selectors.container).cloneNode(true)
    return cardElement
  }

  _deleteButton () {
    this._element.remove()
    }

  _likeButton() {
    this._cardLike.classList.toggle('element__like_active')
     }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    
    this._element.querySelector('.element__title').textContent = this._name;

    this._cardImage.src = this._link
    this._cardImage.alt = this._name

    return this._element;
  }
}
