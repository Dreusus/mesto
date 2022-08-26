export default class Card {
  constructor(cardName, link, template, openPopup) {
  this._card =  template.querySelector('.element').cloneNode(true);
  this._image = this._card.querySelector('.element__image');
  this._name = cardName;
  this._link = link;
  this._openPopup = openPopup;
}

  _likeButton () {
  this._card.querySelector('.element__like').addEventListener('click', (event) =>{
  const eventTarget=event.target
  eventTarget.classList.toggle('element__like_active')
  })
  }

  _deleteButton () {
    this._card.querySelector('.element__delete').addEventListener('click', () => {
      this._card.remove()
    })
  }


  _openImage (openPopup) {
    const imagePopupPhoto = document.querySelector('.popup__image')
    const subscriptionPopupPhoto = document.querySelector('.popup__subscription-photo')
    const popupPhoto = document.querySelector('.popup_photo')

    this._image.addEventListener('click', () => {
      imagePopupPhoto.src = this._link;
      imagePopupPhoto.alt = this._name;
      subscriptionPopupPhoto.textContent = this._name;
      this._openPopup(popupPhoto)
      console.log(this)
  })}


 getTemplate() {
    this._card.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeButton()
    this._deleteButton()
    this._openImage()
    return this._card;
  }

}
