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



//Константы

const editButton = document.querySelector('.profile__edit')
const pushButton = document.querySelector('.profile__button')
const profileTitle= document.querySelector('.profile__title')
const profileSubtitle= document.querySelector('.profile__subtitle')
const closePopup = document.querySelector('.popup__close')
const closePushPopup = document.querySelector('#closePush')
const closePhotoPopup = document.querySelector('#closePhoto')
const popup = document.querySelector('.popup');
const popupAddCard = document.querySelector('#addCard-popup')
const elements = document.querySelector('.elements')
const popupPhoto = document.querySelector('.popup_photo')

const inputName = document.querySelector('#profile__name')
const inputAbout = document.querySelector('#profile__about')
const inputFormEditProfile = document.querySelector('.popup__form')
const inputFormAddCard = document.querySelector('#popAdd')
const inputTitle = document.querySelector('#popup__mesto')
const inputImage = document.querySelector('#popup__img')





const createMesto = (cardName, link) => {
  const template = document.querySelector('#template')
  const card = template.content.querySelector('.element').cloneNode(true)
  card.querySelector('.element__title').textContent = cardName
  card.querySelector('.element__image').src = link
  card.querySelector('.element__like').addEventListener('click', (event) =>{
  const eventTarget=event.target;
  eventTarget.classList.toggle('element__like_active')
  })
  card.querySelector('.element__delete').addEventListener('click', () =>{
    card.remove()
  })
  card.querySelector('.element__image').addEventListener('click', openPopupPhoto)


  return card
}




const addCard = (evt) => {
  evt.preventDefault();
  const cardName = inputTitle.value;
  const link = inputImage.value;
  renderMesto(cardName, link)
  openPushPopup()
}

const renderMesto = (cardName, link) => {
  elements.prepend(createMesto (cardName, link) )
}

inputFormAddCard.addEventListener('submit', addCard)


const openPopupPhoto = () => {
  popupPhoto.classList.toggle('popup_opened')
  closePhotoPopup.addEventListener('click', openPopupPhoto)

  }




// Редактирование профиля
const openProfilePopup = () => {
  popup.classList.toggle('popup_opened');
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  closePopup.addEventListener('click', openProfilePopup)
 }
 editButton.addEventListener('click', openProfilePopup)

// Добавление карточки

const openPushPopup = () => {
  popupAddCard.classList.toggle('popup_opened');
  closePushPopup.addEventListener('click', openPushPopup)
}


pushButton.addEventListener('click', openPushPopup)


const handleProfileFormSubmit =  (evt) => {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAbout.value;
    popup.classList.remove('popup_opened')
}

inputFormEditProfile.addEventListener('submit', handleProfileFormSubmit)

 const useInitialCard = () => {
  const elementTemplate = document.querySelector('#template').content
  initialCards.forEach( (item) => {
    const cardElement = elementTemplate.querySelector('.element').cloneNode(true)
    cardElement.querySelector('.element__image').src = item.link
    cardElement.querySelector('.element__title').textContent = item.name
    cardElement.querySelector('.element__like').addEventListener('click', (event) =>{
      const eventTarget = event.target
      eventTarget.classList.toggle('element__like_active')
    })
    cardElement.querySelector('.element__delete').addEventListener('click', () =>{
      cardElement.remove()
    })
    cardElement.querySelector('.element__image').addEventListener('click', openPopupPhoto)
    elements.prepend(cardElement)


})

}

 useInitialCard()











