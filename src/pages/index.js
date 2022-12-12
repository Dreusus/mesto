import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { config, selectors} from '../utils/constants.js'
import Api from  '../components/Api.js'

const buttonEdit = document.querySelector('.profile__edit')  //Кнопка редактировать профиль (карандаш)
const buttonAdd = document.querySelector('.profile__button') //Кнопка новое место ( + )
const buttonAvatar = document.querySelector('.profile__avatar-button') //Кнопка редактировать аватар
const popupEdit = document.querySelector('#profile-popup'); //Попап "Редактировать профиль"
const popupAddCard = document.querySelector('#addCard-popup') //Попап "Новое место"
const popupAvatar = document.querySelector('#avatar-popup') //Попап "Аватар"
const inputName = document.querySelector('#profile-name') //Инпут "Имя"
const inputDescription = document.querySelector('#profile-about') //Инпут "О себе"
const inputAvatar = document.querySelector('#popup-avatar') //Инпут аватара
const containerSelector = '.elements'  //Селектор для контейнера карточек

const popupEditValidation = new FormValidator(config,popupEdit)  // Валидации попапа "Редактировать профиль"
const popupAddCardValidation = new FormValidator(config, popupAddCard) // Валидации попапа "Новое место"
const popupAvatarValidation = new FormValidator(config, popupAvatar) //Валидация попапа "Редактировать аватар"

popupEditValidation.enableValidation()  //Метод валидации попапа "Редактировать профиль"
popupAddCardValidation.enableValidation() //Метод валидации попапа "Новое место"
popupAvatarValidation.enableValidation() //Метод валидации попапа "Аватар"


export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'facd2054-3a74-4e2d-ae2f-3bd6ba6cfb7c',
    'Content-Type': 'application/json'
  }
})

let userId

api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
  userInfo.setUserAvatar(res.avatar)
  userId = res._id
})

api.getInitialCards()
.then( initialCards => {
  initialCards.forEach( item => {
    const card = createNewCard( {
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      userId : userId,
      ownerId : item.owner._id
    })
    cardList.addItem(card)
  })
.catch((err) => {
  console.log(err);
  })
})

const userInfo = new UserInfo( {       // Класс Инфа пользователя
  nameSelector: '.profile__name',           //h1 с главной страницы "Жак куст"
  descriptionSelector: '.profile__description',  //p c главной страницы "исслед океан"
  avatarSelector: '.profile__avatar' //аватар
})

const createNewCard = (item) => {      // Функция создания новой карточки
  const card = new Card (
    item,
    selectors,
    () => {
      popupWithImage.open(item.name, item.link)
      },
    (id) => {
      confirmPopup.open()
      confirmPopup.changeSumitHandler( () => {
        api.deleteCard(id)
        .then( res => {
          console.log(res)
          card._deleteButton()
          confirmPopup.close()
        })
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
        .then( res => {
          card.setLikes(res.likes)
          })
        .catch((err) => {
          console.log(err);
          })
      } else {
        api.addLike(id)
        .then( res => {
          card.setLikes(res.likes)
          })
        .catch((err) => {
          console.log(err);
          })
      }

    }
    )

return card.generateCard()
}

const cardList = new Section (
  {items: [],
  renderer: (item) => {
    const card = createNewCard( {
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      userId: userId,
      ownerId : item.owner._id
    })
    cardList.addItem(card)
  }
}, containerSelector)

cardList.renderItems()

const popupWithImage = new PopupWithImage(selectors.popupPhoto);  //Попап открытия изображения
popupWithImage.setEventListeners()

const addImageCard = new PopupWithForm (  //Попап "Новое место"
  '.popup-add',
  (item) => {
    addImageCard.loadingMessage(true)
     api.addCard(item['profile-mesto'], item['profile-img'])
      .then(res => {
        const card = createNewCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId : res.owner._id
          })
        cardList.addItemPrepend(card)
        addImageCard.close()
      })
      .catch((err) => {
        console.log(err);
        })
      .finally( () => {
        addImageCard.loadingMessage(false)
      })
 })
 addImageCard.setEventListeners()

 const formProfile = new PopupWithForm(  //Попап "Редактировать профиль"
  '.popup-edit',
  (item) => {
    formProfile.loadingMessage(true)
    api.editProfile(item['profile-name'],item['profile-about'])
    .then( res => {
      userInfo.setUserInfo(res.name,res.about)
      formProfile.close()
      })
    .catch((err) => {
      console.log(err);
      })
    .finally( () => {
      formProfile.loadingMessage(false)
    })
  }
)
formProfile.setEventListeners()

const formAvatar = new PopupWithForm(  //Попап "Обновить аватар"
  '.popup-avatar',
  (item) => {
    formAvatar.loadingMessage(true)
    api.editAvatar (item['popup-avatar'])
    .then( res => {
       userInfo.setUserAvatar(res.avatar)
       formAvatar.close()
    })
    .catch((err) => {
      console.log(err);
      })
    .finally( () => {
      formAvatar.loadingMessage(false)
    })
  }
)
formAvatar.setEventListeners()

const confirmPopup = new PopupWithForm( //Попап "Подтверждение удаления карточки"
  '.popup-delete',
  () => {
    api.deleteCard(id)
    .then(res => {
    })
    .catch((err) => {
      console.log(err);
      })
  }
)
confirmPopup.setEventListeners()



buttonAdd.addEventListener('click', () => {  //Открытие попапа "Новое место"
  addImageCard.open()
  popupAddCardValidation.resetValidation()
})

buttonEdit.addEventListener('click', () => { //Открытие попапа "Редактировать профиль" , вставление данных с  инфы на главной странице в попап
  const user = userInfo.getUserInfo()
  inputName.value = user.userName;
  inputDescription.value = user.userDescription;
  popupEditValidation.resetValidation()
  formProfile.open();
})

buttonAvatar.addEventListener('click', () => {  //Открытие попапа "Обновить аватар" , вставление данных с инфы пользователя в инпут попапа
  const user = userInfo.getUserInfo()
  inputAvatar.value = user.userAvatar
  formAvatar.open()
  popupAvatarValidation.resetValidation()
})









