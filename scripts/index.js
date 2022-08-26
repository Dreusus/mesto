import Card from './Card.js'
import FormValidator from './FormValidator.js';

//Попап редактирование профиля
const buttonEdit = document.querySelector('.profile__edit')
const popupEdit = document.querySelector('#profile-popup');
const profileTitle= document.querySelector('.profile__title')
const profileSubtitle= document.querySelector('.profile__subtitle')
const popupEditClose = document.querySelector('.popup__close')

const inputName = document.querySelector('#profile-name')
const inputJob = document.querySelector('#profile-about')

//Попап добавление карточки
const popupAddCard = document.querySelector('#addCard-popup')
const buttonPlus = document.querySelector('.profile__button')
const popupAddCardClose = document.querySelector('#closePush')
const inputTitle = document.querySelector('#popup-mesto')
const inputImage = document.querySelector('#popup-img')

//Попап картинка
const popupPhoto = document.querySelector('.popup_photo')
const popupPhotoClose = document.querySelector('#closePhoto')

//Формы
const formEditProfile = document.querySelector('#popEdit')
const formAddCard = document.querySelector('#popAdd')

//Темплейт
const template = document.querySelector('#template').content
const container = document.querySelector('.elements')

//Валидация
const config = {
  formElement: '.popup__form',
  inputElement: '.popup__text',
  buttonElement: '.popup__accept',
  inactiveButtonClass: 'popup__accept_invalid',
  inputErrorClass: 'popup__text_type_error',
}

const popupEditValidation = new FormValidator(config,popupEdit)
const popupAddCardValidation = new FormValidator(config, popupAddCard)

popupEditValidation.enableValidation()
popupAddCardValidation.enableValidation()

//Создание карточки
const createMesto = (cardName, link) => {
  const card = new Card(cardName, link, template)
  return card.getTemplate()
  }

  const renderMesto = (newCard) => {
    container.prepend(newCard);
  }

  const addCard = (evt) => {
    evt.preventDefault();
    const newCard = createMesto(inputTitle.value,inputImage.value)
    container.prepend(newCard)
    evt.target.reset()
    closePopup(popupAddCard)
  }

formAddCard.addEventListener('submit', addCard)



//Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', closeOverlay)
  document.addEventListener('keyup', closeEscape)
}

//Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
  popup.removeEventListener('click', closeOverlay)
  document.removeEventListener('keyup', closeEscape)
}

//Закрытие через Escape
const closeEscape = (event) => {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup)
  }
}
//Закрытие через оверлей
const closeOverlay = (event) => {
  if(event.target === event.currentTarget) {
    closePopup(event.target)
  }
}

const openPopupPhoto = () => {
  openPopup(popupPhoto)
}


// Редактирование профиля
const openProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;
  openPopup(popupEdit)
 }

// Добавление карточки
const openPushPopup = () => {
  openPopup(popupAddCard)
}


buttonPlus.addEventListener('click', function () {
  formAddCard.reset()
  /* toggleButtonState(inputList, buttonElement, config); */
  openPopup(popupAddCard)
});



const handleProfileFormSubmit =  (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
    closePopup(popupEdit)
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit)

buttonEdit.addEventListener('click', () => {
  /* toggleButtonState(inputList, buttonElement, config); */
  openProfilePopup()
  const eventInput = new Event('input');
  inputName.dispatchEvent(eventInput);
  inputJob.dispatchEvent(eventInput);
})


popupEditClose.addEventListener('click', () =>{
  closePopup(popupEdit)
})

popupAddCardClose.addEventListener('click', () =>{
  closePopup(popupAddCard)
})

popupPhotoClose.addEventListener('click', () =>{
  closePopup(popupPhoto)
})





//Массив карточек
const initialCards = [
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
//Создание первых карточек
initialCards.forEach(item => {
  const initialCard = createMesto(item.name, item.link)
  renderMesto(initialCard);

})





