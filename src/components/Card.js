export default class Card {
  constructor( item, selectors , handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item.id;
    this._userId = item.userId;
    this._ownerId = item.ownerId;

    this._selectors = selectors;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick;
}
  _getTemplate() {
    const cardElement = document.querySelector(this._selectors.template).content.querySelector(this._selectors.container).cloneNode(true)
    return cardElement
  }

  _setEventListeners() {
    this._cardImage = this._element.querySelector(this._selectors.image)
    this._cardLike = this._element.querySelector(this._selectors.buttonLike)
    this._cardDelete = this._element.querySelector(this._selectors.buttonDel)
    this._countLikeElement = this._element.querySelector(this._selectors.counterlike)
    this._cardImage.addEventListener('click', () => this._handleCardClick())
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this._id))
    this._cardDelete.addEventListener('click', () => this._handleDeleteClick(this._id))
  }

  _likeCard() {
    this._cardLike.classList.add('element__like_active')
  }

  _deleteLike() {
    this._cardLike.classList.remove('element__like_active')
  }

  isLiked() {
    const userHasLikedCard = this._likes.find( user => user._id === this._userId)
    return userHasLikedCard
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._countLikeElement.textContent = this._likes.length

    if(this.isLiked()) {
      this._likeCard();
    }  else {
      this._deleteLike();
  }
  }

  deleteButton () {
  this._element.remove()
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this.setLikes(this._likes)
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link
    this._cardImage.alt = this._name

    if (this._ownerId !== this._userId) {
      this._cardDelete.style.display = 'none'
    }
    return this._element
  }

}
