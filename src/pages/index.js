import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import {initialCards, config, selectors} from '../utils/constants.js'

const buttonEdit = document.querySelector('.profile__edit')  //Кнопка редактировать профиль (карандаш)
const buttonAdd = document.querySelector('.profile__button') //Кнопка новое место ( + )
const popupEdit = document.querySelector('#profile-popup'); //Попап "Редактировать профиль"
const inputName = document.querySelector('#profile-name') //Инпут "Имя"
const inputDescription = document.querySelector('#profile-about') //Инпут "О себе"
const popupAddCard = document.querySelector('#addCard-popup') //Попап "Новое место"
const inputTitle = document.querySelector('#popup-mesto') //Инпут "Название"
const inputImage = document.querySelector('#popup-img') //Инпут "Ссылка на картинку"
const containerSelector = '.elements'  //Селектор для контейнера карточек

const popupEditValidation = new FormValidator(config,popupEdit)  // Класс валидации попапа "Редактировать профиль"
const popupAddCardValidation = new FormValidator(config, popupAddCard) // Класс валидации попапа "Новое место"

popupEditValidation.enableValidation()  //Метод валидации попапа "Редактировать профиль"
popupAddCardValidation.enableValidation() //Метод валидации попапа "Новое место"

const userInfo = new UserInfo( {       // Класс Инфа пользователя
  nameSelector: '.profile__name',           //h1 с главной страницы "Жак куст"
  descriptionSelector: '.profile__description'  //p c главной страницы "исслед океан"
})

const createNewCard = (item) => {      // Функция Создания новой карточки
  const newCard = new Card(
    item.name,
    item.link,
    selectors,
    () => {
      popupWithImage.open(item.name, item.link)
      }
    )
    const newCardElement = newCard.generateCard()
    const addCardToPage = new Section( {}, containerSelector)
    addCardToPage.addItemPrepend(newCardElement)
}

const defaultCard = new Section (       //Отрисовка дефолтных карточек
  {items: initialCards,
  renderer: (item) => createNewCard(item)
}, containerSelector)
defaultCard.renderItems()

const popupWithImage = new PopupWithImage(selectors.popupPhoto);  //Класс открывает попап с картинкой
popupWithImage.setEventListeners()

const addImageCard = new PopupWithForm (  //Класс открывает попап "Новое место"
  '.popup-add',
  () => {
    createNewCard( {
      name: inputTitle.value,
       link: inputImage.value
      })
       addImageCard.close()
  }
)
buttonAdd.addEventListener('click', () => {    //Открытие попапа "новое место" + валидация по клику
  addImageCard.open()
  popupAddCardValidation.resetValidation()
})
addImageCard.setEventListeners()


const formProfile = new PopupWithForm(  //Класс открывает попап "Редактировать профиль"
  '.popup-edit',
  () => {
    userInfo.setUserInfo(inputName.value,inputDescription.value)
    formProfile.close()
  }
)
formProfile.setEventListeners()  //Слушатели для попапа: 1)закрытие esc+overlay 2)Получение значений инпутов и установка их в h1,p с главной страницы

buttonEdit.addEventListener('click', () => {  //Открытие попапа "редактировать профиль" + валидация по клику
  const user = userInfo.getUserInfo()   //Получение значений инфы пользователя
  inputName.value = user.userName;   //Перезапись значений
  inputDescription.value = user.userDescription;
  popupEditValidation.resetValidation()
  formProfile.open();
})





