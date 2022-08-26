export default class Card {
  constructor(cardName, link, templateSelector, openPopup) {
  this._card =  templateSelector.querySelector('.element').cloneNode(true);
  this._image = this._card.querySelector('.element__image');
  this._name = cardName;
  this._link = link;
  this._openPopup = openPopup;
}

  _setEventListeners() {
    this._deleteButton()
    this._likeButton()
    this._openImage()
  }

  _deleteButton () {
    const deleteButton = this._card.querySelector('.element__delete')
    deleteButton.addEventListener('click', ()=> {
    this._card.remove()
    })
  }

  _likeButton() {
    const likeButton = this._card.querySelector('.element__like')
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like_active')
    })
  }

  _openImage () {
    const imagePopupPhoto = document.querySelector('.popup__image')
    const subscriptionPopupPhoto = document.querySelector('.popup__subscription-photo')
    const popupPhoto = document.querySelector('.popup_photo')

    this._image.addEventListener('click', () => {
      imagePopupPhoto.src = this._link;
      imagePopupPhoto.alt = this._name;
      subscriptionPopupPhoto.textContent = this._name;
      this._openPopup(popupPhoto)

  })}


 _getTemplate() {
    this._card.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListeners()
    return this._card;
  }

  generateCard() {
    return this._getTemplate()
  }
}


