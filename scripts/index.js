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
    link: 'https://грузоперевозки-тюмень-межгород.рф/wp-content/uploads/2020/04/Надым.jpg'
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


//Попап редактирование профиля
const buttonEdit = document.querySelector('.profile__edit')
const popupEdit = document.querySelector('#profile-popup');
const profileTitle= document.querySelector('.profile__title')
const profileSubtitle= document.querySelector('.profile__subtitle')
const closePopupEdit = document.querySelector('.popup__close')

const inputName = document.querySelector('#profile__name')
const inputJob = document.querySelector('#profile__about')


//Попап добавление карточки
const popupAddCard = document.querySelector('#addCard-popup')
const buttonPlus = document.querySelector('.profile__button')
const closePopupAddCard = document.querySelector('#closePush')
const inputTitle = document.querySelector('#popup__mesto')
const inputImage = document.querySelector('#popup__img')


//Попап картинка
const popupPhoto = document.querySelector('.popup_photo')
const imagePopupPhoto = document.querySelector('.popup__image')
const subscriptionPopupPhoto = document.querySelector('.popup__subscription-photo')
const closePopupPhoto = document.querySelector('#closePhoto')


//Формы
const formEditProfile = document.querySelector('#popEdit')
const formAddCard = document.querySelector('#popAdd')


const template = document.querySelector('#template').content
const container = document.querySelector('.elements')



const createMesto = (cardName, link) => {
  const card = template.querySelector('.element').cloneNode(true)
  const image = card.querySelector('.element__image')
    card.querySelector('.element__title').textContent = cardName
    image.src = link
    image.alt = cardName
    card.querySelector('.element__like').addEventListener('click', (event) =>{
      const eventTarget=event.target
      eventTarget.classList.toggle('element__like_active')
      })
   card.querySelector('.element__delete').addEventListener('click', () =>{
    card.remove()
  })
  image.addEventListener('click', () => {
    imagePopupPhoto.src = link
    subscriptionPopupPhoto.textContent = cardName
    openPopupPhoto()

  })
  return card
}


const renderMesto = (newCard) => {
  container.prepend(newCard);
}


const addCard = (evt) => {
  evt.preventDefault();
  const newCard = createMesto(inputTitle.value,inputImage.value)
  container.prepend(newCard)
  closePopup(popupAddCard)

}


initialCards.forEach(item => {
  const initialCard = createMesto(item.name, item.link)
  renderMesto(initialCard);

})


formAddCard.addEventListener('submit', addCard)



const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

const openPopupPhoto = () => {
  openPopup(popupPhoto)
}


// Редактирование профиля
const openProfilePopup = () => {
  openPopup(popupEdit)
  inputName.value = profileTitle.textContent;
  inputJob.value = profileSubtitle.textContent;

 }



// Добавление карточки

const openPushPopup = () => {
  openPopup(popupAddCard)

}


buttonPlus.addEventListener('click', openPushPopup)


const handleProfileFormSubmit =  (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
    closePopup(popupEdit)

}

formEditProfile.addEventListener('submit', handleProfileFormSubmit)
buttonEdit.addEventListener('click', openProfilePopup)

closePopupEdit.addEventListener('click', () =>{
  closePopup(popupEdit)
})

closePopupAddCard.addEventListener('click', () =>{
  closePopup(popupAddCard)
})

closePopupPhoto.addEventListener('click', () =>{
  closePopup(popupPhoto)
})







