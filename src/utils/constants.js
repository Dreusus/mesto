export const initialCards = [
  {
    name: 'Прометей',
    link: 'http://pravdaurfo.ru/sites/default/files/home/user1530/23537886251.jpg'
  },
  {
    name: 'Аэросъемка',
    link: 'https://pilothub.ru/datas/folio/16287-aerosemka-goroda-nadym.jpg'
  },
  {
    name: 'Церковь',
    link: 'https://content.foto.my.mail.ru/mail/sasin62/1329/h-1351.jpg'
  },
  {
    name: 'Кольцо',
    link: 'https://fototerra.ru/photo/Russia/Nadym/large-256771.jpg'
  },
  {
    name: 'Парк',
    link: 'https://fototerra.ru/photo/Russia/Nadym/large-256766.jpg'
  },
  {
    name: 'День оленевода',
    link: 'https://a.d-cd.net/31497b5s-1920.jpg'
  }
];

export const selectors = {
  template: '#template',
  container: '.element',
  image: '.element__image',
  buttonDel: '.element__delete',
  buttonLike: '.element__like',
  imagePopupPhoto: '.popup__image',
  popupPhoto: '.popup_photo',
  subscriptionPopupPhoto: '.popup__subscription-photo',
  counterlike: '.element__like-count'
}

export const config = {
  formElement: '.popup__form',
  inputElement: '.popup__text',
  buttonElement: '.popup__accept',
  inactiveButtonClass: 'popup__accept_invalid',
  inputErrorClass: 'popup__text_type_error',
}
