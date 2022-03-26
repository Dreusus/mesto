const editButton = document.querySelector('.profile__edit')
const profileTitle= document.querySelector('.profile__title');
const profileSubtitle= document.querySelector('.profile__subtitle');
const closePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const like=document.querySelector('.element__like')


like.addEventListener('click', likeCard)

function likeCard() {
  like.classList.toggle('element__like_active')
}





const inputForm = document.querySelector('.popup__form');

function openProfilePopup() {
 popup.classList.add('popup_opened');
 inputName.value = profileTitle.textContent;
 inputAbout.value = profileSubtitle.textContent;
}

editButton.addEventListener('click', openProfilePopup)





function exitPopup() {
popup.classList.remove('popup_opened')
}



closePopup.addEventListener('click', exitPopup)

const inputName = document.querySelector('#profile__name')
const inputAbout = document.querySelector('#profile__about')






function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  exitPopup();
}

  inputForm.addEventListener('submit', handleProfileFormSubmit);
