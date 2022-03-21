const editButton = document.querySelector('.profile__edit')
const profileTitle= document.querySelector('.profile__title');
const profileSubtitle= document.querySelector('.profile__subtitle');
const closePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');



const inputForm = document.querySelector('.popup__form');

function openPopup() {
 popup.classList.add('popup_opened'); 
}

function exitPopup() {
popup.classList.remove('popup_opened')
}

editButton.addEventListener('click', openPopup)

closePopup.addEventListener('click', exitPopup)

const inputName = document.querySelector('#profile__name')
const inputAbout = document.querySelector('#profile__about')

function PopupInput() {
inputName.value = profileTitle.textContent;
inputAbout.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', PopupInput);


function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  exitPopup();
}

  inputForm.addEventListener('submit', formSubmitHandler);
